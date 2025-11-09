"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../lib/woocommerceApi";
import ProductCard from "../../components/ProductCard";
import Link from "next/link";
import { ChevronRight, Shield, Sparkles, Package, Award, Star, Crown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

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

// Enhanced Product Skeleton - Pure Black theme
const ProductSkeleton = () => (
  <div className="bg-white dark:bg-black overflow-hidden border border-gray-100 dark:border-[#D4AF37]/20 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all duration-500 relative group">
    <div className="aspect-square bg-gradient-to-r from-gray-50 via-[#F5E6D3]/20 to-gray-50 dark:from-black dark:via-[#D4AF37]/10 dark:to-black animate-shimmer bg-[length:200%_100%]" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gradient-to-r from-gray-100 via-[#F5E6D3]/30 to-gray-100 dark:from-black dark:via-[#D4AF37]/20 dark:to-black animate-shimmer bg-[length:200%_100%]" />
      <div className="h-3 bg-gradient-to-r from-gray-50 via-[#F5E6D3]/20 to-gray-50 dark:from-black dark:via-[#D4AF37]/10 dark:to-black w-2/3 animate-shimmer bg-[length:200%_100%]" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
);

export default function Homepage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'covers' | 'accessories'>('all');
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

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
    <div className="min-h-screen bg-white dark:bg-black overflow-hidden transition-colors duration-300">
      {/* Hero Section - Always dark with gold accents */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center bg-gradient-to-b from-[#0A0A0A] via-[#1A1A1A] to-black overflow-hidden"
      >
        {/* Animated gold gradient background */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent animate-pulse-slow"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: 1 - scrollY / 800
          }}
        />
        
        {/* Gold geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-96 h-96 border border-[#D4AF37] rotate-45 animate-spin-slow" />
          <div className="absolute bottom-20 left-20 w-64 h-64 border border-[#D4AF37] rotate-12 animate-spin-reverse" />
        </div>
        
        {/* Floating gold particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                background: `linear-gradient(135deg, #D4AF37 0%, #F5E6D3 100%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 15}s`,
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)'
              }}
            />
          ))}
        </div>
        
        <div 
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: 1 - scrollY / 600
          }}
        >
          {/* Logo with gold glow effect */}
          <div className="mb-10 flex justify-center animate-fade-in-up">
            <div className="relative group">
              <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-[#D4AF37]/20 to-[#F5E6D3]/20 animate-pulse-slow" />
              <img 
                src="/logo.png" 
                alt="Caishen United" 
                className="relative h-28 md:h-40 w-auto filter drop-shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-700"
              />
            </div>
          </div>

          {/* Hero Text with gold gradient */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5E6D3] to-[#D4AF37] mb-6 tracking-tight animate-fade-in-up animation-delay-200 animate-shimmer-text bg-[length:200%_100%]">
            Armor Your Device
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light tracking-wide max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
            Premium protection meets sophisticated design.
          </p>
          <p className="text-base md:text-lg text-[#D4AF37] mb-12 font-light tracking-widest max-w-2xl mx-auto animate-fade-in-up animation-delay-500 flex items-center justify-center gap-2">
            <Crown className="w-5 h-5" />
            Where luxury embraces functionality
            <Crown className="w-5 h-5" />
          </p>

          {/* CTA Buttons with gold accents */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600">
            <Link
              href="/products"
              className="group relative px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-500 flex items-center gap-2 hover:gap-4 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:scale-105 transform"
            >
              <span className="relative z-10">Explore Collection</span>
              <ChevronRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5E6D3] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <Link
              href="/about"
              className="px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] text-sm font-medium tracking-widest uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 transform relative overflow-hidden group"
            >
              <span className="relative z-10">Our Story</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5E6D3]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>
          </div>
        </div>

        {/* Enhanced Scroll Indicator with gold */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center relative overflow-hidden">
            <div className="w-1 h-3 bg-gradient-to-b from-[#D4AF37] to-[#F5E6D3] rounded-full mt-2 animate-scroll-indicator shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
          </div>
        </div>
      </section>

      {/* Trust Banner - Pure Black */}
      <section className="py-8 border-y border-[#D4AF37]/20 bg-black dark:bg-black sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Shield, text: "Premium Protection", delay: "0ms" },
              { icon: Sparkles, text: "Luxury Design", delay: "100ms" },
              { icon: Package, text: "Fast Delivery", delay: "200ms" },
              { icon: Award, text: "Quality Assured", delay: "300ms" }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-center gap-2 group animate-slide-in-bottom relative"
                style={{ animationDelay: item.delay }}
              >
                <div className="relative">
                  <div className="absolute inset-0 blur-lg bg-[#D4AF37]/20 scale-0 group-hover:scale-100 transition-transform duration-500" />
                  <item.icon className="relative w-6 h-6 text-[#D4AF37] group-hover:text-[#F5E6D3] group-hover:scale-110 transition-all duration-300" />
                </div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-medium group-hover:text-[#D4AF37] transition-colors">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Pure Black in dark mode */}
      <section className="py-24 px-4 bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with gold accent */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
                Handcrafted Excellence
              </p>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6 tracking-tight transition-colors duration-300">
              Featured Collection
            </h2>
            <div className="relative w-20 h-px mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-expand" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5E6D3] to-transparent animate-pulse" />
            </div>
          </div>

          {/* Category Filter with gold active state */}
          <div className="flex justify-center gap-6 mb-12 flex-wrap">
            {[
              { key: 'all', label: 'All Products' },
              { key: 'covers', label: 'Phone Covers' },
              { key: 'accessories', label: 'Accessories' }
            ].map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key as typeof activeCategory)}
                className={`text-sm uppercase tracking-widest pb-2 transition-all duration-500 relative group ${
                  activeCategory === category.key
                    ? 'text-black dark:text-white font-medium'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                {category.label}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#F5E6D3] transition-all duration-500 ${
                    activeCategory === category.key ? 'w-full shadow-[0_2px_10px_rgba(212,175,55,0.5)]' : 'w-0'
                  }`}
                />
                {activeCategory !== category.key && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#D4AF37]/30 group-hover:w-full transition-all duration-300" />
                )}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="bg-gradient-to-br from-gray-50 to-[#F5E6D3]/10 dark:from-black dark:to-[#D4AF37]/5 p-12 max-w-md mx-auto border border-[#D4AF37]/20 transition-colors duration-300">
                <p className="text-gray-600 dark:text-gray-400 mb-6 font-light">Unable to load products</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 transform font-medium"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-400 dark:text-gray-600 animate-fade-in">
              <p className="font-light">New collection arriving soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {displayProducts.map((prod, index) => (
                <div
                  key={prod.id}
                  className="animate-fade-in-up group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative">
                    <div className="absolute -inset-px bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                    <ProductCard product={prod} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View All CTA with gold styling */}
          {!isLoading && displayProducts.length > 0 && (
            <div className="mt-16 flex justify-center animate-fade-in animation-delay-800">
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-3 px-10 py-4 text-sm uppercase tracking-widest text-black dark:text-white border-2 border-black dark:border-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-500 hover:scale-105 transform overflow-hidden"
              >
                <span className="relative z-10">View Full Collection</span>
                <ChevronRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 to-[#F5E6D3]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section - Always pure black */}
      <section 
        ref={statsRef}
        className="py-20 px-4 bg-black border-y border-[#D4AF37]/20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Happy Customers", icon: Star },
              { number: "10+", label: "Device Models", icon: Sparkles },
              { number: "4.9★", label: "Average Rating", icon: Award },
              { number: "100%", label: "Quality Tested", icon: Shield }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`text-center group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} relative`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="relative flex justify-center mb-3">
                  <div className="p-3 border border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-colors duration-300">
                    <stat.icon className="w-6 h-6 text-[#D4AF37] group-hover:text-[#F5E6D3] transition-colors duration-300" />
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] to-[#F5E6D3] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-400 group-hover:text-[#D4AF37] transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section - Pure Black in dark mode */}
      <section className="py-24 px-4 bg-white dark:bg-black relative overflow-hidden transition-colors duration-300">
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#F5E6D3]/20 dark:from-[#D4AF37]/10 via-transparent to-transparent opacity-50"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image Side with gold overlay */}
            <div className="relative aspect-[4/5] bg-gradient-to-br from-black to-[#2A2A2A] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent group-hover:from-[#D4AF37]/30 transition-all duration-700"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Crown className="w-32 h-32 text-[#D4AF37]/20 group-hover:scale-110 group-hover:text-[#D4AF37]/30 transition-all duration-700" />
              </div>
              <div className="absolute inset-0 border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37]/40 transition-colors duration-700 m-6" />
            </div>

            {/* Content Side */}
            <div className="space-y-6 animate-fade-in-right">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
                  The Caishen Legacy
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white tracking-tight leading-tight transition-colors duration-300">
                Crafted for Those Who <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#C5A028]">Demand Excellence</span>
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-base transition-colors duration-300">
                Inspired by Caishen, the ancient deity of prosperity and fortune, we believe your devices deserve the same level of protection and prestige. Each product is meticulously designed to blend timeless elegance with modern durability.
              </p>
              <div className="bg-gradient-to-r from-[#F5E6D3]/20 dark:from-[#D4AF37]/10 to-transparent p-6 border-l-2 border-[#D4AF37]">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-light text-base italic transition-colors duration-300">
                  From premium materials to precision engineering, Caishen United represents a commitment to quality that transcends the ordinary.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-black dark:text-white hover:text-[#D4AF37] hover:gap-4 transition-all duration-500 font-medium mt-4 group relative"
              >
                <span>Discover Our Journey</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Pure Black in dark mode */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Crown className="w-5 h-5 text-[#D4AF37]" />
              <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
                The Caishen Advantage
              </p>
              <Crown className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
              Uncompromising Quality
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Shield,
                title: "Military-Grade Protection",
                desc: "Advanced shock-absorption technology and reinforced corners ensure your device withstands the demands of everyday life.",
                delay: "0ms"
              },
              {
                icon: Sparkles,
                title: "Timeless Aesthetics",
                desc: "Minimalist designs that complement your lifestyle, crafted with premium materials that age gracefully over time.",
                delay: "200ms"
              },
              {
                icon: Award,
                title: "Lifetime Warranty",
                desc: "We stand behind our craftsmanship with a comprehensive warranty, because excellence should be permanent.",
                delay: "400ms"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="text-center space-y-4 group animate-fade-in-up hover:transform hover:scale-105 transition-all duration-500 relative"
                style={{ animationDelay: feature.delay }}
              >
                <div className="absolute -inset-px bg-gradient-to-b from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="relative inline-flex items-center justify-center w-20 h-20 border-2 border-gray-200 dark:border-[#D4AF37]/30 mb-4 group-hover:border-[#D4AF37] transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#C5A028] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <feature.icon className="relative w-7 h-7 text-gray-900 dark:text-white group-hover:text-black transition-colors duration-500 z-10" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#C5A028] transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Always pure black */}
      <section className="py-32 px-4 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent animate-pulse-slow"></div>
        
        {/* Animated gold orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F5E6D3]/10 rounded-full blur-3xl animate-float-slow animation-delay-1000"></div>
        
        {/* Gold geometric accent */}
        <div className="absolute top-10 right-10 w-32 h-32 border-2 border-[#D4AF37]/20 rotate-45" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-[#D4AF37]/20 -rotate-12" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Crown className="w-16 h-16 text-[#D4AF37] mx-auto mb-6 animate-fade-in" />
          <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight animate-fade-in text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5E6D3] to-white">
            Elevate Your Everyday
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-light max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Join the Caishen United community and experience the perfect fusion of 
            <span className="text-[#D4AF37]"> protection and prestige</span>.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black text-sm uppercase tracking-widest font-bold transition-all duration-500 hover:scale-110 transform hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] animate-fade-in animation-delay-400 relative overflow-hidden group"
          >
            <span className="relative z-10">Shop Now</span>
            <ChevronRight className="relative z-10 w-4 h-4" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5E6D3] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes shimmer-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(15px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(50px, 50px); }
          66% { transform: translate(-30px, 70px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(12deg); }
          to { transform: rotate(-348deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes scroll-indicator {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-bottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expand {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-shimmer-text {
          animation: shimmer-text 5s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2.5s ease-in-out infinite;
        }
        
        .animate-scroll-indicator {
          animation: scroll-indicator 2.5s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }
        
        .animate-slide-in-bottom {
          animation: slide-in-bottom 0.6s ease-out forwards;
        }
        
        .animate-expand {
          animation: expand 1.5s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }
        
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-800 { animation-delay: 800ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
}
