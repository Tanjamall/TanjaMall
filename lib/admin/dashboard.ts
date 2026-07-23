import { createClient } from "@/lib/supabase/server";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/orders";

export type DashboardRecentOrder = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  city: string;
  area: string | null;
  total: number;
  status: OrderStatus;
  whatsapp_confirmation_url: string | null;
  created_at: string;
};

export type DashboardLowStockProduct = {
  id: string;
  name: string;
  slug: string;
  stock: number;
  status: "DRAFT" | "PUBLISHED";
};

export type AdminDashboardData = {
  new_orders_today: number;
  pending_confirmation_orders: number;
  confirmed_orders: number;
  delivered_orders: number;
  cancelled_orders: number;
  delivered_revenue: number;
  expected_revenue: number;
  low_stock_count: number;
  recent_orders: DashboardRecentOrder[];
  low_stock_products: DashboardLowStockProduct[];
};

function toNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function normalizeStatus(value: unknown): OrderStatus {
  const status = String(value) as OrderStatus;
  return ORDER_STATUSES.includes(status) ? status : "NEW";
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_admin_dashboard");
  if (error) throw error;

  const payload = record(data);
  const recentOrders = Array.isArray(payload.recent_orders) ? payload.recent_orders : [];
  const lowStockProducts = Array.isArray(payload.low_stock_products) ? payload.low_stock_products : [];

  return {
    new_orders_today: toNumber(payload.new_orders_today),
    pending_confirmation_orders: toNumber(payload.pending_confirmation_orders),
    confirmed_orders: toNumber(payload.confirmed_orders),
    delivered_orders: toNumber(payload.delivered_orders),
    cancelled_orders: toNumber(payload.cancelled_orders),
    delivered_revenue: toNumber(payload.delivered_revenue),
    expected_revenue: toNumber(payload.expected_revenue),
    low_stock_count: toNumber(payload.low_stock_count),
    recent_orders: recentOrders.map((value) => {
      const order = record(value);
      return {
        id: String(order.id),
        order_number: String(order.order_number),
        customer_name: String(order.customer_name),
        customer_phone: String(order.customer_phone),
        city: String(order.city),
        area: order.area ? String(order.area) : null,
        total: toNumber(order.total),
        status: normalizeStatus(order.status),
        whatsapp_confirmation_url: order.whatsapp_confirmation_url ? String(order.whatsapp_confirmation_url) : null,
        created_at: String(order.created_at)
      };
    }),
    low_stock_products: lowStockProducts.map((value) => {
      const product = record(value);
      return {
        id: String(product.id),
        name: String(product.name),
        slug: String(product.slug),
        stock: toNumber(product.stock),
        status: product.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT"
      };
    })
  };
}
