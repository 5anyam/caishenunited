'use client';

import React from 'react';
import { FileText, Shield, Phone, Bell, Gift, Scale, AlertTriangle, Mail, MapPin, Crown, Smartphone } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white dark:bg-black py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-black p-6 lg:p-8 shadow-xl rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9e734d]/10 to-[#8a6342]/10 text-[#9e734d] px-4 py-2 rounded-full text-sm font-medium mb-4 border border-[#9e734d]/20">
            <FileText className="w-4 h-4" />
            Legal Terms & Conditions
          </div>
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-[#9e734d] mr-2" />
            <h1 className="text-3xl lg:text-4xl font-light text-gray-900 dark:text-white tracking-tight">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            By choosing Caishen United, you agree to these terms that govern your premium phone case and accessory shopping experience.
          </p>
        </div>

        <section className="space-y-8 text-sm leading-7 text-gray-700 dark:text-gray-300">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-[#F5E6D3]/10 to-[#9e734d]/5 dark:from-[#9e734d]/5 dark:to-transparent p-6 rounded-xl border border-[#9e734d]/20">
            <p className="font-light">
              This website is an exclusive online store owned and managed by <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#9e734d] to-[#8a6342]">Caishen United</span> (we, us, or Company). By accessing or using our premium phone case and accessory platform at{' '}
              <a href="https://www.caishenunited.com" className="text-[#9e734d] hover:text-[#8a6342] font-medium underline dark:text-[#9e734d]/80">
                www.caishenunited.com
              </a>, you agree to be legally bound by the terms and conditions described in this User Agreement.
            </p>
          </div>

          <p className="font-light">
            By purchasing our phone cases or accessories or using our services, you confirm that you are at least 18 years of age and that you understand and agree to comply with these Terms. If you do not agree to any of the terms, we kindly ask that you discontinue use of our platform.
          </p>

          {/* Order Verification */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#9e734d]" />
              Order Verification & Authentication
            </h2>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
              <p className="font-light text-gray-600 dark:text-gray-400">
                To ensure the authenticity of your premium accessory orders and prevent fraud, we may verify orders through phone calls, SMS, or WhatsApp messages. This verification process helps us confirm your purchase intent and delivery details, ensuring your phone cases and accessories reach you securely.
              </p>
            </div>
          </div>

          {/* Terms Amendment */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#8a6342]" />
              Amendments to Terms
            </h2>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
              <p className="font-light text-gray-600 dark:text-gray-400">
                Caishen United reserves the right to modify, update, or enhance these terms as we introduce new accessories, services, or features. We may update these terms without prior notice, and we encourage you to review this page periodically to stay informed about any changes to our premium service terms.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#9e734d]" />
              Contact & Customer Support
            </h2>
            <div className="bg-gradient-to-r from-[#F5E6D3]/10 to-[#9e734d]/5 dark:from-[#9e734d]/5 dark:to-transparent p-6 rounded-lg border border-[#9e734d]/20">
              <p className="font-light text-gray-600 dark:text-gray-400 mb-4">
                For any questions, feedback, or concerns related to these Terms, your accessory orders, or our premium services, please contact our dedicated customer care team:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-lg text-white">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email:</p>
                    <a href="mailto:support@caishenunited.com" className="text-[#9e734d] hover:text-[#8a6342] font-medium">
                      support@caishenunited.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-lg text-white">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Phone:</p>
                    <a href="tel:+919818400981" className="text-[#9e734d] hover:text-[#8a6342] font-medium">
                      +91 98184 00981
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-lg text-white">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Address:</p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      [Your Business Address]<br />
                      [City, State - PIN Code], India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DND Compliance */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#8a6342]" />
              Communication Consent & DND Override
            </h2>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
              <p className="font-light text-gray-600 dark:text-gray-400">
                By providing your phone number and placing orders with Caishen United, you authorize us to override the Do-Not-Disturb (DND) registry. Even if your number is registered under the National Consumer Preference Register (NCPR/NDNC), you voluntarily consent to receive messages, calls, and notifications from us regarding:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-600 dark:text-gray-400 font-light">
                <li>Order confirmations and delivery updates</li>
                <li>Exclusive accessory launches and premium offers</li>
                <li>Personalized product recommendations</li>
                <li>Customer service and support communications</li>
              </ul>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#9e734d]" />
              Satisfaction & Quality Assurance
            </h2>
            <div className="bg-gradient-to-r from-[#F5E6D3]/10 to-[#9e734d]/5 dark:from-[#9e734d]/5 dark:to-transparent p-4 rounded-lg border border-[#9e734d]/20">
              <p className="font-light text-gray-600 dark:text-gray-400">
                At Caishen United, we stand behind the quality and durability of our premium phone cases and accessories. If you are not completely satisfied with the performance, fit, or protection level of your product within 30 days of purchase, please contact our customer care team. We are committed to ensuring your complete satisfaction with your device protection experience.
              </p>
            </div>
          </div>

          {/* Jurisdiction */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#8a6342]" />
              Jurisdiction & Governing Law
            </h2>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
              <p className="font-light text-gray-600 dark:text-gray-400">
                These Terms and any separate agreements through which Caishen United provides premium accessory services shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from your use of our services or purchase of our products shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
              </p>
            </div>
          </div>

          {/* Product Disclaimers */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#9e734d]" />
              Product Information & Disclaimers
            </h2>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 font-light">
                <li>Our phone cases and accessories are designed for protection and style but are not guaranteed against all forms of damage or impact</li>
                <li>Compatibility and fit may vary slightly based on device models, cases, or manufacturer tolerances</li>
                <li>We recommend verifying device compatibility before purchase; improper fit is not covered under warranty</li>
                <li>Product performance may be affected by usage conditions, cleaning methods, or environmental factors</li>
                <li>All product descriptions, dimensions, and protection claims are based on standard testing conditions</li>
                <li>Users with specific device modifications should ensure compatibility before installation</li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-[#8a6342]" />
              Intellectual Property & Brand Protection
            </h2>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
              <p className="font-light text-gray-600 dark:text-gray-400">
                All content on this website, including but not limited to product names, descriptions, images, branding, and marketing materials, are the exclusive property of Caishen United. Unauthorized reproduction, distribution, or use of our intellectual property is strictly prohibited and may result in legal action.
              </p>
            </div>
          </div>

          {/* Privacy & Data */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#9e734d]" />
              Privacy & Data Protection
            </h2>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
              <p className="font-light text-gray-600 dark:text-gray-400">
                Your privacy is as important to us as the quality of our accessories. Please review our comprehensive{' '}
                <a href="/privacy-policy" className="text-[#9e734d] hover:text-[#8a6342] font-medium underline dark:text-[#9e734d]/80">
                  Privacy Policy
                </a>{' '}
                to understand how we collect, use, and protect your personal information in accordance with the highest standards of data security.
              </p>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="bg-gradient-to-r from-[#9e734d] to-[#8a6342] p-8 rounded-xl text-center text-white shadow-lg mt-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-10 h-10" />
              <Smartphone className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-light mb-2">Premium Protection Comes with Responsibility</h3>
            <p className="text-base opacity-90 max-w-2xl mx-auto leading-relaxed">
              These terms ensure that your experience with Caishen United remains as seamless and protective as the phone cases we create. By agreeing to these terms, you join our community of those who value quality protection.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
