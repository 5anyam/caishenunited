'use client';
import Link from "next/link";
import { useCart } from "../../../lib/cart";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Package, Heart, Star, Shield, Truck, Gift } from "lucide-react";

export default function CartPage() {
  const { items, increment, decrement, removeFromCart } = useCart();
  const total = items.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  // MRP Total - Fixed to handle different property names and fallback scenarios
  const mrpTotal = items.reduce((sum, item) => {
    // Try different possible property names for regular/original price
    const regularPrice = item.regular_price;
    
    // If no regular price exists, assume current price is MRP (no discount)
    const originalPrice = regularPrice ? parseFloat(regularPrice) : parseFloat(item.price);
    
    return sum + originalPrice * item.quantity;
  }, 0);

  // Calculate discount amount
  const discountAmount = mrpTotal - total;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-rose-50">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-rose-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Your Collection</span>
        </div>

        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl border border-rose-200 shadow-lg">
            <ShoppingBag className="h-8 w-8 text-rose-600" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">Your Collection</h1>
            <p className="text-gray-600 text-lg">
              {items.length === 0 ? "Your fragrance collection awaits" : `${totalItems} seductive fragrance${totalItems !== 1 ? 's' : ''} selected`}
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="p-6 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full w-32 h-32 mx-auto mb-8 flex items-center justify-center shadow-lg">
                <Package className="h-16 w-16 text-rose-500" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Your collection is empty</h2>
              <p className="text-gray-600 mb-2">Ready to discover your signature scent?</p>
              <p className="text-gray-500 text-sm mb-8">Explore our seductive fragrances designed for those who dare to make a statement.</p>
              <Link
                href="/"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <ArrowLeft className="h-5 w-5" />
                Explore Fragrances
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-rose-50 to-pink-50">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-rose-600" />
                    Selected Fragrances
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Curated for your sophisticated taste</p>
                </div> 
                <div className="divide-y divide-gray-200">
                  {items.map((item) => {
                    // Calculate regular price for this item display
                    const itemRegularPrice = item.regular_price;
                    const hasDiscount = itemRegularPrice && parseFloat(itemRegularPrice) > parseFloat(item.price);
                    
                    return (
                      <div
                        key={item.id}
                        className="p-6 hover:bg-rose-50/50 transition-all duration-300 group"
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-rose-50 rounded-xl overflow-hidden border border-gray-200 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                              <img
                                src={item.images?.[0]?.src}
                                alt={item.name}
                                className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 space-y-3">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-rose-600 transition-colors duration-300">
                                {item.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-600 px-2 py-1 rounded-full text-xs font-medium border border-rose-200">
                                  <Heart className="w-3 h-3" />
                                  Premium EDP
                                </span>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                                  ))}
                                  <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              {/* Price */}
                              <div className="flex flex-col">
                                <div className="text-xl font-black text-rose-600">
                                  ₹{parseFloat(item.price).toLocaleString()}
                                  <span className="text-sm font-normal text-gray-600 ml-2">per bottle</span>
                                </div>
                                {hasDiscount && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500 line-through">
                                      MRP: ₹{parseFloat(itemRegularPrice).toLocaleString()}
                                    </span>
                                    <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full font-bold border border-emerald-200">
                                      Save ₹{(parseFloat(itemRegularPrice) - parseFloat(item.price)).toLocaleString()}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center">
                                <div className="flex items-center bg-gray-50 rounded-xl border border-gray-300 shadow-sm">
                                  <button
                                    onClick={() => decrement(item.id)}
                                    className="p-3 hover:bg-gray-100 rounded-l-xl transition-colors duration-200"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="h-4 w-4 text-gray-600" />
                                  </button>
                                  <span className="w-16 text-center font-bold text-gray-900 text-lg">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => increment(item.id)}
                                    className="p-3 hover:bg-gray-100 rounded-r-xl transition-colors duration-200"
                                  >
                                    <Plus className="h-4 w-4 text-gray-600" />
                                  </button>
                                </div>

                                {/* Remove Button */}
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-4 p-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-200"
                                  title="Remove from collection"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </div>

                            {/* Item Total */}
                            <div className="text-right bg-gradient-to-r from-rose-50 to-pink-50 p-3 rounded-lg border border-rose-200">
                              <span className="text-sm text-gray-600 block">Subtotal</span>
                              <span className="text-2xl font-black text-rose-600">
                                ₹{(parseFloat(item.price) * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-8">
                <div className="p-6 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-rose-600" />
                    Order Summary
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {/* Show MRP total if there's a discount */}
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Total MRP ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                        <span>₹{mrpTotal.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({totalItems} fragrance{totalItems !== 1 ? 's' : ''})</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>

                    {/* Discount on MRP - Only show if there's actually a discount */}
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Discount on MRP</span>
                        <span className="text-emerald-600 font-bold">-₹{discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full font-bold text-sm border border-emerald-200">Free</span>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-xl font-black">
                        <span className="text-gray-900">Total</span>
                        <span className="text-rose-600">₹{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/checkout"
                      className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 text-center block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Complete Your Order
                    </Link>

                    <Link
                      href="/"
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 px-6 rounded-xl transition-all duration-300 text-center block border border-gray-300"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { icon: <Shield className="w-4 h-4 text-rose-500" />, text: "100% Authentic Fragrances" },
                        { icon: <Truck className="w-4 h-4 text-emerald-500" />, text: "Free Shipping Worldwide" },
                        { icon: <Gift className="w-4 h-4 text-purple-500" />, text: "Luxury Gift Packaging" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                          <div className="p-2 bg-gray-50 rounded-lg">{item.icon}</div>
                          <span className="font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
