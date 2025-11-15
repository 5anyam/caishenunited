'use client';
import { Scale, Truck, AlertTriangle, Lock, Gavel, RefreshCw, ChevronRight, Mail, Phone, Bell, Gift, Crown, MapPin, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
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

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#9e734d]/10 border border-[#9e734d]/30 rounded-full mb-6">
            <Scale className="w-4 h-4 text-[#9e734d]" />
            <span className="text-sm text-[#9e734d] font-medium">Legal Agreement</span>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <Crown className="w-8 h-8 text-[#9e734d] mr-2" />
            <h1 className="text-4xl md:text-6xl font-light text-white">
              Terms & Conditions
            </h1>
          </div>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            By choosing Caishen United, you agree to these terms that govern your premium phone case and accessory shopping experience.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Introduction */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#9e734d]/20 rounded-2xl p-8 md:p-12 mb-12">
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              This website is an exclusive online store owned and managed by <span className="text-[#9e734d] font-semibold">Caishen United</span> (we, us, or Company). By accessing or using our premium phone case and accessory platform at{' '}
              <a href="https://www.caishenunited.com" className="text-[#9e734d] hover:text-[#8a6342] font-medium underline">
                www.caishenunited.com
              </a>, you agree to be legally bound by the terms and conditions described in this User Agreement.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              By purchasing our phone cases or accessories or using our services, you confirm that you are at least 18 years of age and that you understand and agree to comply with these Terms. If you do not agree to any of the terms, we kindly ask that you discontinue use of our platform.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8 mb-12">
            {/* Order Verification */}
            <div className="bg-[#0a0a0a] border border-[#9e734d]/20 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-4">Order Verification & Authentication</h2>
                  <p className="text-gray-400 leading-relaxed">
                    To ensure the authenticity of your premium accessory orders and prevent fraud, we may verify orders through phone calls, SMS, or WhatsApp messages. This verification process helps us confirm your purchase intent and delivery details, ensuring your phone cases and accessories reach you securely.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms Amendment */}
            <div className="bg-[#0a0a0a] border border-[#9e734d]/20 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-4">Amendments to Terms</h2>
                  <p className="text-gray-400 leading-relaxed">
                    Caishen United reserves the right to modify, update, or enhance these terms as we introduce new accessories, services, or features. We may update these terms without prior notice, and we encourage you to review this page periodically to stay informed about any changes to our premium service terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-[#0a0a0a] border border-[#9e734d]/20 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-4">Contact & Customer Support</h2>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    For any questions, feedback, or concerns related to these Terms, your accessory orders, or our premium services, please contact our dedicated customer care team:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-[#1a1a1a] p-4 rounded-lg border border-[#9e734d]/10">
                      <div className="p-2 bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-lg">
                        <Mail className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email:</p>
                        <a href="mailto:support@caishenunited.com" className="text-[#9e734d] hover:text-[#8a6342] font-medium">
                          support@caishenunited.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-[#1a1a1a] p-4 rounded-lg border border-[#9e734d]/10">
                      <div className="p-2 bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-lg">
                        <Phone className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Phone:</p>
                        <a href="tel:+919818400981" className="text-[#9e734d] hover:text-[#8a6342] font-medium">
                          +91 98184 00981
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 bg-[#1a1a1a] p-4 rounded-lg border border-[#9e734d]/10">
                      <div className="p-2 bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-lg">
                        <MapPin className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Address:</p>
                        <p className="text-gray-400 leading-relaxed">
                          [Your Business Address]<br />
                          [City, State - PIN Code], India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DND Compliance */}
            <div className="bg-[#0a0a0a] border border-[#9e734d]/20 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-4">Communication Consent & DND Override</h2>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    By providing your phone number and placing orders with Caishen United, you authorize us to override the Do-Not-Disturb (DND) registry. Even if your number is registered under the National Consumer Preference Register (NCPR/NDNC), you voluntarily consent to receive messages, calls, and notifications from us regarding:
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Order confirmations and delivery updates</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Exclusive accessory launches and premium offers</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Personalized product recommendations</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Customer service and support communications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Customer Satisfaction */}
            <div className="bg-[#0a0a0a] border border-[#9e734d]/20 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-4">Satisfaction & Quality Assurance</h2>
                  <p className="text-gray-400 leading-relaxed">
                    At Caishen United, we stand behind the quality and durability of our premium phone cases and accessories. If you are not completely satisfied with the performance, fit, or protection level of your product within 30 days of purchase, please contact our customer care team. We are committed to ensuring your complete satisfaction with your device protection experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Jurisdiction */}
            <div className="bg-[#0a0a0a] border border-[#9e734d]/20 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Gavel className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-4">Jurisdiction & Governing Law</h2>
                  <p className="text-gray-400 leading-relaxed">
                    These Terms and any separate agreements through which Caishen United provides premium accessory services shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from your use of our services or purchase of our products shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
                  </p>
                </div>
              </div>
            </div>

            {/* Product Disclaimers */}
            <div className="bg-[#0a0a0a] border border-[#9e734d]/20 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-4">Product Information & Disclaimers</h2>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Our phone cases and accessories are designed for protection and style but are not guaranteed against all forms of damage or impact</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Compatibility and fit may vary slightly based on device models, cases, or manufacturer tolerances</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>We recommend verifying device compatibility before purchase; improper fit is not covered under warranty</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Product performance may be affected by usage conditions, cleaning methods, or environmental factors</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>All product descriptions, dimensions, and protection claims are based on standard testing conditions</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Users with specific device modifications should ensure compatibility before installation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="bg-[#0a0a0a] border border-[#9e734d]/20 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property & Brand Protection</h2>
                  <p className="text-gray-400 leading-relaxed">
                    All content on this website, including but not limited to product names, descriptions, images, branding, and marketing materials, are the exclusive property of Caishen United. Unauthorized reproduction, distribution, or use of our intellectual property is strictly prohibited and may result in legal action.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy & Data */}
            <div className="bg-[#0a0a0a] border border-[#9e734d]/20 rounded-xl p-8 hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-4">Privacy & Data Protection</h2>
                  <p className="text-gray-400 leading-relaxed">
                    Your privacy is as important to us as the quality of our accessories. Please review our comprehensive{' '}
                    <Link href="/privacy-policy" className="text-[#9e734d] hover:text-[#8a6342] font-medium underline">
                      Privacy Policy
                    </Link>{' '}
                    to understand how we collect, use, and protect your personal information in accordance with the highest standards of data security.
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
                Premium Protection Comes with Responsibility
              </h3>
              <p className="text-white/90 leading-relaxed max-w-2xl mx-auto">
                These terms ensure that your experience with Caishen United remains as seamless and protective as the phone cases we create. By agreeing to these terms, you join our community of those who value quality protection.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-light text-white mb-6">
              Questions About Our Terms?
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
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#9e734d] text-white rounded-full hover:bg-[#9e734d]/10 transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Policies */}
      <section className="py-16 px-4 bg-[#0a0a0a] border-t border-[#9e734d]/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-center text-white mb-12">
            Related Policies
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Return & Refund Policy",
                description: "Learn about our hassle-free return process and refund guidelines",
                link: "/return-policy",
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
                  className="group p-6 bg-black border border-[#9e734d]/20 rounded-xl hover:border-[#9e734d]/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#9e734d]/10 rounded-full flex items-center justify-center group-hover:bg-[#9e734d]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#9e734d]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#9e734d] transition-colors">
                        {policy.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">
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
