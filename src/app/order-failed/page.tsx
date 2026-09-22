'use client';
import { useSearchParams } from "next/navigation";

export default function OrderFailed() {
  const params = useSearchParams();
  const wcOrderId = params.get('wcOrderId');
  const amount = params.get('amount');
  const customer = params.get('customer');
  const email = params.get('email');

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-md border border-gray-100 text-center">
        <div className="text-4xl mb-4">❌</div>
        <h1 className="text-2xl font-light mb-3 text-red-500">Payment Failed</h1>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, {customer || "customer"}. Your order could not be completed.
        </p>
        {wcOrderId && (
          <div className="mb-2 text-sm text-gray-500">
            Order ID: <span className="font-medium">{wcOrderId}</span>
          </div>
        )}
        <div className="mb-2 text-sm text-gray-500">
          Amount: <span className="font-medium">₹{amount}</span>
        </div>
        {email && (
          <div className="mb-2 text-sm text-gray-500">
            Contact: <span className="font-medium">{email}</span>
          </div>
        )}
        <div className="mt-8 text-sm text-red-400">No money was deducted. Please try again or use a different payment method.</div>
        <a
          href="/checkout"
          className="mt-6 inline-block px-8 py-3 text-sm text-white bg-[#9e734d] rounded-lg hover:bg-[#8a6342] transition"
        >
          Retry Payment
        </a>
      </div>
    </div>
  );
}
