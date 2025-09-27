'use client';

import React from 'react';
import { FileText, Shield, Phone, Bell, Gift, Scale, AlertTriangle, Mail, MapPin, Crown } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-rose-50 py-16 px-4 sm:px-8 md:px-20 lg:px-40">
      <div className="max-w-5xl mx-auto bg-white p-8 lg:p-12 shadow-2xl rounded-2xl border border-gray-200">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-rose-200">
            <FileText className="w-4 h-4" />
            Legal Terms & Conditions
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            By choosing EDA Perfumes, you agree to these terms that govern your luxury fragrance shopping experience.
          </p>
        </div>

        <section className="space-y-8 text-base leading-7 text-gray-800">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl border border-rose-200">
            <p className="text-gray-700">
              This website is an exclusive online boutique owned and managed by <strong className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">EDA Perfumes</strong> (we, us, or Company). By accessing or using our luxury fragrance platform at{' '}
              <a href="https://www.edaperfumes.com" className="text-rose-600 hover:text-rose-700 font-semibold">
                www.edaperfumes.com
              </a>, you agree to be legally bound by the terms and conditions described in this User Agreement.
            </p>
          </div>

          <p className="text-gray-700">
            By purchasing our seductive fragrances or using our services, you confirm that you are at least 18 years of age and that you understand and agree to comply with these Terms. If you do not agree to any of the terms, we kindly ask that you discontinue use of our platform.
          </p>

          {/* Order Verification */}
          <div className="border-l-4 border-rose-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Phone className="w-6 h-6 text-rose-600" />
              Order Verification & Authentication
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                To ensure the authenticity of your luxury fragrance orders and prevent fraud, we may verify orders through phone calls, SMS, or WhatsApp messages. This verification process helps us confirm your purchase intent and delivery details, ensuring your exclusive fragrances reach you securely.
              </p>
            </div>
          </div>

          {/* Terms Amendment */}
          <div className="border-l-4 border-pink-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Shield className="w-6 h-6 text-pink-600" />
              Amendments to Terms
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                EDA Perfumes reserves the right to modify, update, or enhance these terms as we introduce new fragrances, services, or features. We may update these terms without prior notice, and we encourage you to review this page periodically to stay informed about any changes to our luxury service terms.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Mail className="w-6 h-6 text-purple-600" />
              Contact & Customer Support
            </h2>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
              <p className="text-gray-700 mb-4">
                For any questions, feedback, or concerns related to these Terms, your fragrance orders, or our luxury services, please contact our dedicated customer care team:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Mail className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email:</p>
                    <a href="mailto:care@edaperfumes.com" className="text-purple-600 hover:text-purple-700">
                      care@edaperfumes.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MapPin className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Address:</p>
                    <p className="text-gray-600">
                      D5/204, Chintpurni House, Central Market,<br />
                      Prashant Vihar, New Delhi - 110085, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DND Compliance */}
          <div className="border-l-4 border-rose-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Bell className="w-6 h-6 text-rose-600" />
              Communication Consent & DND Override
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                By providing your phone number and placing orders with EDA Perfumes, you authorize us to override the Do-Not-Disturb (DND) registry. Even if your number is registered under the National Consumer Preference Register (NCPR/NDNC), you voluntarily consent to receive messages, calls, and notifications from us regarding:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
                <li>Order confirmations and delivery updates</li>
                <li>Exclusive fragrance launches and luxury offers</li>
                <li>Personalized scent recommendations</li>
                <li>Customer service and support communications</li>
              </ul>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="border-l-4 border-pink-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Gift className="w-6 h-6 text-pink-600" />
              Satisfaction & Quality Assurance
            </h2>
            <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
              <p className="text-gray-700">
                At EDA Perfumes, we stand behind the quality and longevity of our luxury fragrances. If you are not completely satisfied with the performance, longevity, or scent profile of your fragrance within 30 days of purchase, please contact our customer care team. We are committed to ensuring your complete satisfaction with your signature scent experience.
              </p>
            </div>
          </div>

          {/* Jurisdiction */}
          <div className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Scale className="w-6 h-6 text-purple-600" />
              Jurisdiction & Governing Law
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                These Terms and any separate agreements through which EDA Perfumes provides luxury fragrance services shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from your use of our services or purchase of our products shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
              </p>
            </div>
          </div>

          {/* Product Disclaimers */}
          <div className="border-l-4 border-rose-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
              Product Information & Disclaimers
            </h2>
            <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Our fragrances are cosmetic products intended for external use only</li>
                <li>Individual scent perception and longevity may vary based on skin type, environment, and personal chemistry</li>
                <li>We recommend performing a patch test before full application, especially for sensitive skin</li>
                <li>Fragrance performance may be affected by weather, skin moisture, and other environmental factors</li>
                <li>All product descriptions, scent notes, and longevity claims are based on average user experiences</li>
                <li>Users with known allergies to specific fragrance ingredients should review product compositions carefully</li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="border-l-4 border-pink-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Crown className="w-6 h-6 text-pink-600" />
              Intellectual Property & Brand Protection
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                All content on this website, including but not limited to fragrance names, product descriptions, images, branding, and marketing materials, are the exclusive property of EDA Perfumes. Unauthorized reproduction, distribution, or use of our intellectual property is strictly prohibited and may result in legal action.
              </p>
            </div>
          </div>

          {/* Privacy & Data */}
          <div className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-600" />
              Privacy & Data Protection
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                Your privacy is as important to us as the quality of our fragrances. Please review our comprehensive{' '}
                <a href="/privacy-policy" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Privacy Policy
                </a>{' '}
                to understand how we collect, use, and protect your personal information in accordance with the highest standards of data security.
              </p>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 p-8 rounded-2xl text-center text-white shadow-xl">
            <Crown className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Luxury Comes with Responsibility</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              These terms ensure that your experience with EDA Perfumes remains as sophisticated and seamless as the fragrances we create. By agreeing to these terms, you join our exclusive community of those who appreciate true luxury.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
