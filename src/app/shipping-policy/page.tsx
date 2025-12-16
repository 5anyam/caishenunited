'use client';
import { Truck, Clock, MapPin, Bell, Shield, Package, ChevronRight, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ShippingPolicy() {
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
            <Truck className="w-4 h-4 text-[#D4A574]" />
            <span className="text-sm text-[#5D4E37] font-medium">Fast & Secure Delivery</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light text-[#5D4E37] mb-6">
            Shipping Policy
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Timely, secure, and transparent delivery every step of the way.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-gradient-to-br from-[#FFF8DC] to-[#FFFBF0] border border-[#D4A574]/20 rounded-2xl p-8 md:p-12 mb-12 shadow-sm">
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              At <span className="text-[#D4A574] font-semibold">Vyadhihar Foods</span>, we understand that a seamless shopping experience extends beyond your purchase—it is about timely, secure, and transparent delivery every step of the way.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
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
                  className="group flex gap-6 p-6 bg-white border border-[#D4A574]/20 rounded-xl hover:border-[#D4A574]/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#D4A574]/10 rounded-full flex items-center justify-center group-hover:bg-[#D4A574]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#D4A574]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-[#5D4E37]">
                        {item.title}
                      </h3>
                      <span className="text-xs font-bold text-[#D4A574] bg-[#D4A574]/10 px-3 py-1 rounded-full">
                        {item.highlight}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Closing Statement */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#D4A574]/10 to-[#D4A574]/5 border border-[#D4A574]/30 rounded-2xl p-8 md:p-12 mb-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A574]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Package className="w-12 h-12 text-[#D4A574] mb-4" />
              <p className="text-gray-700 leading-relaxed text-lg italic">
                At <span className="text-[#D4A574] font-semibold not-italic">Vyadhihar Foods</span>, every shipment is more than a parcel—it is a promise delivered with care.
              </p>
            </div>
          </div>

          {/* Shipping Coverage Map */}
          <div className="bg-[#FFF8DC] border border-[#D4A574]/20 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-light text-[#5D4E37] mb-6 text-center">
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
                  className="text-center p-6 bg-white rounded-xl border border-[#D4A574]/20 hover:border-[#D4A574]/40 hover:shadow-md transition-all"
                >
                  <div className="text-4xl mb-3">{area.icon}</div>
                  <h4 className="text-[#5D4E37] font-medium mb-2">{area.region}</h4>
                  <p className="text-sm text-[#D4A574] font-semibold">{area.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-light text-[#5D4E37] mb-6">
              Have Questions About Your Delivery?
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
                href="/return-policy"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#D4A574] text-[#5D4E37] rounded-full hover:bg-[#D4A574]/10 transition-all"
              >
                View Return Policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-[#FFF8DC] border-t border-[#D4A574]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-center text-[#5D4E37] mb-12">
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

      {/* Trust Badge Section */}
      <section className="py-12 px-4 bg-white border-t border-[#D4A574]/20">
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
                  <Icon className="w-5 h-5 text-[#D4A574]" />
                  <span className="text-sm text-gray-600">{badge.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
