'use client';

import React from 'react';
import { RotateCcw, CreditCard, XCircle, CheckCircle, Package, AlertTriangle, Clock, Mail, Shield, Heart, Smartphone, Phone } from 'lucide-react';

export default function ReturnsRefundPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-black py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-black p-6 lg:p-8 shadow-xl rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9e734d]/10 to-[#8a6342]/10 text-[#9e734d] px-4 py-2 rounded-full text-sm font-medium mb-4 border border-[#9e734d]/20">
            <RotateCcw className="w-4 h-4" />
            Quality Assurance Policy
          </div>
          <div className="flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-[#9e734d] mr-2" />
            <h1 className="text-3xl lg:text-4xl font-light text-gray-900 dark:text-white tracking-tight">
              Returns & Refunds Policy
            </h1>
          </div>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-2 leading-relaxed">
            Your satisfaction with our premium phone cases and mobile accessories is our priority
          </p>
          <p className="text-sm text-[#9e734d] font-medium">Please read carefully before making your purchase</p>
        </div>

        <section className="space-y-8 text-sm leading-7 text-gray-700 dark:text-gray-300">
          
          {/* Introduction */}
          <div className="bg-gradient-to-r from-[#F5E6D3]/10 to-[#9e734d]/5 dark:from-[#9e734d]/5 dark:to-transparent p-6 rounded-xl border border-[#9e734d]/20">
            <p className="font-light">
              At <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#9e734d] to-[#8a6342]">Caishen United</span>, we take great care in packaging and shipping your premium phone cases and accessories. Each item is carefully inspected and securely packaged to ensure it reaches you in perfect condition. However, we understand that sometimes issues may arise, and we are here to help.
            </p>
          </div>

          {/* Returns Section */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-[#9e734d]" />
              Returns Policy
            </h2>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20 mb-4">
              <p className="font-light text-gray-600 dark:text-gray-400">
                All Caishen United shipments undergo rigorous quality checks before dispatch. If you receive a phone case or accessory in any compromised condition, please notify us within <span className="font-medium text-[#9e734d]">7 days</span> of delivery for the fastest resolution.
              </p>
            </div>
          </div>

          {/* Acceptable Returns */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4">
            <h3 className="text-lg font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#9e734d]" />
              7-Day Return Policy: Acceptable Reasons
            </h3>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 font-light">
                <li><strong>Damaged Product:</strong> Broken, cracked, or defective phone cases or accessories</li>
                <li><strong>Wrong Product:</strong> Received a different item or wrong model than what you ordered</li>
                <li><strong>Manufacturing Defects:</strong> Faulty design, poor fit, or material issues</li>
                <li><strong>Incomplete Order:</strong> Missing items from your accessory collection order</li>
                <li><strong>Shipping Damage:</strong> Products damaged during transit despite our secure packaging</li>
              </ul>
            </div>
          </div>

          {/* Unacceptable Returns */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4">
            <h3 className="text-lg font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <XCircle className="w-5 h-5 text-[#8a6342]" />
              Non-Returnable Items
            </h3>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 font-light">
                <li><strong>Used Products:</strong> Items that show signs of use, wear, or scratches</li>
                <li><strong>Missing Packaging:</strong> Items without original packaging, tags, or accessories</li>
                <li><strong>Late Requests:</strong> Return requests made after 7 days of delivery</li>
                <li><strong>Personal Preferences:</strong> Changes in style preference, color choice, or design taste</li>
                <li><strong>Altered Products:</strong> Items that have been customized, modified, or damaged by user</li>
                <li><strong>Hygiene Items:</strong> Screen protectors or certain personal accessories once applied</li>
              </ul>
            </div>
          </div>

          {/* Return Process */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4">
            <h3 className="text-lg font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#9e734d]" />
              Return Process for Acceptable Cases
            </h3>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
              <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-400 font-light">
                <li>Contact us immediately at <a href="mailto:support@caishenunited.com" className="text-[#9e734d] hover:text-[#8a6342] font-medium">support@caishenunited.com</a> with clear photos of the damaged product</li>
                <li>Include your order number, delivery details, and description of the issue</li>
                <li>Our customer care team will review your request within 24 hours</li>
                <li>If confirmed as a valid claim, we will arrange for pickup or replacement</li>
                <li>Replacement items will be dispatched within 3-5 business days</li>
                <li>If pickup is not available in your area, we will provide a prepaid return label</li>
              </ol>
            </div>
          </div>

          {/* Refunds Section */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#8a6342]" />
              Refunds Policy
            </h2>
          </div>

          {/* No Refunds */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4">
            <h3 className="text-lg font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <XCircle className="w-5 h-5 text-[#9e734d]" />
              Refunds Will Not Be Issued For
            </h3>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 font-light">
                <li>Products that show signs of use, wear, or damage</li>
                <li>Orders with incorrect shipping addresses provided by the customer</li>
                <li>Personal style preferences or design choices</li>
                <li>Items returned without original packaging or after the 7-day window</li>
                <li>Claims that do not comply with our return policy guidelines</li>
                <li>COD orders where bank details are not provided for processing</li>
              </ul>
            </div>
          </div>

          {/* Refund Eligible */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4">
            <h3 className="text-lg font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#9e734d]" />
              Refunds May Be Issued For
            </h3>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 font-light">
                <li>Out of stock items that cannot be fulfilled</li>
                <li>Undeliverable addresses where shipping cannot reach</li>
                <li>Valid return policy conditions met within the timeframe</li>
                <li>Duplicate payments made for the same order</li>
                <li>Manufacturing defects confirmed by our quality team</li>
                <li>Orders cancelled before dispatch (subject to processing status)</li>
              </ul>
            </div>
          </div>

          {/* Cancellation */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#8a6342]" />
              Order Cancellation & Refunds
            </h2>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 font-light">
                <li>You can cancel your order before dispatch by emailing <a href="mailto:support@caishenunited.com" className="text-[#8a6342] hover:text-[#9e734d] font-medium">support@caishenunited.com</a></li>
                <li>Once your items are dispatched, cancellations are not possible</li>
                <li>Refunds for cancelled orders will be processed within 5-7 business days</li>
                <li>Refunds will be credited to the same payment method used for purchase</li>
              </ul>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#9e734d]" />
              Additional Refund Information
            </h2>
            <div className="bg-gray-50 dark:bg-[#9e734d]/5 p-4 rounded-lg border border-gray-200 dark:border-[#9e734d]/20">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 font-light">
                <li>No processing fees are charged for valid returns or replacements</li>
                <li>If exchanging for a higher-priced item, you will pay the difference</li>
                <li>Prepaid order refunds are credited to the original payment source</li>
                <li>COD order refunds require your bank account details</li>
                <li>All refunds are processed within 5-7 business days after verification</li>
                <li>Replacement items are shipped within 3-5 business days after approval</li>
                <li>We cover return shipping costs for valid quality-related returns</li>
              </ul>
            </div>
          </div>

          {/* Quality Commitment */}
          <div className="border-l-4 border-[#8a6342] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#8a6342]" />
              Our Quality Commitment
            </h2>
            <div className="bg-gradient-to-r from-[#F5E6D3]/10 to-[#9e734d]/5 dark:from-[#9e734d]/5 dark:to-transparent p-4 rounded-lg border border-[#9e734d]/20">
              <p className="font-light text-gray-600 dark:text-gray-400 mb-3">
                We understand that choosing the right phone case is important for protection and style. While we cannot accept returns on used items, we are committed to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400 font-light">
                <li>Providing accurate product descriptions, dimensions, and compatibility details</li>
                <li>Ensuring secure packaging that protects your items during shipping</li>
                <li>Offering device-specific guidance to help you choose the perfect fit</li>
                <li>Standing behind the durability and quality of every Caishen United product</li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-l-4 border-[#9e734d] pl-6 pt-4">
            <h2 className="text-xl font-light mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#9e734d]" />
              Need Help?
            </h2>
            <div className="bg-gradient-to-r from-[#F5E6D3]/10 to-[#9e734d]/5 dark:from-[#9e734d]/5 dark:to-transparent p-4 rounded-lg border border-[#9e734d]/20">
              <p className="font-light text-gray-600 dark:text-gray-400 mb-3">
                Our customer care team is here to assist with any concerns about your order:
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
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  <strong>Response Time:</strong> Within 24 hours | <strong>Available:</strong> Monday to Saturday, 9 AM - 6 PM IST
                </p>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="bg-gradient-to-r from-[#9e734d] to-[#8a6342] p-8 rounded-xl text-center text-white shadow-lg mt-12">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-light mb-2">Your Satisfaction is Our Priority</h3>
            <p className="text-base opacity-90 max-w-2xl mx-auto leading-relaxed">
              At Caishen United, we are committed to ensuring your experience with our premium phone cases and accessories is exceptional. Your trust in our brand means everything to us.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
