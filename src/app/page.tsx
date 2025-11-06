"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../lib/woocommerceApi";
import ProductCard from "../../components/ProductCard";
import Link from "next/link";
import { ChevronRight, Shield, Sparkles, Package, Award } from 'lucide-react';
import { useState } from 'react';

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

// Product Skeleton
const ProductSkeleton = () => (
  <div className="bg-white rounded-sm overflow-hidden border border-gray-100 hover:border-gray-300 transition-all duration-300">
    <div className="aspect-square bg-gray-50 animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-100 rounded animate-pulse" />
      <div className="h-3 bg-gray-50 rounded w-2/3 animate-pulse" />
    </div>
  </div>
);

export default function Homepage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'covers' | 'accessories'>('all');
  

  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["homepage-products"],
    queryFn: async () => {
      const result = await fetchProducts();
      return (result || []) as Product[];
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
  });

  const all = Array.isArray(data) ? data : [];

  // Category filtering
  const phoneCovers = all.filter((p) => 
    p.categories?.some(c => /cover|case/i.test(c.name || ""))
  );
  const accessories = all.filter((p) => 
    p.categories?.some(c => /accessory|charger|cable|stand|holder/i.test(c.name || ""))
  );

  const displayProducts = activeCategory === 'all' ? all.slice(0, 8) : 
                          activeCategory === 'covers' ? phoneCovers.slice(0, 8) : 
                          accessories.slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Premium & Minimal */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-50/20 via-transparent to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/3600X1600.webp" 
              alt="Caishen United" 
              className="h-24 md:h-32 w-auto"
            />
          </div>

          {/* Hero Text */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-6 tracking-tight">
            Armor Your Device
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light tracking-wide max-w-3xl mx-auto">
            Premium protection meets sophisticated design. Where luxury embraces functionality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="group px-10 py-4 bg-black text-white text-sm font-medium tracking-widest uppercase hover:bg-gray-900 transition-all duration-300 flex items-center gap-2"
            >
              Explore Collection
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-10 py-4 border-2 border-black text-black text-sm font-medium tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-6 border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-6 h-6 text-gray-800" />
              <p className="text-xs uppercase tracking-wider text-gray-600 font-medium">Premium Protection</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Sparkles className="w-6 h-6 text-gray-800" />
              <p className="text-xs uppercase tracking-wider text-gray-600 font-medium">Luxury Design</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Package className="w-6 h-6 text-gray-800" />
              <p className="text-xs uppercase tracking-wider text-gray-600 font-medium">Fast Delivery</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Award className="w-6 h-6 text-gray-800" />
              <p className="text-xs uppercase tracking-wider text-gray-600 font-medium">Quality Assured</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
              Handcrafted Excellence
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
              Featured Collection
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8"></div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-6 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`text-sm uppercase tracking-widest pb-2 transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'text-black border-b-2 border-black font-medium'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setActiveCategory('covers')}
              className={`text-sm uppercase tracking-widest pb-2 transition-all duration-300 ${
                activeCategory === 'covers'
                  ? 'text-black border-b-2 border-black font-medium'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Phone Covers
            </button>
            <button
              onClick={() => setActiveCategory('accessories')}
              className={`text-sm uppercase tracking-widest pb-2 transition-all duration-300 ${
                activeCategory === 'accessories'
                  ? 'text-black border-b-2 border-black font-medium'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Accessories
            </button>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-20">
              <div className="bg-gray-50 rounded-sm p-12 max-w-md mx-auto border border-gray-100">
                <p className="text-gray-600 mb-6 font-light">Unable to load products</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-900 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="font-light">New collection arriving soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {displayProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}

          {/* View All CTA */}
          {!isLoading && displayProducts.length > 0 && (
            <div className="mt-16 flex justify-center">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 px-10 py-4 text-sm uppercase tracking-widest text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-300"
              >
                View Full Collection
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative aspect-[4/5] bg-gray-200 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-transparent"></div>
              {/* Add your brand image here */}
            </div>

            {/* Content Side */}
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 font-medium">
                The Caishen Legacy
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight leading-tight">
                Crafted for Those Who Demand Excellence
              </h2>
              <div className="w-16 h-px bg-gray-300"></div>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                Inspired by Caishen, the ancient deity of prosperity and fortune, we believe your devices deserve the same level of protection and prestige. Each product is meticulously designed to blend timeless elegance with modern durability.
              </p>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                From premium materials to precision engineering, Caishen United represents a commitment to quality that transcends the ordinary.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-black hover:gap-4 transition-all duration-300 font-medium mt-4"
              >
                Discover Our Journey
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
              The Caishen Advantage
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
              Uncompromising Quality
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-gray-900 mb-4">
                <Shield className="w-7 h-7 text-gray-900" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 tracking-wide">
                Military-Grade Protection
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Advanced shock-absorption technology and reinforced corners ensure your device withstands the demands of everyday life.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-gray-900 mb-4">
                <Sparkles className="w-7 h-7 text-gray-900" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 tracking-wide">
                Timeless Aesthetics
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Minimalist designs that complement your lifestyle, crafted with premium materials that age gracefully over time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-gray-900 mb-4">
                <Award className="w-7 h-7 text-gray-900" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 tracking-wide">
                Lifetime Warranty
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                We stand behind our craftsmanship with a comprehensive warranty, because excellence should be permanent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-4 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
            Elevate Your Everyday
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-light max-w-2xl mx-auto">
            Join the Caishen United community and experience the perfect fusion of protection and prestige.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all duration-300 font-medium"
          >
            Shop Now
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
