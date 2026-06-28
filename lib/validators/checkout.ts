import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "الاسم الكامل مطلوب"),
  phone: z.string().min(9, "رقم الهاتف مطلوب"),
  city: z.string().min(2, "المدينة مطلوبة"),
  area: z.string().optional(),
  address: z.string().min(5, "العنوان مطلوب"),
  notes: z.string().optional()
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
