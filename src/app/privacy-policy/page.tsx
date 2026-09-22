'use client';

import React from 'react';
import { Shield, Lock, Eye, UserCheck, FileText, Mail, MapPin, Crown, Smartphone, Phone } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Force white background - no dark mode */}
      <div className="bg-white fixed inset-0 z-[-1]"></div>
      
      <div className="max-w-4xl mx-auto bg-white p-6 lg:p-8 rounded-lg shadow-xl border border-gray-200 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9e734d]/10 to-[#8a6342]/10 text-[#9e734d] px-4 py-2 rounded-full text-sm font-medium mb-4 border border-[#9e734d]/20">
            <Shield className="w-4 h-4" />
            Your Privacy Matters
          </div>
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-[#9e734d] mr-2" />
            <h1 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
              Privacy Policy
            </h1>
          </div>
          <p className="text-sm text-gray-500 mb-2">Effective Date: November 14, 2025</p>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            At Caishen United, we are committed to protecting your personal information with the same care we put into crafting premium phone cases and mobile accessories for your devices.
          </p>
        </div>

        <section className="space-y-8 text-sm leading-7 text-gray-700">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-[#F5E6D3]/10 to-[#9e734d]/5 p-6 rounded-xl border border-[#9e734d]/20 bg-white">
            <p className="font-light">
              Caishen United (Company, we, our, or us) is committed to protecting your privacy as you explore our collection of premium phone cases and mobile accessories. This Privacy Policy (Policy) outlines how we collect, use, disclose, and safeguard your Personal Information through our platform at{' '}
              <a href="https://www.caishenunited.com" className="text-[#9e734d] hover:text-[#8a6342] font-medium underline">
                [www.caishenunited.com](https://www.caishenunited.com)
              </a>{' '}
              (the Platform).
            </p>
          </div>

          <p className="font-light bg-white">
            We at <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#9e734d] to-[#8a6342]">Caishen United</span> craft premium phone cases and mobile accessories designed for style, protection, and durability. As part of our commitment to delivering quality products, we take your data privacy seriously and handle your information with the highest standards of security.
          </p>

          <p className="font-light bg-white">
            By accessing or using our Platform, purchasing our products, or engaging with our services, you agree to the terms of this Privacy Policy and consent to the practices described herein.
          </p>

          {/* Section 1 */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#9e734d]" />
              1. Personal Information We Collect
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 font-light">
                <li>Name, contact details (email, phone number), shipping & billing address</li>
                <li>Device model, phone brand, and case preferences (color, design, material)</li>
                <li>Purchase history, favorite products, and accessory preferences</li>
                <li>Payment information (securely processed via trusted payment gateways)</li>
                <li>Device information, IP address, cookies, and browsing behavior</li>
                <li>Product reviews, ratings, testimonials, and feedback</li>
                <li>Social media interactions and customer support communications</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#8a6342]" />
              2. How We Collect Information
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 font-light">
                <li>When you purchase phone cases, screen protectors, or accessories from our store</li>
                <li>During account creation, newsletter signups, or product wishlist additions</li>
                <li>Through product reviews, customer surveys, and feedback forms</li>
                <li>Via cookies and analytics tools to enhance your shopping experience</li>
                <li>From trusted partners like payment processors and delivery service providers</li>
                <li>Social media platforms and marketing collaborations</li>
                <li>Customer service interactions, warranty claims, and return requests</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#9e734d]" />
              3. Purpose of Use
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 font-light">
                <li>Process and deliver your orders with secure packaging and tracking</li>
                <li>Provide personalized product recommendations based on your device model and preferences</li>
                <li>Offer exceptional customer support for orders, returns, and warranty claims</li>
                <li>Send exclusive offers, new product launches, and accessory collections</li>
                <li>Improve our website performance and create a seamless shopping experience</li>
                <li>Prevent fraud and ensure secure transactions on our platform</li>
                <li>Analyze shopping trends to bring you better products and designs</li>
                <li>Send order updates, shipment notifications, and delivery confirmations</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#8a6342]" />
              4. Sharing of Personal Information
            </h2>
            <div className="bg-gradient-to-r from-[#F5E6D3]/10 to-[#9e734d]/5 p-4 rounded-lg border border-[#9e734d]/20 bg-white">
              <p className="font-light">
                We may share your data with trusted service providers including payment processors, logistics partners, and analytics platforms. We comply with legal requirements when necessary. We <span className="font-medium text-[#9e734d]">never sell</span> your personal information to third parties. Your privacy is as important to us as the quality of our products.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#9e734d]" />
              5. Cookies and Tracking Technologies
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="font-light text-gray-600">
                We use cookies to remember your device preferences, analyze shopping patterns, and provide you with relevant product recommendations. You can manage cookies through your browser settings, though this may affect certain features of our platform like saved carts and wishlists.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#8a6342]" />
              6. Data Security
            </h2>
            <div className="bg-gradient-to-r from-[#F5E6D3]/5 to-[#9e734d]/5 p-4 rounded-lg border border-[#9e734d]/20 bg-white">
              <p className="font-light text-gray-600">
                We implement military-grade encryption, secure payment gateways (SSL certified), and advanced firewalls to protect your personal and payment information. Just like our phone cases protect your device, we protect your data with premium security measures. We regularly update our security protocols to stay ahead of potential threats.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#9e734d]" />
              7. Your Rights and Choices
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 font-light">
                <li>Access, update, or correct your personal information anytime</li>
                <li>Unsubscribe from marketing emails and promotional communications</li>
                <li>Request deletion of your account and associated data</li>
                <li>Update your device preferences and saved product wishlist</li>
                <li>Opt-out of personalized product recommendations</li>
                <li>Download your order history and purchase records</li>
                <li>Manage cookie preferences through browser settings</li>
              </ul>
            </div>
          </div>

          {/* Section 8 */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#8a6342]" />
              8. Age Restrictions
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="font-light text-gray-600">
                Our products and services are intended for individuals 18 years of age or older. We do not knowingly collect personal information from minors under 18. If you are under 18, please seek parental consent before making purchases.
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#9e734d]" />
              9. Policy Updates
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="font-light text-gray-600">
                We may update this Privacy Policy as we introduce new products, features, or expand our accessory collections. Updates will be reflected with a revised effective date at the top of this page. We will notify you of significant changes through email or prominent banner notifications on our website.
              </p>
            </div>
          </div>

          {/* Section 10 - Contact */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#8a6342]" />
              10. Contact & Customer Support
            </h2>
            <div className="bg-gradient-to-r from-[#F5E6D3]/10 to-[#9e734d]/5 p-6 rounded-lg border border-[#9e734d]/20 bg-white">
              <p className="font-light text-gray-600 mb-4">
                For privacy-related questions, data requests, or any concerns about your personal information, please contact our customer support team:
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-[#9e734d]/5 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-lg text-white">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Privacy Officer:</p>
                    <p className="text-gray-600">Caishen United Customer Support Team</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#9e734d]/5 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-lg text-white">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email:</p>
                    <a href="mailto:support@caishenunited.com" className="text-[#9e734d] hover:text-[#8a6342] font-medium">
                      support@caishenunited.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#9e734d]/5 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-lg text-white">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone:</p>
                    <a href="tel:+919911636888" className="text-[#9e734d] hover:text-[#8a6342] font-medium">
                      +91 9911636888
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#9e734d]/5 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-lg text-white">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Address:</p>
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

          {/* Closing Statement */}
          <div className="bg-gradient-to-r from-[#9e734d] to-[#8a6342] p-8 rounded-xl text-center text-white shadow-lg mt-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-10 h-10" />
              <Smartphone className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-light mb-2">Premium Protection for Your Devices & Your Data</h3>
            <p className="text-base opacity-90 max-w-2xl mx-auto leading-relaxed">
              At Caishen United, just as our phone cases provide military-grade protection for your devices, we safeguard your personal information with the highest standards of privacy and data security. Your trust drives us to deliver excellence in both products and protection.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
