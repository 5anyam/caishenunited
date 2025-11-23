'use client';

import { FileText, CalendarX, RefreshCw, Mail, Phone, Shield } from 'lucide-react';

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-[#9e734d]" />
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">Order Cancellation Policy</h1>
          </div>
          <p className="text-gray-600 text-base font-light mb-8">
            At Caishen United, customer satisfaction is our top priority. If you need to cancel your order, please review our cancellation terms below.
          </p>
          <div className="bg-white border border-gray-100 rounded-lg shadow p-8 space-y-8">
            {/* When can you cancel */}
            <div className="flex items-start gap-4">
              <CalendarX className="min-w-8 h-8 text-[#9e734d]" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Cancellation Window</h2>
                <p className="text-gray-700">
                  You can cancel your order within <span className="font-medium text-[#9e734d]">12 hours</span> of placing it, or until your order is processed and shipped, whichever is earlier.
                </p>
              </div>
            </div>
            {/* How to cancel */}
            <div className="flex items-start gap-4">
              <RefreshCw className="min-w-8 h-8 text-[#9e734d]" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">How to Cancel</h2>
                <p className="text-gray-700">
                  To cancel, email us at{' '}
                  <a href="mailto:support@caishenunited.com" className="text-[#9e734d] font-medium hover:underline">
                    support@caishenunited.com
                  </a>{' '}
                  or contact our customer care at{' '}
                  <a href="tel:+919911636888" className="text-[#9e734d] font-medium hover:underline">
                    +91 9911636888
                  </a>
                  {' '}with your name, order number, and reason for cancellation.
                </p>
              </div>
            </div>
            {/* Refund info */}
            <div className="flex items-start gap-4">
              <Shield className="min-w-8 h-8 text-[#9e734d]" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Refund Process</h2>
                <p className="text-gray-700">
                  If your cancellation request is approved before processing or dispatch, your payment will be refunded to your original method within 3-7 business days.
                </p>
                <p className="text-gray-700 mt-1">
                  Orders that have already been shipped cannot be cancelled. In that case, you may refer to our Returns & Refund Policy after delivery.
                </p>
              </div>
            </div>
          </div>
          {/* More info */}
          <div className="mt-10 flex gap-8 flex-wrap">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#9e734d]" />
              <span className="text-sm text-gray-700">support@caishenunited.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#9e734d]" />
              <span className="text-sm text-gray-700">+91 9911636888</span>
            </div>
          </div>
          <div className="mt-8 text-xs text-gray-500">
            For full details, please visit our <a href="/returns-and-refunds-policy" className="text-[#9e734d] hover:underline">Returns & Refund Policy</a>.
          </div>
        </div>
      </section>
    </main>
  );
}
