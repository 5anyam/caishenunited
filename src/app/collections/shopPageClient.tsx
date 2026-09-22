'use client';

import { useState, useMemo } from 'react';
import ProductCard from "../../../components/ProductCard";
import { Product } from "./page";
import { SlidersHorizontal, X, Search } from 'lucide-react';

interface ShopPageClientProps {
  products: Product[];
}

type ProductWithSlug = Product & {
  slug: string;
  regular_price: string;
};

export default function ShopPageClient({ products }: ShopPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach(product => {
      product.categories?.forEach(cat => cats.add(cat.name));
    });
    return Array.from(cats);
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (selectedCategory && !product.categories?.some(cat => cat.name === selectedCategory)) {
        return false;
      }
      if (priceRange.min || priceRange.max) {
        const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
        if (priceRange.min && price < parseFloat(priceRange.min)) return false;
        if (priceRange.max && price > parseFloat(priceRange.max)) return false;
      }
      return true;
    });
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price.replace(/[^\d.]/g, '')) - parseFloat(b.price.replace(/[^\d.]/g, ''));
        case 'price-high':
          return parseFloat(b.price.replace(/[^\d.]/g, '')) - parseFloat(a.price.replace(/[^\d.]/g, ''));
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-wide">
              The Collection
            </h1>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-light">
              Discover our curated selection of premium phone cases and accessories—designed for ultimate protection, style, and durability.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border-b-2 border-gray-200 focus:border-black focus:outline-none transition-colors bg-white text-gray-900 placeholder:text-gray-400 font-light"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Toggle - Mobile */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-black text-white py-3 px-6 text-sm font-light tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            <span className="flex items-center justify-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-gray-50 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-base font-light text-gray-900 tracking-wide uppercase">
                  Refine
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-600 hover:text-black font-light tracking-wide uppercase"
                >
                  Clear
                </button>
              </div>
              {/* Category Filter */}
              <div className="mb-8">
                <label className="block text-xs font-light text-gray-600 mb-3 uppercase tracking-widest">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 focus:border-black focus:outline-none text-gray-900 font-light text-sm bg-white"
                >
                  <option value="">All</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {/* Price Range */}
              <div className="mb-8">
                <label className="block text-xs font-light text-gray-600 mb-3 uppercase tracking-widest">
                  Price Range
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="w-1/2 px-3 py-2.5 border border-gray-200 focus:border-black focus:outline-none text-gray-900 font-light text-sm bg-white"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="w-1/2 px-3 py-2.5 border border-gray-200 focus:border-black focus:outline-none text-gray-900 font-light text-sm bg-white"
                  />
                </div>
              </div>
              {/* Sort Options */}
              <div className="mb-8">
                <label className="block text-xs font-light text-gray-600 mb-3 uppercase tracking-widest">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 focus:border-black focus:outline-none text-gray-900 font-light text-sm bg-white"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              {/* Active Filters */}
              {(searchTerm || selectedCategory || priceRange.min || priceRange.max) && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xs font-light text-gray-600 mb-3 uppercase tracking-widest">
                    Active
                  </h3>
                  <div className="space-y-2">
                    {searchTerm && (
                      <div className="text-xs text-gray-600 font-light">
                        Search: {searchTerm}
                      </div>
                    )}
                    {selectedCategory && (
                      <div className="text-xs text-gray-600 font-light">
                        Category: {selectedCategory}
                      </div>
                    )}
                    {(priceRange.min || priceRange.max) && (
                      <div className="text-xs text-gray-600 font-light">
                        Price: ₹{priceRange.min || '0'} - ₹{priceRange.max || '∞'}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Products Section */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
              <h2 className="text-sm font-light text-gray-900 tracking-wide">
                {filteredProducts.length} {filteredProducts.length !== 1 ? 'Products' : 'Product'}
              </h2>
              <div className="hidden md:flex items-center text-xs text-gray-500 font-light">
                Showing {filteredProducts.length} of {products.length}
              </div>
            </div>
            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-gray-50">
                <div className="mb-6">
                  <div className="w-16 h-16 border border-gray-300 rounded-full flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3 tracking-wide">
                  No Results Found
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto font-light text-sm">
                  We could not find any products matching your criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-block px-8 py-3 text-xs text-white bg-black hover:bg-gray-800 transition-colors tracking-widest uppercase font-light"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={{
                      ...product,
                      slug: product.slug || `product-${product.id}`
                    } as ProductWithSlug} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-20 border-t border-gray-200 bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-light text-gray-900 mb-4 tracking-wide">
            Need Assistance?
          </h2>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
          <p className="text-sm text-gray-600 mb-8 font-light">
            Our customer team is here to help you choose the best case or accessory for your device.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@caishenunited.com"
              className="inline-block px-8 py-3 text-xs text-black border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-colors tracking-widest uppercase font-light"
            >
              Email Us
            </a>
            <a 
              href="https://wa.me/919911636888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 text-xs text-white bg-black hover:bg-gray-800 transition-colors tracking-widest uppercase font-light"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
