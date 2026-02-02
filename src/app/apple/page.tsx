'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, X, Crown, Smartphone } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../../lib/woocommerceApi';
import { productToSlug } from '../../../lib/slug';

// --- CONSTANTS ---
const IPHONE_SERIES = [
  { id: 'all', name: 'All iPhones', icon: '🍎', keywords: [] as string[] },
  { id: '17', name: 'iPhone 17 Series', icon: '🆕', keywords: ['iphone 17', '17 pro', '17 pro max', '17 plus'] },
  { id: '16', name: 'iPhone 16 Series', icon: '📱', keywords: ['iphone 16', '16 pro', '16 pro max', '16 plus'] },
  { id: '15', name: 'iPhone 15 Series', icon: '📱', keywords: ['iphone 15', '15 pro', '15 pro max', '15 plus'] },
  { id: '14', name: 'iPhone 14 Series', icon: '📱', keywords: ['iphone 14', '14 pro', '14 pro max', '14 plus'] },
  { id: 'older', name: 'iPhone 13 & Older', icon: '📉', keywords: ['iphone 13', 'iphone 12', 'iphone 11', 'iphone x', 'iphone se'] },
];

// --- TYPES ---
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
  images?: ImageData[]; 
  categories?: Category[];
  attributes?: Attribute[];
  date_created?: string;
}

// --- HELPER FUNCTIONS ---
function getQuery(): string {
  if (typeof window === 'undefined') return '';
  const p = new URLSearchParams(window.location.search);
  return p.get('q')?.trim() || '';
}

function detectSeries(productName: string): string {
  const lowerName = productName.toLowerCase();
  
  if (lowerName.includes('iphone 17')) return '17';
  if (lowerName.includes('iphone 16')) return '16';
  if (lowerName.includes('iphone 15')) return '15';
  if (lowerName.includes('iphone 14')) return '14';
  
  if (['iphone 13', 'iphone 12', 'iphone 11', 'iphone x', 'iphone se'].some(k => lowerName.includes(k))) {
    return 'older';
  }

  return 'all';
}

function getIphoneVersion(name: string): number {
  const match = name.match(/iphone\s*(\d+)/i);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return 0;
}

// --- MAIN COMPONENT ---
export default function AppleCollectionPage() {
  const [query, setQuery] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // FETCH DATA
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['apple-products'],
    queryFn: async () => {
      const result = await fetchProducts();
      const allProducts = (result || []) as unknown as Product[];
      
      return allProducts.filter((p) => 
        p.name.toLowerCase().includes('iphone') || 
        p.categories?.some(c => c.name.toLowerCase().includes('apple'))
      );
    },
    staleTime: 60_000,
    gcTime: 30 * 60 * 1000,
  });

  // URL SYNC
  useEffect(() => {
    const urlQuery = getQuery();
    setQuery(urlQuery);
    setSearchInput(urlQuery);
  }, []);

  // SEARCH HANDLERS
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

  // FILTERING LOGIC
  const results = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    let filtered = products;

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const categoryMatch = p.categories?.some(c => c.name.toLowerCase().includes(q)) || false;
        return nameMatch || categoryMatch;
      });
    }

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => detectSeries(p.name) === activeCategory);
    }

    return filtered.sort((a, b) => {
      const verA = getIphoneVersion(a.name);
      const verB = getIphoneVersion(b.name);
      
      if (verA !== verB) {
        return verB - verA; 
      }
      
      return parseFloat(b.price || '0') - parseFloat(a.price || '0');
    });

  }, [products, query, activeCategory]);

  const categoryCounts = useMemo(() => {
    if (!products) return {};
    const counts: Record<string, number> = { all: products.length };
    
    products.forEach(p => {
      const series = detectSeries(p.name);
      counts[series] = (counts[series] || 0) + 1;
    });
    
    return counts;
  }, [products]);

  // UI HELPERS
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

  // RENDERING
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-[#9e734d] border-t-transparent animate-spin" />
            <Crown className="absolute inset-0 m-auto w-6 h-6 text-[#9e734d]" />
          </div>
          <p className="text-gray-600 text-sm font-light">Loading Apple collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md p-8">
          <Crown className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-medium text-gray-900 mb-2">Unable to load collection</h2>
          <p className="text-sm text-gray-500 font-light">
             We couldn&apos;t fetch the iPhone collection. Please check your connection.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-2 bg-[#9e734d] text-white text-sm rounded-lg hover:bg-[#8a6342] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header - White Theme */}
      <div className="border-b border-gray-100 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#9e734d]/10 rounded-full">
                <Crown className="w-8 h-8 text-[#9e734d]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tight">
                  The iPhone Collection
                </h1>
                <p className="text-gray-500 text-sm mt-1 font-light tracking-wide">
                  Designed for excellence. Sorted by latest generation.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSearch} className="max-w-2xl mb-8">
            <div className="relative group">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search iPhone 17, 16 Pro, Cases..."
                className="w-full px-6 py-4 pl-12 pr-12 text-sm text-gray-900 bg-white border-2 border-gray-200 focus:border-[#9e734d] focus:outline-none transition-all duration-300 font-light placeholder:text-gray-400 rounded-lg shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              {searchInput && (
                <button type="button" onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#9e734d] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 font-light">
              Showing <span className="text-gray-900 font-medium">{results.length}</span> exclusive models
            </p>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-900 text-xs uppercase tracking-wider hover:border-[#9e734d] transition-colors rounded-full"
            >
              <Filter className="w-3 h-3" />
              Filter Series
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-8 space-y-8">
              <div>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                  Generations
                </h2>
                <nav className="space-y-1">
                  {IPHONE_SERIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full text-left px-4 py-3 text-sm transition-all duration-300 rounded-lg flex items-center justify-between group ${
                        activeCategory === cat.id
                          ? 'bg-[#9e734d] text-white shadow-lg shadow-[#9e734d]/20'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`text-lg ${activeCategory === cat.id ? 'opacity-100' : 'opacity-70 grayscale'}`}>{cat.icon}</span>
                        <span className="font-light tracking-wide">{cat.name}</span>
                      </span>
                      {categoryCounts[cat.id] > 0 && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          activeCategory === cat.id 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {categoryCounts[cat.id]}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6 border border-[#9e734d]/20 bg-gradient-to-br from-[#9e734d]/5 to-transparent rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Crown className="w-16 h-16" />
                </div>
                <h3 className="text-[#9e734d] font-medium tracking-wide mb-2 text-sm">Apple Excellence</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Every iPhone in our collection is verified for authenticity and comes with our premium warranty coverage.
                </p>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No iPhones found</h3>
                <p className="text-sm text-gray-500 mt-1 mb-6">Try selecting a different series or clear your search.</p>
                <button
                  onClick={() => { setActiveCategory('all'); clearSearch(); }}
                  className="px-6 py-2 bg-[#9e734d] text-white text-sm rounded-lg hover:bg-[#8a6342] transition-colors"
                >
                  View All iPhones
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                {results.map((product) => {
                  const productUrl = `/product/${productToSlug(product)}`;
                  const productImage = product.images?.[0]?.src;
                  
                  return (
                    <Link
                      key={product.id}
                      href={productUrl}
                      className="group flex flex-col"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-2xl mb-4 border border-gray-100">
                        {productImage ? (
                          <Image
                            src={productImage}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Smartphone className="w-12 h-12" />
                          </div>
                        )}
                        
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          {hasDiscount(product) && (
                            <span className="bg-[#9e734d] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                              -{getDiscountPercentage(product)}%
                            </span>
                          )}
                          <span className="bg-white/90 backdrop-blur text-gray-900 text-[10px] font-medium px-2 py-1 rounded shadow-sm uppercase tracking-wider border border-gray-100">
                            Series {detectSeries(product.name) === 'older' ? 'Classic' : detectSeries(product.name)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-sm text-gray-900 font-light group-hover:text-[#9e734d] transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-base font-medium text-gray-900">
                            ₹{parseFloat(product.price).toLocaleString()}
                          </span>
                          {hasDiscount(product) && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{parseFloat(product.regular_price).toLocaleString()}
                            </span>
                          )}
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
