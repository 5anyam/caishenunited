import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Banner type definition
interface Banner {
  image: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

// Banner Slider Component
const BannerSlider: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const banners: Banner[] = [
    {
      image: "https://cms.caishenunited.com/wp-content/uploads/2025/11/banner-1.jpg",
      title: "Exclusive Collection",
      description: "Discover our premium range of handcrafted phone cases",
      link: "/collections",
      buttonText: "Explore Now"
    },
    {
      image: "https://cms.caishenunited.com/wp-content/uploads/2025/11/banner-3.jpg",
      title: "MagSafe Compatible",
      description: "Seamless charging with our MagSafe-ready cases",
      link: "/shop/magsafe-covers",
      buttonText: "Shop MagSafe"
    },
    {
      image: "https://cms.caishenunited.com/wp-content/uploads/2025/11/banner-2.jpg",
      title: "Military Protection",
      description: "Premium drop protection for your most valuable device",
      link: "/shop/protective-covers",
      buttonText: "View Protection"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval: NodeJS.Timeout = setInterval(() => {
      setCurrent((prev: number) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  const goToPrevious = (): void => {
    setCurrent((prev: number) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
  };

  const goToNext = (): void => {
    setCurrent((prev: number) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number): void => {
    setCurrent(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="w-full relative rounded-3xl overflow-hidden shadow-lg">
      {/* Main carousel container */}
      <div className="w-full relative overflow-hidden" style={{ aspectRatio: '16/6' }}>
        
        {/* Slides container */}
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((banner: Banner, index: number) => (
            <Link
              key={index}
              href={banner.link}
              className="w-full h-full flex-shrink-0 relative group"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-end p-8 md:p-12">
                <div className="max-w-2xl">
                  <h3 className="text-3xl md:text-5xl font-light text-white mb-4">
                    {banner.title}
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    {banner.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-[#9e734d] hover:text-white transition-all">
                    {banner.buttonText}
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 
            bg-white/90 hover:bg-white border border-gray-200 text-gray-700 
            w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300 hover:scale-110
            flex items-center justify-center shadow-lg hover:shadow-xl"
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 
            bg-white/90 hover:bg-white border border-gray-200 text-gray-700 
            w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300 hover:scale-110
            flex items-center justify-center shadow-lg hover:shadow-xl"
          aria-label="Next slide"
        >
          <ChevronRight size={16} className="sm:w-5 sm:h-5" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-30 
          flex gap-1.5 sm:gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
          {banners.map((_: Banner, index: number) => (
            <button
              key={index}
              className={`rounded-full cursor-pointer transition-all duration-300 
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#9e734d]/50 
                ${index === current
                  ? 'bg-[#9e734d] w-6 sm:w-8 h-2 sm:h-2.5' 
                  : 'bg-gray-300 hover:bg-gray-400 w-2 sm:w-2.5 h-2 sm:h-2.5'
                }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default BannerSlider;
