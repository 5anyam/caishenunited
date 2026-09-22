'use client';

import React from 'react';
import { Shield, AlertTriangle, Info, FileText, Link2, Scale, Crown, Mail, Phone, Smartphone } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Force white background - no dark mode */}
      <div className="bg-white fixed inset-0 z-[-1]"></div>
      
      <div className="max-w-4xl mx-auto bg-white p-6 lg:p-8 rounded-lg shadow-xl border border-gray-200 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9e734d]/10 to-[#8a6342]/10 text-[#9e734d] px-4 py-2 rounded-full text-sm font-medium mb-4 border border-[#9e734d]/20">
            <Shield className="w-4 h-4" />
            Legal Notice
          </div>
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-[#9e734d] mr-2" />
            <h1 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
              Disclaimer
            </h1>
          </div>
          <p className="text-sm text-gray-500 mb-2">Effective Date: November 14, 2025</p>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Important legal information regarding the use of our platform and products at Caishen United.
          </p>
        </div>

        <section className="space-y-8 text-sm leading-7 text-gray-700">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-[#F5E6D3]/10 to-[#9e734d]/5 p-6 rounded-xl border border-[#9e734d]/20 bg-white">
            <p className="font-light">
              Welcome to <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#9e734d] to-[#8a6342]">Caishen United</span>, your premium destination for phone cases and mobile accessories. This Disclaimer outlines the limitations of our liability and the terms under which you may use our website at{' '}
              <a href="https://www.caishenunited.com" className="text-[#9e734d] hover:text-[#8a6342] font-medium underline">
                [www.caishenunited.com](https://www.caishenunited.com)
              </a>{' '}
              (the Platform). By accessing or using the Platform, you agree to be bound by this Disclaimer.
            </p>
          </div>

          <p className="font-light bg-white">
            We strive to provide accurate information about our products, but this Disclaimer clarifies that we make no warranties regarding the completeness, accuracy, or reliability of the content. Your use of the Platform and our products is at your own risk.
          </p>

          {/* Section 1: Product Information */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#9e734d]" />
              1. Product Information and Descriptions
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 font-light">
                <li>Product descriptions, images, specifications, and compatibility details are provided for informational purposes only and may contain minor inaccuracies or omissions</li>
                <li>Colors, materials, and designs may vary slightly from displayed images due to lighting, screen settings, or manufacturing variations</li>
                <li>We reserve the right to modify product specifications, pricing, or availability without prior notice</li>
                <li>Compatibility with specific devices is based on manufacturer guidelines, but we do not guarantee perfect fit for all variants or aftermarket modifications</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Limited Liability */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#8a6342]" />
              2. Limitation of Liability
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="font-light text-gray-600 mb-3">
                Caishen United shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to the use of the Platform, products, or services, including but not limited to loss of data, profits, or business opportunities.
              </p>
              <p className="font-light text-gray-600">
                Our total liability for any claim shall not exceed the amount paid by you for the product(s) in question. This limitation applies regardless of the cause of action, including negligence or strict liability.
              </p>
            </div>
          </div>

          {/* Section 3: Warranty Disclaimer */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#9e734d]" />
              3. No Warranties
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 font-light">
                <li>The products are provided as is and as available without any express or implied warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
                <li>We do not warrant that the Platform will be error-free, uninterrupted, or secure, or that any defects will be corrected</li>
                <li>Any warranties provided with products are limited to those from the manufacturer and do not extend to the Platform or our services</li>
                <li>Users assume all risks associated with the use of products, including potential damage to devices or personal injury</li>
              </ul>
            </div>
          </div>

          {/* Section 4: Third-Party Content */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <Link2 className="w-5 h-5 text-[#8a6342]" />
              4. Third-Party Links and Content
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="font-light text-gray-600 mb-3">
                The Platform may contain links to third-party websites or services. We do not endorse, monitor, or control such external sites and are not responsible for their content, privacy practices, or availability.
              </p>
              <p className="font-light text-gray-600">
                Your interactions with third parties are at your own risk, and any disputes should be resolved directly with those providers. We disclaim all liability for any loss or damage arising from third-party content.
              </p>
            </div>
          </div>

          {/* Section 5: User-Generated Content */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#9e734d]" />
              5. User Responsibilities
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 font-light">
                <li>You are responsible for providing accurate information during purchases, including device compatibility and shipping details</li>
                <li>Do not use the Platform for unlawful purposes or in violation of any applicable laws</li>
                <li>You agree to indemnify us against any claims arising from your misuse of the Platform or products</li>
                <li>Product installation or application (e.g., screen protectors) is at your own risk; improper use may void warranties</li>
              </ul>
            </div>
          </div>

          {/* Section 6: Governing Law */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#8a6342]" />
              6. Governing Law and Disputes
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="font-light text-gray-600">
                This Disclaimer is governed by the laws of India, without regard to conflict of law principles. Any disputes arising from or related to this Disclaimer or the Platform shall be resolved exclusively in the courts of New Delhi, India.
              </p>
              <p className="font-light text-gray-600 mt-2">
                We encourage amicable resolution of any issues. For concerns, please contact us using the details below before pursuing legal action.
              </p>
            </div>
          </div>

          {/* Section 7: Changes to Disclaimer */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#9e734d]" />
              7. Changes to This Disclaimer
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="font-light text-gray-600">
                We may update this Disclaimer from time to time to reflect changes in our practices or legal requirements. The updated version will be posted on the Platform with a revised effective date. Your continued use of the Platform after such changes constitutes acceptance of the new terms.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4 bg-white">
            <h2 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#8a6342]" />
              Questions About This Disclaimer?
            </h2>
            <div className="bg-gradient-to-r from-[#F5E6D3]/10 to-[#9e734d]/5 p-6 rounded-lg border border-[#9e734d]/20 bg-white">
              <p className="font-light text-gray-600 mb-4">
                If you have any questions or concerns regarding this Disclaimer, please contact our support team:
              </p>
              <div className="space-y-4">
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
                      +91 99116 36888
                    </a>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  <strong>Response Time:</strong> Within 24 hours | <strong>Available:</strong> Monday to Saturday, 9 AM - 6 PM IST
                </p>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="bg-gradient-to-r from-[#9e734d] to-[#8a6342] p-8 rounded-xl text-center text-white shadow-lg mt-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-10 h-10" />
              <Smartphone className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-light mb-2">Protection Through Transparency</h3>
            <p className="text-base opacity-90 max-w-2xl mx-auto leading-relaxed">
              At Caishen United, transparency is key to building trust. We provide this Disclaimer to ensure you understand the terms of using our Platform and products, allowing you to shop with confidence.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
