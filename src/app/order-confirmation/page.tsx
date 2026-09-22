'use client';
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderConfirmation() {
  const params = useSearchParams();

  const wcOrderId = params.get('wcOrderId');
  const razorpayId = params.get('orderId');
  const amount = params.get('amount');
  const customer = params.get('customer');
  const email = params.get('email');

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-md border border-gray-100 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h1 className="text-2xl font-light mb-3 text-[#9e734d]">Thank you, {customer || 'customer'}!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Your order <b>#{wcOrderId}</b> has been received and is being processed.
        </p>
        <div className="mb-4">
          <div className="text-sm text-gray-500">Order Amount: <span className="font-medium">₹{amount}</span></div>
          {email && (
            <div className="text-sm text-gray-500">Confirmation sent to <span className="font-medium">{email}</span></div>
          )}
          <div className="text-sm text-gray-500">Payment ID: <span className="font-medium">{razorpayId}</span></div>
        </div>
        <Link
          href="/"
          className="mt-6 inline-block px-8 py-3 text-sm text-white bg-[#9e734d] rounded-lg hover:bg-[#8a6342] transition"
        >
          <p>Back to Home</p>
        </Link>
      </div>
    </div>
  );
}
