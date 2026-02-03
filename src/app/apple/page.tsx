'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {  Smartphone, ChevronRight, ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../../lib/woocommerceApi';
import { productToSlug } from '../../../lib/slug';

// --- CONSTANTS ---
const IPHONE_SERIES = [
  { id: '17', name: 'iPhone 17 Series', icon: '🆕', description: 'The latest innovation', keywords: ['iphone 17', '17 pro', '17 pro max', '17 plus'] },
  { id: '16', name: 'iPhone 16 Series', icon: '📱', description: 'Powerful & Pro', keywords: ['iphone 16', '16 pro', '16 pro max', '16 plus'] },
  { id: '15', name: 'iPhone 15 Series', icon: '✨', description: 'Dynamic Island era', keywords: ['iphone 15', '15 pro', '15 pro max', '15 plus'] },
  { id: '14', name: 'iPhone 14 Series', icon: '⚡', description: 'Power packed', keywords: ['iphone 14', '14 pro', '14 pro max', '14 plus'] },
  { id: 'older', name: 'Classic iPhones', icon: '📉', description: 'iPhone 13, 12 & more', keywords: ['iphone 13', 'iphone 12', 'iphone 11', 'iphone x', 'iphone se'] },
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
function detectSeries(productName: string): string {
  const lowerName = productName.toLowerCase();
  
  if (lowerName.includes('iphone 17')) return '17';
  if (lowerName.includes('iphone 16')) return '16';
  if (lowerName.includes('iphone 15')) return '15';
  if (lowerName.includes('iphone 14')) return '14';
  
  if (['iphone 13', 'iphone 12', 'iphone 11', 'iphone x', 'iphone se'].some(k => lowerName.includes(k))) {
    return 'older';
  }

  return 'other';
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
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // Null means showing Series List
  
  // FETCH DATA
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['apple-products'],
    queryFn: async () => {
      const result = await fetchProducts();
      const allProducts = (result || []) as unknown as Product[];
      
      // Strict Apple Filter
      return allProducts.filter((p) => 
        p.name.toLowerCase().includes('iphone') || 
        p.categories?.some(c => c.name.toLowerCase().includes('apple'))
      );
    },
    staleTime: 60_000,
  });

  // FILTER LOGIC
  const results = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    // Filter by Active Category if selected
    const filtered = activeCategory 
      ? products.filter(p => detectSeries(p.name) === activeCategory)
      : products;

    // Default Sorting: Newest Generation First, then Price
    return filtered.sort((a, b) => {
      const verA = getIphoneVersion(a.name);
      const verB = getIphoneVersion(b.name);
      if (verA !== verB) return verB - verA; 
      return parseFloat(b.price || '0') - parseFloat(a.price || '0');
    });
  }, [products, activeCategory]);

  // HELPER: Get a representative image for a series category
  const getSeriesImage = (seriesId: string) => {
    if (!products) return null;
    const rep = products.find(p => detectSeries(p.name) === seriesId);
    return rep?.images?.[0]?.src || null;
  };

  const hasDiscount = (product: Product): boolean => {
    const price = parseFloat(product.price || '0');
    const regularPrice = parseFloat(product.regular_price || product.price || '0');
    return regularPrice > price;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#9e734d] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm font-medium">Loading Apple Store...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8">
          <p className="text-gray-900 mb-4">Something went wrong loading the store.</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-black text-white rounded-lg">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            {activeCategory && (
              <button 
                onClick={() => setActiveCategory(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                {activeCategory 
                  ? IPHONE_SERIES.find(c => c.id === activeCategory)?.name 
                  : "Apple Collection"}
              </h1>
              <p className="text-gray-500 text-xs mt-0.5 tracking-wide uppercase">
                {activeCategory ? `${results.length} Devices Available` : "Select a Series"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* VIEW 1: CATEGORY SELECTION (When no category is selected) */}
        {!activeCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IPHONE_SERIES.map((series) => {
              const seriesImage = getSeriesImage(series.id);
              
              return (
                <div 
                  key={series.id}
                  onClick={() => setActiveCategory(series.id)}
                  className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 h-80 flex flex-col items-center justify-center"
                >
                  {/* Background Decoration */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm z-10">
                    <span className="text-xl">{series.icon}</span>
                  </div>

                  {/* Series Image */}
                  <div className="relative w-48 h-56 transition-transform duration-500 group-hover:scale-110 z-0 mt-4">
                    {seriesImage ? (
                      <Image 
                        src={seriesImage} 
                        alt={series.name}
                        fill
                        className="object-contain mix-blend-multiply drop-shadow-xl"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Smartphone className="w-20 h-20 opacity-20" />
                      </div>
                    )}
                  </div>

                  {/* Text Overlay */}
                  <div className="absolute bottom-0 w-full p-6 bg-white/90 backdrop-blur-sm border-t border-gray-100 flex items-center justify-between group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <div>
                      <h3 className="font-medium text-lg tracking-tight">{series.name}</h3>
                      <p className="text-xs text-gray-500 group-hover:text-gray-300">{series.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          
          /* VIEW 2: PRODUCT GRID (When category is selected) */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {results.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500">No stock currently available for this series.</p>
                <button 
                  onClick={() => setActiveCategory(null)}
                  className="mt-4 text-[#9e734d] font-medium hover:underline"
                >
                  View other models
                </button>
              </div>
            ) : (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${productToSlug(product)}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-transparent group-hover:border-gray-200 transition-all">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0].src}
                        alt={product.name}
                        fill
                        className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <Smartphone className="w-12 h-12" />
                      </div>
                    )}
                    
                    {hasDiscount(product) && (
                      <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded">
                        SALE
                      </div>
                    )}
                  </div>

                  <h3 className="text-sm text-gray-900 font-medium line-clamp-1 group-hover:text-[#9e734d] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-gray-900">
                      ₹{parseFloat(product.price || '0').toLocaleString()}
                    </span>
                    {hasDiscount(product) && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{parseFloat(product.regular_price || '0').toLocaleString()}
                      </span>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
