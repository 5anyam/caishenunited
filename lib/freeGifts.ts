import type { WCCategoryRef } from './woocommerceApi'

// Free gifts (Sticky Pad + Cable Protector) apply to mobile cover orders only:
// cover total of ₹399 or more, OR 2+ covers in the cart.
export const FREE_GIFT_MIN_COVER_TOTAL = 399
export const FREE_GIFT_MIN_COVER_QTY = 2

// Brand cover categories are named "<brand>-covers" (iphone-covers, samsung-covers, ...).
// "charger-covers" are charger protectors, not mobile covers.
export function isMobileCoverProduct(categories?: WCCategoryRef[]): boolean {
  return (categories ?? []).some((c) => {
    const slug = (c.slug ?? '').toLowerCase()
    return slug.endsWith('-covers') && slug !== 'charger-covers'
  })
}

type GiftCartItem = { price: string; quantity: number; isMobileCover?: boolean }

export function getFreeGiftStatus(items: GiftCartItem[]) {
  const covers = items.filter((i) => i.isMobileCover)
  const coverQty = covers.reduce((sum, i) => sum + i.quantity, 0)
  const coverTotal = covers.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0)
  const eligible =
    coverTotal >= FREE_GIFT_MIN_COVER_TOTAL || coverQty >= FREE_GIFT_MIN_COVER_QTY
  return { eligible, coverQty, coverTotal }
}
