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
      <span className="text-xs sm:text-sm text-white font-light tracking-wide leading-tight">
      Use discount code <span className="font-semibold tracking-wider text-white/90">NEWBEGIN10</span> {' '}
        <span className="font-semibold text-white px-2.5 py-1 bg-white/20 rounded-md shadow-sm">
        Get 10% OFF
        </span>
        {' '} with more Exciting Offers.{' '}
        
      </span>
    </span>
  );

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
