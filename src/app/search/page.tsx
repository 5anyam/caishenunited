'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, X, Crown, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../../lib/woocommerceApi';
import { productToSlug } from '../../../lib/slug';

const PHONE_CATEGORIES = [
  { id: 'all', name: 'All Products', icon: '📱', keywords: [] as string[] },
  { id: 'iphone', name: 'iPhone', icon: '🍎', keywords: ['iphone', 'apple', 'ios'] },
  { id: 'samsung', name: 'Samsung', icon: '📲', keywords: ['samsung', 'galaxy'] },
  { id: 'oneplus', name: 'OnePlus', icon: '📱', keywords: ['oneplus', 'one plus'] },
  { id: 'realme', name: 'Realme', icon: '📱', keywords: ['realme', 'real me'] },
  { id: 'xiaomi', name: 'Xiaomi', icon: '📱', keywords: ['xiaomi', 'redmi', 'mi', 'poco'] },
  { id: 'oppo', name: 'Oppo', icon: '📱', keywords: ['oppo'] },
  { id: 'vivo', name: 'Vivo', icon: '📱', keywords: ['vivo'] },
  { id: 'google', name: 'Google Pixel', icon: '📱', keywords: ['pixel', 'google'] },
  { id: 'nothing', name: 'Nothing', icon: '📱', keywords: ['nothing'] },
  { id: 'motorola', name: 'Motorola', icon: '📱', keywords: ['motorola', 'moto'] },
];

interface Category {
  id: number;
  name: string;
  slug?: string;
}

interface ImageData {
  src: string;
}

interface Attribute {
  option: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  description?: string;
  short_description?: string;
  images: ImageData[];
  categories?: Category[];
  attributes?: Attribute[];
}

function getQuery(): string {
  if (typeof window === 'undefined') return '';
  const p = new URLSearchParams(window.location.search);
  return p.get('q')?.trim() || '';
}

function detectCategory(productName: string, categories?: Category[]): string {
  const lowerName = productName.toLowerCase();
  const categoryNames = categories?.map(c => c.name.toLowerCase()).join(' ') || '';
  const searchText = `${lowerName} ${categoryNames}`;

  for (const cat of PHONE_CATEGORIES) {
    if (cat.id === 'all') continue;
    for (const keyword of cat.keywords) {
      if (searchText.includes(keyword)) {
        return cat.id;
      }
    }
  }
  return 'all';
}

export default function SearchPage() {
  const [query, setQuery] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['all-products'],
    queryFn: async () => {
      const result = await fetchProducts();
      return (result || []) as Product[];
    },
    staleTime: 60_000,
    gcTime: 30 * 60 * 1000,
  });

  useEffect(() => {
    const urlQuery = getQuery();
    setQuery(urlQuery);
    setSearchInput(urlQuery);
    const onPop = () => {
      const newQuery = getQuery();
      setQuery(newQuery);
      setSearchInput(newQuery);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const newUrl = `${window.location.pathname}?q=${encodeURIComponent(searchInput.trim())}`;
      window.history.pushState({}, '', newUrl);
      setQuery(searchInput.trim());
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    setQuery('');
    window.history.pushState({}, '', window.location.pathname);
  };

  const results = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    let filtered = products;

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const slugMatch = p.slug.toLowerCase().includes(q);
        const categoryMatch = p.categories?.some(c => 
          c.name.toLowerCase().includes(q) || 
          (c.slug && c.slug.toLowerCase().includes(q))
        ) || false;
        const descMatch = (p.short_description?.toLowerCase().includes(q) || 
                          p.description?.toLowerCase().includes(q)) || false;
        
        return nameMatch || slugMatch || categoryMatch || descMatch;
      });
    }

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => {
        const detectedCat = detectCategory(p.name, p.categories);
        return detectedCat === activeCategory;
      });
    }

    return filtered;
  }, [products, query, activeCategory]);

  const categoryCounts = useMemo(() => {
    if (!products) return {};
    const counts: Record<string, number> = { all: products.length };
    
    products.forEach(p => {
      const cat = detectCategory(p.name, p.categories);
      counts[cat] = (counts[cat] || 0) + 1;
    });
    
    return counts;
  }, [products]);

  const hasDiscount = (product: Product): boolean => {
    const price = parseFloat(product.price || '0');
    const regularPrice = parseFloat(product.regular_price || product.price || '0');
    return regularPrice > price;
  };

  const getDiscountPercentage = (product: Product): number => {
    if (!hasDiscount(product)) return 0;
    const price = parseFloat(product.price || '0');
    const regularPrice = parseFloat(product.regular_price || product.price || '0');
    return Math.round(((regularPrice - price) / regularPrice) * 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-[#9e734d] border-t-transparent animate-spin" />
            <Crown className="absolute inset-0 m-auto w-6 h-6 text-[#9e734d]" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-light">Loading collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center max-w-md p-8">
          <Crown className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-3">Unable to Load Products</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-light">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Premium Header Section */}
      <div className="border-b border-gray-100 dark:border-[#9e734d]/20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Title with crown */}
          <div className="flex items-center gap-3 mb-8">
            <Crown className="w-8 h-8 text-[#9e734d]" />
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white tracking-tight">
              Premium Collection
            </h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mb-8">
            <div className="relative group">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for phone models, cases, or accessories..."
                className="w-full px-6 py-4 pl-12 pr-12 text-sm text-gray-900 dark:text-white bg-white dark:bg-black border-2 border-gray-200 dark:border-[#9e734d]/30 focus:border-[#9e734d] dark:focus:border-[#9e734d] focus:outline-none transition-all duration-300 font-light placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-600" />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#9e734d] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-px bg-[#9e734d]" />
              <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
                {query ? (
                  <>
                    <span className="text-gray-900 dark:text-white font-medium">{results.length}</span> results for{' '}
                    <span className="text-[#9e734d] font-medium">{query}</span>
                  </>
                ) : (
                  <>
                    <span className="text-gray-900 dark:text-white font-medium">{results.length}</span> premium products
                  </>
                )}
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border-2 border-gray-200 dark:border-[#9e734d]/30 text-gray-900 dark:text-white text-sm hover:border-[#9e734d] transition-colors rounded-md"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Category Sidebar */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-[#9e734d]" />
                <h2 className="text-lg font-medium text-gray-900 dark:text-white uppercase tracking-wider">
                  Categories
                </h2>
              </div>

              <nav className="space-y-2">
                {PHONE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 text-sm transition-all duration-300 border-l-2 rounded-md ${
                      activeCategory === cat.id
                        ? 'border-[#9e734d] bg-[#9e734d]/5 text-[#9e734d] font-medium'
                        : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-[#9e734d]/50 hover:bg-gray-50 dark:hover:bg-[#9e734d]/5 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-3">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="tracking-wide">{cat.name}</span>
                      </span>
                      {categoryCounts[cat.id] !== undefined && categoryCounts[cat.id] > 0 && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          activeCategory === cat.id 
                            ? 'bg-[#9e734d] text-white' 
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}>
                          {categoryCounts[cat.id]}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 p-6 border border-gray-100 dark:border-[#9e734d]/20 bg-gradient-to-br from-[#F5E6D3]/5 to-transparent dark:from-[#9e734d]/5 dark:to-transparent rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-4 h-4 text-[#9e734d]" />
                  <h3 className="text-xs uppercase tracking-wider text-gray-900 dark:text-white font-medium">
                    Premium Features
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400 font-light">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#9e734d] mt-1.5 flex-shrink-0" />
                    <span>Military-grade protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#9e734d] mt-1.5 flex-shrink-0" />
                    <span>Lifetime warranty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#9e734d] mt-1.5 flex-shrink-0" />
                    <span>Free shipping above ₹999</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {results.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-gray-200 dark:border-gray-800 mb-6 rounded-full">
                  <Search className="w-8 h-8 text-gray-300 dark:text-gray-700" />
                </div>
                <h3 className="text-xl font-light text-gray-900 dark:text-white mb-3">No products found</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-light mb-8">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    clearSearch();
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-[#9e734d] to-[#8a6342] text-white text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(158,115,77,0.4)] transition-all duration-300 font-medium rounded-md"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {results.map((product) => {
                  const productUrl = `/product/${productToSlug(product)}`;
                  const productImage = product.images && product.images.length > 0 ? product.images[0].src : null;
                  
                  return (
                    <Link
                      key={product.id}
                      href={productUrl}
                      className="group relative overflow-hidden bg-white dark:bg-black border border-gray-100 dark:border-[#9e734d]/20 hover:border-[#9e734d]/30 dark:hover:border-[#9e734d] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(158,115,77,0.15)] rounded-lg"
                    >
                      {/* Gold gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#9e734d]/0 via-[#9e734d]/5 to-[#9e734d]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black">
                        {productImage ? (
                          <Image
                            src={productImage}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Crown className="w-12 h-12 text-gray-300 dark:text-gray-800" />
                          </div>
                        )}

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9e734d]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                        {/* Discount Badge */}
                        {hasDiscount(product) && (
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-[#9e734d] to-[#8a6342] text-white px-3 py-1 text-xs font-bold shadow-lg flex items-center gap-1 z-20">
                            <Sparkles className="w-3 h-3" />
                            {getDiscountPercentage(product)}% OFF
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4 space-y-3 relative">
                        {/* Category Badge */}
                        {product.categories && product.categories.length > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-px bg-[#9e734d]" />
                            <span className="text-[10px] text-[#9e734d] uppercase tracking-wider font-medium">
                              {product.categories[0].name}
                            </span>
                          </div>
                        )}

                        {/* Product Name */}
                        <h3 className="text-sm font-light text-gray-900 dark:text-white line-clamp-2 leading-relaxed tracking-wide min-h-[2.5rem] group-hover:text-black dark:group-hover:text-[#9e734d] transition-colors">
                          {product.name}
                        </h3>

                        {/* Price */}
                        <div className="pt-3 border-t border-gray-100 dark:border-[#9e734d]/20 group-hover:border-[#9e734d]/30 transition-colors">
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#9e734d] group-hover:to-[#8a6342] transition-all duration-500">
                              ₹{parseFloat(product.price).toLocaleString()}
                            </span>
                            {hasDiscount(product) && (
                              <span className="text-sm text-gray-400 dark:text-gray-500 line-through font-light">
                                ₹{parseFloat(product.regular_price).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Crown icon on hover */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <Crown className="w-5 h-5 text-[#9e734d] drop-shadow-[0_0_8px_rgba(158,115,77,0.6)]" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
