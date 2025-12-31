'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  fetchProducts,
  fetchProductVariations,
  type Product as WCProduct,
  type ProductVariation,
  type ProductAttribute,
  type VariationAttribute,
  type WCImage,
} from '../../../../lib/woocommerceApi'
import { useCart, type Product as CartProduct } from '../../../../lib/cart'
import { toast } from '../../../../hooks/use-toast'
import { useFacebookPixel } from '../../../../hooks/useFacebookPixel'
import ImageGallery from '../../../../components/ImageGallery'
import { Tab } from '@headlessui/react'
import ProductFAQ from '../../../../components/ProductFaq'
import ProductReviews from '../../../../components/ProductReviews'
import {
  Heart,
  Star,
  Shield,
  Truck,
  Award,
  CreditCard,
  Plus,
  Minus,
  Crown,
  Sparkles,
  Check,
  Package,
} from 'lucide-react'
import confetti from 'canvas-confetti'

// Local image type for gallery
export interface ImageData {
  src: string
  alt?: string
}

// Use WooCommerce Product type directly
type Product = WCProduct

// Helpers
const isVariableProduct = (product: Product): boolean =>
  product.type === 'variable' && (product.variations?.length ?? 0) > 0

const getVariationAttributes = (product: Product): ProductAttribute[] => {
  if (!product.attributes) return []
  return product.attributes.filter((attr) => attr.variation)
}

const triggerConfetti = () => {
  const duration = 2.5 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const interval: NodeJS.Timeout = setInterval(function () {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#9e734d', '#8a6342', '#FFD700', '#FFA500', '#FF8C00'],
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#9e734d', '#8a6342', '#FFD700', '#FFA500', '#FF8C00'],
    })
  }, 250)
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
  const { addToCart, isCartOpen } = useCart()
  const { trackViewContent, trackAddToCart, trackInitiateCheckout } = useFacebookPixel()

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['all-products'],
    queryFn: async () => await fetchProducts() as Product[],
    initialData: allProductsInitial,
    staleTime: 60_000,
    enabled: Boolean(slug),
  })

  const product: Product | undefined =
    initialProduct ?? products?.find((p) => p.slug === slug || p.id.toString() === slug)

  // Variations state
  const [variations, setVariations] = useState<ProductVariation[]>([])
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null)
  const [variationsLoading, setVariationsLoading] = useState(false)
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({})

  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Fetch variations for variable products
  useEffect(() => {
    if (product && isVariableProduct(product)) {
      setVariationsLoading(true)
      fetchProductVariations(product.id)
        .then((vars) => {
          setVariations(vars)
          const firstInStock = vars.find((v) => v.stock_status === 'instock')
          if (firstInStock) {
            setSelectedVariation(firstInStock)
            const attrs: Record<string, string> = {}
            firstInStock.attributes.forEach((attr: VariationAttribute) => {
              attrs[attr.name.toLowerCase()] = attr.option
            })
            setSelectedAttributes(attrs)
          }
        })
        .catch((e: unknown) => {
          console.error('Failed to fetch variations:', e)
        })
        .finally(() => setVariationsLoading(false))
    }
  }, [product])

  useEffect(() => {
    if (product) {
      trackViewContent({
        id: product.id,
        name: product.name,
        price: selectedVariation?.price || product.price,
      })
    }
  }, [product, selectedVariation, trackViewContent])

  // Handle variation selection
  const handleAttributeChange = (attributeName: string, option: string) => {
    const newAttributes = {
      ...selectedAttributes,
      [attributeName.toLowerCase()]: option,
    }
    setSelectedAttributes(newAttributes)

    const match = variations.find((v) =>
      v.attributes.every(
        (attr) => newAttributes[attr.name.toLowerCase()] === attr.option,
      ),
    )
    if (match) setSelectedVariation(match)
  }

  // Price based on variation or base product
  const currentPrice = selectedVariation?.price || product?.price || '0'
  const currentRegularPrice =
    selectedVariation?.regular_price || product?.regular_price || currentPrice

  const salePrice = parseFloat(currentPrice)
  const regularPrice = parseFloat(currentRegularPrice)
  const hasSale = salePrice < regularPrice
  const totalPrice = salePrice * quantity
  const totalRegularPrice = regularPrice * quantity
  const totalSaving = hasSale ? totalRegularPrice - totalPrice : 0

  const isInStock =
    product && isVariableProduct(product)
      ? selectedVariation?.stock_status === 'instock'
      : true

  if (isLoading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-[#9e734d] border-t-transparent animate-spin" />
            <Crown className="absolute inset-0 m-auto w-6 h-6 text-[#9e734d]" />
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
          <p className="text-sm text-gray-600 font-light mb-8">
            The premium product you are looking for does not exist.
          </p>
          <button
            onClick={() => router.push('/shop')}
            className="px-10 py-4 text-xs text-white bg-gradient-to-r from-[#9e734d] to-[#8a6342] hover:shadow-[0_0_30px_rgba(158,115,77,0.4)] transition-all duration-500 tracking-widest uppercase font-medium rounded"
          >
            Explore Collection
          </button>
        </div>
      </div>
    )
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  // Unique options list for each attribute
  const getAttributeOptions = (attributeName: string): string[] => {
    const options = new Set<string>()
    variations.forEach((v) => {
      const attr = v.attributes.find(
        (a) => a.name.toLowerCase() === attributeName.toLowerCase(),
      )
      if (attr) options.add(attr.option)
    })
    return Array.from(options)
  }

  // Whether combination is available & in stock
  const isOptionAvailable = (attributeName: string, option: string): boolean => {
    const tempAttrs = {
      ...selectedAttributes,
      [attributeName.toLowerCase()]: option,
    }
    return variations.some((v) => {
      const matches = v.attributes.every(
        (attr) => tempAttrs[attr.name.toLowerCase()] === attr.option,
      )
      return matches && v.stock_status === 'instock'
    })
  }

  const variationAttributes = isVariableProduct(product)
    ? getVariationAttributes(product)
    : []

  // Images (variation image > product images)
  const galleryImages: ImageData[] = selectedVariation?.image
    ? [{ src: selectedVariation.image.src, alt: selectedVariation.image.alt }]
    : (product.images || []).map((img: WCImage) => ({
        src: img.src,
        alt: img.alt,
      }))

  const buildCartProduct = (): CartProduct => ({
    id: product.id,
    name: product.name,
    price: salePrice.toString(),
    regular_price: product.regular_price,
    images: galleryImages,
    variationId: selectedVariation?.id,
    attributes: selectedVariation?.attributes,
  })

  const handleAddToCart = async () => {
    if (isVariableProduct(product) && !selectedVariation) {
      toast({
        title: 'Please Select Options',
        description: 'Please select all product options before adding to cart',
        variant: 'destructive',
      })
      return
    }

    if (!isInStock) {
      toast({
        title: 'Out of Stock',
        description: 'This product is currently out of stock',
        variant: 'destructive',
      })
      return
    }

    setIsAddingToCart(true)
    try {
      const cartProduct = buildCartProduct()

      for (let i = 0; i < quantity; i++) {
        addToCart(cartProduct)
      }

      trackAddToCart({ id: product.id, name: product.name, price: salePrice }, quantity)

      triggerConfetti()

      const variationText = selectedVariation
        ? ` (${selectedVariation.attributes.map((a) => a.option).join(', ')})`
        : ''

      toast({
        title: '🎉 Added to Cart',
        description: `${quantity} x ${product.name}${variationText} added successfully.`,
      })
    } catch (e: unknown) {
      console.error('Add to cart failed:', e)
      toast({
        title: 'Error',
        description: 'Failed to add item to cart',
        variant: 'destructive',
      })
    } finally {
      setTimeout(() => setIsAddingToCart(false), 1000)
    }
  }

  const handleBuyNow = async () => {
    if (isVariableProduct(product) && !selectedVariation) {
      toast({
        title: 'Please Select Options',
        description: 'Please select all product options before buying',
        variant: 'destructive',
      })
      return
    }

    if (!isInStock) {
      toast({
        title: 'Out of Stock',
        description: 'This product is currently out of stock',
        variant: 'destructive',
      })
      return
    }

    setIsBuyingNow(true)
    try {
      const cartProduct = buildCartProduct()

      for (let i = 0; i < quantity; i++) {
        addToCart(cartProduct)
      }

      trackAddToCart({ id: product.id, name: product.name, price: salePrice }, quantity)
      const cartItems = [{ id: product.id, name: product.name, price: salePrice, quantity }]
      const total = salePrice * quantity
      trackInitiateCheckout(cartItems, total)

      triggerConfetti()

      setTimeout(() => {
        router.push('/checkout')
        setIsBuyingNow(false)
      }, 800)
    } catch (e: unknown) {
      console.error('Buy now failed:', e)
      toast({
        title: 'Error',
        description: 'Failed to process buy now',
        variant: 'destructive',
      })
      setIsBuyingNow(false)
    }
  }

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-8">
      {/* Premium Breadcrumb */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-white via-[#F5E6D3]/5 to-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3 text-xs text-gray-500 font-light">
            <button
              onClick={() => router.push('/shop')}
              className="hover:text-[#9e734d] transition-colors"
            >
              Shop
            </button>
            <span className="text-[#9e734d]">›</span>
            <span className="text-black truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 px-4 flex flex-col lg:flex-row gap-16">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <div className="sticky top-8 relative">
            <div className="absolute -inset-px bg-gradient-to-br from-[#9e734d]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <ImageGallery images={galleryImages} />
            {hasSale && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-[#9e734d] to-[#8a6342] text-white px-4 py-2 text-xs font-bold tracking-wider shadow-[0_4px_15px_rgba(158,115,77,0.4)] flex items-center gap-2 rounded">
                <Sparkles className="w-3 h-3" />
                {Math.round(((regularPrice - salePrice) / regularPrice) * 100)}% OFF
              </div>
            )}
            {!isInStock && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 text-xs font-bold tracking-wider shadow-lg flex items-center gap-2 rounded">
                <Package className="w-3 h-3" />
                OUT OF STOCK
              </div>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2">
          <div className="space-y-8">
            {/* Category / collection */}
            {product.attributes && product.attributes.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-gradient-to-r from-[#9e734d] to-transparent" />
                <div className="text-[10px] text-[#9e734d] uppercase tracking-[0.25em] font-medium flex items-center gap-2">
                  <Crown className="w-3 h-3" />
                  Premium Collection
                </div>
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 tracking-tight leading-tight animate-fade-in">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#9e734d] fill-[#9e734d] drop-shadow-[0_0_4px_rgba(158,115,77,0.3)]"
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
                      ? 'fill-[#9e734d] text-[#9e734d] drop-shadow-[0_0_8px_rgba(158,115,77,0.4)]'
                      : 'text-gray-400 group-hover:text-[#9e734d]'
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

            {/* VARIATION SELECTORS */}
            {isVariableProduct(product) && variationAttributes.length > 0 && (
              <div className="space-y-6 py-6 border-y border-gray-100">
                {variationsLoading ? (
                  <div className="text-center py-4">
                    <div className="inline-block w-6 h-6 border-2 border-[#9e734d] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  variationAttributes.map((attr) => (
                    <div key={attr.id}>
                      <label className="block text-xs font-medium text-gray-600 mb-3 uppercase tracking-[0.2em]">
                        {attr.name}
                        {selectedAttributes[attr.name.toLowerCase()] && (
                          <span className="ml-2 text-[#9e734d] font-light">
                            - {selectedAttributes[attr.name.toLowerCase()]}
                          </span>
                        )}
                      </label>
                      <div className="flex gap-3 flex-wrap">
                        {getAttributeOptions(attr.name).map((option) => {
                          const isSelected =
                            selectedAttributes[attr.name.toLowerCase()] === option
                          const available = isOptionAvailable(attr.name, option)

                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() =>
                                available && handleAttributeChange(attr.name, option)
                              }
                              disabled={!available}
                              className={`px-6 py-3 border-2 text-sm font-light transition-all duration-300 rounded
                                ${
                                  isSelected
                                    ? 'bg-gradient-to-r from-[#9e734d] to-[#8a6342] text-white border-[#9e734d] shadow-[0_0_20px_rgba(158,115,77,0.3)]'
                                    : available
                                    ? 'bg-white text-gray-900 border-gray-300 hover:border-[#9e734d] hover:shadow-[0_0_15px_rgba(158,115,77,0.2)]'
                                    : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                                }`}
                            >
                              {option}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Premium Price Section */}
            <div className="py-8 border-y border-gray-100 bg-gradient-to-r from-[#F5E6D3]/10 to-transparent -mx-6 px-6">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#9e734d] to-[#8a6342]">
                  ₹{totalPrice.toLocaleString()}
                </span>
                {hasSale && (
                  <>
                    <span className="line-through text-gray-400 font-light text-lg">
                      ₹{totalRegularPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-[#9e734d] font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Save ₹{totalSaving.toLocaleString()}
                    </span>
                  </>
                )}
              </div>
              {quantity > 1 && (
                <div className="text-xs text-gray-500 mt-3 font-light flex items-center gap-2">
                  <div className="w-4 h-px bg-[#9e734d]/30" />
                  ₹{salePrice.toLocaleString()} per unit
                </div>
              )}
              <div className="mt-4">
                {isInStock ? (
                  <span className="text-xs text-green-600 font-light flex items-center gap-2">
                    <Check className="w-3 h-3" />
                    In Stock
                  </span>
                ) : (
                  <span className="text-xs text-red-600 font-light flex items-center gap-2">
                    <Package className="w-3 h-3" />
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Premium Freebies Section - Add this after the Price section and before Quantity */}
<div className="py-6 px-6 -mx-6 bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border-2 border-dashed border-emerald-300 rounded-lg relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl" />
  <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-200/20 rounded-full blur-2xl" />
  
  <div className="relative z-10">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
        <Sparkles className="w-6 h-6 text-white animate-pulse" />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">
            🎁 Free Gifts Worth ₹250
          </span>
          <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full">
            LIMITED TIME
          </span>
        </div>
        
        <p className="text-xs text-gray-700 font-medium mb-3">
          Get these premium freebies with your order:
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-lg p-2.5 border border-emerald-200/50">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-md flex items-center justify-center">
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-900">Sticky Pad</p>
              <p className="text-[9px] text-gray-500">Premium Quality</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-lg p-2.5 border border-emerald-200/50">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-md flex items-center justify-center">
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-900">Cable Protector</p>
              <p className="text-[9px] text-gray-500">Durable Design</p>
            </div>
          </div>
        </div>
        
        <div className="mt-3 flex items-center gap-2 text-[10px] text-emerald-700 font-medium">
          <Package className="w-3 h-3" />
          <span>Automatically added to your order • No extra cost</span>
        </div>
      </div>
    </div>
  </div>
</div>


            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-4 uppercase tracking-[0.2em]">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 hover:border-[#9e734d]/50 transition-colors duration-300 rounded">
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
                    disabled={!isInStock}
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex flex-col gap-4 pt-8">
              <button
                className={`group relative w-full bg-gradient-to-r from-[#9e734d] to-[#8a6342] text-white font-bold px-8 py-5 text-sm tracking-widest uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(158,115,77,0.5)] rounded ${
                  isAddingToCart || !isInStock ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                onClick={handleAddToCart}
                disabled={isAddingToCart || !isInStock}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isAddingToCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Cart
                    </>
                  ) : !isInStock ? (
                    <>
                      <Package className="w-4 h-4" />
                      Out of Stock
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4" />
                      Add to Cart
                    </>
                  )}
                </span>
                {isInStock && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#b88658] to-[#9e734d] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </>
                )}
              </button>
              <button
                className={`relative w-full border-2 border-black text-black font-medium px-8 py-5 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-500 overflow-hidden group rounded ${
                  isBuyingNow || !isInStock ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                onClick={handleBuyNow}
                disabled={isBuyingNow || !isInStock}
              >
                <span className="relative z-10">
                  {isBuyingNow ? 'Processing...' : !isInStock ? 'Out of Stock' : 'Buy Now'}
                </span>
                {isInStock && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9e734d]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
              {[
                {
                  icon: <Truck className="w-5 h-5" />,
                  label: 'Free Shipping',
                  subtitle: 'Orders above ₹999',
                  gradient: 'from-[#9e734d]/10 to-transparent',
                },
                {
                  icon: <Shield className="w-5 h-5" />,
                  label: 'Authentic',
                  subtitle: 'Guaranteed original',
                  gradient: 'from-[#8a6342]/10 to-transparent',
                },
                {
                  icon: <Award className="w-5 h-5" />,
                  label: 'Premium Quality',
                  subtitle: 'Military-grade',
                  gradient: 'from-[#9e734d]/10 to-transparent',
                },
                {
                  icon: <CreditCard className="w-5 h-5" />,
                  label: 'Secure Payment',
                  subtitle: 'Protected checkout',
                  gradient: 'from-[#8a6342]/10 to-transparent',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group text-center p-6 border border-gray-100 hover:border-[#9e734d]/30 transition-all duration-500 relative overflow-hidden rounded"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <div className="text-gray-600 group-hover:text-[#9e734d] mb-3 flex justify-center transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div className="font-medium text-xs text-gray-900 mb-1 uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500 font-light">{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 ${
          isCartOpen
            ? 'translate-y-full opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100 z-40'
        }`}
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1 font-light uppercase tracking-wider">
                Total
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#9e734d] to-[#8a6342]">
                  ₹{totalPrice.toLocaleString()}
                </span>
                {hasSale && (
                  <span className="line-through text-gray-400 text-sm font-light">
                    ₹{totalRegularPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center border-2 border-gray-200 rounded">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2.5 hover:bg-[#F5E6D3]/20"
                disabled={quantity <= 1}
              >
                <Minus className="w-3 h-3 text-gray-900" />
              </button>
              <span className="px-4 py-2.5 text-sm font-light border-x-2 border-gray-200 text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2.5 hover:bg-[#F5E6D3]/20"
                disabled={!isInStock}
              >
                <Plus className="w-3 h-3 text-gray-900" />
              </button>
            </div>
          </div>
          {/* Add this inside the mobile bottom bar, above the price section */}
<div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-2 rounded-lg mb-3 flex items-center justify-center gap-2 shadow-lg">
  <Sparkles className="w-3 h-3 animate-pulse" />
  <span className="text-[10px] font-bold uppercase tracking-wider">
    Free Gifts Worth ₹250 Included
  </span>
</div>

          <div className="flex gap-3">
            <button
              className="flex-1 bg-gradient-to-r from-[#9e734d] to-[#8a6342] text-white font-bold px-4 py-3.5 text-xs tracking-widest uppercase rounded disabled:opacity-50"
              onClick={handleAddToCart}
              disabled={isAddingToCart || !isInStock}
            >
              {isAddingToCart ? 'Added' : !isInStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              className="flex-1 border-2 border-black text-black font-medium px-4 py-3.5 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors rounded disabled:opacity-50"
              onClick={handleBuyNow}
              disabled={isBuyingNow || !isInStock}
            >
              {isBuyingNow ? 'Processing' : !isInStock ? 'Unavailable' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs, FAQ, Reviews, Related */}
      <div className="max-w-7xl mx-auto mt-20 px-4">
        <div className="border-t border-gray-100">
          <Tab.Group>
            <Tab.List className="flex border-b border-gray-100 overflow-x-auto pb-2 -mb-px">
              {['Description', 'Specifications', 'Care Instructions'].map((label, idx) => (
                <Tab
                  key={idx}
                  className={({ selected }) =>
                    `flex-shrink-0 px-3 py-5 text-xs font-medium outline-none transition-all uppercase tracking-[0.2em] whitespace-nowrap relative ${
                      selected ? 'text-black' : 'text-gray-500 hover:text-gray-700'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      {label}
                      {selected && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#9e734d] to-[#8a6342] shadow-[0_2px_10px_rgba(158,115,77,0.5)] rounded-full" />
                      )}
                    </>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="py-12">
              <Tab.Panel>
                <div
                  className="prose prose-sm max-w-none text-gray-700 leading-relaxed font-light"
                  dangerouslySetInnerHTML={{ __html: product.description || '' }}
                />
              </Tab.Panel>
              <Tab.Panel>
                {/* TODO: your specifications content */}
              </Tab.Panel>
              <Tab.Panel>
                {/* TODO: your care instructions content */}
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

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
