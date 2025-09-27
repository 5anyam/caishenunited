'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles, Heart, Gift } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const announcements = [
    {
      id: 1,
      icon: <Sparkles className="w-4 h-4" />,
      text: "New Launch: ",
      highlight: "MIDNIGHT DESIRE",
      description: "- The seductive fragrance you've been waiting for! 🌙",
      bgColor: "from-rose-500 to-pink-600"
    },
    {
      id: 2,
      icon: <Gift className="w-4 h-4" />,
      text: "Limited Offer: Get ",
      highlight: "30% OFF",
      description: "on your first purchase + Free shipping! Use code: FIRST30",
      bgColor: "from-purple-500 to-violet-600"
    },
    {
      id: 3,
      icon: <Heart className="w-4 h-4" />,
      text: "Customer Love: ",
      highlight: "5000+ HAPPY CUSTOMERS",
      description: "have found their signature scent with us! ✨",
      bgColor: "from-pink-500 to-rose-600"
    }
  ];

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const nextAnnouncement = () => {
    if (!isPaused) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }
  };

  const prevAnnouncement = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextAnnouncement();
      }, 4000); // Change every 4 seconds

      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused]);

  // Auto-close after 2 minutes
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 120000); // 2 minutes
    
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const currentAnnouncement = announcements[currentIndex];

  return (
    <div 
      className={`bg-gradient-to-r ${currentAnnouncement.bgColor} text-white py-2 md:py-3 px-3 md:px-4 relative overflow-hidden transition-all duration-500 ${
        isAnimating ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black/10 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between">
          {/* Left Navigation - Desktop only */}
          <button
            onClick={prevAnnouncement}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-all duration-200 group"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          </button>
          
          {/* Center Content */}
          <div className="flex items-center justify-center flex-1 px-2">
            <div className="flex items-center space-x-2 text-center max-w-4xl">
              <span className="flex-shrink-0">
                {currentAnnouncement.icon}
              </span>
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-0">
                <span className="text-xs md:text-sm font-medium">
                  {currentAnnouncement.text}
                  <span className="bg-white text-gray-800 px-2 py-0.5 rounded-full font-bold mx-1 text-xs md:text-sm">
                    {currentAnnouncement.highlight}
                  </span>
                </span>
                <span className="text-xs md:text-sm font-medium hidden sm:inline">
                  {currentAnnouncement.description}
                </span>
              </div>
            </div>
          </div>
          
          {/* Right Navigation + Close */}
          <div className="flex items-center gap-2">
            {/* Next Button - Desktop only */}
            <button
              onClick={nextAnnouncement}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-all duration-200 group"
              aria-label="Next announcement"
            >
              <ChevronRight className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-all duration-200 group flex-shrink-0"
              aria-label="Close announcement"
            >
              <X className="w-3 h-3 md:w-4 md:h-4 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-white/60 transition-all duration-100 ease-linear"
            style={{
              width: isPaused ? '100%' : '0%',
              animation: !isPaused ? 'progressBar 4s linear infinite' : 'none'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
