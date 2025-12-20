'use client';

import React from 'react';

interface LoaderProps {
  isLoading?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading = false }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 p-8 bg-white/95 rounded-2xl shadow-2xl border border-gray-200 max-w-sm mx-4 animate-fade-in">
        {/* Dual Ring Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute -inset-1 w-16 h-16 border-4 border-transparent border-t-orange-500 rounded-full animate-ping"></div>
          <div className="absolute inset-0 w-16 h-16 border-3 border-transparent border-t-emerald-500 rounded-full animate-pulse [animation-duration:1.5s]"></div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center">
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
            Loading...
          </h3>
          <p className="text-sm text-gray-500 font-medium">Please wait a moment</p>
        </div>
        
        {/* Progress Dots */}
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.1s]"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
