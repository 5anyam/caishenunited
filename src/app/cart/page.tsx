'use client';
import Link from "next/link";
import { useCart } from "../../../lib/cart";
import { Trash2, Minus, Plus, Package, Star } from "lucide-react";

export default function CartPage() {
  const { items, increment, decrement, removeFromCart } = useCart();
  const total = items.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const mrpTotal = items.reduce((sum, item) => {
    const regularPrice = item.regular_price;
    const originalPrice = regularPrice ? parseFloat(regularPrice) : parseFloat(item.price);
    return sum + originalPrice * item.quantity;
  }, 0);

  const discountAmount = mrpTotal - total;

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-8 font-light">
          <Link href="/" className="hover:text-[#9e734d] dark:hover:text-[#9e734d] transition-colors">
            Home
          </Link>
          <span className="text-gray-900 dark:text-white">/</span>
          <span className="text-[#9e734d] dark:text-[#9e734d]">Shopping Cart</span>
        </div>

        {/* Header */}
        <div className="mb-12 pb-8 border-b border-gray-200 dark:border-[#9e734d]/20">
          <h1 className="text-3xl lg:text-4xl font-light text-gray-900 dark:text-white mb-2 tracking-wide">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-light">
            {items.length === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-20 border border-gray-200 dark:border-[#9e734d]/20 bg-gray-50 dark:bg-[#9e734d]/5 rounded-lg">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 border border-gray-300 dark:border-gray-700 rounded-full mx-auto mb-8 flex items-center justify-center">
                <Package className="h-10 w-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-3">Your cart is empty</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 font-light">
                Start shopping to add premium phone cases and accessories to your cart
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3 text-xs text-white bg-gradient-to-r from-[#9e734d] to-[#8a6342] hover:from-[#8a6342] hover:to-[#9e734d] transition-all duration-300 tracking-widest uppercase font-light rounded-md shadow-md"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="border border-gray-200 dark:border-[#9e734d]/20 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-[#9e734d]/20 bg-gray-50 dark:bg-[#9e734d]/5">
                  <h2 className="text-base font-light text-gray-900 dark:text-white tracking-wide uppercase text-xs">
                    Items
                  </h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {items.map((item) => {
                    const itemRegularPrice = item.regular_price;
                    const hasDiscount = itemRegularPrice && parseFloat(itemRegularPrice) > parseFloat(item.price);
                    
                    return (
                      <div key={item.id} className="p-6 hover:bg-gray-50 dark:hover:bg-[#9e734d]/5 transition-colors">
                        <div className="flex gap-6">
                          {/* Image */}
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <img
                                src={item.images?.[0]?.src}
                                alt={item.name}
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex-1 space-y-3">
                            <div>
                              <h3 className="text-sm font-light text-gray-900 dark:text-white line-clamp-2">
                                {item.name}
                              </h3>
                              <div className="flex items-center gap-1 mt-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 text-gray-400 dark:text-gray-500 fill-[#9e734d] dark:fill-[#9e734d]/80" />
                                ))}
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 font-light">4.8</span>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              {/* Price */}
                              <div className="flex flex-col">
                                <div className="text-base font-light text-gray-900 dark:text-white">
                                  ₹{parseFloat(item.price).toLocaleString()}
                                </div>
                                {hasDiscount && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 line-through font-light">
                                      ₹{parseFloat(itemRegularPrice).toLocaleString()}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Quantity */}
                              <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded">
                                  <button
                                    onClick={() => decrement(item.id)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                                  </button>
                                  <span className="w-12 text-center font-light text-gray-900 dark:text-white text-sm">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => increment(item.id)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <Plus className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-[#9e734d] dark:hover:text-[#9e734d] transition-colors"
                                  title="Remove"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            {/* Subtotal */}
                            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                              <div className="flex justify-between">
                                <span className="text-xs text-gray-600 dark:text-gray-400 font-light uppercase tracking-widest">Subtotal</span>
                                <span className="text-base font-light text-gray-900 dark:text-white">
                                  ₹{(parseFloat(item.price) * item.quantity).toLocaleString()}
                                </span>
                              </div>
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
              <div className="border border-gray-200 dark:border-[#9e734d]/20 sticky top-8 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-[#9e734d]/20 bg-gray-50 dark:bg-[#9e734d]/5">
                  <h2 className="text-base font-light text-gray-900 dark:text-white tracking-wide uppercase text-xs">
                    Summary
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-[#9e734d]/20">
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 font-light">
                        <span>MRP Total</span>
                        <span>₹{mrpTotal.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 font-light">
                      <span>Subtotal</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-[#9e734d] dark:text-[#9e734d]/80 font-light">
                        <span>Discount</span>
                        <span>-₹{discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 font-light">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>

                  <div className="flex justify-between mb-8">
                    <span className="text-sm font-light text-gray-900 dark:text-white uppercase tracking-widest">Total</span>
                    <span className="text-lg font-light text-gray-900 dark:text-white">₹{total.toLocaleString()}</span>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/checkout"
                      className="w-full bg-gradient-to-r from-[#9e734d] to-[#8a6342] text-white font-light py-3 text-xs tracking-widest uppercase hover:from-[#8a6342] hover:to-[#9e734d] transition-all duration-300 text-center block rounded-md shadow-md"
                    >
                      Checkout
                    </Link>

                    <Link
                      href="/"
                      className="w-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-light py-3 text-xs tracking-widest uppercase hover:bg-gray-50 dark:hover:bg-[#9e734d]/5 transition-colors text-center block rounded-md"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  {/* Trust Info */}
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-[#9e734d]/20">
                    <div className="space-y-3 text-xs text-gray-600 dark:text-gray-400 font-light">
                      <p>• Premium Protection</p>
                      <p>• Free Shipping</p>
                      <p>• Secure Checkout</p>
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
