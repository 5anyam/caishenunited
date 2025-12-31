"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../../lib/cart";
import { useAuth } from "../../../lib/AuthContext"; // ✅ Auth integration
import { toast } from "../../../hooks/use-toast";
import { useFacebookPixel } from "../../../hooks/useFacebookPixel";
import type { CartItem } from "../../../lib/facebook-pixel";
import Link from "next/link";

// Caishen WooCommerce
const WOOCOMMERCE_CONFIG = {
  BASE_URL: "https://cms.caishenunited.com",
  CONSUMER_KEY: "ck_9a1fbb9afa025bbe8591eb4322c3e1c68e1b1002",
  CONSUMER_SECRET: "cs_42d947c7a1acb0c0ca89ca17b35629a530097e44",
};

// Caishen Razorpay
const RAZORPAY_CONFIG = {
  KEY_ID: "rzp_live_RkoPyn44Fu0nOg",
  COMPANY_NAME: "Caishen United",
  THEME_COLOR: "#9e734d",
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  notes: string;
}

interface WooCommerceOrder {
  id: number;
  order_key: string;
  status: string;
  total: string;
  payment_url?: string;
}

interface RazorpayHandlerResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayFailureResponse {
  error?: {
    description?: string;
    code?: string;
    metadata?: Record<string, string>;
  };
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: RazorpayHandlerResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  retry?: {
    enabled: boolean;
    max_count?: number;
  };
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void;
      on: (
        event: string,
        callback: (response: RazorpayFailureResponse) => void
      ) => void;
    };
  }
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const createWooCommerceOrder = async (
  orderData: Record<string, unknown>
): Promise<WooCommerceOrder> => {
  const apiUrl = `${WOOCOMMERCE_CONFIG.BASE_URL}/wp-json/wc/v3/orders`;
  const auth = btoa(
    `${WOOCOMMERCE_CONFIG.CONSUMER_KEY}:${WOOCOMMERCE_CONFIG.CONSUMER_SECRET}`
  );

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = await response.text();
    }

    let errorMessage = `Order creation failed: ${response.status}`;
    if (response.status === 404) {
      errorMessage = "WooCommerce API not found. Please contact support.";
    } else if (response.status === 401) {
      errorMessage = "Authentication failed. Please contact support.";
    } else if (
      typeof errorData === "object" &&
      errorData &&
      "message" in errorData
    ) {
      const typedError = errorData as { message: string };
      errorMessage += ` - ${typedError.message}`;
    }

    throw new Error(errorMessage);
  }

  const order = await response.json();
  return order as WooCommerceOrder;
};

const updateWooCommerceOrderStatus = async (
  orderId: number,
  status: string,
  paymentData?: RazorpayHandlerResponse
): Promise<WooCommerceOrder> => {
  const updateData: Record<string, unknown> = { status };

  if (paymentData) {
    updateData.meta_data = [
      { key: "razorpay_payment_id", value: paymentData.razorpay_payment_id },
      { key: "razorpay_order_id", value: paymentData.razorpay_order_id },
      { key: "razorpay_signature", value: paymentData.razorpay_signature },
      { key: "payment_method", value: "razorpay" },
      { key: "payment_captured_at", value: new Date().toISOString() },
    ];
  }

  const apiUrl = `${WOOCOMMERCE_CONFIG.BASE_URL}/wp-json/wc/v3/orders/${orderId}`;
  const auth = btoa(
    `${WOOCOMMERCE_CONFIG.CONSUMER_KEY}:${WOOCOMMERCE_CONFIG.CONSUMER_SECRET}`
  );

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update order: ${errorText}`);
  }

  const result = await response.json();
  return result as WooCommerceOrder;
};

export default function Checkout(): React.ReactElement {
  const { items, clear } = useCart();
  const router = useRouter();
  const { user } = useAuth(); // ✅ Get logged-in user
  const { trackInitiateCheckout, trackAddPaymentInfo, trackPurchase } =
    useFacebookPixel();

  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
    "razorpay"
  );

  const total = items.reduce(
    (sum, i) => sum + parseFloat(i.price) * i.quantity,
    0
  );

  const deliveryCharges = 0;
  const codCharges = paymentMethod === "cod" ? 100 : 0;

  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState<boolean>(false);

  const subtotalAfterCoupon = total - couponDiscount;
  const finalTotal = subtotalAfterCoupon + deliveryCharges + codCharges;

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    notes: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<"form" | "processing">("form");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // ✅ Auto-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.first_name && user.last_name 
          ? `${user.first_name} ${user.last_name}`.trim() 
          : user.first_name || user.username,
        email: user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (items.length > 0) {
      const cartItems: CartItem[] = items.map((item) => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price),
        quantity: item.quantity,
      }));
      trackInitiateCheckout(cartItems, finalTotal);
    }
  }, [items, finalTotal, trackInitiateCheckout]);

  const validateCoupon = (
    code: string
  ): { valid: boolean; discount: number; message: string } => {
    const upperCode = code.toUpperCase().trim();
    if (upperCode === "NEWBEGIN10") {
      return {
        valid: true,
        discount: Math.round(total * 0.1),
        message: "10% discount applied",
      };
    }
    return { valid: false, discount: 0, message: "Invalid coupon code" };
  };

  const handleApplyCoupon = (): void => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }
    if (appliedCoupon === couponCode.toUpperCase()) {
      setCouponError("Coupon already applied");
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError("");

    setTimeout(() => {
      const validation = validateCoupon(couponCode);
      if (validation.valid) {
        setAppliedCoupon(couponCode.toUpperCase());
        setCouponDiscount(validation.discount);
        setCouponError("");
        toast({
          title: "Coupon Applied",
          description: `You saved ₹${validation.discount}`,
        });
      } else {
        setCouponError(validation.message);
        setAppliedCoupon("");
        setCouponDiscount(0);
      }
      setIsApplyingCoupon(false);
    }, 800);
  };

  const handleRemoveCoupon = (): void => {
    setAppliedCoupon("");
    setCouponDiscount(0);
    setCouponCode("");
    setCouponError("");
    toast({
      title: "Coupon Removed",
      description: "Coupon discount has been removed",
    });
  };

  function validateForm(): boolean {
    const newErrors: Partial<FormData> = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)
    ) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!form.whatsapp.trim())
      newErrors.whatsapp = "WhatsApp number is required";
    if (!/^[0-9]{10}$/.test(form.whatsapp)) {
      newErrors.whatsapp = "Please enter a valid 10-digit WhatsApp number";
    }
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!/^[0-9]{6}$/.test(form.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";

    const isValid = Object.keys(newErrors).length === 0;

    if (isValid && items.length > 0) {
      const cartItems: CartItem[] = items.map((item) => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price),
        quantity: item.quantity,
      }));
      trackAddPaymentInfo(cartItems, finalTotal);
    }

    setErrors(newErrors);
    return isValid;
  }

  function onChange(
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function copyPhoneToWhatsApp(): void {
    if (form.phone) {
      setForm((f) => ({ ...f, whatsapp: form.phone }));
      if (errors.whatsapp) {
        setErrors((prev) => ({ ...prev, whatsapp: undefined }));
      }
    }
  }

  const getFeeLines = () => {
    if (appliedCoupon && couponDiscount > 0) {
      return [
        {
          name: `Discount (${appliedCoupon})`,
          total: (-couponDiscount).toString(),
          tax_status: "none",
        },
      ];
    }
    return [];
  };

  const handleCODSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setStep("processing");

    try {
      const fullAddress = `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`;

      const shippingLines = [];
      if (codCharges > 0) {
        shippingLines.push({
          method_id: "cod",
          method_title: "COD Handling Charges",
          total: codCharges.toString(),
        });
      }

      const orderData: Record<string, unknown> = {
        payment_method: "cod",
        payment_method_title: "Cash on Delivery (COD) - ₹100 Extra",
        status: "processing",
        customer_id: user ? user.id : 0, // ✅ Link to user account if logged in
        billing: {
          first_name: form.name,
          last_name: "",
          address_1: form.address,
          address_2: "",
          city: form.city,
          state: form.state,
          postcode: form.pincode,
          country: "IN",
          email: form.email,
          phone: form.phone,
        },
        shipping: {
          first_name: form.name,
          last_name: "",
          address_1: form.address,
          address_2: "",
          city: form.city,
          state: form.state,
          postcode: form.pincode,
          country: "IN",
        },
        line_items: items.map((item) => ({
          product_id: parseInt(String(item.id), 10),
          quantity: item.quantity,
        })),
        shipping_lines: shippingLines,
        fee_lines: getFeeLines(),
        coupon_lines: [],
        customer_note:
          form.notes +
          (form.notes ? "\n\n" : "") +
          `WhatsApp: ${form.whatsapp}\n` +
          `Full Address: ${fullAddress}` +
          `\nCOD Charges: ₹${codCharges}` +
          (appliedCoupon
            ? `\nCoupon Applied: ${appliedCoupon} (₹${couponDiscount} discount)`
            : ""),
        meta_data: [
          { key: "whatsapp_number", value: form.whatsapp },
          { key: "full_address", value: fullAddress },
          { key: "original_subtotal", value: total.toString() },
          { key: "delivery_charges", value: "0" },
          { key: "cod_charges", value: codCharges.toString() },
          { key: "final_total", value: finalTotal.toString() },
          { key: "payment_method", value: "cod" },
          { key: "user_type", value: user ? "registered" : "guest" }, // ✅ Track user type
          ...(appliedCoupon
            ? [
                { key: "coupon_code", value: appliedCoupon },
                {
                  key: "coupon_discount",
                  value: couponDiscount.toString(),
                },
              ]
            : []),
        ],
      };

      const wooOrder = await createWooCommerceOrder(orderData);

      const orderItems: CartItem[] = items.map((item) => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price),
        quantity: item.quantity,
      }));
      trackPurchase(orderItems, finalTotal, String(wooOrder.id));

      clear();

      toast({
        title: "Order Placed Successfully!",
        description: `Order #${wooOrder.id} confirmed. Pay ₹${finalTotal.toFixed(2)} cash on delivery.`,
      });

      setTimeout(() => {
        // ✅ Redirect based on user status
        if (user) {
          router.push(`/dashboard/orders/${wooOrder.id}`);
        } else {
          router.push(`/order-confirmation?wcOrderId=${wooOrder.id}&cod=true`);
        }
      }, 1000);
    } catch (error) {
      toast({
        title: "Order Failed",
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setStep("form");
    }
  };

  const handlePaymentSuccess = async (
    wooOrder: WooCommerceOrder,
    response: RazorpayHandlerResponse
  ): Promise<void> => {
    try {
      await updateWooCommerceOrderStatus(wooOrder.id, "processing", response);

      const orderItems: CartItem[] = items.map((item) => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price),
        quantity: item.quantity,
      }));
      trackPurchase(orderItems, finalTotal, response.razorpay_payment_id);

      clear();

      toast({
        title: "Payment Successful",
        description: `Order #${wooOrder.id} confirmed. Redirecting...`,
      });

      setTimeout(() => {
        // ✅ Redirect based on user status
        if (user) {
          router.push(`/dashboard/orders/${wooOrder.id}`);
        } else {
          router.push(
            `/order-confirmation?orderId=${response.razorpay_payment_id}&wcOrderId=${wooOrder.id}`
          );
        }
      }, 1000);
    } catch (error) {
      console.error("Error updating order:", error);
      toast({
        title: "Payment Completed",
        description: "Your payment was successful. We'll contact you soon.",
      });

      setTimeout(() => {
        router.push(
          `/order-confirmation?orderId=${response.razorpay_payment_id}&wcOrderId=${wooOrder.id}`
        );
      }, 2000);
    } finally {
      setLoading(false);
      setStep("form");
    }
  };

  const handlePaymentFailure = async (
    wooOrder: WooCommerceOrder | null,
    response: RazorpayFailureResponse
  ): Promise<void> => {
    if (wooOrder?.id) {
      try {
        await updateWooCommerceOrderStatus(wooOrder.id, "failed");
      } catch {
        // ignore
      }
    }

    const errorMessage =
      response?.error?.description || "Payment was not successful";

    toast({
      title: "Payment Failed",
      description: errorMessage,
      variant: "destructive",
    });

    setLoading(false);
    setStep("form");

    setTimeout(() => {
      const params = new URLSearchParams({
        error: errorMessage,
        ...(wooOrder?.id && { wcOrderId: wooOrder.id.toString() }),
        amount: finalTotal.toFixed(2),
      });
      router.push(`/payment-failed?${params.toString()}`);
    }, 1500);
  };

  const handlePaymentDismiss = async (
    wooOrder: WooCommerceOrder | null
  ): Promise<void> => {
    if (wooOrder?.id) {
      try {
        await updateWooCommerceOrderStatus(wooOrder.id, "cancelled");
      } catch {
        // ignore
      }
    }

    toast({
      title: "Payment Cancelled",
      description: "You cancelled the payment process",
      variant: "destructive",
    });

    setLoading(false);
    setStep("form");

    setTimeout(() => {
      const params = new URLSearchParams({
        error: "Payment was cancelled by user",
        ...(wooOrder?.id && { wcOrderId: wooOrder.id.toString() }),
        amount: finalTotal.toFixed(2),
      });
      router.push(`/payment-failed?${params.toString()}`);
    }, 1500);
  };

  async function handleCheckout(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (paymentMethod === "cod") {
      await handleCODSubmit();
      return;
    }

    let wooOrder: WooCommerceOrder | null = null;

    try {
      if (!validateForm()) {
        toast({
          title: "Please fix the errors",
          description: "Check all required fields",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      setStep("processing");

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || typeof window === "undefined" || !window.Razorpay) {
        toast({
          title: "Payment System Error",
          description:
            "Failed to load payment system. Please refresh the page.",
          variant: "destructive",
        });
        setLoading(false);
        setStep("form");
        return;
      }

      const fullAddress = `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`;

      const orderData: Record<string, unknown> = {
        payment_method: "razorpay",
        payment_method_title:
          "Razorpay (Credit Card/Debit Card/NetBanking/UPI)",
        status: "pending",
        customer_id: user ? user.id : 0, // ✅ Link to user account if logged in
        billing: {
          first_name: form.name,
          last_name: "",
          address_1: form.address,
          address_2: "",
          city: form.city,
          state: form.state,
          postcode: form.pincode,
          country: "IN",
          email: form.email,
          phone: form.phone,
        },
        shipping: {
          first_name: form.name,
          last_name: "",
          address_1: form.address,
          address_2: "",
          city: form.city,
          state: form.state,
          postcode: form.pincode,
          country: "IN",
        },
        line_items: items.map((item) => ({
          product_id: parseInt(String(item.id), 10),
          quantity: item.quantity,
        })),
        shipping_lines: [],
        fee_lines: getFeeLines(),
        coupon_lines: [],
        customer_note:
          form.notes +
          (form.notes ? "\n\n" : "") +
          `WhatsApp: ${form.whatsapp}\n` +
          `Full Address: ${fullAddress}` +
          (appliedCoupon
            ? `\nCoupon Applied: ${appliedCoupon} (₹${couponDiscount} discount)`
            : ""),
        meta_data: [
          { key: "whatsapp_number", value: form.whatsapp },
          { key: "full_address", value: fullAddress },
          { key: "original_subtotal", value: total.toString() },
          { key: "delivery_charges", value: "0" },
          { key: "final_total", value: finalTotal.toString() },
          { key: "user_type", value: user ? "registered" : "guest" }, // ✅ Track user type
          ...(appliedCoupon
            ? [
                { key: "coupon_code", value: appliedCoupon },
                {
                  key: "coupon_discount",
                  value: couponDiscount.toString(),
                },
              ]
            : []),
        ],
      };

      wooOrder = await createWooCommerceOrder(orderData);

      const razorpayOptions: RazorpayOptions = {
        key: RAZORPAY_CONFIG.KEY_ID,
        amount: Math.round(finalTotal * 100),
        currency: "INR",
        name: RAZORPAY_CONFIG.COMPANY_NAME,
        description: `Order #${wooOrder.id}`,
        handler: (response: RazorpayHandlerResponse) => {
          void handlePaymentSuccess(wooOrder!, response);
        },
        modal: {
          ondismiss: () => {
            void handlePaymentDismiss(wooOrder);
          },
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: RAZORPAY_CONFIG.THEME_COLOR,
        },
        retry: {
          enabled: true,
          max_count: 3,
        },
      };

      const rzp = new window.Razorpay(razorpayOptions);

      rzp.on("payment.failed", (response: RazorpayFailureResponse) => {
        void handlePaymentFailure(wooOrder, response);
      });

      rzp.open();
      setLoading(false);
    } catch (err) {
      if (wooOrder?.id) {
        try {
          await updateWooCommerceOrderStatus(wooOrder.id, "cancelled");
        } catch {
          // ignore
        }
      }

      toast({
        title: "Checkout Failed",
        description:
          err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
      setLoading(false);
      setStep("form");
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-lg mx-auto text-center py-24 px-4">
          <div className="border border-gray-200 p-12 rounded-lg bg-white">
            <h2 className="text-2xl font-light text-gray-900 mb-3 tracking-wide">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 text-sm mb-8 font-light">
              Add phone cases and accessories to get started
            </p>
            <button
              onClick={() => router.push("/")}
              className="inline-block px-8 py-3 text-xs text-white bg-gradient-to-r from-[#9e734d] to-[#8a6342] hover:from-[#8a6342] hover:to-[#9e734d] transition-all duration-300 tracking-widest uppercase font-light rounded-md shadow-md"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="min-h-screen bg-white pb-10">
        <div className="max-w-2xl mx-auto py-12 px-4">
          {/* Header */}
          <div className="text-center mb-12 pb-8 border-b border-gray-200">
            <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2 tracking-wide">
              Checkout
            </h1>
            <p className="text-gray-600 text-sm font-light">
              Complete your premium accessory purchase securely
            </p>
          </div>

          {/* ✅ Login Prompt for Guest Users */}
          {!user && (
            <div className="mb-8 p-4 bg-[#fdf6e9] border border-[#9e734d]/20 rounded-lg">
              <p className="text-sm text-gray-700 font-light">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#9e734d] font-semibold hover:underline"
                >
                  Login here
                </Link>{" "}
                to track your orders easily.
              </p>
            </div>
          )}

          {/* ✅ User Welcome Message */}
          {user && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 font-light">
                Welcome back, <span className="font-semibold">{user.first_name || user.username}</span>! Your order will be saved to your account.
              </p>
            </div>
          )}

          {/* Order Summary */}
          <div className="border border-gray-200 p-6 mb-6 rounded-lg bg-white shadow-sm">
            <h2 className="text-base font-light text-gray-900 mb-6 uppercase tracking-widest text-xs">
              Order Summary
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b border-gray-100"
                >
                  <div>
                    <span className="font-light text-sm text-gray-900">
                      {item.name}
                    </span>
                    <span className="text-gray-500 text-xs ml-2">
                      ×{item.quantity}
                    </span>
                  </div>
                  <span className="font-light text-sm text-gray-900">
                    ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-sm text-gray-900 items-center py-2 font-light">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-sm text-[#9e734d] items-center py-2 font-light">
                  <div className="flex items-center gap-2">
                    <span>Coupon ({appliedCoupon})</span>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-xs text-[#9e734d] hover:text-[#8a6342] underline font-light"
                    >
                      Remove
                    </button>
                  </div>
                  <span>-₹{couponDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm text-gray-900 items-center py-2 font-light">
                <span>Delivery</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              {codCharges > 0 && (
                <div className="flex justify-between text-sm text-orange-600 items-center py-2 font-light">
                  <span>COD Charges</span>
                  <span>₹{codCharges}</span>
                </div>
              )}

              <div className="flex justify-between items-center py-3 border-t border-gray-200">
                <span className="text-sm text-gray-900 font-light uppercase tracking-widest">
                  Total
                </span>
                <span className="text-lg font-light text-gray-900">
                  ₹{finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          {/* ✨ Premium Freebies Section - Add after Order Summary, before Coupon */}
<div className="border-2 border-dashed border-emerald-300 p-6 mb-6 rounded-lg bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 shadow-sm relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl" />
  <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-200/20 rounded-full blur-2xl" />
  
  <div className="relative z-10">
    {/* Header with Badge */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wider">
            🎁 Free Premium Gifts
          </h3>
          <p className="text-xs text-gray-600 font-light">
            Worth ₹250 • Automatically Included
          </p>
        </div>
      </div>
      <span className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-[10px] font-bold rounded-full shadow-md uppercase tracking-wider">
        Limited Time
      </span>
    </div>

    {/* Gift Items Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Sticky Pad */}
      <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-emerald-200/50 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center border border-emerald-200">
          <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Premium Sticky Pad</p>
          <p className="text-[10px] text-gray-500 font-light">High-Quality • Reusable</p>
          <p className="text-xs text-emerald-600 font-medium mt-0.5">Worth ₹125</p>
        </div>
      </div>

      {/* Cable Protector */}
      <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-emerald-200/50 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center border border-emerald-200">
          <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Cable Protector</p>
          <p className="text-[10px] text-gray-500 font-light">Durable • Long-lasting</p>
          <p className="text-xs text-emerald-600 font-medium mt-0.5">Worth ₹125</p>
        </div>
      </div>
    </div>

    {/* Additional Info */}
    <div className="mt-4 pt-4 border-t border-emerald-200/50">
      <div className="flex items-center justify-center gap-2 text-xs text-emerald-700 font-medium">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
        <span>These gifts will be packed with your order at no extra cost</span>
      </div>
    </div>
  </div>
</div>


          {/* Coupon Section */}
          <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden mb-6">
  {/* ✨ Promotional Banner */}
  <div className="bg-gradient-to-r from-[#9e734d] to-[#8a6342] p-4 text-center">
    <div className="flex items-center justify-center gap-2 mb-1">
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
      </svg>
      <h3 className="text-white font-semibold text-sm tracking-wide uppercase">
        Special Offer
      </h3>
    </div>
    <p className="text-white text-xs font-light leading-relaxed">
      Use code <span className="font-bold bg-white/20 px-2 py-1 rounded mx-1">NEWBEGIN10</span> and get
      <span className="font-bold text-yellow-200"> Flat 10% OFF</span>
    </p>
    <p className="text-white/80 text-[10px] mt-1 font-light">
      + More Exciting Offers on All Orders
    </p>
  </div>

  {/* Coupon Input Section */}
  <div className="p-6">
    <h2 className="text-base font-light text-gray-900 mb-4 uppercase tracking-widest text-xs">
      Apply Coupon Code
    </h2>
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => {
            setCouponCode(e.target.value);
            setCouponError("");
          }}
          className="w-full p-3 border border-gray-300 focus:border-[#9e734d] focus:outline-none transition-colors text-sm font-light text-gray-900 bg-white placeholder-gray-400"
          disabled={!!appliedCoupon}
        />
        {couponError && (
          <p className="text-red-500 text-xs mt-1 font-light">
            {couponError}
          </p>
        )}
        {appliedCoupon && (
          <div className="flex items-center gap-1 mt-1">
            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <p className="text-green-600 text-xs font-medium">
              Coupon {appliedCoupon} applied! You saved ₹{couponDiscount}
            </p>
          </div>
        )}
      </div>
      <button
        onClick={appliedCoupon ? handleRemoveCoupon : handleApplyCoupon}
        disabled={isApplyingCoupon}
        className={`px-6 py-3 text-xs font-light tracking-widest uppercase transition-all duration-300 rounded-md ${
          appliedCoupon
            ? "bg-gray-200 hover:bg-gray-300 text-gray-900"
            : "bg-gradient-to-r from-[#9e734d] to-[#8a6342] hover:from-[#8a6342] hover:to-[#9e734d] text-white shadow-md"
        } ${isApplyingCoupon ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {isApplyingCoupon
          ? "Applying..."
          : appliedCoupon
          ? "Remove"
          : "Apply"}
      </button>
    </div>
  </div>
</div>

          {/* Form */}
          <form
            onSubmit={handleCheckout}
            className="border border-gray-200 p-8 rounded-lg bg-white shadow-sm"
          >
            <h2 className="text-base font-light text-gray-900 mb-8 uppercase tracking-widest text-xs">
              Delivery Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 uppercase tracking-widest">
                  Name *
                </label>
                <input
                  name="name"
                  required
                  className={`w-full p-3 border text-sm font-light text-gray-900 transition-colors focus:outline-none bg-white placeholder-gray-400 ${
                    errors.name
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-[#9e734d]"
                  }`}
                  placeholder="Full name"
                  value={form.name}
                  onChange={onChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 font-light">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 uppercase tracking-widest">
                  Email * {/* ✅ Email mandatory for all users */}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className={`w-full p-3 border text-sm font-light text-gray-900 transition-colors focus:outline-none bg-white placeholder-gray-400 ${
                    errors.email
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-[#9e734d]"
                  }`}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={onChange}
                  readOnly={!!user} // ✅ Read-only if logged in
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 font-light">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 uppercase tracking-widest">
                  Phone *
                </label>
                <input
                  name="phone"
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                  className={`w-full p-3 border text-sm font-light text-gray-900 transition-colors focus:outline-none bg-white placeholder-gray-400 ${
                    errors.phone
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-[#9e734d]"
                  }`}
                  placeholder="10-digit number"
                  value={form.phone}
                  onChange={onChange}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 font-light">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 uppercase tracking-widest">
                  WhatsApp *{" "}
                  <button
                    type="button"
                    onClick={copyPhoneToWhatsApp}
                    className="ml-2 text-xs bg-gradient-to-r from-[#9e734d] to-[#8a6342] text-white px-2 py-1 hover:from-[#8a6342] hover:to-[#9e734d] transition-all duration-300 font-light rounded"
                  >
                    Same as phone
                  </button>
                </label>
                <input
                  name="whatsapp"
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                  className={`w-full p-3 border text-sm font-light text-gray-900 transition-colors focus:outline-none bg-white placeholder-gray-400 ${
                    errors.whatsapp
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-[#9e734d]"
                  }`}
                  placeholder="WhatsApp number"
                  value={form.whatsapp}
                  onChange={onChange}
                />
                {errors.whatsapp && (
                  <p className="text-red-500 text-xs mt-1 font-light">
                    {errors.whatsapp}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-light text-gray-600 mb-2 uppercase tracking-widest">
                Address *
              </label>
              <textarea
                name="address"
                rows={3}
                required
                className={`w-full p-3 border text-sm font-light text-gray-900 transition-colors focus:outline-none resize-none bg-white placeholder-gray-400 ${
                  errors.address
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-[#9e734d]"
                }`}
                placeholder="Complete address"
                value={form.address}
                onChange={onChange}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1 font-light">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 uppercase tracking-widest">
                  Pincode *
                </label>
                <input
                  name="pincode"
                  type="text"
                  pattern="[0-9]{6}"
                  required
                  className={`w-full p-3 border text-sm font-light text-gray-900 transition-colors focus:outline-none bg-white placeholder-gray-400 ${
                    errors.pincode
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-[#9e734d]"
                  }`}
                  placeholder="6-digit"
                  value={form.pincode}
                  onChange={onChange}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-xs mt-1 font-light">
                    {errors.pincode}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 uppercase tracking-widest">
                  City *
                </label>
                <input
                  name="city"
                  required
                  className={`w-full p-3 border text-sm font-light text-gray-900 transition-colors focus:outline-none bg-white placeholder-gray-400 ${
                    errors.city
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-[#9e734d]"
                  }`}
                  placeholder="City"
                  value={form.city}
                  onChange={onChange}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1 font-light">
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 uppercase tracking-widest">
                  State *
                </label>
                <select
                  name="state"
                  required
                  className={`w-full p-3 border text-sm font-light text-gray-900 transition-colors focus:outline-none bg-white ${
                    errors.state
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-[#9e734d]"
                  }`}
                  value={form.state}
                  onChange={onChange}
                >
                  <option value="">Select State</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Assam">Assam</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">
                    Jammu and Kashmir
                  </option>
                  <option value="Goa">Goa</option>
                </select>
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1 font-light">
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xs font-light text-gray-600 mb-2 uppercase tracking-widest">
                Notes
              </label>
              <textarea
                name="notes"
                rows={2}
                className="w-full p-3 border border-gray-300 focus:border-[#9e734d] focus:outline-none transition-colors text-sm font-light text-gray-900 resize-none bg-white placeholder-gray-400"
                placeholder="Special instructions"
                value={form.notes}
                onChange={onChange}
              />
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 p-6 mb-8 border border-gray-200 rounded-lg">
              <h3 className="text-xs font-light text-gray-600 mb-3 uppercase tracking-widest">
                Payment Method
              </h3>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex-1 p-3 border text-xs font-light uppercase tracking-widest transition-colors rounded ${
                    paymentMethod === "razorpay"
                      ? "bg-gradient-to-r from-[#9e734d] to-[#8a6342] text-white border-transparent shadow-md"
                      : "bg-white text-gray-900 border-gray-300 hover:border-[#9e734d]"
                  }`}
                >
                  Online Payment
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex-1 p-3 border text-xs font-light uppercase tracking-widest transition-colors rounded ${
                    paymentMethod === "cod"
                      ? "bg-gradient-to-r from-[#9e734d] to-[#8a6342] text-white border-transparent shadow-md"
                      : "bg-white text-gray-900 border-gray-300 hover:border-[#9e734d]"
                  }`}
                >
                  Cash on Delivery (+₹100)
                </button>
              </div>
              {paymentMethod === "cod" && (
                <p className="text-xs text-orange-600 mt-2 font-light text-center">
                  ₹100 extra charges for COD orders
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="bg-gray-50 p-6 mb-8 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-900 font-light uppercase tracking-widest">
                  Amount to Pay
                </span>
                <div className="text-right">
                  <span className="text-xl font-light text-gray-900">
                    ₹{finalTotal.toFixed(2)}
                  </span>
                  {appliedCoupon && (
                    <p className="text-xs text-[#9e734d] mt-1 font-light">
                      Saved ₹{couponDiscount}
                    </p>
                  )}
                  {codCharges > 0 && (
                    <p className="text-xs text-orange-600 mt-1 font-light">
                      Includes ₹{codCharges} COD charges
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-[#9e734d] to-[#8a6342] hover:from-[#8a6342] hover:to-[#9e734d] text-white py-4 text-xs font-light tracking-widest uppercase transition-all duration-300 rounded-md shadow-lg ${
                loading || step === "processing"
                  ? "opacity-60 pointer-events-none"
                  : ""
              }`}
              disabled={loading || step === "processing"}
            >
              {loading || step === "processing" ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {paymentMethod === "cod"
                    ? "Creating your order..."
                    : "Processing..."}
                </div>
              ) : paymentMethod === "cod" ? (
                `Place COD Order (₹${finalTotal.toFixed(2)})`
              ) : (
                `Pay ₹${finalTotal.toFixed(2)} Securely`
              )}
            </button>
          </form>

          {/* Trust Signals */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-6 text-gray-500 text-xs font-light">
              <span>• SSL Secured</span>
              <span>• Encrypted Payments</span>
              <span>• Free Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
