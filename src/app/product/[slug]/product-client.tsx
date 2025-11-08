'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../../../../lib/woocommerceApi'
import { useCart } from '../../../../lib/cart'
import { toast } from '../../../../hooks/use-toast'
import { useFacebookPixel } from '../../../../hooks/useFacebookPixel'
import ImageGallery from '../../../../components/ImageGallery'
import { Tab } from '@headlessui/react'
import ProductFAQ from '../../../../components/ProductFaq'
import RelatedProducts from '../../../../components/RelatedProducts'
import ProductReviews from '../../../../components/ProductReviews'
import { Heart, Star, Shield, Truck, Award, CreditCard, Plus, Minus, Crown, Sparkles, Check } from 'lucide-react'

export interface ImageData { src: string }
export interface Attribute { option: string }
export interface Product {
  id: number
  name: string
  slug: string
  price: string
  regular_price: string
  description?: string
  short_description?: string
  images: ImageData[]
  attributes?: Attribute[]
}

export default function ProductClient({
  initialProduct,
  allProductsInitial,
  slug,
}: {
  initialProduct?: Product | undefined
  allProductsInitial?: Product[] | undefined
  slug: string
}) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { trackViewContent, trackAddToCart, trackInitiateCheckout } = useFacebookPixel()

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['all-products'],
    queryFn: async () => await fetchProducts() as Product[],
    initialData: allProductsInitial,
    staleTime: 60_000,
    enabled: Boolean(slug),
  })

  const product: Product | undefined =
    initialProduct ??
    products?.find((p) => p.slug === slug || p.id.toString() === slug)

  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    if (product) {
      trackViewContent({
        id: product.id,
        name: product.name,
        price: product.price,
      })
    }
  }, [product, trackViewContent])

  if (isLoading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
            <Crown className="absolute inset-0 m-auto w-6 h-6 text-[#D4AF37]" />
          </div>
          <p className="text-gray-600 text-sm font-light">Loading premium experience...</p>
        </div>
      </div>
    )
  }

  if (error || (!products && !product) || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="text-center max-w-md p-8">
          <Crown className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-gray-900 mb-3">Product Not Found</h2>
          <p className="text-sm text-gray-600 font-light mb-8">The premium product you are looking for does not exist.</p>
          <button 
            onClick={() => router.push('/shop')}
            className="px-10 py-4 text-xs text-white bg-gradient-to-r from-[#D4AF37] to-[#C5A028] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-widest uppercase font-medium"
          >
            Explore Collection
          </button>
        </div>
      </div>
    )
  }

  const salePrice = parseFloat(product.price || '0')
  const regularPrice = parseFloat(product.regular_price || product.price || '0')
  const hasSale = salePrice < regularPrice
  const totalPrice = salePrice * quantity
  const totalRegularPrice = regularPrice * quantity
  const totalSaving = hasSale ? totalRegularPrice - totalPrice : 0

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          ...product,
          name: product.name,
          price: salePrice.toString(),
          images: product.images || [],
        })
      }
      trackAddToCart({ id: product.id, name: product.name, price: salePrice }, quantity)
      toast({
        title: '✨ Added to Cart',
        description: `${quantity} x ${product.name} added successfully.`,
      })
    } catch (error) {
      console.error('Add to cart failed:', error)
      toast({ title: 'Error', description: 'Failed to add item to cart', variant: 'destructive' })
    } finally {
      setTimeout(() => setIsAddingToCart(false), 1000)
    }
  }

  const handleBuyNow = async () => {
    setIsBuyingNow(true)
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          ...product,
          name: product.name,
          price: salePrice.toString(),
          images: product.images || [],
        })
      }
      trackAddToCart({ id: product.id, name: product.name, price: salePrice }, quantity)
      const cartItems = [{ id: product.id, name: product.name, price: salePrice, quantity }]
      const total = salePrice * quantity
      trackInitiateCheckout(cartItems, total)
      setTimeout(() => {
        router.push('/checkout')
        setIsBuyingNow(false)
      }, 800)
    } catch (error) {
      console.error('Buy now failed:', error)
      toast({ title: 'Error', description: 'Failed to process buy now', variant: 'destructive' })
      setIsBuyingNow(false)
    }
  }

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-8">
      {/* Premium Breadcrumb with gold accent */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-white via-[#F5E6D3]/5 to-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3 text-xs text-gray-500 font-light">
            <button onClick={() => router.push('/shop')} className="hover:text-[#D4AF37] transition-colors">
              Shop
            </button>
            <span className="text-[#D4AF37]">›</span>
            <span className="text-black truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 px-4 flex flex-col lg:flex-row gap-16">
        {/* Image Section with gold accent */}
        <div className="lg:w-1/2">
          <div className="sticky top-8 relative">
            <div className="absolute -inset-px bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <ImageGallery images={product.images || []} />
            {hasSale && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black px-4 py-2 text-xs font-bold tracking-wider shadow-[0_4px_15px_rgba(212,175,55,0.4)] flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                {Math.round(((regularPrice - salePrice) / regularPrice) * 100)}% OFF
              </div>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2">
          <div className="space-y-8">
            {/* Category with gold accent */}
            {product.attributes?.length && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
                <div className="text-[10px] text-[#D4AF37] uppercase tracking-[0.25em] font-medium flex items-center gap-2">
                  <Crown className="w-3 h-3" />
                  {product.attributes[0]?.option || 'Premium Collection'}
                </div>
              </div>
            )}

            {/* Product Name with animation */}
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 tracking-tight leading-tight animate-fade-in">
              {product.name}
            </h1>

            {/* Rating with gold stars */}
            <div className="flex items-center gap-4 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37] drop-shadow-[0_0_4px_rgba(212,175,55,0.3)]" 
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600 font-light">4.8 (247 reviews)</span>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="ml-auto group"
              >
                <Heart 
                  className={`w-5 h-5 transition-all duration-300 ${
                    isWishlisted 
                      ? 'fill-[#D4AF37] text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]' 
                      : 'text-gray-400 group-hover:text-[#D4AF37]'
                  }`} 
                />
              </button>
            </div>

            {/* Short Description */}
            {product.short_description && (
              <div
                className="prose prose-sm max-w-none text-gray-600 leading-relaxed font-light"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* Premium Price Section */}
            <div className="py-8 border-y border-gray-100 bg-gradient-to-r from-[#F5E6D3]/10 to-transparent -mx-6 px-6">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#C5A028]">
                  ₹{totalPrice.toLocaleString()}
                </span>
                {hasSale && (
                  <>
                    <span className="line-through text-gray-400 font-light text-lg">
                      ₹{totalRegularPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-[#D4AF37] font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Save ₹{totalSaving.toLocaleString()}
                    </span>
                  </>
                )}
              </div>
              {quantity > 1 && (
                <div className="text-xs text-gray-500 mt-3 font-light flex items-center gap-2">
                  <div className="w-4 h-px bg-[#D4AF37]/30" />
                  ₹{salePrice.toLocaleString()} per unit
                </div>
              )}
            </div>

            {/* Premium Quantity Selector */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-4 uppercase tracking-[0.2em]">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 hover:border-[#D4AF37]/50 transition-colors duration-300">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-4 hover:bg-[#F5E6D3]/20 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="px-8 py-4 font-light text-gray-900 text-base border-x-2 border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-4 hover:bg-[#F5E6D3]/20 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Premium Action Buttons */}
            <div className="hidden lg:flex flex-col gap-4 pt-8">
              <button
                className={`group relative w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black font-bold px-8 py-5 text-sm tracking-widest uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] ${
                  isAddingToCart ? 'opacity-75' : ''
                }`}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isAddingToCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4" />
                      Add to Cart
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#F5E6D3] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </button>
              <button
                className={`relative w-full border-2 border-black text-black font-medium px-8 py-5 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-500 overflow-hidden group ${
                  isBuyingNow ? 'opacity-75' : ''
                }`}
                onClick={handleBuyNow}
                disabled={isBuyingNow}
              >
                <span className="relative z-10">
                  {isBuyingNow ? 'Processing...' : 'Buy Now'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </div>

            {/* Premium Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
              {[
                { 
                  icon: <Truck className="w-5 h-5" />, 
                  label: 'Free Shipping', 
                  subtitle: 'Orders above ₹999',
                  gradient: 'from-[#D4AF37]/10 to-transparent'
                },
                { 
                  icon: <Shield className="w-5 h-5" />, 
                  label: 'Authentic', 
                  subtitle: 'Guaranteed original',
                  gradient: 'from-[#C5A028]/10 to-transparent'
                },
                { 
                  icon: <Award className="w-5 h-5" />, 
                  label: 'Premium Quality', 
                  subtitle: 'Military-grade',
                  gradient: 'from-[#D4AF37]/10 to-transparent'
                },
                { 
                  icon: <CreditCard className="w-5 h-5" />, 
                  label: 'Secure Payment', 
                  subtitle: 'Protected checkout',
                  gradient: 'from-[#C5A028]/10 to-transparent'
                },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="group text-center p-6 border border-gray-100 hover:border-[#D4AF37]/30 transition-all duration-500 relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="text-gray-600 group-hover:text-[#D4AF37] mb-3 flex justify-center transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div className="font-medium text-xs text-gray-900 mb-1 uppercase tracking-wider">{item.label}</div>
                    <div className="text-xs text-gray-500 font-light">{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom with gold accents */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1 font-light uppercase tracking-wider">Total</div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#C5A028]">
                  ₹{totalPrice.toLocaleString()}
                </span>
                {hasSale && (
                  <span className="line-through text-gray-400 text-sm font-light">
                    ₹{totalRegularPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center border-2 border-gray-200">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2.5 hover:bg-[#F5E6D3]/20"
                disabled={quantity <= 1}
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-4 py-2.5 text-sm font-light border-x-2 border-gray-200">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2.5 hover:bg-[#F5E6D3]/20"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black font-bold px-4 py-3.5 text-xs tracking-widest uppercase"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? 'Added' : 'Add to Cart'}
            </button>
            <button
              className="flex-1 border-2 border-black text-black font-medium px-4 py-3.5 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
              onClick={handleBuyNow}
              disabled={isBuyingNow}
            >
              {isBuyingNow ? 'Processing' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Premium Tabs */}
      <div className="max-w-7xl mx-auto mt-20 px-4">
        <div className="border-t border-gray-100">
          <Tab.Group>
            <Tab.List className="flex border-b border-gray-100">
              {['Description', 'Specifications', 'Care Instructions'].map((label, idx) => (
                <Tab key={idx} className={({ selected }) =>
                  `flex-1 py-5 px-6 text-xs font-medium outline-none transition-all uppercase tracking-[0.2em] relative ${
                    selected 
                      ? 'text-black' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`
                }>
                  {({ selected }) => (
                    <>
                      {label}
                      {selected && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] shadow-[0_2px_10px_rgba(212,175,55,0.5)]" />
                      )}
                    </>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="py-12">
              <Tab.Panel>
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed font-light" 
                     dangerouslySetInnerHTML={{ __html: product.description || '' }} />
              </Tab.Panel>
              <Tab.Panel>
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-8">
                    <Crown className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="text-xl font-light text-gray-900 tracking-wide">Product Specifications</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: 'Material', detail: 'Aerospace-grade polymer' },
                      { title: 'Protection', detail: 'Military-grade drop tested' },
                      { title: 'Compatibility', detail: 'Perfect fit guaranteed' },
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="border border-gray-100 p-6 hover:border-[#D4AF37]/30 transition-colors duration-500 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6D3]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h4 className="relative font-medium text-sm text-gray-900 mb-3 uppercase tracking-wider">{item.title}</h4>
                        <p className="relative text-sm text-gray-600 font-light">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="text-xl font-light text-gray-900 tracking-wide">Care Instructions</h3>
                  </div>
                  <div className="border border-gray-100 p-8 bg-gradient-to-br from-[#F5E6D3]/5 to-transparent">
                    <ul className="space-y-4 text-gray-700 font-light text-sm">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                        <span>Clean with soft, dry cloth to maintain pristine condition</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                        <span>Avoid exposure to extreme temperatures</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                        <span>Remove case before wireless charging for optimal performance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                        <span>Store in provided dust bag when not in use</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 px-4">
        <ProductFAQ productSlug={slug} productName={product.name} />
      </div>
      <div className="max-w-7xl mx-auto mt-20 px-4">
        <ProductReviews productId={product.id} productName={product.name} />
      </div>
      <RelatedProducts currentProduct={product} allProducts={products || []} />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
