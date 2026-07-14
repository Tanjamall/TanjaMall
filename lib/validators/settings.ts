import { z } from "zod";

function optionalText(maxLength: number) {
  return z.preprocess((value) => {
    const text = typeof value === "string" ? value.trim() : "";
    return text || null;
  }, z.string().max(maxLength).nullable());
}

function nonNegativeNumber(label: string, nullable = false) {
  return z.preprocess((value) => {
    const text = typeof value === "string" ? value.trim() : value;
    if (nullable && (text === "" || text === null || text === undefined)) return null;
    return Number(text);
  }, nullable
    ? z.number({ error: `${label} غير صحيح.` }).finite().min(0, `${label} لا يمكن أن يكون سالبا.`).nullable()
    : z.number({ error: `${label} غير صحيح.` }).finite().min(0, `${label} لا يمكن أن يكون سالبا.`));
}

export const storeSettingsSchema = z.object({
  store_name: z.string().trim().min(1, "اسم المتجر مطلوب.").max(100),
  store_phone: optionalText(30).refine(
    (value) => value === null || /^[+\d\s()-]{8,30}$/.test(value),
    "رقم هاتف المتجر غير صحيح."
  ),
  whatsapp_number: z.preprocess(
    (value) => typeof value === "string" ? value.replace(/\D/g, "") : value,
    z.string().regex(/^\d{9,15}$/, "رقم واتساب يجب أن يحتوي على رمز الدولة و9 إلى 15 رقما.")
  ),
  default_city: z.string().trim().min(1, "المدينة الافتراضية مطلوبة.").max(80),
  supported_cities: z.preprocess((value) => {
    const text = typeof value === "string" ? value : "";
    return text.split(/[\n,]+/).map((city) => city.trim()).filter(Boolean);
  }, z.array(z.string().max(80)).min(1, "أضف مدينة مدعومة واحدة على الأقل.").max(30)),
  delivery_fee_tanger: nonNegativeNumber("رسوم التوصيل"),
  free_delivery_threshold: nonNegativeNumber("حد التوصيل المجاني", true),
  announcement_text: optionalText(300)
}).superRefine((settings, context) => {
  const hasDefaultCity = settings.supported_cities.some(
    (city) => city.toLocaleLowerCase() === settings.default_city.toLocaleLowerCase()
  );
  if (!hasDefaultCity) {
    context.addIssue({
      code: "custom",
      path: ["supported_cities"],
      message: "المدينة الافتراضية يجب أن تكون ضمن المدن المدعومة."
    });
  }
});

export type StoreSettingsInput = z.infer<typeof storeSettingsSchema>;
