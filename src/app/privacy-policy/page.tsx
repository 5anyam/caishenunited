'use client';

import React from 'react';
import { Shield, Heart, Lock, Eye, UserCheck, FileText, Mail, MapPin } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-rose-50 py-16 px-4 sm:px-8 md:px-20 lg:px-40">
      <div className="max-w-5xl mx-auto bg-white p-8 lg:p-12 shadow-2xl rounded-2xl border border-gray-200">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-rose-200">
            <Shield className="w-4 h-4" />
            Your Privacy Matters
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-2">Effective Date: 27th September 2025</p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At EDA Perfumes, we understand that trust is as precious as the fragrances you choose. This policy outlines how we protect your personal information.
          </p>
        </div>

        <section className="space-y-8 text-base leading-7">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl border border-rose-200">
            <p className="text-gray-700">
              EDA Perfumes (Company, we, our, or us) is committed to protecting your privacy as you explore our collection of seductive fragrances. This Privacy Policy (Policy) outlines how we collect, use, disclose, and safeguard your Personal Information through our platform at{' '}
              <a href="https://www.edaperfumes.com" className="text-rose-600 hover:text-rose-700 font-semibold">
                www.edaperfumes.com
              </a>{' '}
              (the Platform).
            </p>
          </div>

          <p className="text-gray-700">
            We at <strong className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">EDA PERFUMES</strong> craft seductive fragrances for those who dare to make a statement. As part of our commitment to your sophisticated lifestyle, we take your data privacy as seriously as we take the art of perfumery.
          </p>

          <p className="text-gray-700">
            By accessing or using our Platform, purchasing our luxury fragrances, or engaging with our brand, you agree to the terms of this Privacy Policy and consent to the practices described herein.
          </p>

          {/* Section 1 */}
          <div className="border-l-4 border-rose-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-rose-600" />
              1. Personal Information We Collect
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Name, contact details (email, phone), shipping & billing address</li>
                <li>Date of birth, gender, fragrance preferences</li>
                <li>Purchase history, favorite scents, and luxury product preferences</li>
                <li>Payment information (securely processed via trusted payment partners)</li>
                <li>Device information, IP address, cookies, browsing behavior</li>
                <li>Fragrance preferences and scent profiles (if voluntarily provided)</li>
                <li>Reviews, testimonials, and social media interactions</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="border-l-4 border-pink-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Eye className="w-6 h-6 text-pink-600" />
              2. How We Collect Information
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>When you purchase our luxury fragrances or create an account</li>
                <li>Through fragrance consultations, newsletter signups, or feedback surveys</li>
                <li>Via cookies and analytics tools to enhance your shopping experience</li>
                <li>From trusted partners like payment gateways and premium delivery services</li>
                <li>Social media platforms and influencer collaborations</li>
                <li>Customer service interactions and support requests</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Heart className="w-6 h-6 text-purple-600" />
              3. Purpose of Use
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Process and deliver your luxury fragrance orders with premium packaging</li>
                <li>Provide personalized fragrance recommendations based on your preferences</li>
                <li>Offer exceptional customer support and respond to your inquiries</li>
                <li>Send exclusive offers, new product launches, and fragrance tips</li>
                <li>Improve our website performance and curate your shopping experience</li>
                <li>Prevent fraud and ensure secure, luxury shopping experiences</li>
                <li>Create personalized scent profiles for future purchases</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="border-l-4 border-rose-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Shield className="w-6 h-6 text-rose-600" />
              4. Sharing of Personal Information
            </h2>
            <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
              <p className="text-gray-700">
                We may share your data with trusted luxury service providers, premium analytics partners, and legal authorities (if required by law). We <strong className="text-rose-600">never sell</strong> your personal information to third parties. Your privacy is as exclusive as our fragrances.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="border-l-4 border-pink-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <FileText className="w-6 h-6 text-pink-600" />
              5. Cookies and Tracking Technologies
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                We use cookies to remember your fragrance preferences, analyze shopping patterns, and enhance your luxury shopping experience. You can manage cookies through your browser settings, though this may affect certain features of our sophisticated platform.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Lock className="w-6 h-6 text-purple-600" />
              6. Data Security
            </h2>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-gray-700">
                We implement state-of-the-art encryption, premium firewalls, and secure servers to protect your personal information with the same care we put into crafting our fragrances. However, no online transmission is completely secure, and we continuously upgrade our security measures.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="border-l-4 border-rose-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-rose-600" />
              7. Your Rights and Choices
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Request access to or correction of your personal data</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Request deletion of your personal information</li>
                <li>Update your fragrance preferences and scent profile</li>
                <li>Opt-out of personalized recommendations (though we had miss helping you find your perfect scent!)</li>
              </ul>
            </div>
          </div>

          {/* Section 8 */}
          <div className="border-l-4 border-pink-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Shield className="w-6 h-6 text-pink-600" />
              8. Age Restrictions
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                Our luxury fragrances and services are intended for individuals 18 years of age or older. We do not knowingly collect personal information from minors under 18.
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-600" />
              9. Policy Updates
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                We may update this Privacy Policy as we introduce new fragrances, features, or services. Updates will be reflected with a revised effective date. We will notify you of significant changes through email or prominent notices on our platform.
              </p>
            </div>
          </div>

          {/* Section 10 */}
          <div className="border-l-4 border-rose-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Mail className="w-6 h-6 text-rose-600" />
              10. Contact & Customer Care
            </h2>
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-lg border border-rose-200">
              <p className="text-gray-700 mb-4">
                For any privacy-related questions or concerns about your personal information, please contact our dedicated customer care team:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-100 rounded-lg">
                    <UserCheck className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Privacy Officer:</p>
                    <p className="text-gray-600">EDA Perfumes Customer Care Team</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-100 rounded-lg">
                    <Mail className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email:</p>
                    <a href="mailto:care@edaperfumes.com" className="text-rose-600 hover:text-rose-700">
                      care@edaperfumes.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-rose-100 rounded-lg">
                    <MapPin className="w-4 h-4 text-rose-600" />
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

          {/* Closing Statement */}
          <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 p-8 rounded-2xl text-center text-white shadow-xl">
            <Heart className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold mb-2">Your Trust, Our Promise</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Just as we carefully craft each fragrance to capture desire and sophistication, we meticulously protect your personal information with the highest standards of privacy and security.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
