import { createClient } from "@/lib/supabase/server";

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  status: "ACTIVE" | "HIDDEN";
  sort_order: number;
  created_at: string;
  updated_at: string;
  product_count: number;
};

export type AdminProduct = {
  id: string;
  category_id: string | null;
  category_name: string | null;
  name: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  price: number;
  compare_at_price: number | null;
  cost_price: number | null;
  sku: string | null;
  stock: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  main_image_url: string | null;
  is_featured: boolean;
  is_best_seller: boolean;
  internal_notes: string | null;
  variants_enabled: boolean;
  offers_enabled: boolean;
  bundles_enabled: boolean;
  allow_variant_offer_combo: boolean;
  allow_variant_bundle_combo: boolean;
  allow_offer_bundle_combo: boolean;
  allow_variant_offer_bundle_combo: boolean;
  default_variant_id: string | null;
  default_offer_id: string | null;
  default_bundle_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ProductEditorData = {
  product: AdminProduct;
  galleryImages: Array<{ id: string; image_url: string; alt_text: string | null; sort_order: number }>;
  detailImages: Array<{ id: string; image_url: string; alt_text: string | null; sort_order: number }>;
  variantGroups: Array<{ id: string; name: string; slug: string; options: string[] }>;
  offers: Array<{ id: string; name: string; quantity: number; price: number; compare_at_price: number | null; badge_text: string | null; is_enabled: boolean }>;
  bundles: Array<{ id: string; name: string; price: number; compare_at_price: number | null; badge_text: string | null; image_url: string | null; is_enabled: boolean }>;
};

function toNumber(value: unknown) {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeProduct(row: Record<string, unknown>): AdminProduct {
  const category = row.categories as { name?: string | null } | null | undefined;

  return {
    id: String(row.id),
    category_id: row.category_id ? String(row.category_id) : null,
    category_name: category?.name ?? null,
    name: String(row.name),
    slug: String(row.slug),
    short_description: row.short_description ? String(row.short_description) : null,
    full_description: row.full_description ? String(row.full_description) : null,
    price: toNumber(row.price) ?? 0,
    compare_at_price: toNumber(row.compare_at_price),
    cost_price: toNumber(row.cost_price),
    sku: row.sku ? String(row.sku) : null,
    stock: toNumber(row.stock) ?? 0,
    status: String(row.status) as AdminProduct["status"],
    main_image_url: row.main_image_url ? String(row.main_image_url) : null,
    is_featured: Boolean(row.is_featured),
    is_best_seller: Boolean(row.is_best_seller),
    internal_notes: row.internal_notes ? String(row.internal_notes) : null,
    variants_enabled: Boolean(row.variants_enabled),
    offers_enabled: Boolean(row.offers_enabled),
    bundles_enabled: Boolean(row.bundles_enabled),
    allow_variant_offer_combo: Boolean(row.allow_variant_offer_combo),
    allow_variant_bundle_combo: Boolean(row.allow_variant_bundle_combo),
    allow_offer_bundle_combo: Boolean(row.allow_offer_bundle_combo),
    allow_variant_offer_bundle_combo: Boolean(row.allow_variant_offer_bundle_combo),
    default_variant_id: row.default_variant_id ? String(row.default_variant_id) : null,
    default_offer_id: row.default_offer_id ? String(row.default_offer_id) : null,
    default_bundle_id: row.default_bundle_id ? String(row.default_bundle_id) : null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at)
  };
}

function productColumns() {
  return [
    "id",
    "category_id",
    "name",
    "slug",
    "short_description",
    "full_description",
    "price",
    "compare_at_price",
    "cost_price",
    "sku",
    "stock",
    "status",
    "main_image_url",
    "is_featured",
    "is_best_seller",
    "internal_notes",
    "created_at",
    "updated_at",
    "variants_enabled",
    "offers_enabled",
    "bundles_enabled",
    "allow_variant_offer_combo",
    "allow_variant_bundle_combo",
    "allow_offer_bundle_combo",
    "allow_variant_offer_bundle_combo",
    "default_variant_id",
    "default_offer_id",
    "default_bundle_id",
    "categories(name)"
  ].join(", ");
}

export async function getAdminProducts({
  query,
  status
}: {
  query?: string;
  status?: string;
} = {}) {
  const supabase = await createClient();
  let request = supabase
    .from("products")
    .select(productColumns())
    .order("created_at", { ascending: false });

  if (status && status !== "ALL") {
    request = request.eq("status", status);
  }

  if (query?.trim()) {
    const term = query.trim().replaceAll("%", "\\%");
    request = request.or(`name.ilike.%${term}%,slug.ilike.%${term}%,sku.ilike.%${term}%`);
  }

  const { data, error } = await request;
  if (error) throw error;
  return (data ?? []).map((row) => normalizeProduct(row as unknown as Record<string, unknown>));
}

export async function getAdminProductEditorData(id: string): Promise<ProductEditorData | null> {
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from("products")
    .select(productColumns())
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!product) return null;

  const [
    galleryImages,
    detailImages,
    variantGroups,
    variantOptions,
    offers,
    bundles
  ] = await Promise.all([
    supabase.from("product_images").select("id, image_url, alt_text, sort_order").eq("product_id", id).order("sort_order"),
    supabase.from("product_detail_images").select("id, image_url, alt_text, sort_order").eq("product_id", id).order("sort_order"),
    supabase.from("product_variant_groups").select("id, name, slug, sort_order").eq("product_id", id).order("sort_order"),
    supabase.from("product_variant_options").select("id, variant_group_id, label, sort_order").order("sort_order"),
    supabase.from("product_offers").select("id, name, quantity, price, compare_at_price, badge_text, is_enabled, sort_order").eq("product_id", id).order("sort_order"),
    supabase.from("product_bundles").select("id, name, price, compare_at_price, badge_text, image_url, is_enabled, sort_order").eq("product_id", id).order("sort_order")
  ]);

  for (const result of [galleryImages, detailImages, variantGroups, variantOptions, offers, bundles]) {
    if (result.error) throw result.error;
  }

  const optionsByGroup = new Map<string, string[]>();
  for (const option of variantOptions.data ?? []) {
    const groupId = String(option.variant_group_id);
    optionsByGroup.set(groupId, [...(optionsByGroup.get(groupId) ?? []), String(option.label)]);
  }

  return {
    product: normalizeProduct(product as unknown as Record<string, unknown>),
    galleryImages: galleryImages.data ?? [],
    detailImages: detailImages.data ?? [],
    variantGroups: (variantGroups.data ?? []).map((group) => ({
      id: String(group.id),
      name: String(group.name),
      slug: String(group.slug),
      options: optionsByGroup.get(String(group.id)) ?? []
    })),
    offers: (offers.data ?? []).map((offer) => ({
      id: String(offer.id),
      name: String(offer.name),
      quantity: toNumber(offer.quantity) ?? 1,
      price: toNumber(offer.price) ?? 0,
      compare_at_price: toNumber(offer.compare_at_price),
      badge_text: offer.badge_text ? String(offer.badge_text) : null,
      is_enabled: Boolean(offer.is_enabled)
    })),
    bundles: (bundles.data ?? []).map((bundle) => ({
      id: String(bundle.id),
      name: String(bundle.name),
      price: toNumber(bundle.price) ?? 0,
      compare_at_price: toNumber(bundle.compare_at_price),
      badge_text: bundle.badge_text ? String(bundle.badge_text) : null,
      image_url: bundle.image_url ? String(bundle.image_url) : null,
      is_enabled: Boolean(bundle.is_enabled)
    }))
  };
}

export async function getAdminCategories(): Promise<AdminCategory[]> {
  const supabase = await createClient();
  const [{ data: categories, error }, { data: products, error: productsError }] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order", { ascending: true }).order("name"),
    supabase.from("products").select("category_id")
  ]);

  if (error) throw error;
  if (productsError) throw productsError;

  const counts = new Map<string, number>();
  for (const product of products ?? []) {
    if (product.category_id) {
      counts.set(String(product.category_id), (counts.get(String(product.category_id)) ?? 0) + 1);
    }
  }

  return (categories ?? []).map((category) => ({
    id: String(category.id),
    name: String(category.name),
    slug: String(category.slug),
    description: category.description ? String(category.description) : null,
    image_url: category.image_url ? String(category.image_url) : null,
    status: String(category.status) as AdminCategory["status"],
    sort_order: toNumber(category.sort_order) ?? 0,
    created_at: String(category.created_at),
    updated_at: String(category.updated_at),
    product_count: counts.get(String(category.id)) ?? 0
  }));
}

export function formatMad(value: number | null) {
  if (value === null) return "-";
  return `${new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 2 }).format(value)} درهم`;
}
