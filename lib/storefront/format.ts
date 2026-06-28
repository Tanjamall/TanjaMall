import type { StoreProduct } from "@/lib/storefront/types";

export function getDiscountPercent(product: Pick<StoreProduct, "price" | "compare_at_price">) {
  if (!product.compare_at_price || product.compare_at_price <= product.price) return null;
  return Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
}

export function formatPrice(price: number) {
  return `${Math.round(price)} درهم`;
}
