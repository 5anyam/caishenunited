import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Banner {
  image: string;
  link: string;
}

const BannerSlider: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const banners: Banner[] = [
    {
      image: "https://cms.caishenunited.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-16-at-8.12.34-AM-1.jpeg",
      link: "/collections"
    },
    {
      image: "https://cms.caishenunited.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-16-at-8.12.34-AM-2.jpeg",
      link: "/collections"
    },
    {
      image: "https://cms.caishenunited.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-16-at-8.12.34-AM.jpeg",
      link: "/collections"
    },
    {
      image: "https://cms.caishenunited.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-16-at-8.12.35-AM-1.jpeg",
      link: "/collections"
    },
    {
      image: "https://cms.caishenunited.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-16-at-8.12.35-AM-2.jpeg",
      link: "/collections"
    },
    {
      image: "https://cms.caishenunited.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-16-at-8.12.35-AM.jpeg",
      link: "/collections"
    },
    {
      image: "https://cms.caishenunited.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-16-at-8.12.36-AM-1.jpeg",
      link: "/collections"
    },
    {
      image: "https://cms.caishenunited.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-16-at-8.12.36-AM.jpeg",
      link: "/collections"
    }
  ];

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
    <div className="w-full relative rounded-xl md:rounded-3xl overflow-hidden shadow-lg">
      <div
        className="w-full relative overflow-hidden"
        style={{
          aspectRatio: typeof window !== 'undefined' && window.innerWidth < 768 ? '4/3' : '16/7'
        }}
      >
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
  alt={`Banner ${index + 1}`}
  className="w-full h-full object-contain bg-black transition-transform duration-500 group-hover:scale-105"
  loading={index === 0 ? 'eager' : 'lazy'}
/>
            </Link>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={goToPrevious}
          className="hidden md:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40
            bg-white/90 hover:bg-white border border-gray-200 text-gray-700
            w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300 hover:scale-110
            items-center justify-center shadow-lg hover:shadow-xl"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={goToNext}
          className="hidden md:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40
            bg-white/90 hover:bg-white border border-gray-200 text-gray-700
            w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300 hover:scale-110
            items-center justify-center shadow-lg hover:shadow-xl"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 z-30
          flex gap-1 sm:gap-1.5 md:gap-2 bg-white/80 md:bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 shadow-lg">
          {banners.map((_: Banner, index: number) => (
            <button
              key={index}
              className={`rounded-full cursor-pointer transition-all duration-300
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#9e734d]/50
                ${index === current
                  ? 'bg-[#9e734d] w-4 sm:w-6 md:w-8 h-1.5 sm:h-2 md:h-2.5'
                  : 'bg-gray-300 hover:bg-gray-400 w-1.5 sm:w-2 md:w-2.5 h-1.5 sm:h-2 md:h-2.5'
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
