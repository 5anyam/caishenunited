"use client";

import Link from "next/link";
import { productToSlug } from "../lib/slug";
import { Sparkles, ArrowRight } from 'lucide-react';

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
  const discountPercent = isOnSale ? Math.round(((originalPrice - salePrice) / originalPrice) * 100) : 0;

  return (
    <Link href={productUrl}>
      <div className="group relative overflow-hidden bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-xl hover:border-[#9e734d]/40">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.images?.[0]?.src || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {/* New Badge */}
            {product.badge === 'New' && (
              <div className="bg-[#9e734d] text-white text-xs font-medium px-3 py-1 rounded-full">
                NEW
              </div>
            )}
            
            {/* Sale Badge */}
            {isOnSale && discountPercent > 0 && (
              <div className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                {discountPercent}% OFF
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Category */}
          {product.category && (
            <div className="text-xs text-[#9e734d] uppercase tracking-wider font-medium">
              {product.category}
            </div>
          )}

          {/* Product Name */}
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-relaxed min-h-[2.5rem] group-hover:text-[#9e734d] transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {Number.isFinite(rating) && rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.round(rating) 
                        ? "text-[#9e734d] fill-[#9e734d]" 
                        : "text-gray-300 fill-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.92c.969 0 1.371 1.24.588 1.81l-3.977 2.89 1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.977 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674-3.977-2.89c-.784-.57-.38-1.81.588-1.81h4.92l1.518-4.674z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-600 font-medium">
                {rating.toFixed(1)}
              </span>
              {product.rating_count && product.rating_count > 0 && (
                <span className="text-xs text-gray-400">
                  ({product.rating_count})
                </span>
              )}
            </div>
          )}

          {/* Price Section */}
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-gray-900">
                ₹{salePrice.toLocaleString()}
              </span>
              {isOnSale && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Savings Text */}
            {isOnSale && (
              <div className="text-xs text-[#9e734d] mt-1 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Save ₹{(originalPrice - salePrice).toLocaleString()}
              </div>
            )}
          </div>

          {/* View Details Button - Copper Theme */}
          <button className="w-full mt-3 py-2.5 text-sm text-white bg-gradient-to-r from-[#9e734d] to-[#8a6342] rounded-lg font-medium hover:from-[#8a6342] hover:to-[#9e734d] transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-lg">
            View Details
            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </Link>
  );
}
