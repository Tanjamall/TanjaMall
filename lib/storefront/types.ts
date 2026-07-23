export type StoreSettings = {
  store_name: string;
  store_phone: string | null;
  whatsapp_number: string | null;
  default_city: string;
  supported_cities: string[];
  announcement_text: string | null;
  delivery_fee_tanger: number | null;
  free_delivery_threshold: number | null;
  meta_pixel_enabled: boolean;
  meta_pixel_id: string | null;
  tiktok_pixel_enabled: boolean;
  tiktok_pixel_id: string | null;
  google_tag_manager_enabled: boolean;
  google_tag_manager_id: string | null;
};

export type StoreCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
};

export type StoreProduct = {
  id: string;
  category_id: string | null;
  category_name: string | null;
  category_slug: string | null;
  name: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  price: number;
  compare_at_price: number | null;
  stock: number;
  main_image_url: string | null;
  is_featured: boolean;
  is_best_seller: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
};

export type ProductWithImages = StoreProduct & {
  images: ProductImage[];
  detail_images: ProductImage[];
};
