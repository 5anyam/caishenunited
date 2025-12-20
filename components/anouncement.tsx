'use client';

import { useState, useEffect } from 'react';
import { Tag } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has already closed the bar
    const isClosed = localStorage.getItem('announcementBarClosed');
    if (isClosed) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  const announcementText = (
    <span className="inline-flex items-center gap-2 whitespace-nowrap px-4 py-2">
      <Tag className="w-4 h-4 text-gray-300 flex-shrink-0" />
      <span className="text-xs sm:text-sm font-light tracking-wide leading-tight">
        New Customer Offer: Get{' '}
        <span className="font-semibold text-white px-2.5 py-1 bg-white/20 rounded-md shadow-sm">
          10% OFF
        </span>
        {' '}your first order with code{' '}
        <span className="font-semibold tracking-wider text-white/90">NEWBEGIN10</span>
      </span>
    </span>
  );

  const handleClose = () => {
    localStorage.setItem('announcementBarClosed', 'true');
    setIsVisible(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[999] bg-gradient-to-r from-black via-gray-900 to-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-12">
          {/* Marquee Container - No cross button */}
          <div className="w-full overflow-hidden">
            <div 
              className="flex animate-marquee hover:[animation-play-state:paused] h-full items-center"
              style={{ animationDuration: '25s' }}
            >
              {/* Repeat content for seamless loop */}
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex-shrink-0 px-4">
                  {announcementText}
                </div>
              ))}
            </div>
          </div>
          
          {/* Close Button - Top Right Corner */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-4 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-200 group z-[1000] border border-white/20 hover:border-white/40 hover:scale-105"
            aria-label="Close announcement"
          >
            <svg 
              className="w-4 h-4 text-white/90 group-hover:text-white group-hover:scale-110 transition-all duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
