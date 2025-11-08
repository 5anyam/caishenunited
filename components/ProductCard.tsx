'use client';

import Link from "next/link";
import { productToSlug } from "../lib/slug";
import { Crown, Sparkles } from 'lucide-react';

interface Product {
  id: number | string;
  slug: string;
  name: string;
  price: string | number;
  regular_price: string;
  images?: { src: string }[];
  category?: string;
  average_rating?: string;
  rating_count?: number;
  badge?: "New" | "Sale";
}

export default function ProductCard({ product }: { product: Product }) {
  const productUrl = `/product/${productToSlug(product)}`;
  const rating = Number(product.average_rating);
  const salePrice = Number(product.price);
  const originalPrice = Number(product.regular_price);
  const isOnSale = originalPrice > salePrice;

  const discountPercentage = isOnSale
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;

  return (
    <Link href={productUrl}>
      <div className="group relative overflow-hidden bg-white transition-all duration-500 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] border border-gray-100 hover:border-[#D4AF37]/30">
        {/* Gold gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
        
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={product.images?.[0]?.src || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gold shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          {/* Discount Badge - Premium Gold */}
          {isOnSale && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black px-4 py-1.5 text-xs font-bold tracking-wider shadow-[0_4px_12px_rgba(212,175,55,0.4)] backdrop-blur-sm">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {discountPercentage}% OFF
              </span>
            </div>
          )}

          {/* New Badge - Premium Style */}
          {product.badge === 'New' && (
            <div className="absolute top-3 right-3 bg-black text-[#D4AF37] border border-[#D4AF37] text-xs font-medium px-4 py-1.5 tracking-wider backdrop-blur-sm">
              <span className="flex items-center gap-1">
                <Crown className="w-3 h-3" />
                NEW
              </span>
            </div>
          )}

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="text-white text-xs uppercase tracking-widest font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2">
              <span className="w-8 h-px bg-[#D4AF37]" />
              Quick View
              <span className="w-8 h-px bg-[#D4AF37]" />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 space-y-3 relative">
          {/* Category with gold accent */}
          {product.category && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-px bg-[#D4AF37]" />
              <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium">
                {product.category}
              </div>
            </div>
          )}

          {/* Product Name */}
          <h3 className="text-sm font-light text-gray-900 line-clamp-2 leading-relaxed tracking-wide min-h-[2.5rem] group-hover:text-black transition-colors">
            {product.name}
          </h3>

          {/* Rating - Premium Gold Stars */}
          {Number.isFinite(rating) && rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3.5 h-3.5 transition-colors duration-300 ${
                      i < Math.round(rating) 
                        ? "text-[#D4AF37] drop-shadow-[0_0_4px_rgba(212,175,55,0.4)]" 
                        : "text-gray-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.92c.969 0 1.371 1.24.588 1.81l-3.977 2.89 1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.977 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674-3.977-2.89c-.784-.57-.38-1.81.588-1.81h4.92l1.518-4.674z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-600 font-light">
                {rating.toFixed(1)}
              </span>
              {product.rating_count && product.rating_count > 0 && (
                <span className="text-xs text-gray-400 font-light">
                  ({product.rating_count})
                </span>
              )}
            </div>
          )}

          {/* Price Section with Gold Accent */}
          <div className="pt-3 border-t border-gray-100 group-hover:border-[#D4AF37]/30 transition-colors duration-500">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-medium text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#C5A028] transition-all duration-500">
                ₹{salePrice.toLocaleString()}
              </span>
              {isOnSale && (
                <span className="text-sm text-gray-400 line-through font-light">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Savings Text with Gold */}
            {isOnSale && (
              <div className="text-xs text-[#D4AF37] mt-1.5 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Save ₹{(originalPrice - salePrice).toLocaleString()}
              </div>
            )}
          </div>

          {/* Premium CTA Button */}
          <div className="pt-3">
            <button className="relative w-full py-3 text-xs text-gray-900 border-2 border-gray-200 tracking-widest uppercase font-medium overflow-hidden group/btn transition-all duration-500 hover:border-[#D4AF37]">
              {/* Gold gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              
              {/* Button text */}
              <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-black transition-colors duration-500">
                View Details
                <svg 
                  className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </div>

          {/* Premium indicator on hover */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Crown className="w-5 h-5 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
          </div>
        </div>
      </div>
    </Link>
  );
}
