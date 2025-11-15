'use client';
import { Truck, Clock, MapPin, Bell, Shield, Package, ChevronRight, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-black border-b border-[#9e734d]/20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #9e734d 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#9e734d]/10 border border-[#9e734d]/30 rounded-full mb-6">
            <Truck className="w-4 h-4 text-[#9e734d]" />
            <span className="text-sm text-[#9e734d] font-medium">Fast & Secure Delivery</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
            Shipping Policy
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Timely, secure, and transparent delivery every step of the way.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#9e734d]/20 rounded-2xl p-8 md:p-12 mb-12">
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              At <span className="text-[#9e734d] font-semibold">Caishen United</span>, we understand that a seamless shopping experience extends beyond your purchase it is about timely, secure, and transparent delivery every step of the way.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Every order we ship reflects our commitment to precision, responsibility, and reliability. Shipping is not the end of the sale—it is the beginning of confidence delivered.
            </p>
          </div>

          {/* Shipping Process */}
          <div className="space-y-6 mb-12">
            {[
              {
                icon: Clock,
                title: "Order Processing",
                description: "All confirmed orders are prepared for dispatch within 24–48 business hours.",
                highlight: "24-48 Hours"
              },
              {
                icon: Truck,
                title: "Trusted Courier Partners",
                description: "We collaborate exclusively with trusted national and regional couriers to ensure quick and safe delivery to your doorstep.",
                highlight: "Reliable Delivery"
              },
              {
                icon: MapPin,
                title: "Delivery Timeline",
                description: "Estimated transit times typically range between 3–7 business days, depending on your location and courier availability.",
                highlight: "3-7 Days"
              },
              {
                icon: Bell,
                title: "Live Tracking",
                description: "Once your package is on its way, you'll receive an email or SMS with live tracking details so you can follow every stage of its journey.",
                highlight: "Real-Time Updates"
              },
              {
                icon: Shield,
                title: "Customer Support",
                description: "In the unlikely event of a delay or delivery concern, our customer care team will step in immediately to provide updates and prompt solutions.",
                highlight: "24/7 Support"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group flex gap-6 p-6 bg-[#0a0a0a] border border-[#9e734d]/20 rounded-xl hover:border-[#9e734d]/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center group-hover:bg-[#9e734d]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#9e734d]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <span className="text-xs font-bold text-[#9e734d] bg-[#9e734d]/10 px-3 py-1 rounded-full">
                        {item.highlight}
                      </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Closing Statement */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#9e734d]/10 to-[#9e734d]/5 border border-[#9e734d]/30 rounded-2xl p-8 md:p-12 mb-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#9e734d]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Package className="w-12 h-12 text-[#9e734d] mb-4" />
              <p className="text-gray-200 leading-relaxed text-lg italic">
                At <span className="text-[#9e734d] font-semibold not-italic">Caishen United</span>, every shipment is more than a parcel it is a promise delivered with care.
              </p>
            </div>
          </div>

          {/* Shipping Coverage Map */}
          <div className="bg-black border border-[#9e734d]/20 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-light text-white mb-6 text-center">
              Nationwide Coverage
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { region: "Metro Cities", time: "3-4 Days", icon: "🏙️" },
                { region: "Tier 2 Cities", time: "4-6 Days", icon: "🌆" },
                { region: "Remote Areas", time: "5-7 Days", icon: "🏞️" }
              ].map((area, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-[#0a0a0a] rounded-xl border border-[#9e734d]/10 hover:border-[#9e734d]/30 transition-colors"
                >
                  <div className="text-4xl mb-3">{area.icon}</div>
                  <h4 className="text-white font-medium mb-2">{area.region}</h4>
                  <p className="text-sm text-[#9e734d]">{area.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-light text-white mb-6">
              Have Questions About Your Delivery?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#9e734d] to-[#b8834f] text-black rounded-full font-semibold hover:shadow-[0_0_30px_rgba(158,115,77,0.5)] transition-all hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                Contact Support
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/return-policy"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#9e734d] text-white rounded-full hover:bg-[#9e734d]/10 transition-all"
              >
                View Return Policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-[#0a0a0a] border-t border-[#9e734d]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-center text-white mb-12">
            Shipping FAQs
          </h2>
          
          <div className="space-y-4">
            {[
              {
                question: "When will my order be shipped?",
                answer: "All confirmed orders are processed and shipped within 24-48 business hours. You'll receive a confirmation email once your order has been dispatched."
              },
              {
                question: "How can I track my order?",
                answer: "Once shipped, you'll receive an email or SMS with your tracking number and a link to track your package in real-time on the courier's website."
              },
              {
                question: "Do you ship to remote locations?",
                answer: "Yes! We ship across India, including remote areas. Delivery times may vary from 5-7 business days for such locations."
              },
              {
                question: "What if my order is delayed?",
                answer: "Our customer care team monitors all shipments. In case of any delay, we'll proactively contact you with updates and work with the courier to resolve the issue promptly."
              },
              {
                question: "Are there any shipping charges?",
                answer: "Shipping charges may vary based on your location and order value. Free shipping is often available for orders above a certain amount. Check your cart for exact details."
              },
              {
                question: "Can I change my delivery address after placing an order?",
                answer: "Please contact our support team immediately if you need to change your delivery address. We can accommodate changes if the order hasn't been dispatched yet."
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-black border border-[#9e734d]/20 rounded-xl overflow-hidden hover:border-[#9e734d]/50 transition-colors"
              >
                <summary className="px-6 py-4 cursor-pointer flex items-center justify-between text-white font-medium">
                  <span>{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-[#9e734d] transform group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-gray-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badge Section */}
      <section className="py-12 px-4 bg-black border-t border-[#9e734d]/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              { icon: CheckCircle, text: "Secure Packaging" },
              { icon: Truck, text: "Trusted Couriers" },
              { icon: Shield, text: "Insured Shipping" },
              { icon: Bell, text: "Real-Time Updates" }
            ].map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div key={i} className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-[#9e734d]" />
                  <span className="text-sm text-gray-400">{badge.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
