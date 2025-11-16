'use client';
import { Shield, RefreshCw, CheckCircle, Clock, Package, AlertCircle, Mail, ChevronRight, Award } from 'lucide-react';
import Link from 'next/link';

export default function WarrantyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a0a] dark:to-black border-b border-gray-100 dark:border-[#9e734d]/20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #9e734d 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#9e734d]/10 border border-gray-200 dark:border-[#9e734d]/30 rounded-sm mb-6">
            <Shield className="w-4 h-4 text-gray-700 dark:text-[#9e734d]" />
            <span className="text-sm text-gray-700 dark:text-[#9e734d] font-medium">Protection Guarantee</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-6">
            Warranty & Replacement Policy
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            We stand behind the quality of every product with comprehensive warranty coverage and hassle-free replacement service.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#1a1a1a] dark:to-[#0a0a0a] border border-gray-100 dark:border-[#9e734d]/20 p-8 md:p-12 mb-12">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              At <span className="text-gray-900 dark:text-[#9e734d] font-semibold">Caishen United</span>, we believe in the quality and durability of our products. Our warranty and replacement policy ensures that you receive the protection and support you deserve, backed by our commitment to customer satisfaction.
            </p>
          </div>

          {/* Warranty Coverage */}
          <div className="space-y-8 mb-12">
            <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#9e734d]/20 p-8 hover:border-gray-300 dark:hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-[#9e734d]/10 border border-gray-200 dark:border-[#9e734d]/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-gray-700 dark:text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">Warranty Coverage</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    All Caishen United products come with a comprehensive warranty that covers manufacturing defects and material failures under normal use conditions.
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>30-day warranty on all phone cases and accessories</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Coverage for manufacturing defects, material flaws, and workmanship issues</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Free replacement for defective products within warranty period</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Extended warranty available on select premium products</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* What's Covered */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#9e734d]/20 p-8 hover:border-gray-300 dark:hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-[#9e734d]/10 border border-gray-200 dark:border-[#9e734d]/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-gray-700 dark:text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">What is Covered</h2>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Manufacturing defects in materials or workmanship</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Premature wear or degradation under normal use</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Defective buttons, ports, or cutouts affecting functionality</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Discoloration or yellowing within warranty period (for clear cases)</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Adhesive failure or detachment of case components</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* What's Not Covered */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#9e734d]/20 p-8 hover:border-gray-300 dark:hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-[#9e734d]/10 border border-gray-200 dark:border-[#9e734d]/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-gray-700 dark:text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">What is Not Covered</h2>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Damage from accidents, drops, impacts, or misuse</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Normal wear and tear from extended daily use</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Damage from improper cleaning or use of harsh chemicals</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Modifications or alterations to the original product</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Cosmetic issues like scratches or scuffs from normal use</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Products purchased from unauthorized retailers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Replacement Process */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#9e734d]/20 p-8 hover:border-gray-300 dark:hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-[#9e734d]/10 border border-gray-200 dark:border-[#9e734d]/20 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-gray-700 dark:text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">Replacement Process</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Our hassle-free replacement process is designed to get you back to full protection quickly:
                  </p>
                  <ol className="space-y-4">
                    {[
                      { step: "01", title: "Contact Support", desc: "Reach out to our customer care team via email or phone with your order number and details of the issue" },
                      { step: "02", title: "Provide Evidence", desc: "Send clear photos or videos showing the defect or issue with your product" },
                      { step: "03", title: "Approval Review", desc: "Our quality team will review your case within 24-48 hours" },
                      { step: "04", title: "Receive Replacement", desc: "Once approved, we'll ship your replacement product immediately at no additional cost" }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-10 h-10 border border-gray-200 dark:border-[#9e734d]/20 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-[#9e734d]">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-gray-900 dark:text-white mb-1 tracking-wide uppercase">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#9e734d]/20 p-8 hover:border-gray-300 dark:hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-[#9e734d]/10 border border-gray-200 dark:border-[#9e734d]/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-gray-700 dark:text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">Processing Timeline</h2>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Warranty claim review: 24-48 business hours</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Replacement dispatch: Within 1-2 business days after approval</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Delivery: 3-7 business days based on location</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Return Requirements */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#9e734d]/20 p-8 hover:border-gray-300 dark:hover:border-[#9e734d]/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-[#9e734d]/10 border border-gray-200 dark:border-[#9e734d]/20 flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-700 dark:text-[#9e734d]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">Important Notes</h2>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Keep your original purchase receipt or order confirmation for warranty claims</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Defective products may need to be returned before replacement is sent</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Warranty is non-transferable and applies only to the original purchaser</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-[#9e734d] flex-shrink-0 mt-0.5" />
                      <span>Final decision on warranty claims rests with Caishen United quality team</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="relative overflow-hidden bg-gray-50 dark:bg-gradient-to-r dark:from-[#9e734d]/10 dark:to-[#9e734d]/5 border border-gray-200 dark:border-[#9e734d]/30 p-8 md:p-12 mb-12">
            <div className="relative z-10">
              <Package className="w-12 h-12 text-gray-700 dark:text-[#9e734d] mb-4" />
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg italic">
                At <span className="text-gray-900 dark:text-[#9e734d] font-semibold not-italic">Caishen United</span>, we are committed to providing not just products, but peace of mind. Our warranty and replacement policy reflects our confidence in the quality we deliver and our dedication to your satisfaction.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-6">
              Need Warranty Support?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-gradient-to-r dark:from-[#9e734d] dark:to-[#b8834f] text-white hover:bg-gray-800 dark:hover:shadow-[0_0_30px_rgba(158,115,77,0.5)] transition-all"
              >
                <Mail className="w-5 h-5" />
                Contact Support
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 dark:border-[#9e734d] text-gray-900 dark:text-white hover:border-gray-900 dark:hover:bg-[#9e734d]/10 transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Policies */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-[#9e734d]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-center text-gray-900 dark:text-white mb-12">
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
                icon: Package
              }
            ].map((policy, index) => {
              const Icon = policy.icon;
              return (
                <Link
                  key={index}
                  href={policy.link}
                  className="group p-6 bg-white dark:bg-black border border-gray-100 dark:border-[#9e734d]/20 hover:border-gray-900 dark:hover:border-[#9e734d]/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-[#9e734d]/10 border border-gray-200 dark:border-[#9e734d]/20 flex items-center justify-center group-hover:bg-gray-900 dark:group-hover:bg-[#9e734d]/20 transition-colors">
                      <Icon className="w-6 h-6 text-gray-700 dark:text-[#9e734d] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-light text-gray-900 dark:text-white mb-2 group-hover:text-gray-900 dark:group-hover:text-[#9e734d] transition-colors">
                        {policy.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {policy.description}
                      </p>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-[#9e734d] text-sm font-medium">
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
