'use client';
import Link from "next/link";
import { useCart } from "../lib/cart";
import { Trash2, Minus, Plus, Package, X, ShoppingBag, CheckCircle, Gift } from "lucide-react";
import { useEffect, useState } from "react";




interface CartItem {
  id: number | string;
  name: string;
  price: string;
  regular_price?: string;
  quantity: number;
  images?: Array<{ src: string }>;
}




export default function CartDrawer() {
  const { items, increment, decrement, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const [showAddedNotification, setShowAddedNotification] = useState<boolean>(false);


  const total: number = items.reduce((sum: number, i: CartItem) => sum + parseFloat(i.price) * i.quantity, 0);
  const totalItems: number = items.reduce((sum: number, i: CartItem) => sum + i.quantity, 0);




  const mrpTotal: number = items.reduce((sum: number, item: CartItem) => {
    const regularPrice = item.regular_price;
    const originalPrice = regularPrice ? parseFloat(regularPrice) : parseFloat(item.price);
    return sum + originalPrice * item.quantity;
  }, 0);




  const discountAmount: number = mrpTotal - total;




  // Show notification when cart opens with items
  useEffect(() => {
    if (items.length > 0 && isCartOpen) {
      setShowAddedNotification(true);
      const timer = setTimeout(() => {
        setShowAddedNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [items.length, isCartOpen]);




  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
        aria-label="Open shopping cart"
      >
        <ShoppingBag className="w-5 h-5 text-gray-700" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
            {totalItems}
          </span>
        )}
      </button>




      {/* Overlay - Maximum z-index */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}




      {/* Cart Drawer - Maximum z-index to stay above all floating elements */}
      <div className={`fixed top-0 right-0 h-full w-[80%] sm:w-[480px] max-w-[480px] bg-white z-[9999] shadow-2xl transform transition-transform duration-300 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            <h2 className="text-base sm:text-lg font-medium text-gray-900">
              Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>




        {/* Added Notification */}
        {showAddedNotification && (
          <div className="bg-green-50 border-b border-green-100 p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-green-800 font-medium">Item added to cart!</span>
          </div>
        )}




        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {/* Items List */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              /* Empty Cart */
              <div className="flex flex-col items-center justify-center h-full p-6 sm:p-8 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <Package className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">Start shopping to add items</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 sm:px-6 py-2 bg-black text-white text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors rounded touch-manipulation"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="divide-y divide-gray-200">
                  {items.map((item: CartItem) => {
                    const itemRegularPrice = item.regular_price;
                    const hasDiscount: boolean = !!(itemRegularPrice && parseFloat(itemRegularPrice) > parseFloat(item.price));


                    return (
                      <div key={item.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex gap-3 sm:gap-4">
                          {/* Image */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                              <img
                                src={item.images?.[0]?.src || '/placeholder.png'}
                                alt={item.name}
                                className="w-full h-full object-contain p-1 sm:p-2"
                              />
                            </div>
                          </div>




                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between mb-2">
                              <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 pr-2">
                                {item.name}
                              </h3>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  removeFromCart(item.id as number);
                                }}
                                className="text-gray-400 hover:text-red-600 active:text-red-700 transition-colors flex-shrink-0 p-1 touch-manipulation"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4 sm:w-4 sm:h-4" />
                              </button>
                            </div>




                            {/* Price */}
                            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                              <span className="text-sm sm:text-base font-medium text-gray-900">
                                ₹{parseFloat(item.price).toLocaleString()}
                              </span>
                              {hasDiscount && itemRegularPrice && (
                                <span className="text-[10px] sm:text-xs text-gray-500 line-through">
                                  ₹{parseFloat(itemRegularPrice).toLocaleString()}
                                </span>
                              )}
                            </div>




                            {/* Quantity Controls - Mobile Optimized */}
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (item.quantity > 1) {
                                      decrement(item.id as number);
                                    }
                                  }}
                                  disabled={item.quantity <= 1}
                                  className="p-2 sm:p-2 active:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 text-gray-600" />
                                </button>
                                <span className="w-10 sm:w-10 text-center text-xs sm:text-sm font-medium text-gray-900 px-1">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    increment(item.id as number);
                                  }}
                                  className="p-2 sm:p-2 active:bg-gray-200 transition-colors touch-manipulation"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 text-gray-600" />
                                </button>
                              </div>
                              <span className="text-xs sm:text-sm text-gray-600 font-medium">
                                ₹{(parseFloat(item.price) * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Free Gifts Section */}
                <div className="border-t-4 border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-3 sm:p-4">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-emerald-500 rounded-lg">
                      <Gift className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-emerald-900">Free Gifts with Order</h3>
                      <p className="text-[10px] text-emerald-700">Worth ₹250 • Absolutely Free!</p>
                    </div>
                  </div>

                  {/* Gift Items Grid */}
                  <div className="space-y-2">
                    {/* Sticky Pad */}
                    <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-emerald-200/50 shadow-sm">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg overflow-hidden flex items-center justify-center border border-emerald-200">
                        <img 
                          src="/sticky.webp" 
                          alt="Premium Sticky Pad"
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">Premium Sticky Pad</p>
                        <p className="text-[9px] sm:text-[10px] text-gray-500 font-light">High-Quality • Reusable</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-[10px] sm:text-xs text-emerald-600 font-bold">FREE</span>
                      </div>
                    </div>

                    {/* Cable Protector */}
                    <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-emerald-200/50 shadow-sm">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg overflow-hidden flex items-center justify-center border border-emerald-200">
                        <img 
                          src="/wire.webp" 
                          alt="Cable Protector"
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">Cable Protector</p>
                        <p className="text-[9px] sm:text-[10px] text-gray-500 font-light">Durable • Long-lasting</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-[10px] sm:text-xs text-emerald-600 font-bold">FREE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>




          {/* Footer - Summary & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 bg-white">
              {/* Summary */}
              <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                {discountAmount > 0 && (
                  <>
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                      <span>MRP Total</span>
                      <span>₹{mrpTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm text-green-600 font-medium">
                      <span>Discount</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  </>
                )}


                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <div className="flex justify-between text-xs sm:text-sm text-emerald-600">
                  <span className="flex items-center gap-1">
                    <Gift className="w-3 h-3" />
                    Free Gifts
                  </span>
                  <span className="font-medium">₹250</span>
                </div>




                <div className="flex justify-between pt-2 sm:pt-3 border-t border-gray-200">
                  <span className="text-sm sm:text-base font-semibold text-gray-900">Total</span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">₹{total.toLocaleString()}</span>
                </div>
              </div>




              {/* Buttons */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-2 sm:space-y-3">
                <Link
                  href="/checkout"
                  className="block w-full bg-black text-white text-center py-3 sm:py-3 text-sm font-medium hover:bg-gray-800 transition-colors rounded touch-manipulation"
                  onClick={() => setIsCartOpen(false)}
                >
                  Proceed to Checkout
                </Link>


                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full border border-gray-300 text-gray-700 py-3 sm:py-3 text-sm font-medium hover:bg-gray-50 transition-colors rounded touch-manipulation"
                >
                  Continue Shopping
                </button>
              </div>




              {/* Trust Badges */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 sm:pt-3 border-t border-gray-100">
                <div className="flex items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-gray-600">
                  <span>✓ Secure</span>
                  <span>✓ Free Ship</span>
                  <span>✓ Easy Returns</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
