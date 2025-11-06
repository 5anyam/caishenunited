import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, Smartphone, Award, Zap, RefreshCw, Sparkles
} from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

type FeatureCardProps = {
  item: Feature;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
};

const FeatureCard = ({ item, isHovered, onHover, onLeave }: FeatureCardProps) => (
  <div 
    className={`group bg-white rounded-sm p-8 transition-all duration-300 cursor-pointer border ${
      isHovered ? 'border-black shadow-lg' : 'border-gray-100 hover:border-gray-300'
    }`}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <div className="mb-6 flex justify-center">
      <div className={`p-3 border transition-all duration-300 ${
        isHovered ? 'border-black bg-black' : 'border-gray-200 bg-white'
      }`}>
        <div className={`transition-colors duration-300 ${isHovered ? '[&_svg]:text-white' : ''}`}>
          {item.icon}
        </div>
      </div>
    </div>
    <h3 className="text-base font-medium text-gray-900 mb-3 text-center tracking-wide uppercase text-xs">
      {item.title}
    </h3>
    <p className="text-xs text-gray-600 text-center leading-relaxed font-light">
      {item.desc}
    </p>
  </div>
);

export default function AboutUsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const features: Feature[] = [
    {
      icon: <Shield className="text-gray-700 w-6 h-6" />,
      title: 'Military-Grade Protection',
      desc: 'Advanced shock-absorption technology and reinforced corners protect your device from drops up to 10 feet.',
    },
    {
      icon: <Smartphone className="text-gray-700 w-6 h-6" />,
      title: 'Precision Engineering',
      desc: 'Custom-fit designs for each device model with perfect cutouts for all ports, buttons, and cameras.',
    },
    {
      icon: <Sparkles className="text-gray-700 w-6 h-6" />,
      title: 'Premium Materials',
      desc: 'Crafted from aerospace-grade materials that resist scratches, yellowing, and daily wear.',
    }
  ];

  const values: Feature[] = [
    {
      icon: <Award className="text-gray-700 w-6 h-6" />,
      title: 'Lifetime Warranty',
      desc: 'We stand behind our craftsmanship with a comprehensive lifetime warranty on all products.',
    },
    {
      icon: <Zap className="text-gray-700 w-6 h-6" />,
      title: 'Wireless Charging',
      desc: 'All cases support wireless charging and work seamlessly with magnetic accessories.',
    },
    {
      icon: <RefreshCw className="text-gray-700 w-6 h-6" />,
      title: 'Easy Returns',
      desc: '30-day hassle-free returns if you\'re not completely satisfied with your purchase.',
    }
  ];

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
            The Caishen Difference
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Engineering Excellence
          </h2>
          
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8"></div>
          
          <p className="text-sm lg:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Inspired by Caishen, the ancient deity of prosperity and fortune, we believe your devices 
            deserve the same level of protection and prestige. Every product represents our unwavering 
            commitment to quality, durability, and timeless design.
          </p>
        </div>

        {/* Philosophy Section */}
        <div className="mb-20 lg:mb-28">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-3 font-medium">
              Why Choose Us
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Built to Last
            </h3>
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((item, index) => (
              <FeatureCard 
                key={index}
                item={item}
                isHovered={hoveredCard === `feature-${index}`}
                onHover={() => setHoveredCard(`feature-${index}`)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-3 font-medium">
              Our Promise
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Uncompromising Quality
            </h3>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              We do not just protect your device, we elevate your everyday experience with 
              products that combine functionality with sophisticated design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {values.map((item, index) => (
              <FeatureCard 
                key={index}
                item={item}
                isHovered={hoveredCard === `value-${index}`}
                onHover={() => setHoveredCard(`value-${index}`)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 mb-20 py-16 border-t border-b border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">10+</div>
              <div className="text-xs uppercase tracking-wider text-gray-500">Device Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">50K+</div>
              <div className="text-xs uppercase tracking-wider text-gray-500">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">4.9★</div>
              <div className="text-xs uppercase tracking-wider text-gray-500">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">100%</div>
              <div className="text-xs uppercase tracking-wider text-gray-500">Quality Tested</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="max-w-2xl mx-auto">
            <h4 className="text-2xl lg:text-3xl font-light text-gray-900 mb-6 tracking-tight">
              Elevate Your Device Protection
            </h4>
            <p className="text-sm text-gray-600 mb-8 font-light leading-relaxed">
              Experience the perfect fusion of military-grade protection and timeless design. 
              Your device deserves the best.
            </p>
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 px-10 py-4 text-xs uppercase tracking-widest text-white bg-black hover:bg-gray-900 transition-all duration-300 font-medium"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
