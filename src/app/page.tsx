"use client";
import Testimonials from "../../components/TestimonialsSection";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../lib/woocommerceApi";
import ProductCard from "../../components/ProductCard";
import HeroCarousel from "../../components/HeroCarousel";
import MarqueeBanner from "../../components/MarqueeBanner";
import AboutUsSection from "../../components/AboutUs";
import HomeFAQ from "../../components/HomeFaq";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  description?: string;
  short_description?: string;
  images?: { src: string }[];
  categories?: { id: number; name: string; slug?: string }[];
  attributes?: { option: string }[];
}

// Helper functions
const isCombo = (p: Product): boolean => {
  const cats = p.categories || [];
  const inComboCategory = cats.some((c) =>
    /combo|duo|set|bundle/i.test(c.name || c.slug || "")
  );
  const nameLooksCombo = /combo|duo|set|bundle/i.test(p.name || "");
  return inComboCategory || nameLooksCombo;
};

const is10ml = (p: Product): boolean => {
  return /10\s*ml|10ml/i.test(p.name || "");
};

// Loading Skeleton Component
const ProductSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
    <div className="aspect-square bg-gray-100 animate-pulse" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded animate-pulse" />
      <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" />
    </div>
  </div>
);

export default function Homepage() {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Fixed React Query configuration
  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["homepage-products"],
    queryFn: async () => {
      console.log('Fetching products...'); // Debug log
      const result = await fetchProducts();
      console.log('Products fetched:', result?.length); // Debug log
      return (result || []) as Product[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - data stays fresh
    gcTime: 30 * 60 * 1000, // 30 minutes - cache time (was cacheTime in v4)
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
    retry: 3, // Retry 3 times on failure
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  const all = Array.isArray(data) ? data : [];

  // Split collections
  const signature = all.filter((p) => !isCombo(p) && !is10ml(p));
  const combos = all.filter((p) => isCombo(p));
  const tenMl = all.filter((p) => is10ml(p));

  const signatureTop6 = signature.slice(0, 6);
  const comboTop6 = combos.slice(0, 6);

  // Slider functions
  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Debug: Log current state
  console.log('Query state:', { isLoading, isError, dataLength: all.length });

  return (
    <div className="min-h-screen bg-white pb-16 overflow-x-hidden">
      <HeroCarousel />
      <MarqueeBanner />

      {/* Signature Collection */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3 tracking-wide">
              Signature Collection
            </h2>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
            <p className="text-gray-600 text-base max-w-2xl mx-auto font-light">
              Discover our most coveted fragrances that capture desire and sophistication
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                <p className="text-gray-600 mb-4">Unable to load products</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors rounded-sm"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          ) : signatureTop6.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Products will be available soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {signatureTop6.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 10ml Pack Section - Slider */}
      {!isLoading && tenMl.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3 tracking-wide">
                Travel Size Collection
              </h2>
              <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
              <p className="text-gray-600 text-base max-w-2xl mx-auto font-light">
                Perfect for on-the-go luxury. Try before you commit.
              </p>
            </div>

            <div className="relative group">
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>

              <div
                ref={sliderRef}
                className="flex gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
              >
                {tenMl.map((prod) => (
                  <div key={prod.id} className="flex-shrink-0 w-64">
                    <ProductCard product={prod} />
                  </div>
                ))}
              </div>

              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Combo Section */}
      {!isLoading && comboTop6.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3 tracking-wide">
                Curated Duos
              </h2>
              <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
              <p className="text-gray-600 text-base max-w-2xl mx-auto font-light">
                Hand-picked fragrance combinations for day-to-night versatility
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {comboTop6.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>

            {combos.length > 6 && (
              <div className="mt-10 flex justify-center">
                <Link
                  href="/combos"
                  className="inline-flex items-center gap-2 px-8 py-3 text-sm font-light tracking-wide text-white bg-black hover:bg-gray-800 transition-colors duration-300 rounded-sm"
                >
                  View All Duos
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      <AboutUsSection />
      <Testimonials />
      <HomeFAQ />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
