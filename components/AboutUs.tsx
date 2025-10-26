import React, { useState } from 'react';
import { 
  Crown, Shield, Star, Gift, Clock, Award
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
    className={`group bg-white rounded-lg p-8 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-gray-300 hover:shadow-md ${
      isHovered ? 'shadow-md border-gray-300' : ''
    }`}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <div className="mb-6 flex justify-center">
      <div className="p-3 rounded-full border border-gray-200 bg-gray-50">
        {item.icon}
      </div>
    </div>
    <h3 className="text-lg font-light text-gray-900 mb-3 text-center tracking-wide">
      {item.title}
    </h3>
    <p className="text-sm text-gray-600 text-center leading-relaxed font-light">
      {item.desc}
    </p>
  </div>
);

export default function AboutUsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const features: Feature[] = [
    {
      icon: <Crown className="text-gray-700 w-6 h-6" />,
      title: 'Luxury Craftsmanship',
      desc: 'Each fragrance is meticulously crafted using premium ingredients and artisan techniques for an unparalleled olfactory experience.',
    },
    {
      icon: <Clock className="text-gray-700 w-6 h-6" />,
      title: 'Long-Lasting Formula',
      desc: 'Premium EDP concentration ensures your signature scent lingers beautifully throughout the day.',
    },
    {
      icon: <Star className="text-gray-700 w-6 h-6" />,
      title: 'Unisex Appeal',
      desc: 'Expertly balanced fragrances that captivate regardless of gender - true luxury knows no boundaries.',
    }
  ];

  const values: Feature[] = [
    {
      icon: <Shield className="text-gray-700 w-6 h-6" />,
      title: 'Authentic Quality',
      desc: 'Every bottle represents our commitment to excellence and authenticity in luxury fragrance.',
    },
    {
      icon: <Gift className="text-gray-700 w-6 h-6" />,
      title: 'Elegant Presentation',
      desc: 'Each bottle is a work of art, perfect for gifting or adding sophistication to your collection.',
    },
    {
      icon: <Award className="text-gray-700 w-6 h-6" />,
      title: 'Customer Trust',
      desc: 'Trusted by discerning customers worldwide for our dedication to quality and service.',
    }
  ];

  return (
    <section className="bg-white py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl text-center lg:text-5xl font-light text-gray-900 mb-6 tracking-wide">
            The Art of Luxury Fragrance
          </h2>
          
          <div className="w-16 h-px bg-gray-300 mx-auto mb-8"></div>
          
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            At EDA Perfumes, we craft sophisticated fragrances that embody elegance and refinement. 
            Each scent is a carefully composed symphony of premium notes, designed for those who appreciate 
            the finer things in life.
          </p>
        </div>

        {/* Philosophy Section */}
        <div className="mb-20 lg:mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide">
              Our Philosophy
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
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide">
              Our Commitment
            </h3>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              We believe fragrance is more than scent - it is an expression of identity, 
              confidence, and personal style.
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

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="max-w-2xl mx-auto">
            <h4 className="text-2xl lg:text-3xl font-light text-gray-900 mb-6 tracking-wide">
              Discover Your Signature Scent
            </h4>
            <p className="text-gray-600 mb-8 font-light">
              Explore our collection and find the fragrance that speaks to you.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-3 text-sm font-light tracking-wide text-white bg-black hover:bg-gray-800 transition-colors duration-300 rounded-sm">
              Explore Collection
            </button>
          </div>
        </div>
    </section>
  );
}
