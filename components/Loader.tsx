'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Skip some UI interactions
      if (
        target.closest('button') ||
        target.closest('[data-no-loader]') ||
        target.closest('.no-loader') ||
        target.closest('.header-internal') ||
        target.closest('.submenu')
      ) {
        return;
      }

      const link = target.closest('a');
      if (
        link &&
        link.hostname === window.location.hostname &&
        link.href !== window.location.href
      ) {
        setIsLoading(true);
        // Minimum 400ms show
        setTimeout(() => setIsLoading(false), 400);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Hide on route change complete
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 p-8 bg-white/95 rounded-2xl shadow-2xl border border-gray-200 max-w-sm mx-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
          <div className="absolute -inset-1 w-16 h-16 border-4 border-transparent border-t-[#9e734d] rounded-full animate-ping" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-1">Loading...</h3>
          <p className="text-sm text-gray-500">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
}
