'use client';

import React from 'react';
import { RotateCcw, CreditCard, XCircle, CheckCircle, Package, AlertTriangle, Clock, Mail, Shield, Heart } from 'lucide-react';

export default function ReturnsRefundPolicy() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-rose-50 py-16 px-4 sm:px-8 md:px-20 lg:px-40">
      <div className="max-w-5xl mx-auto bg-white p-8 lg:p-12 shadow-2xl rounded-2xl border border-gray-200">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-rose-200">
            <RotateCcw className="w-4 h-4" />
            Quality Assurance Policy
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 mb-4">
            Returns & Refunds Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
            Your satisfaction with our luxury fragrances is our priority
          </p>
          <p className="text-sm text-rose-600 font-medium">Please read carefully before making your purchase</p>
        </div>

        <section className="space-y-8 text-base leading-7 text-gray-800">
          
          {/* Introduction */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl border border-rose-200">
            <p className="text-gray-700">
              At <strong className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">EDA Perfumes</strong>, we take great care in packaging and shipping your luxury fragrances. Each bottle is carefully inspected and securely packaged to ensure it reaches you in perfect condition. However, we understand that sometimes issues may arise, and we are here to help.
            </p>
          </div>

          {/* Returns Section */}
          <div className="border-l-4 border-rose-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Package className="w-6 h-6 text-rose-600" />
              Returns Policy
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700">
                All EDA Perfumes shipments undergo rigorous quality checks before dispatch. If you receive a fragrance in any compromised condition, please notify us within <strong className="text-rose-600">7 days</strong> of delivery for the fastest resolution.
              </p>
            </div>
          </div>

          {/* Acceptable Returns */}
          <div className="border-l-4 border-emerald-500 pl-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              7-Day Return Policy: Acceptable Reasons
            </h3>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Damaged Packaging:</strong> Broken, leaking, or tampered fragrance bottles or packaging</li>
                <li><strong>Wrong Product:</strong> Received a different fragrance than what you ordered</li>
                <li><strong>Manufacturing Defects:</strong> Faulty spray mechanism, cracked bottle, or other production issues</li>
                <li><strong>Incomplete Order:</strong> Missing fragrances from your luxury collection order</li>
                <li><strong>Shipping Damage:</strong> Fragrances damaged during transit despite our premium packaging</li>
              </ul>
            </div>
          </div>

          {/* Unacceptable Returns */}
          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Non-Returnable Items
            </h3>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Used Fragrances:</strong> Opened, tested, or partially used perfume bottles</li>
                <li><strong>Missing Packaging:</strong> Items without original EDA Perfumes packaging, boxes, or labels</li>
                <li><strong>Late Requests:</strong> Return requests made after 7 days of delivery</li>
                <li><strong>Personal Preferences:</strong> Scent preferences, allergic reactions, or fragrance longevity concerns</li>
                <li><strong>Altered Products:</strong> Fragrances that have been modified or tampered with</li>
                <li><strong>Hygiene Reasons:</strong> Due to the personal nature of fragrances, opened products cannot be resold</li>
              </ul>
            </div>
          </div>

          {/* Return Process */}
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Return Process for Acceptable Cases
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>Contact us immediately at <strong className="text-blue-600">care@edaperfumes.com</strong> with clear photos of the damaged product</li>
                <li>Include your order number, delivery details, and description of the issue</li>
                <li>Our luxury customer care team will review your request within 24 hours</li>
                <li>If confirmed as a valid claim, we will arrange for pickup or replacement</li>
                <li>Replacement fragrances will be dispatched within 3-5 business days</li>
                <li>If pickup is not available in your area, we will provide a prepaid return label</li>
              </ol>
            </div>
          </div>

          {/* Refunds Section */}
          <div className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-purple-600" />
              Refunds Policy
            </h2>
          </div>

          {/* No Refunds */}
          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Refunds Will Not Be Issued For
            </h3>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Fragrances that have been opened, tested, or used</li>
                <li>Orders with incorrect shipping addresses provided by the customer</li>
                <li>Personal scent preferences or fragrance intensity concerns</li>
                <li>Allergic reactions or skin sensitivity (we recommend patch testing)</li>
                <li>Claims that do not comply with our return policy guidelines</li>
                <li>Products returned without original packaging or after the 7-day window</li>
              </ul>
            </div>
          </div>

          {/* Refund Eligible */}
          <div className="border-l-4 border-emerald-500 pl-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Refunds May Be Issued For
            </h3>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Out of stock fragrances that cannot be fulfilled</li>
                <li>Undeliverable addresses where our premium shipping cannot reach</li>
                <li>Valid return policy conditions that are met within the timeframe</li>
                <li>Duplicate payments made for the same fragrance order</li>
                <li>Manufacturing defects confirmed by our quality team</li>
                <li>Orders cancelled before dispatch (subject to processing status)</li>
              </ul>
            </div>
          </div>

          {/* Cancellation */}
          <div className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              Order Cancellation & Refunds
            </h2>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You can cancel your fragrance order before dispatch by emailing <strong className="text-orange-600">care@edaperfumes.com</strong></li>
                <li>Once your luxury fragrances are dispatched, cancellations are not possible</li>
                <li>Refunds for cancelled orders will be processed within 5-7 business days</li>
                <li>Refunds will be credited to the same payment method used for purchase</li>
              </ul>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              Additional Refund Information
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>No processing fees are charged for valid returns or replacements</li>
                <li>If exchanging for a higher-priced fragrance, you will pay the difference</li>
                <li>Prepaid order refunds are credited to the original payment source</li>
                <li>COD order refunds require your bank account details</li>
                <li>All refunds are processed within 5-7 business days after verification</li>
                <li>Replacement fragrances are shipped within 3-5 business days after approval</li>
                <li>We cover return shipping costs for valid quality-related returns</li>
              </ul>
            </div>
          </div>

          {/* Quality Commitment */}
          <div className="border-l-4 border-rose-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-600" />
              Our Quality Commitment
            </h2>
            <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
              <p className="text-gray-700 mb-3">
                We understand that choosing a signature fragrance is a personal and important decision. While we cannot accept returns on opened fragrances due to hygiene reasons, we are committed to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Providing accurate fragrance descriptions and scent profiles</li>
                <li>Ensuring premium packaging that protects your fragrance during shipping</li>
                <li>Offering personalized fragrance consultations to help you choose the right scent</li>
                <li>Standing behind the quality and authenticity of every EDA Perfume</li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Mail className="w-6 h-6 text-purple-600" />
              Need Help?
            </h2>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-gray-700 mb-3">
                Our luxury customer care team is here to assist with any concerns about your fragrance order:
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Email:</strong> <a href="mailto:care@edaperfumes.com" className="text-purple-600 hover:text-purple-700">care@edaperfumes.com</a>
                </p>
                <p className="text-gray-700">
                  <strong>Response Time:</strong> Within 24 hours
                </p>
                <p className="text-gray-700">
                  <strong>Available:</strong> Monday to Saturday, 9 AM - 6 PM IST
                </p>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 p-8 rounded-2xl text-center text-white shadow-xl">
            <Heart className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold mb-2">Your Satisfaction is Our Signature</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              We are committed to ensuring your experience with EDA Perfumes is as exceptional as our fragrances. Your trust in our luxury brand means everything to us.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
