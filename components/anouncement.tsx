'use client';

import { useState, useEffect } from 'react';
import { X, Tag } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      // Store in localStorage so it doesn't show again in this session
      localStorage.setItem('announcementBarClosed', 'true');
    }, 300);
  };

  useEffect(() => {
    // Check if user has already closed the bar
    const isClosed = localStorage.getItem('announcementBarClosed');
    if (isClosed) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  const announcementText = (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <Tag className="w-3.5 h-3.5 text-gray-300" />
      <span className="text-xs sm:text-sm font-light tracking-wide">
        New Customer Offer: Get{' '}
        <span className="font-semibold text-white px-2 py-0.5 bg-white/20 rounded">
          10% OFF
        </span>
        {' '}your first order with code{' '}
        <span className="font-semibold tracking-wider">FIRST10</span>
      </span>
      <span className="mx-8 text-gray-400">•</span>
    </span>
  );

  return (
    <div 
      className={`bg-black text-white py-2.5 px-4 relative overflow-hidden transition-all duration-300 ${
        isClosing ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="max-w-full">
        <div className="flex items-center justify-between gap-4">
          {/* Marquee Container */}
          <div className="flex-1 overflow-hidden relative">
            <div className="flex animate-marquee hover:pause-marquee">
              {/* Repeat content multiple times for seamless loop */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-shrink-0">
                  {announcementText}
                </div>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200 group z-10"
            aria-label="Close announcement"
          >
            <X className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>
      </div>

      {/* CSS for Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .pause-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
