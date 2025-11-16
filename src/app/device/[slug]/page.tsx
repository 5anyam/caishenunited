'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../../../../components/ProductCard';
import { fetchProducts } from '../../../../lib/woocommerceApi';
import { useState } from 'react';
import { Filter, Grid, List, ChevronDown, Search } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  images?: { src: string }[];
  categories?: { id: number; name: string; slug: string }[];
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['category-products', slug],
    queryFn: async () => {
      const result = await fetchProducts();
      return (result || []) as Product[];
    },
  });

  // Filter products by category slug
  const filteredProducts = data?.filter((product) =>
    product.categories?.some((cat) => cat.slug === slug)
  ) || [];

  // Search filter
  const searchedProducts = searchQuery.trim()
    ? filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredProducts;

  // Sort products
  const sortedProducts = [...searchedProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Get category name from slug
  const categoryName = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a0a] dark:to-black border-b border-gray-100 dark:border-[#9e734d]/20 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-4 font-medium">
              Browse Collection
            </p>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
              {categoryName}
            </h1>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-[#9e734d] to-transparent mx-auto mb-6"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our premium selection of {categoryName.toLowerCase()} designed for style and protection
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="border-b border-gray-100 dark:border-[#9e734d]/20 py-6 sticky top-20 bg-white dark:bg-black z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-[#9e734d]/20 bg-white dark:bg-black text-gray-900 dark:text-white focus:outline-none focus:border-gray-900 dark:focus:border-[#9e734d] transition-colors"
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Results Count */}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {sortedProducts.length} Products
              </span>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 text-xs border border-gray-200 dark:border-[#9e734d]/20 bg-white dark:bg-black text-gray-900 dark:text-white focus:outline-none focus:border-gray-900 dark:focus:border-[#9e734d] cursor-pointer"
                >
                  <option value="default">Sort By</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-200 dark:border-[#9e734d]/20">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-gray-900 dark:bg-[#9e734d] text-white'
                      : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  } transition-colors`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list'
                      ? 'bg-gray-900 dark:bg-[#9e734d] text-white'
                      : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  } transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 dark:bg-[#1a1a1a] animate-pulse rounded-sm"
                />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Failed to load products
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-gray-900 dark:bg-[#9e734d] text-white text-sm hover:bg-gray-800 dark:hover:bg-[#8a6342] transition-colors"
              >
                Retry
              </button>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-20">
              <Filter className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                No products found
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                  : 'flex flex-col gap-6'
              }
            >
              {sortedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
