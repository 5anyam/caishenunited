'use client';
import { Shield, Package, CheckCircle, Clock, RefreshCw, AlertCircle, Mail, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ReturnRefundPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-[#FFF8DC] to-white border-b border-[#D4A574]/20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #D4A574 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4A574]/10 border border-[#D4A574]/30 rounded-full mb-6">
            <Shield className="w-4 h-4 text-[#D4A574]" />
            <span className="text-sm text-[#5D4E37] font-medium">Customer Protection</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light text-[#5D4E37] mb-6">
            Return & Refund Policy
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your satisfaction is our priority. We ensure a transparent and hassle-free return process.
          </p>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-gradient-to-br from-[#FFF8DC] to-[#FFFBF0] border border-[#D4A574]/20 rounded-2xl p-8 md:p-12 mb-12 shadow-sm">
            <p className="text-gray-700 leading-relaxed text-lg">
              At <span className="text-[#D4A574] font-semibold">Vyadhihar Foods</span>, we stand behind every product we deliver. Each item is handled with care and inspected to meet our highest standards before it reaches you. Yet, if your order does not meet expectations, we ensure a smooth and transparent resolution process.
            </p>
          </div>
          {/* Policy Points */}
          <div className="space-y-6 mb-12">
            {[
              {
                icon: Clock,
                title: "7-Day Return Window",
                description: "Eligible returns must be requested within 7 days of delivery through our customer care team or email support."
              },
              {
                icon: Package,
                title: "Product Condition",
                description: "Returned items must remain unused, in original packaging, and accompanied by a valid proof of purchase."
              },
              {
                icon: CheckCircle,
                title: "Inspection & Approval",
                description: "Once your item is received and inspected, we will notify you regarding the approval or rejection of your return."
              },
              {
                icon: RefreshCw,
                title: "Refund Processing",
                description: "Approved refunds will be processed to your original method of payment within 5–7 business days."
              },
              {
                icon: Shield,
                title: "Exchange & Replacement",
                description: "In cases of exchange, replacement, or damaged delivery, our support team will coordinate immediate corrective action to ensure complete satisfaction."
              },
              {
                icon: AlertCircle,
                title: "Non-Returnable Items",
                description: "Certain products, such as custom-made items or hygiene-sensitive goods, are not eligible for return or refund, unless defective upon arrival."
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group flex gap-6 p-6 bg-white border border-[#D4A574]/20 rounded-xl hover:border-[#D4A574]/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#D4A574]/10 rounded-full flex items-center justify-center group-hover:bg-[#D4A574]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#D4A574]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#5D4E37] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Closing Statement */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#D4A574]/10 to-[#D4A574]/5 border border-[#D4A574]/30 rounded-2xl p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A574]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-gray-700 leading-relaxed text-lg italic">
                At <span className="text-[#D4A574] font-semibold not-italic">Vyadhihar Foods</span>, every return is more than a formality—it is an opportunity to reaffirm our promise of quality, trust, and unmatched service.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-light text-[#5D4E37] mb-6">
              Need Help with a Return?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-[#D4A574]/30 transition-all hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                Contact Support
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#D4A574] text-[#5D4E37] rounded-full hover:bg-[#D4A574]/10 transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-[#FFF8DC] border-t border-[#D4A574]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-center text-[#5D4E37] mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {[
              {
                question: "How do I initiate a return?",
                answer: "Contact our customer care team or email us within 7 days of delivery with your order number and reason for return."
              },
              {
                question: "Who pays for return shipping?",
                answer: "Return shipping costs depend on the reason for return. For defective or incorrect items, we cover the cost. For other returns, customers are responsible."
              },
              {
                question: "How long does a refund take?",
                answer: "Once your return is approved and received, refunds are processed within 5-7 business days to your original payment method."
              },
              {
                question: "Can I exchange my item?",
                answer: "Yes! Our support team will help coordinate exchanges for size, color, or product variations based on availability."
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white border border-[#D4A574]/20 rounded-xl overflow-hidden hover:border-[#D4A574]/50 hover:shadow-md transition-all"
              >
                <summary className="px-6 py-4 cursor-pointer flex items-center justify-between text-[#5D4E37] font-medium">
                  <span>{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-[#D4A574] transform group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
