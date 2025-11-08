'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Crown, Sparkles, MessageCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  productSlug: string;
  productName: string;
}

// FAQ Data for Caishen United phone accessories
const faqData: Record<string, FAQ[]> = {
  'iphone-case': [
    {
      question: "What makes Caishen United phone cases premium?",
      answer: "Our cases are crafted with aerospace-grade materials and military-grade protection technology. Each case undergoes rigorous drop testing from 10 feet and features raised bezels to protect your screen and camera. The combination of sophisticated design and uncompromising protection sets us apart."
    },
    {
      question: "Will this case work with wireless charging?",
      answer: "Absolutely! All Caishen United cases are designed with wireless charging compatibility. They work seamlessly with MagSafe and standard Qi wireless chargers, allowing you to charge your device without removing the case."
    },
    {
      question: "How long does the lifetime warranty last?",
      answer: "Our lifetime warranty covers manufacturing defects and normal wear for as long as you own the product. If your case develops any issues related to materials or craftsmanship, we'll replace it at no cost. This warranty demonstrates our commitment to lasting quality."
    },
    {
      question: "Does the case protect against drops?",
      answer: "Yes! Each Caishen United case features:\n• Military-grade drop protection (tested from 10+ feet)\n• Reinforced corner technology for shock absorption\n• Raised bezels to protect screen and camera lenses\n• Air-cushion technology that disperses impact force\n• Anti-slip grip for secure handling"
    },
    {
      question: "Will the case yellow over time?",
      answer: "No. We use advanced anti-yellowing technology in all our clear and light-colored cases. Our materials are UV-resistant and maintain their pristine appearance even after extended use. This is part of our commitment to timeless design."
    },
    {
      question: "How precise is the fit?",
      answer: "Each case is custom-designed for specific device models with precision engineering:\n• Perfect cutouts for all ports, buttons, and cameras\n• Tactile button covers that maintain original responsiveness\n• Exact dimensions for secure fit without bulk\n• Easy installation and removal without scratching your device"
    },
    {
      question: "Is the case compatible with screen protectors?",
      answer: "Yes! Our raised bezels are designed to work with most screen protectors without causing lifting or bubbles. The precise engineering ensures compatibility with both glass and film protectors."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day hassle-free return policy. If you're not completely satisfied with your purchase, you can return the product in its original condition for a full refund. Your satisfaction is our priority."
    },
    {
      question: "How should I clean my case?",
      answer: "To maintain your case's premium appearance:\n• Use a soft, lint-free cloth with mild soap and water\n• Avoid harsh chemicals or abrasive cleaners\n• Dry thoroughly before reinstalling\n• For stubborn marks, use isopropyl alcohol on a cloth\n• Clean regularly to prevent dirt buildup"
    },
    {
      question: "Are the materials eco-friendly?",
      answer: "We're committed to sustainability. Our cases use recyclable materials where possible, and we're continuously working to reduce environmental impact while maintaining our premium quality standards."
    }
  ],
  'default': [
    {
      question: "What makes Caishen United different from other brands?",
      answer: "Caishen United combines military-grade protection with timeless design. Inspired by the ancient deity of prosperity, we believe your devices deserve premium protection that doesn't compromise on aesthetics. Every product undergoes rigorous testing and comes with a lifetime warranty."
    },
    {
      question: "What is your warranty policy?",
      answer: "All Caishen United products come with a lifetime warranty against manufacturing defects. We stand behind our craftsmanship, and if any issues arise from normal use, we'll replace your product at no cost. This demonstrates our commitment to lasting quality."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we ship within India with free delivery on orders above ₹999. We're working on expanding to international markets. Subscribe to our newsletter to be notified when we start shipping to your region."
    },
    {
      question: "How long does delivery take?",
      answer: "Orders are typically processed within 24 hours and delivered within:\n• Metro cities: 2-3 business days\n• Tier 2 cities: 3-5 business days\n• Remote areas: 5-7 business days\n\nYou'll receive tracking information once your order ships."
    },
    {
      question: "Can I exchange my product for a different model?",
      answer: "Yes! Within 30 days of delivery, you can exchange your product for a different model or color (subject to availability). The product must be in original condition with all packaging intact. Contact our support team to initiate an exchange."
    },
    {
      question: "Are your products authentic?",
      answer: "100% authentic! All Caishen United products are:\n• Manufactured to our exact specifications\n• Quality tested before shipping\n• Come with authenticity certificates\n• Protected by our lifetime warranty\n• Shipped directly from our warehouse"
    },
    {
      question: "Do you offer bulk orders or corporate gifting?",
      answer: "Yes! We offer special pricing for bulk orders (10+ units) and customization options for corporate gifting. Contact our business team at business@caishenunited.com for personalized quotes and branding opportunities."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive an email with tracking information. You can also track your order by logging into your account or using the tracking link provided in your shipping confirmation email."
    }
  ]
};

const defaultFAQs: FAQ[] = faqData['default'];

const ProductFAQ: React.FC<ProductFAQProps> = ({ productSlug, productName }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const getFAQs = (): FAQ[] => {
    if (faqData[productSlug]) {
      return faqData[productSlug];
    }

    const slugKey = Object.keys(faqData).find(key => 
      productSlug.includes(key) || key.includes(productSlug.split('-')[0])
    );

    if (slugKey) {
      return faqData[slugKey];
    }

    return defaultFAQs;
  };

  const faqs = getFAQs();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      {/* Premium Header with gold accents */}
      <div className="py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#F5E6D3]/10 via-transparent to-transparent" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          
          <div className="relative w-20 h-px mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>
          
          <p className="text-gray-600 text-sm font-light max-w-2xl mx-auto">
            Everything you need to know about <span className="text-[#D4AF37] font-medium">{productName}</span>
          </p>
        </div>
      </div>

      {/* Premium FAQ Items */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="group bg-white border border-gray-100 hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden relative"
            >
              {/* Gold gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5E6D3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <button
                className="relative w-full px-6 lg:px-8 py-6 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-start gap-6">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`flex-shrink-0 mt-1 transition-colors duration-300 ${
                      openIndex === index ? 'text-[#D4AF37]' : 'text-gray-400 group-hover:text-[#D4AF37]'
                    }`}>
                      <Crown className="w-4 h-4" />
                    </div>
                    <h3 className={`font-light text-sm lg:text-base leading-relaxed flex-1 text-left transition-colors duration-300 ${
                      openIndex === index ? 'text-black font-medium' : 'text-gray-900'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    <div className={`transition-all duration-500 ${
                      openIndex === index ? 'text-[#D4AF37] rotate-180' : 'text-gray-400 group-hover:text-gray-600'
                    }`}>
                      <ChevronDownIcon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </button>
              
              {/* Premium Answer with animation */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index 
                  ? 'max-h-[1200px] opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 lg:px-8 pb-8 pt-2">
                  <div className="ml-7 pl-6 border-l-2 border-[#D4AF37] bg-gradient-to-r from-[#F5E6D3]/10 to-transparent p-6">
                    <p className="text-gray-700 text-sm lg:text-base leading-relaxed whitespace-pre-line font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Footer with gold accents */}
      <div className="py-20 text-center border-t border-gray-100 mt-16 bg-gradient-to-b from-white to-[#F5E6D3]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-[#D4AF37]/30 mb-6 group hover:border-[#D4AF37] transition-colors duration-500">
            <MessageCircle className="w-7 h-7 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" />
          </div>
          
          <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4 tracking-tight">
            Still Have Questions?
          </h3>
          
          <p className="text-gray-600 text-sm mb-10 font-light leading-relaxed">
            Our premium support team is here to assist you with any inquiries about 
            <span className="text-[#D4AF37]"> Caishen United products</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@caishenunited.com"
              className="group relative inline-block px-10 py-4 text-xs text-black border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-500 tracking-widest uppercase font-medium overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles className="w-3 h-3" />
                Email Support
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5E6D3]/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </a>
            
            <a 
              href="https://wa.me/919XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block px-10 py-4 text-xs text-black bg-gradient-to-r from-[#D4AF37] to-[#C5A028] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-widest uppercase font-bold overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Crown className="w-3 h-3" />
                WhatsApp Us
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5E6D3] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </a>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-center gap-8 text-xs text-gray-500 font-light">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Expert Assistance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Quick Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFAQ;
