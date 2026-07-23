import { createClient } from "@/lib/supabase/server";
import {
  ORDER_STATUSES,
  type AdminOrderDetail,
  type AdminOrderItem,
  type AdminOrderSummary,
  type OrderStatus
} from "@/lib/orders";

function toNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeStatus(value: unknown): OrderStatus {
  const status = String(value) as OrderStatus;
  return ORDER_STATUSES.includes(status) ? status : "NEW";
}

function normalizeOrderItem(row: Record<string, unknown>): AdminOrderItem {
  return {
    id: String(row.id ?? ""),
    product_name: String(row.product_name ?? ""),
    product_slug: String(row.product_slug ?? ""),
    product_image_url: row.product_image_url ? String(row.product_image_url) : null,
    quantity: toNumber(row.quantity),
    unit_price: toNumber(row.unit_price),
    total_price: toNumber(row.total_price)
  };
}

function normalizeSummary(row: Record<string, unknown>): AdminOrderSummary {
  const itemRows = Array.isArray(row.order_items) ? row.order_items : [];

  return {
    id: String(row.id),
    order_number: String(row.order_number),
    customer_name: String(row.customer_name),
    customer_phone: String(row.customer_phone),
    city: String(row.city),
    area: row.area ? String(row.area) : null,
    address: String(row.address),
    total: toNumber(row.total),
    status: normalizeStatus(row.status),
    created_at: String(row.created_at),
    whatsapp_confirmation_url: row.whatsapp_confirmation_url ? String(row.whatsapp_confirmation_url) : null,
    items: itemRows.map((item) => ({
      product_name: String((item as Record<string, unknown>).product_name ?? ""),
      quantity: toNumber((item as Record<string, unknown>).quantity)
    }))
  };
}

export async function getAdminOrders(): Promise<AdminOrderSummary[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("id, order_number, customer_name, customer_phone, city, area, address, total, status, created_at, whatsapp_confirmation_url, order_items(product_name, quantity)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((order) => normalizeSummary(order as unknown as Record<string, unknown>));
}

export async function getAdminOrder(id: string): Promise<AdminOrderDetail | null> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return null;
  }

  const supabase = await createClient();
  const [{ data: order, error }, { data: items, error: itemsError }] = await Promise.all([
    supabase
      .from("orders")
      .select("id, order_number, customer_name, customer_phone, city, area, address, notes_from_customer, internal_notes, subtotal, delivery_fee, total, status, whatsapp_confirmation_url, contacted_at, confirmed_at, delivered_at, cancelled_at, created_at, updated_at")
      .eq("id", id)
      .maybeSingle(),
    supabase
      .from("order_items")
      .select("id, product_name, product_slug, product_image_url, quantity, unit_price, total_price")
      .eq("order_id", id)
      .order("created_at", { ascending: true })
  ]);

  if (error) throw error;
  if (itemsError) throw itemsError;
  if (!order) return null;

  const normalizedItems = (items ?? []).map((item) => normalizeOrderItem(item as unknown as Record<string, unknown>));

  return {
    ...normalizeSummary({ ...order, order_items: normalizedItems }),
    notes_from_customer: order.notes_from_customer ? String(order.notes_from_customer) : null,
    internal_notes: order.internal_notes ? String(order.internal_notes) : null,
    subtotal: toNumber(order.subtotal),
    delivery_fee: toNumber(order.delivery_fee),
    updated_at: String(order.updated_at),
    contacted_at: order.contacted_at ? String(order.contacted_at) : null,
    confirmed_at: order.confirmed_at ? String(order.confirmed_at) : null,
    delivered_at: order.delivered_at ? String(order.delivered_at) : null,
    cancelled_at: order.cancelled_at ? String(order.cancelled_at) : null,
    items: normalizedItems
  };
}
