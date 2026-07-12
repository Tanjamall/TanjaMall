import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "الاسم الكامل مطلوب"),
  phone: z.string().trim().regex(/^(?:0|\+?212)[5-7]\d{8}$/, "أدخل رقم هاتف مغربي صحيح"),
  city: z.string().trim().min(2, "المدينة مطلوبة"),
  area: z.string().trim().optional(),
  address: z.string().trim().min(5, "العنوان مطلوب"),
  notes: z.string().trim().optional()
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
