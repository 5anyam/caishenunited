'use client';
import { Scale, Truck, Lock, Gavel, RefreshCw, ChevronRight, Mail, Phone, Bell, Crown, MapPin, Smartphone, Shield } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#9e734d]/10 border border-[#9e734d]/30 rounded-full mb-6">
            <Scale className="w-4 h-4 text-[#9e734d]" />
            <span className="text-sm text-[#9e734d] font-medium">Legal Agreement</span>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <Crown className="w-8 h-8 text-[#9e734d] mr-2" />
            <h1 className="text-4xl md:text-6xl font-light text-gray-900">
              Terms & Conditions
            </h1>
          </div>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Welcome to Caishen United, where every accessory is crafted to complement your device and your lifestyle.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Introduction */}
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 md:p-12 mb-12">
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              By engaging with our website at{' '}
              <a href="https://www.caishenunited.com" className="text-[#9e734d] hover:text-[#8a6342] font-medium underline">
                www.caishenunited.com
              </a>{' '}
              or making a purchase, you acknowledge, understand, and accept the terms and conditions that govern your use of our services.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8 mb-12">
            
            {/* Product Information */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Descriptions & Pricing</h2>
                  <p className="text-gray-600 leading-relaxed">
                    All product descriptions, images, and prices are subject to change without notice. We strive to provide accurate information, but specifications may vary slightly based on manufacturer updates or stock availability.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment & Order Processing</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Payments are required to be successfully completed prior to order verification and dispatch, except for orders placed under the approved Cash on Delivery (COD) option. We accept various secure payment methods to ensure your convenience.
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping & Delivery */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping & Delivery</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We are not responsible for delays caused by courier services or incorrect shipping details provided by customers. Please ensure your delivery address is accurate and complete at the time of checkout.
                  </p>
                </div>
              </div>
            </div>

            {/* Returns & Quality Assurance - UPDATED */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Returns & Quality Assurance (7-Day Policy)</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Returns and replacements apply strictly to items verified as defective or damaged due to manufacturing faults, reported within <span className="font-semibold text-[#9e734d]">7 days of delivery</span> with valid proof or documented evidence.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Manufacturing defects must be reported within 7 days with photographic evidence</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Product must be unused and in original packaging with all accessories</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Damage during shipping must be reported immediately upon delivery</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Returns due to incorrect product selection or buyer remorse are not accepted</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Warranty Policy */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Warranty & Replacement Policy</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Warranty-related concerns, where applicable, will be processed solely as per the official Warranty & Replacement Policy and under the terms and limitations stated therein. Please refer to our detailed warranty documentation for specific coverage details.
                  </p>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property Rights</h2>
                  <p className="text-gray-600 leading-relaxed">
                    All creative assets, including brand logos, product visuals, digital content, and layout designs, are the intellectual property of Caishen United or their rightful owners. Any unauthorized use, reproduction, or distribution constitutes a legal violation and may invite immediate legal proceedings.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms Updates */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Amendments to Terms</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to update these terms anytime without prior notice. Continued use of our website or services after such modifications constitutes acceptance of the updated terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Verification */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Verification & Authentication</h2>
                  <p className="text-gray-600 leading-relaxed">
                    To ensure authenticity and prevent fraud, we may verify orders through phone calls, SMS, or WhatsApp messages. This verification process helps us confirm your purchase intent and delivery details.
                  </p>
                </div>
              </div>
            </div>

            {/* DND Compliance */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Communication Consent & DND Override</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    By providing your phone number and placing orders, you authorize us to override the Do-Not-Disturb (DND) registry for communications regarding:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Order confirmations and delivery updates</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Exclusive product launches and offers</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Customer service communications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information - UPDATED */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact & Customer Support</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    For questions or concerns related to these Terms:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="p-2 bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-lg">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email:</p>
                        <a href="mailto:support@caishenunited.com" className="text-[#9e734d] hover:text-[#8a6342] font-medium">
                          support@caishenunited.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="p-2 bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-lg">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Phone:</p>
                        <a href="tel:+919911636888" className="text-[#9e734d] hover:text-[#8a6342] font-medium">
                          +91 9911636888
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="p-2 bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-lg">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Address:</p>
                        <p className="text-gray-600 leading-relaxed">
                          Caishen United<br />
                          Sector 15, Rohini<br />
                          New Delhi, Delhi 110085<br />
                          India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Jurisdiction */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Gavel className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Jurisdiction & Governing Law</h2>
                  <p className="text-gray-600 leading-relaxed">
                    These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-2xl p-8 md:p-12 text-center mb-12">
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Crown className="w-10 h-10 text-white" />
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">
                By using this website, you acknowledge that you have read, understood, and agreed to these terms.
              </h3>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Questions About Our Terms?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#9e734d] to-[#8a6342] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Mail className="w-5 h-5" />
                Contact Support
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#9e734d] text-gray-900 rounded-lg hover:bg-gray-50 transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Policies */}
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-center text-gray-900 mb-12">
            Related Policies
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Return & Refund Policy",
                description: "Learn about our hassle-free return process and refund guidelines",
                link: "/returns-and-refunds-policy",
                icon: RefreshCw
              },
              {
                title: "Shipping Policy",
                description: "Understand our delivery timelines and shipping procedures",
                link: "/shipping-policy",
                icon: Truck
              }
            ].map((policy, index) => {
              const Icon = policy.icon;
              return (
                <Link
                  key={index}
                  href={policy.link}
                  className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-[#9e734d]/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center group-hover:bg-[#9e734d]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#9e734d]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#9e734d] transition-colors">
                        {policy.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {policy.description}
                      </p>
                      <div className="flex items-center gap-2 text-[#9e734d] text-sm font-medium">
                        Read More
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
