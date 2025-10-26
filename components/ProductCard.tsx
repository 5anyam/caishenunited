'use client';

import Link from "next/link";
import { productToSlug } from "../lib/slug";

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
      <div className="group relative overflow-hidden bg-white transition-all duration-300 hover:shadow-lg">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.images?.[0]?.src || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Discount Badge - Minimal */}
          {isOnSale && (
            <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 text-xs font-light tracking-wide">
              -{discountPercentage}%
            </div>
          )}

          {/* New Badge */}
          {product.badge === 'New' && (
            <div className="absolute top-3 right-3 bg-white text-black border border-gray-200 text-xs font-light px-3 py-1 tracking-wide">
              New
            </div>
          )}

        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Category */}
          {product.category && (
            <div className="text-xs text-gray-500 uppercase tracking-widest font-light">
              {product.category}
            </div>
          )}

          {/* Product Name */}
          <h3 className="text-sm font-light text-gray-900 line-clamp-2 leading-relaxed tracking-wide min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating - Minimal */}
          {Number.isFinite(rating) && rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.round(rating) ? "text-gray-900" : "text-gray-300"
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
            </div>
          )}

          {/* Price Section */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-light text-gray-900">
                ₹{salePrice.toLocaleString()}
              </span>
              {isOnSale && (
                <span className="text-sm text-gray-400 line-through font-light">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Savings Text */}
            {isOnSale && (
              <div className="text-xs text-gray-500 mt-1 font-light">
                Save ₹{(originalPrice - salePrice).toLocaleString()}
              </div>
            )}
          </div>

          {/* View Details Button - Always Visible */}
          <div className="pt-3">
            <button className="w-full py-2.5 text-xs text-gray-900 border border-gray-200 tracking-widest uppercase font-light hover:bg-black hover:text-white hover:border-black transition-colors duration-300">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
