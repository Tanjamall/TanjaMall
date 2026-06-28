import { createClient } from "@/lib/supabase/server";
import type { ProductImage, ProductWithImages, StoreCategory, StoreProduct, StoreSettings } from "@/lib/storefront/types";

function toNumber(value: unknown) {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeProduct(product: Record<string, unknown>): StoreProduct {
  return {
    id: String(product.id),
    category_id: product.category_id ? String(product.category_id) : null,
    category_name: product.category_name ? String(product.category_name) : null,
    category_slug: product.category_slug ? String(product.category_slug) : null,
    name: String(product.name),
    slug: String(product.slug),
    short_description: product.short_description ? String(product.short_description) : null,
    full_description: product.full_description ? String(product.full_description) : null,
    price: toNumber(product.price) ?? 0,
    compare_at_price: toNumber(product.compare_at_price),
    stock: toNumber(product.stock) ?? 0,
    main_image_url: product.main_image_url ? String(product.main_image_url) : null,
    is_featured: Boolean(product.is_featured),
    is_best_seller: Boolean(product.is_best_seller),
    created_at: String(product.created_at),
    updated_at: String(product.updated_at)
  };
}

function normalizeImage(image: Record<string, unknown>): ProductImage {
  return {
    id: String(image.id),
    product_id: String(image.product_id),
    image_url: String(image.image_url),
    alt_text: image.alt_text ? String(image.alt_text) : null,
    sort_order: toNumber(image.sort_order) ?? 0
  };
}

export async function getStoreSettings(): Promise<StoreSettings> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("store_settings")
    .select("store_name, store_phone, whatsapp_number, announcement_text, delivery_fee_tanger, free_delivery_threshold")
    .limit(1)
    .maybeSingle();

  return {
    store_name: data?.store_name ?? "TanjaMall",
    store_phone: data?.store_phone ?? "0672975000",
    whatsapp_number: data?.whatsapp_number ?? "212672975000",
    announcement_text: data?.announcement_text ?? null,
    delivery_fee_tanger: toNumber(data?.delivery_fee_tanger),
    free_delivery_threshold: toNumber(data?.free_delivery_threshold)
  };
}

export async function getCategories(): Promise<StoreCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, image_url, sort_order")
    .eq("status", "ACTIVE")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;
  return (data ?? []) as StoreCategory[];
}

export async function getProducts(): Promise<StoreProduct[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("public_products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((product) => normalizeProduct(product));
}

export async function getProductBySlug(slug: string): Promise<ProductWithImages | null> {
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from("public_products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!product) return null;

  const normalizedProduct = normalizeProduct(product);
  const { data: images, error: imageError } = await supabase
    .from("product_images")
    .select("id, product_id, image_url, alt_text, sort_order")
    .eq("product_id", normalizedProduct.id)
    .order("sort_order", { ascending: true });

  if (imageError) throw imageError;

  const normalizedImages = (images ?? []).map((image) => normalizeImage(image));
  const hasMainImage = normalizedProduct.main_image_url
    ? normalizedImages.some((image) => image.image_url === normalizedProduct.main_image_url)
    : true;

  return {
    ...normalizedProduct,
    images: hasMainImage || !normalizedProduct.main_image_url
      ? normalizedImages
      : [
          {
            id: `${normalizedProduct.id}-main`,
            product_id: normalizedProduct.id,
            image_url: normalizedProduct.main_image_url,
            alt_text: normalizedProduct.name,
            sort_order: 0
          },
          ...normalizedImages
        ]
  };
}

export async function getProductsByCategorySlug(slug: string): Promise<StoreProduct[]> {
  const products = await getProducts();
  return products.filter((product) => product.category_slug === slug);
}

export function getRelatedProducts(product: StoreProduct, products: StoreProduct[]) {
  return products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      const categoryScore = Number(b.category_id === product.category_id) - Number(a.category_id === product.category_id);
      if (categoryScore !== 0) return categoryScore;
      return Number(b.is_featured) - Number(a.is_featured);
    })
    .slice(0, 6);
}
