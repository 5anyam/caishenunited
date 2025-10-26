'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  description?: string;
  short_description?: string;
  images?: { src: string }[];
  attributes?: { option: string }[];
}

interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct, allProducts }) => {
  const router = useRouter();

  const getRelatedProducts = (): Product[] => {
    const related = allProducts
      .filter(product => product.id !== currentProduct.id)
      .slice(0, 4);
    
    return related;
  };

  const relatedProducts = getRelatedProducts();

  if (relatedProducts.length === 0) {
    return null;
  }

  const handleProductClick = (productSlug: string) => {
    router.push(`/product/${productSlug}`);
  };

  const formatPrice = (price: string) => {
    return parseFloat(price || '0').toFixed(0);
  };

  return (
    <div className="bg-white py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide">
            You May Also Like
          </h2>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm font-light max-w-2xl mx-auto">
            Discover more fragrances from our collection
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => {
            const salePrice = parseFloat(product.price || '0');
            const regularPrice = parseFloat(product.regular_price || product.price || '0');
            const hasDiscount = salePrice < regularPrice;
            const discountPercent = hasDiscount 
              ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="group bg-white border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => handleProductClick(product.slug)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-50">
                  {hasDiscount && (
                    <div className="absolute top-3 left-3 bg-black text-white text-xs font-light px-3 py-1 z-10 tracking-wide">
                      -{discountPercent}%
                    </div>
                  )}
                  
                  <div className="aspect-square flex items-center justify-center group-hover:scale-105 transition-transform duration-700 p-4">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].src}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-24 h-32 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4 space-y-3">
                  {/* Product Category */}
                  {product.attributes && product.attributes.length > 0 && (
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-light">
                      {product.attributes[0].option}
                    </div>
                  )}

                  {/* Product Name */}
                  <h3 className="font-light text-gray-900 text-sm line-clamp-2 leading-relaxed tracking-wide">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-gray-900 fill-gray-900" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 font-light">4.8</span>
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-light text-gray-900">
                        ₹{formatPrice(product.price)}
                      </span>
                      {hasDiscount && (
                        <>
                          <span className="text-sm line-through text-gray-400 font-light">
                            ₹{formatPrice(product.regular_price)}
                          </span>
                        </>
                      )}
                    </div>
                    {hasDiscount && (
                      <div className="text-xs text-gray-500 mt-1 font-light">
                        Save ₹{(regularPrice - salePrice).toFixed(0)}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    className="w-full border border-gray-300 text-black font-light py-2.5 text-xs tracking-widest uppercase hover:bg-black hover:text-white hover:border-black transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.slug);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/shop')}
            className="inline-block px-8 py-3 text-xs text-white bg-black hover:bg-gray-800 transition-colors tracking-widest uppercase font-light"
          >
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
