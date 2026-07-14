import { z } from "zod";
import { ORDER_STATUSES } from "@/lib/orders";

export const orderStatusSchema = z.enum(ORDER_STATUSES);

export const orderStatusUpdateSchema = z.object({
  order_id: z.string().uuid("رقم الطلب غير صالح."),
  status: orderStatusSchema
});

export const orderNotesUpdateSchema = z.object({
  order_id: z.string().uuid("رقم الطلب غير صالح."),
  internal_notes: z.preprocess((value) => {
    const text = typeof value === "string" ? value.trim() : "";
    return text.length ? text : null;
  }, z.string().max(4000, "الملاحظات طويلة جدا.").nullable())
});
