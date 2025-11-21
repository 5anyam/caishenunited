'use client';
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../lib/woocommerceApi";
import ProductCard from "../../components/ProductCard";
import Link from "next/link";
import { ChevronRight, Shield, Sparkles, Package, Award, Star, Crown, Smartphone, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Type definitions
interface BrandCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count: number;
}

interface Product {
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

// Compact ShopByBrand Component
const ShopByBrand: React.FC<{
  brands: BrandCategory[];
  activeBrand?: string;
  onBrandSelect?: (brand: BrandCategory) => void;
}> = ({ brands, activeBrand, onBrandSelect }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const brandList: BrandCategory[] = [
    { id: 'iphone', name: 'iPhone', slug: 'iphone', icon: '🍎', description: 'Premium', count: 45 },
    { id: 'samsung', name: 'Samsung', slug: 'samsung', icon: '📱', description: 'Galaxy', count: 38 },
    { id: 'oneplus', name: 'OnePlus', slug: 'oneplus', icon: '⚡', description: 'Premium', count: 25 },
    { id: 'google', name: 'Pixel', slug: 'google', icon: '🔍', description: 'Google', count: 22 },
    { id: 'xiaomi', name: 'Xiaomi', slug: 'xiaomi', icon: '📱', description: 'Redmi', count: 30 },
    { id: 'realme', name: 'Realme', slug: 'realme', icon: '📱', description: 'Cases', count: 18 },
  ];

  const finalBrands: BrandCategory[] = brands.length > 0 ? brands : brandList;

  const handleBrandSelect = (brand: BrandCategory) => {
    if (onBrandSelect) {
      onBrandSelect(brand);
    } else {
      router.push(`/shop?brand=${brand.slug}`);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Mobile View */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 bg-[#0a0a0a] border border-[#9e734d]/30 rounded-xl hover:border-[#9e734d] transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#9e734d]" />
            <span className="text-sm text-white font-medium">Brands</span>
          </div>
          <ChevronRight className={`w-4 h-4 text-[#9e734d] transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </button>

        {isOpen && (
          <div className="mt-2 bg-[#0a0a0a] border border-[#9e734d]/20 rounded-xl p-3 grid grid-cols-2 gap-2">
            {finalBrands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleBrandSelect(brand)}
                className={`p-3 rounded-lg text-left transition-all ${
                  activeBrand === brand.id
                    ? 'bg-[#9e734d]/20 border border-[#9e734d]'
                    : 'bg-[#1a1a1a] border border-[#9e734d]/10 hover:border-[#9e734d]/30'
                }`}
              >
                <div className="flex items-center gap-2">
                 
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium truncate ${
                      activeBrand === brand.id ? 'text-[#9e734d]' : 'text-white'
                    }`}>
                      {brand.name}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop View - Horizontal Scroll */}
      <div className="hidden lg:block">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {finalBrands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => handleBrandSelect(brand)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeBrand === brand.id
                  ? 'border-[#9e734d] bg-[#9e734d]/10 shadow-[0_0_20px_rgba(158,115,77,0.3)]'
                  : 'border-[#9e734d]/20 bg-[#0a0a0a] hover:border-[#9e734d]/50'
              }`}
            >
              <div className="flex items-center gap-2">
                
                <div className={`text-sm font-medium whitespace-nowrap ${
                  activeBrand === brand.id ? 'text-[#9e734d]' : 'text-white'
                }`}>
                  {brand.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Product Skeleton
const ProductSkeleton: React.FC = () => (
  <div className="bg-[#0a0a0a] overflow-hidden border border-[#9e734d]/20 rounded-2xl hover:border-[#9e734d]/40 transition-all duration-500 relative group">
    <div className="aspect-square bg-gradient-to-br from-[#1a1a1a] via-[#9e734d]/5 to-[#0a0a0a] animate-shimmer bg-[length:200%_100%]" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-gradient-to-r from-[#1a1a1a] via-[#9e734d]/10 to-[#1a1a1a] animate-shimmer bg-[length:200%_100%] rounded-full" />
      <div className="h-3 bg-gradient-to-r from-[#1a1a1a] via-[#9e734d]/5 to-[#1a1a1a] w-2/3 animate-shimmer bg-[length:200%_100%] rounded-full" />
    </div>
  </div>
);

export default function Homepage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'covers' | 'accessories'>('all');
  const [activeBrand, setActiveBrand] = useState<string>('');
  const [scrollY, setScrollY] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
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

  const all: Product[] = Array.isArray(data) ? data : [];

  const phoneCovers: Product[] = all.filter((p: Product) => 
    p.categories?.some(c => /cover|case/i.test(c.name || ""))
  );
  const accessories: Product[] = all.filter((p: Product) => 
    p.categories?.some(c => /accessory|charger|cable|stand|holder/i.test(c.name || ""))
  );

  let filteredProducts: Product[] = all;
  if (activeBrand) {
    filteredProducts = all.filter((p: Product) => 
      p.name.toLowerCase().includes(activeBrand.toLowerCase()) ||
      p.categories?.some((c: { name: string }) => c.name.toLowerCase().includes(activeBrand.toLowerCase()))
    );
  }

  let displayProducts: Product[];
  if (activeCategory === 'all') {
    displayProducts = filteredProducts.slice(0, 8);
  } else if (activeCategory === 'covers') {
    displayProducts = phoneCovers
      .filter((p: Product) => !activeBrand || p.name.toLowerCase().includes(activeBrand.toLowerCase()))
      .slice(0, 8);
  } else {
    displayProducts = accessories
      .filter((p: Product) => !activeBrand || p.name.toLowerCase().includes(activeBrand.toLowerCase()))
      .slice(0, 8);
  }


  const handleBrandSelect = (brand: BrandCategory) => {
    setActiveBrand(brand.id);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* ORIGINAL Hero Section - Enhanced Black with Copper (KEPT AS-IS) */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center bg-gradient-to-b from-[#0A0A0A] via-[#1A1A1A] to-black overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#9e734d]/15 via-[#9e734d]/5 to-transparent animate-pulse-slow"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: 1 - scrollY / 800
          }}
        />
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 border-2 border-[#9e734d] rotate-45 animate-spin-slow shadow-[0_0_50px_rgba(158,115,77,0.3)]" />
          <div className="absolute bottom-20 left-20 w-64 h-64 border-2 border-[#9e734d] rotate-12 animate-spin-reverse shadow-[0_0_40px_rgba(158,115,77,0.3)]" />
        </div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(40)].map((_, i: number) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                background: `radial-gradient(circle, #9e734d, #F5E6D3)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 12}s`,
                boxShadow: '0 0 15px rgba(158, 115, 77, 0.5)',
                opacity: Math.random() * 0.7 + 0.3
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
          <div className="mb-12 flex justify-center animate-fade-in-up">
            <div className="relative group">
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-[#9e734d]/30 via-[#F5E6D3]/20 to-[#9e734d]/30 animate-pulse-slow" />
              <div className="absolute -inset-4 bg-gradient-to-r from-[#9e734d]/20 to-[#F5E6D3]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src="/logo.png" 
                alt="Caishen United" 
                className="relative h-32 md:h-44 w-auto filter drop-shadow-[0_0_40px_rgba(158,115,77,0.6)] hover:drop-shadow-[0_0_60px_rgba(158,115,77,0.8)] hover:scale-110 transition-all duration-700"
              />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-[#9e734d] via-[#F5E6D3] to-[#9e734d] mb-8 tracking-tighter animate-fade-in-up animation-delay-200 animate-shimmer-text bg-[length:200%_100%] drop-shadow-[0_0_30px_rgba(158,115,77,0.5)]">
            Armor Your Device
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 mb-6 font-light tracking-wide max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
            Premium protection meets <span className="text-[#9e734d] font-medium">sophisticated design</span>
          </p>
          <p className="text-lg md:text-xl text-[#9e734d] mb-14 font-light tracking-widest max-w-2xl mx-auto animate-fade-in-up animation-delay-500 flex items-center justify-center gap-3">
            <Crown className="w-6 h-6 animate-pulse" />
            Where luxury embraces functionality
            <Crown className="w-6 h-6 animate-pulse" />
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in-up animation-delay-600">
            <Link
              href="/collections"
              className="group relative px-12 py-5 bg-gradient-to-r from-[#9e734d] via-[#b8834f] to-[#9e734d] text-black text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-500 flex items-center gap-2 hover:gap-5 hover:shadow-[0_0_50px_rgba(158,115,77,0.7)] hover:scale-110 transform rounded-lg bg-[length:200%_100%] animate-shimmer-slow"
            >
              <span className="relative z-10">Explore Collection</span>
              <ChevronRight className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5E6D3] to-[#9e734d] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <Link
              href="/about"
              className="px-12 py-5 border-2 border-[#9e734d] text-[#9e734d] text-sm font-semibold tracking-widest uppercase hover:bg-[#9e734d] hover:text-black transition-all duration-500 hover:shadow-[0_0_40px_rgba(158,115,77,0.6)] hover:scale-110 transform relative overflow-hidden group rounded-lg"
            >
              <span className="relative z-10">Our Story</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5E6D3]/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <div className="w-7 h-11 border-2 border-[#9e734d] rounded-full flex justify-center relative overflow-hidden shadow-[0_0_20px_rgba(158,115,77,0.4)]">
            <div className="w-1.5 h-4 bg-gradient-to-b from-[#9e734d] to-[#F5E6D3] rounded-full mt-2 animate-scroll-indicator shadow-[0_0_15px_rgba(158,115,77,0.7)]"></div>
          </div>
        </div>
      </section>

      {/* Trust Banner - Redesigned */}
      <section className="py-6 border-y border-[#9e734d]/20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            {[
              { icon: Shield, text: "Premium Protection" },
              { icon: Award, text: "Quality Guaranteed" },
              { icon: Package, text: "Fast Shipping" },
              { icon: Sparkles, text: "Best Service" }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-[#9e734d]" />
                  <span className="text-sm text-gray-400">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    {/* Featured Products Section - Enhanced Device Selection */}
<section className="py-12 px-4 bg-white">
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
        Shop by Device
      </h2>
      <p className="text-gray-600 text-sm">
        Find the perfect cover for your device
      </p>
    </div>

    {/* Enhanced Device Categories */}
    <div className="mb-12">
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
    {[
      { 
        name: 'Apple', 
        models: 'iPhone 17 Pro, 16, 15 & more',
        link: '/shop/iphone-covers',
        logo: '/apple.svg', // Add your logo path
        bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
        hoverColor: 'hover:from-gray-100 hover:to-gray-200'
      },
      { 
        name: 'Samsung', 
        models: 'Galaxy S25, Z Fold 7 & more',
        link: '/shop/samsung-covers',
        logo: '/samsung.svg',
        bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
        hoverColor: 'hover:from-blue-100 hover:to-blue-200'
      },
      { 
        name: 'OnePlus', 
        models: 'OnePlus 15, 13 & more',
        link: '/shop/oneplus-covers',
        logo: '/oneplus.png',
        bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
        hoverColor: 'hover:from-red-100 hover:to-red-200'
      },
      { 
        name: 'Google', 
        models: 'Pixel 10, 9 & more',
        link: '/shop/google-covers',
        logo: '/google.webp',
        bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
        hoverColor: 'hover:from-green-100 hover:to-green-200'
      },
      { 
        name: 'Nothing', 
        models: 'Nothing Phone & more',
        link: '/shop/nothing-covers',
        logo: '/realme.png',
        bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
        hoverColor: 'hover:from-yellow-100 hover:to-yellow-200'
      },
      { 
        name: 'Vivo', 
        models: 'Vivo V40, X100 & more',
        link: '/shop/vivo-covers',
        logo: '/vivo.png',
        bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
        hoverColor: 'hover:from-purple-100 hover:to-purple-200'
      },
      { 
        name: 'Redmi', 
        models: 'Redmi 17 Pro, 16, 15 & more',
        link: '/shop/redmi-covers',
        logo: '/redmi.png', // Add your logo path
        bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
        hoverColor: 'hover:from-gray-100 hover:to-gray-200'
      },
      { 
        name: 'Motorola', 
        models: 'Motorola M25, M9 & more',
        link: '/shop/motorola-covers',
        logo: '/motorola.svg',
        bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
        hoverColor: 'hover:from-blue-100 hover:to-blue-200'
      },
    ].map((device) => (
      <Link
        key={device.name}
        href={device.link}
        className={`group relative ${device.bgColor} ${device.hoverColor} border border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md`}
      >
        <div className="p-6 text-center">
          {/* Device Brand Logo */}
          <div className="w-12 h-12 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow p-2">
            <img 
              src={device.logo} 
              alt={`${device.name} logo`}
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback to letter if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `<span class="text-xl font-bold text-gray-800">${device.name.charAt(0)}</span>`;
              }}
            />
          </div>
          
          {/* Device Name */}
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {device.name}
          </h3>
          
          {/* Device Models */}
          <p className="text-xs text-gray-600 leading-tight">
            {device.models}
          </p>
        </div>

        {/* Hover Effect Arrow */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>
      </Link>
    ))}
  </div>
</div>


    {/* Enhanced Category Tabs */}
    <div className="mb-10">
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { key: 'all' as const, label: 'All Products', icon: '🛍️' },
          { key: 'covers' as const, label: 'Phone Covers', icon: '📱' },
          { key: 'accessories' as const, label: 'Accessories', icon: '🔌' }
        ].map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`group px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 border-2 ${
              activeCategory === cat.key
                ? 'bg-black text-white border-black shadow-lg scale-105'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:shadow-md'
            }`}
          >
            <span className="flex items-center gap-2">
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>

    {/* Brand Filter */}
    <ShopByBrand 
      brands={[]} 
      activeBrand={activeBrand} 
      onBrandSelect={handleBrandSelect} 
    />

    {/* Products Grid */}
    {isLoading ? (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {[...Array(8)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    ) : isError ? (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <Shield className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-600 mb-6 text-sm">Unable to load products</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
        >
          Retry
        </button>
      </div>
    ) : displayProducts.length === 0 ? (
      <div className="text-center py-20">
        <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-600 text-sm">No products found</p>
      </div>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {displayProducts.map((prod, i) => (
          <div
            key={prod.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <ProductCard product={prod} />
          </div>
        ))}
      </div>
    )}

    {/* View All Button */}
    {!isLoading && displayProducts.length > 0 && (
      <div className="mt-12 text-center">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 font-medium shadow-md hover:shadow-lg"
        >
          View All Products
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    )}
  </div>
</section>



      {/* Banner Section - Redesigned */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[500px] rounded-3xl overflow-hidden group">
            <Image
              src="https://cms.caishenunited.com/wp-content/uploads/2025/11/banner-scaled.jpg"
              alt="Caishen United Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-end p-8 md:p-12">
              <div className="max-w-2xl">
                <h3 className="text-3xl md:text-5xl font-light text-white mb-4">
                  Exclusive Collection
                </h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Discover our premium range of handcrafted phone cases
                </p>
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-[#9e734d] transition-all"
                >
                  Explore Now
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Redesigned */}
      <section 
        ref={statsRef}
        className="py-20 px-4 bg-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Happy Customers", icon: Star },
              { number: "4.9★", label: "Rating", icon: Award },
              { number: "10+", label: "Brands", icon: Sparkles },
              { number: "100%", label: "Quality", icon: Shield }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#9e734d]/10 rounded-full mb-4">
                    <Icon className="w-6 h-6 text-[#9e734d]" />
                  </div>
                  <div className="text-3xl md:text-4xl font-light text-[#9e734d] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Redesigned */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Why Choose Caishen
            </h2>
            <p className="text-gray-400">Premium quality meets exceptional service</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Military-Grade Protection",
                desc: "Advanced shock-absorption technology keeps your device safe from drops and impacts"
              },
              {
                icon: Sparkles,
                title: "Luxury Aesthetics",
                desc: "Meticulously crafted designs that complement your sophisticated lifestyle"
              },
              {
                icon: Award,
                title: "Lifetime Warranty",
                desc: "We stand behind our products with comprehensive warranty coverage"
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="text-center p-8 bg-black/50 border border-[#9e734d]/20 rounded-2xl hover:border-[#9e734d]/50 transition-all duration-300 group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#9e734d]/10 rounded-full mb-6 group-hover:bg-[#9e734d]/20 transition-colors">
                    <Icon className="w-8 h-8 text-[#9e734d]" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
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
        
        @keyframes shimmer-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-30px) translateX(15px); opacity: 1; }
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
          50% { transform: translateY(-20px); }
        }
        
        @keyframes scroll-indicator {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(24px); opacity: 0; }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-shimmer-text {
          animation: shimmer-text 5s ease-in-out infinite;
        }
        
        .animate-shimmer-slow {
          animation: shimmer-slow 8s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float linear infinite;
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
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }
        
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        
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
