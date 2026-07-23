export const ORDER_STATUSES = [
  "NEW",
  "CONTACTED",
  "CONFIRMED",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
  "RETURNED"
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type AdminOrderItem = {
  id: string;
  product_name: string;
  product_slug: string;
  product_image_url: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
};

export type AdminOrderSummary = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  city: string;
  area: string | null;
  address: string;
  total: number;
  status: OrderStatus;
  created_at: string;
  whatsapp_confirmation_url: string | null;
  items: Array<Pick<AdminOrderItem, "product_name" | "quantity">>;
};

export type AdminOrderDetail = Omit<AdminOrderSummary, "items"> & {
  notes_from_customer: string | null;
  internal_notes: string | null;
  subtotal: number;
  delivery_fee: number;
  updated_at: string;
  contacted_at: string | null;
  confirmed_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
  items: AdminOrderItem[];
};

export function formatOrderDate(value: string) {
  return new Intl.DateTimeFormat("ar-MA", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function formatOrderMad(value: number) {
  return `${new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 2 }).format(value)} درهم`;
}

export function formatOrderAddress(city: string, area: string | null, address: string) {
  return [city, area, address].filter(Boolean).join("، ");
}
