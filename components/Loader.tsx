'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const showLoader = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    setIsLoading(false);
  }, []);

  // 1. CLICK pe loader ON
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
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
        showLoader();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showLoader]);

  // 2. ROUTE CHANGE START pe loader ON (Next.js event)
  useEffect(() => {
    const handleRouteChangeStart = () => {
      showLoader();
    };

    // Next.js App Router events
    if (typeof window !== 'undefined') {
      window.addEventListener('router.start', handleRouteChangeStart);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('router.start', handleRouteChangeStart);
      }
    };
  }, [showLoader]);

  // 3. ROUTE CHANGE COMPLETE pe loader OFF (turant!)
  useEffect(() => {
    // Route change complete hone pe turant hide
    hideLoader();
  }, [pathname, hideLoader]);

  // 4. Next.js Router events se bhi detect karo
  useEffect(() => {
    const handleRouteChangeComplete = () => {
      hideLoader();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('router.complete', handleRouteChangeComplete);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('router.complete', handleRouteChangeComplete);
      }
    };
  }, [hideLoader]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 p-8 bg-white/95 rounded-2xl shadow-2xl border border-gray-200 max-w-sm mx-4 animate-in fade-in duration-200">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
          <div className="absolute -inset-1 w-16 h-16 border-4 border-transparent border-t-[#9e734d] rounded-full animate-ping" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-1">Loading...</h3>
          <p className="text-sm text-gray-500">Just a moment</p>
        </div>
      </div>
    </div>
  );
}
