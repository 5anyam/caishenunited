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
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={product.images?.[0]?.src || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Discount Badge - Top Left */}
          {isOnSale && (
            <div className="absolute top-3 left-3 bg-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              {discountPercentage}% OFF
            </div>
          )}

          {/* Other Badges - Top Right */}
          {product.badge && (
            <div className={`absolute top-3 right-3 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${
              product.badge === 'New' 
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500' 
                : 'bg-gradient-to-r from-amber-500 to-orange-500'
            }`}>
              {product.badge}
            </div>
          )}

          {/* Wishlist Icon - Bottom Right */}
          <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2.5">
          {/* Category Tag */}
          {product.category && (
            <div className="inline-block">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {product.category}
              </span>
            </div>
          )}

          {/* Product Name */}
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-snug min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          {Number.isFinite(rating) && rating > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.round(rating) ? "text-amber-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.92c.969 0 1.371 1.24.588 1.81l-3.977 2.89 1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.977 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674-3.977-2.89c-.784-.57-.38-1.81.588-1.81h4.92l1.518-4.674z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-medium text-gray-600">
                {rating.toFixed(1)}
              </span>
              {product.rating_count && (
                <span className="text-xs text-gray-400">
                  ({product.rating_count})
                </span>
              )}
            </div>
          )}

          {/* Price Section */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">
                ₹{salePrice.toLocaleString()}
              </span>
              {isOnSale && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Add to Cart Icon Button */}
            <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Savings Badge */}
          {isOnSale && (
            <div className="bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-lg inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Save ₹{(originalPrice - salePrice).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
