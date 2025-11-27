"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../../lib/cart";
import { toast } from "../../../hooks/use-toast";
import { useFacebookPixel } from "../../../hooks/useFacebookPixel";
import type { CartItem } from "../../../lib/facebook-pixel";
import Script from "next/script";
import confetti from 'canvas-confetti';


// Updated for Caishen United - assuming CMS URL; replace with your actual CMS if different
const WOOCOMMERCE_CONFIG = {
  BASE_URL: 'https://cms.caishenunited.com',  // Updated from edaperfumes to caishenunited
  CONSUMER_KEY: 'ck_9a1fbb9afa025bbe8591eb4322c3e1c68e1b1002',
  CONSUMER_SECRET: 'cs_42d947c7a1acb0c0ca89ca17b35629a530097e44',
};


const RAZORPAY_CONFIG = {
  KEY_ID: "rzp_live_ROhFH4eRMKy",
  COMPANY_NAME: "Caishen United",
  THEME_COLOR: "#9e734d"  // Copper theme color for Razorpay
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
      on: (event: string, callback: (response: RazorpayFailureResponse) => void) => void;
    };
  }
}

// ⭐ CONFETTI FUNCTION - ADD THIS
const triggerConfetti = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Copper/gold colors
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#9e734d', '#8a6342', '#FFD700', '#FFA500', '#FF8C00']
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#9e734d', '#8a6342', '#FFD700', '#FFA500', '#FF8C00']
    });
  }, 250);
};

// [Keep all the same interfaces and config - no changes to functionality]
const createWooCommerceOrder = async (orderData: Record<string, unknown>): Promise<WooCommerceOrder> => {
  const apiUrl = `${WOOCOMMERCE_CONFIG.BASE_URL}/wp-json/wc/v3/orders`;
  const auth = btoa(`${WOOCOMMERCE_CONFIG.CONSUMER_KEY}:${WOOCOMMERCE_CONFIG.CONSUMER_SECRET}`);


  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
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
      errorMessage = 'WooCommerce API not found. Please contact support.';
    } else if (response.status === 401) {
      errorMessage = 'Authentication failed. Please contact support.';
    } else if (typeof errorData === 'object' && errorData && errorData !== null && 'message' in errorData) {
      const typedError = errorData as { message: string };
      errorMessage += ` - ${typedError.message}`;
    }


    throw new Error(errorMessage);
  }


  const order = await response.json();
  return order as WooCommerceOrder;
};


const updateWooCommerceOrderStatus = async (orderId: number, status: string, paymentData?: RazorpayHandlerResponse): Promise<WooCommerceOrder> => {
  const updateData: Record<string, unknown> = { status };


  if (paymentData) {
    updateData.meta_data = [
      { key: 'razorpay_payment_id', value: paymentData.razorpay_payment_id },
      { key: 'razorpay_order_id', value: paymentData.razorpay_order_id },
      { key: 'razorpay_signature', value: paymentData.razorpay_signature },
      { key: 'payment_method', value: 'razorpay' },
      { key: 'payment_captured_at', value: new Date().toISOString() },
    ];
  }


  const apiUrl = `${WOOCOMMERCE_CONFIG.BASE_URL}/wp-json/wc/v3/orders/${orderId}`;
  const auth = btoa(`${WOOCOMMERCE_CONFIG.CONSUMER_KEY}:${WOOCOMMERCE_CONFIG.CONSUMER_SECRET}`);


  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
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
  const { trackInitiateCheckout, trackAddPaymentInfo, trackPurchase } = useFacebookPixel();


  const total = items.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0);
  const deliveryCharges = total >= 500 ? 0 : 50;


  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState<boolean>(false);


  const subtotalAfterCoupon = total - couponDiscount;
  const finalTotal = subtotalAfterCoupon + deliveryCharges;


  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", whatsapp: "", address: "", 
    pincode: "", city: "", state: "", notes: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<"form" | "processing">("form");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);


  // [Keep all useEffect, validation, coupon logic, payment handlers same]
  useEffect(() => {
    if (items.length > 0) {
      const cartItems: CartItem[] = items.map(item => ({
        id: item.id, 
        name: item.name, 
        price: parseFloat(item.price), 
        quantity: item.quantity
      }));
      trackInitiateCheckout(cartItems, finalTotal);
    }
  }, [items, finalTotal, trackInitiateCheckout]);


  const validateCoupon = (code: string): { valid: boolean; discount: number; message: string } => {
    const upperCode = code.toUpperCase().trim();
    if (upperCode === "FIRST30") {
      if (total >= 1000) {
        return { valid: true, discount: Math.round(total * 0.3), message: "30% discount applied" };
      } else {
        return { valid: false, discount: 0, message: "Minimum order ₹1000 required for FIRST30" };
      }
    }
    if (upperCode === "WELCOME100") {
      if (total >= 500) {
        return { valid: true, discount: 100, message: "Welcome discount applied" };
      } else {
        return { valid: false, discount: 0, message: "Minimum order ₹500 required for WELCOME100" };
      }
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
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!form.whatsapp.trim()) newErrors.whatsapp = "WhatsApp number is required";
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
      const cartItems: CartItem[] = items.map(item => ({
        id: item.id, 
        name: item.name, 
        price: parseFloat(item.price), 
        quantity: item.quantity
      }));
      trackAddPaymentInfo(cartItems, finalTotal);
    }


    setErrors(newErrors);
    return isValid;
  }


  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }


  function copyPhoneToWhatsApp(): void {
    if (form.phone) {
      setForm(f => ({ ...f, whatsapp: form.phone }));
      if (errors.whatsapp) {
        setErrors(prev => ({ ...prev, whatsapp: undefined }));
      }
    }
  }


  // ⭐ UPDATED - Add confetti on payment success
  const handlePaymentSuccess = async (wooOrder: WooCommerceOrder, response: RazorpayHandlerResponse): Promise<void> => {
    try {
      await updateWooCommerceOrderStatus(wooOrder.id, 'processing', response);

      const orderItems: CartItem[] = items.map(item => ({
        id: item.id, 
        name: item.name, 
        price: parseFloat(item.price), 
        quantity: item.quantity
      }));
      trackPurchase(orderItems, finalTotal, response.razorpay_payment_id);

      clear();

      // ⭐ TRIGGER CONFETTI
      triggerConfetti();

      toast({
        title: "🎉 Payment Successful!",
        description: `Order #${wooOrder.id} confirmed. You'll receive updates via WhatsApp.`,
      });

      router.push(
        `/order-confirmation?orderId=${response.razorpay_payment_id}` +
        `&wcOrderId=${wooOrder.id}` +
        `&amount=${finalTotal}` +
        `&customer=${encodeURIComponent(form.name)}` +
        `&email=${encodeURIComponent(form.email)}`
      );

    } catch {
      toast({
        title: "Payment Completed",
        description: "Your payment was successful. We'll contact you soon.",
      });
    } finally {
      setLoading(false);
      setStep("form");
    }
  };

  const handlePaymentFailure = async (wooOrder: WooCommerceOrder | null, response: RazorpayFailureResponse): Promise<void> => {
    if (wooOrder?.id) {
      try {
        await updateWooCommerceOrderStatus(wooOrder.id, 'failed');
      } catch {
        // Silently handle error
      }
    }

    router.push(
      `/order-failed?status=failed` +
      (wooOrder?.id ? `&wcOrderId=${wooOrder.id}` : '') +
      (form.email ? `&email=${encodeURIComponent(form.email)}` : '') +
      (form.name ? `&customer=${encodeURIComponent(form.name)}` : '') +
      (typeof finalTotal === "number" ? `&amount=${finalTotal}` : '')
    );


    toast({
      title: "Payment Failed",
      description: response?.error?.description || "Payment was not successful. Please try again.",
      variant: "destructive",
    });


    setLoading(false);
    setStep("form");
  };


  const handlePaymentDismiss = async (wooOrder: WooCommerceOrder | null): Promise<void> => {
    if (wooOrder?.id) {
      try {
        await updateWooCommerceOrderStatus(wooOrder.id, 'cancelled');
      } catch {
        // Silently handle error
      }
    }


    toast({
      title: "Payment Cancelled",
      description: "You cancelled the payment process",
      variant: "destructive",
    });


    setLoading(false);
    setStep("form");
  };


  async function handleCheckout(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();


    let wooOrder: WooCommerceOrder | null = null;


    try {
      if (!razorpayLoaded || typeof window === 'undefined' || !window.Razorpay) {
        toast({
          title: "Payment System Loading",
          description: "Please wait for payment system to load",
          variant: "destructive",
        });
        return;
      }


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


      const fullAddress = `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`;


      const orderData = {
        payment_method: 'razorpay',
        payment_method_title: 'Razorpay (Credit Card/Debit Card/NetBanking/UPI)',
        status: 'pending',
        billing: {
          first_name: form.name,
          last_name: '',
          address_1: form.address,
          address_2: '',
          city: form.city,
          state: form.state,
          postcode: form.pincode,
          country: 'IN',
          email: form.email,
          phone: form.phone,
        },
        shipping: {
          first_name: form.name,
          last_name: '',
          address_1: form.address,
          address_2: '',
          city: form.city,
          state: form.state,
          postcode: form.pincode,
          country: 'IN',
        },
        line_items: items.map((item) => ({
          product_id: parseInt(String(item.id), 10),
          quantity: item.quantity,
        })),
        shipping_lines: deliveryCharges > 0 ? [{
          method_id: 'flat_rate',
          method_title: 'Premium Delivery',
          total: deliveryCharges.toString(),
        }] : [],
        coupon_lines: appliedCoupon ? [{
          code: appliedCoupon.toLowerCase(),
          discount: couponDiscount.toString(),
        }] : [],
        customer_note: form.notes + (form.notes ? '\n\n' : '') + 
          `WhatsApp: ${form.whatsapp}\n` +
          `Full Address: ${fullAddress}` +
          (appliedCoupon ? `\nCoupon Applied: ${appliedCoupon} (₹${couponDiscount} discount)` : ''),
        meta_data: [
          { key: 'whatsapp_number', value: form.whatsapp },
          { key: 'full_address', value: fullAddress },
          { key: 'original_subtotal', value: total.toString() },
          { key: 'delivery_charges', value: deliveryCharges.toString() },
          { key: 'final_total', value: finalTotal.toString() },
          ...(appliedCoupon ? [
            { key: 'coupon_code', value: appliedCoupon },
            { key: 'coupon_discount', value: couponDiscount.toString() }
          ] : []),
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
          handlePaymentSuccess(wooOrder!, response);
        },
        modal: {
          ondismiss: () => {
            handlePaymentDismiss(wooOrder);
          },
        },
        prefill: { 
          name: form.name, 
          email: form.email, 
          contact: form.phone 
        },
        theme: { 
          color: RAZORPAY_CONFIG.THEME_COLOR 
        },
        retry: {
          enabled: true,
          max_count: 3
        }
      };


      const rzp = new window.Razorpay(razorpayOptions);


      rzp.on('payment.failed', (response: RazorpayFailureResponse) => {
        handlePaymentFailure(wooOrder, response);
      });


      rzp.open();
      setLoading(false);


    } catch (err) {
      if (wooOrder?.id) {
        try {
          await updateWooCommerceOrderStatus(wooOrder.id, 'cancelled');
        } catch {
          // Silently handle cancellation error
        }
      }


      toast({
        title: "Checkout Failed",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
      setLoading(false);
      setStep("form");
    }
  }


  // Empty cart check
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-lg mx-auto text-center py-24 px-4">
          <div className="border border-gray-200 dark:border-[#9e734d]/20 p-12 rounded-lg bg-white dark:bg-black">
            <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-3 tracking-wide">Your Cart is Empty</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 font-light">Add phone cases and accessories to get started</p>
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
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
        onError={() => {
          toast({
            title: "Payment System Error",
            description: "Failed to load payment system. Please refresh the page.",
            variant: "destructive",
          });
        }}
      />


      <div className="min-h-screen bg-white dark:bg-black pb-10 transition-colors duration-300">
        <div className="max-w-2xl mx-auto py-12 px-4">


          {/* Header */}
          <div className="text-center mb-12 pb-8 border-b border-gray-200 dark:border-[#9e734d]/20">
            <h1 className="text-3xl lg:text-4xl font-light text-gray-900 dark:text-white mb-2 tracking-wide">
              Checkout
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-light">Complete your premium accessory purchase securely</p>
          </div>


          {/* Order Summary */}
          <div className="border border-gray-200 dark:border-[#9e734d]/20 p-6 mb-6 rounded-lg bg-white dark:bg-black">
            <h2 className="text-base font-light text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Order Summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <span className="font-light text-sm text-gray-900 dark:text-white">{item.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">×{item.quantity}</span>
                  </div>
                  <span className="font-light text-sm text-gray-900 dark:text-white">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm text-gray-900 dark:text-white items-center py-2 font-light">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>


              {appliedCoupon && (
                <div className="flex justify-between text-sm text-[#9e734d] dark:text-[#9e734d]/80 items-center py-2 font-light">
                  <div className="flex items-center gap-2">
                    <span>Coupon ({appliedCoupon})</span>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-xs text-[#9e734d] dark:text-[#9e734d]/80 hover:text-[#8a6342] underline font-light"
                    >
                      Remove
                    </button>
                  </div>
                  <span>-₹{couponDiscount.toFixed(2)}</span>
                </div>
              )}


              <div className="flex justify-between text-sm text-gray-900 dark:text-white items-center py-2 font-light">
                <div>
                  <span>Delivery</span>
                  {total >= 500 && <span className="text-gray-600 dark:text-gray-400 text-xs ml-1">(Free above ₹500)</span>}
                </div>
                <span>{deliveryCharges === 0 ? 'Free' : `₹${deliveryCharges}`}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t border-gray-200 dark:border-[#9e734d]/20">
                <span className="text-sm text-gray-900 dark:text-white font-light uppercase tracking-widest">Total</span>
                <span className="text-lg font-light text-gray-900 dark:text-white">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>


          {/* Coupon Section */}
          <div className="border border-gray-200 dark:border-[#9e734d]/20 p-6 mb-6 rounded-lg bg-white dark:bg-black">
            <h2 className="text-base font-light text-gray-900 dark:text-white mb-4 uppercase tracking-widest text-xs">Coupon Code</h2>
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
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 focus:border-[#9e734d] dark:focus:border-[#9e734d]/80 focus:outline-none transition-colors text-sm font-light text-gray-900 dark:text-white bg-white dark:bg-black"
                  disabled={!!appliedCoupon}
                />
                {couponError && (
                  <p className="text-red-500 text-xs mt-1 font-light">{couponError}</p>
                )}
                {appliedCoupon && (
                  <p className="text-[#9e734d] dark:text-[#9e734d]/80 text-xs mt-1 font-light">
                    Coupon {appliedCoupon} applied
                  </p>
                )}
              </div>
              <button
                onClick={appliedCoupon ? handleRemoveCoupon : handleApplyCoupon}
                disabled={isApplyingCoupon}
                className={`px-6 py-3 text-xs font-light tracking-widest uppercase transition-all duration-300 rounded-md ${
                  appliedCoupon
                    ? 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                    : 'bg-gradient-to-r from-[#9e734d] to-[#8a6342] hover:from-[#8a6342] hover:to-[#9e734d] text-white shadow-md'
                } ${isApplyingCoupon ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isApplyingCoupon ? 'Applying...' : appliedCoupon ? 'Remove' : 'Apply'}
              </button>
            </div>
          </div>


          {/* Form */}
          <form onSubmit={handleCheckout} className="border border-gray-200 dark:border-[#9e734d]/20 p-8 rounded-lg bg-white dark:bg-black">
            <h2 className="text-base font-light text-gray-900 dark:text-white mb-8 uppercase tracking-widest text-xs">Delivery Information</h2>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-light text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Name *</label>
                <input
                  name="name"
                  required
                  className={`w-full p-3 border text-sm font-light text-gray-900 dark:text-white transition-colors focus:outline-none bg-white dark:bg-black ${
                    errors.name 
                      ? 'border-red-300 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400' 
                      : 'border-gray-300 dark:border-gray-700 focus:border-[#9e734d] dark:focus:border-[#9e734d]/80'
                  }`}
                  placeholder="Full name"
                  value={form.name}
                  onChange={onChange}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-light">{errors.name}</p>}
              </div>


              <div>
                <label className="block text-xs font-light text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  className={`w-full p-3 border text-sm font-light text-gray-900 dark:text-white transition-colors focus:outline-none bg-white dark:bg-black ${
                    errors.email 
                      ? 'border-red-300 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400' 
                      : 'border-gray-300 dark:border-gray-700 focus:border-[#9e734d] dark:focus:border-[#9e734d]/80'
                  }`}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={onChange}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-light">{errors.email}</p>}
              </div>


              <div>
                <label className="block text-xs font-light text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Phone *</label>
                <input
                  name="phone"
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                  className={`w-full p-3 border text-sm font-light text-gray-900 dark:text-white transition-colors focus:outline-none bg-white dark:bg-black ${
                    errors.phone 
                      ? 'border-red-300 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400' 
                      : 'border-gray-300 dark:border-gray-700 focus:border-[#9e734d] dark:focus:border-[#9e734d]/80'
                  }`}
                  placeholder="10-digit number"
                  value={form.phone}
                  onChange={onChange}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1 font-light">{errors.phone}</p>}
              </div>


              <div>
                <label className="block text-xs font-light text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">
                  WhatsApp * 
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
                  className={`w-full p-3 border text-sm font-light text-gray-900 dark:text-white transition-colors focus:outline-none bg-white dark:bg-black ${
                    errors.whatsapp 
                      ? 'border-red-300 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400' 
                      : 'border-gray-300 dark:border-gray-700 focus:border-[#9e734d] dark:focus:border-[#9e734d]/80'
                  }`}
                  placeholder="WhatsApp number"
                  value={form.whatsapp}
                  onChange={onChange}
                />
                {errors.whatsapp && <p className="text-red-500 text-xs mt-1 font-light">{errors.whatsapp}</p>}
              </div>
            </div>


            <div className="mb-6">
              <label className="block text-xs font-light text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Address *</label>
              <textarea
                name="address"
                rows={3}
                required
                className={`w-full p-3 border text-sm font-light text-gray-900 dark:text-white transition-colors focus:outline-none resize-none bg-white dark:bg-black ${
                  errors.address 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400' 
                    : 'border-gray-300 dark:border-gray-700 focus:border-[#9e734d] dark:focus:border-[#9e734d]/80'
                }`}
                placeholder="Complete address"
                value={form.address}
                onChange={onChange}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1 font-light">{errors.address}</p>}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-xs font-light text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Pincode *</label>
                <input
                  name="pincode"
                  type="text"
                  pattern="[0-9]{6}"
                  required
                  className={`w-full p-3 border text-sm font-light text-gray-900 dark:text-white transition-colors focus:outline-none bg-white dark:bg-black ${
                    errors.pincode 
                      ? 'border-red-300 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400' 
                      : 'border-gray-300 dark:border-gray-700 focus:border-[#9e734d] dark:focus:border-[#9e734d]/80'
                  }`}
                  placeholder="6-digit"
                  value={form.pincode}
                  onChange={onChange}
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1 font-light">{errors.pincode}</p>}
              </div>


              <div>
                <label className="block text-xs font-light text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">City *</label>
                <input
                  name="city"
                  required
                  className={`w-full p-3 border text-sm font-light text-gray-900 dark:text-white transition-colors focus:outline-none bg-white dark:bg-black ${
                    errors.city 
                      ? 'border-red-300 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400' 
                      : 'border-gray-300 dark:border-gray-700 focus:border-[#9e734d] dark:focus:border-[#9e734d]/80'
                  }`}
                  placeholder="City"
                  value={form.city}
                  onChange={onChange}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1 font-light">{errors.city}</p>}
              </div>


              <div>
                <label className="block text-xs font-light text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">State *</label>
                <select
                  name="state"
                  required
                  className={`w-full p-3 border text-sm font-light text-gray-900 dark:text-white transition-colors focus:outline-none bg-white dark:bg-black ${
                    errors.state 
                      ? 'border-red-300 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400' 
                      : 'border-gray-300 dark:border-gray-700 focus:border-[#9e734d] dark:focus:border-[#9e734d]/80'
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
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Goa">Goa</option>
                </select>
                {errors.state && <p className="text-red-500 text-xs mt-1 font-light">{errors.state}</p>}
              </div>
            </div>


            <div className="mb-8">
              <label className="block text-xs font-light text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Notes</label>
              <textarea
                name="notes"
                rows={2}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 focus:border-[#9e734d] dark:focus:border-[#9e734d]/80 focus:outline-none transition-colors text-sm font-light text-gray-900 dark:text-white resize-none bg-white dark:bg-black"
                placeholder="Special instructions"
                value={form.notes}
                onChange={onChange}
              />
            </div>


            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-6 mb-8 border border-gray-200 dark:border-[#9e734d]/20 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-900 dark:text-white font-light uppercase tracking-widest">Amount</span>
                <div className="text-right">
                  <span className="text-xl font-light text-gray-900 dark:text-white">
                    ₹{finalTotal.toFixed(2)}
                  </span>
                  {appliedCoupon && (
                    <p className="text-xs text-[#9e734d] dark:text-[#9e734d]/80 mt-1 font-light">Saved ₹{couponDiscount}</p>
                  )}
                </div>
              </div>
            </div>


            {/* Payment Button */}
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-[#9e734d] to-[#8a6342] hover:from-[#8a6342] hover:to-[#9e734d] text-white py-4 text-xs font-light tracking-widest uppercase transition-all duration-300 rounded-md shadow-lg ${
                loading || step === "processing" || !razorpayLoaded 
                  ? "opacity-60 pointer-events-none" 
                  : ""
              }`}
              disabled={loading || step === "processing" || !razorpayLoaded}
            >
              {loading || step === "processing" ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : !razorpayLoaded ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Loading...
                </div>
              ) : (
                `Pay ₹${finalTotal.toFixed(2)} Securely`
              )}
            </button>


            {step === "processing" && (
              <div className="text-center text-gray-600 dark:text-gray-400 text-xs mt-3 font-light">
                Creating order and processing payment...
              </div>
            )}
          </form>


          {/* Trust Signals */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-6 text-gray-500 dark:text-gray-400 text-xs font-light">
              <span>• SSL Secured</span>
              <span>• Encrypted Payments</span>
              <span>• Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
