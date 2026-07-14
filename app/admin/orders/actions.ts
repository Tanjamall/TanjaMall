"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import { orderNotesUpdateSchema, orderStatusUpdateSchema } from "@/lib/validators/orders";

export type OrderActionState = {
  status?: "success" | "error";
  message?: string;
};

function revalidateOrderPages(orderId: string) {
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/dashboard");
}

export async function updateOrderStatusAction(
  _previousState: OrderActionState,
  formData: FormData
): Promise<OrderActionState> {
  await requireAdmin();

  const parsed = orderStatusUpdateSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "تعذر تحديث حالة الطلب." };
  }

  const timestampFields = {
    CONTACTED: "contacted_at",
    CONFIRMED: "confirmed_at",
    DELIVERED: "delivered_at",
    CANCELLED: "cancelled_at"
  } as const;
  const timestampField = timestampFields[parsed.data.status as keyof typeof timestampFields];
  const payload: Record<string, string> = { status: parsed.data.status };
  if (timestampField) payload[timestampField] = new Date().toISOString();

  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update(payload)
    .eq("id", parsed.data.order_id)
    .select("id")
    .single();

  if (error) {
    return { status: "error", message: "تعذر تحديث حالة الطلب. حاول مرة أخرى." };
  }

  revalidateOrderPages(parsed.data.order_id);
  return { status: "success", message: "تم تحديث حالة الطلب." };
}

export async function saveOrderNotesAction(
  _previousState: OrderActionState,
  formData: FormData
): Promise<OrderActionState> {
  await requireAdmin();

  const parsed = orderNotesUpdateSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "تعذر حفظ الملاحظات." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({ internal_notes: parsed.data.internal_notes })
    .eq("id", parsed.data.order_id)
    .select("id")
    .single();

  if (error) {
    return { status: "error", message: "تعذر حفظ الملاحظات. حاول مرة أخرى." };
  }

  revalidateOrderPages(parsed.data.order_id);
  return { status: "success", message: "تم حفظ الملاحظات الداخلية." };
}
