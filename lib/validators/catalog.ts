import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function optionalText(maxLength = 2000) {
  return z.preprocess((value) => {
    const text = typeof value === "string" ? value.trim() : "";
    return text.length ? text : null;
  }, z.string().max(maxLength).nullable());
}

function requiredText(label: string, maxLength = 180) {
  return z.preprocess((value) => (typeof value === "string" ? value.trim() : value), z.string().min(1, `${label} مطلوب.`).max(maxLength));
}

function optionalDecimal(label: string) {
  return z.preprocess((value) => {
    const text = typeof value === "string" ? value.trim() : value;
    return text === "" || text === null || text === undefined ? null : Number(text);
  }, z.number({ error: `${label} غير صحيح.` }).finite(`${label} غير صحيح.`).nullable());
}

function requiredPositiveDecimal(label: string) {
  return z.preprocess((value) => {
    const text = typeof value === "string" ? value.trim() : value;
    return Number(text);
  }, z.number({ error: `${label} مطلوب.` }).positive(`${label} يجب أن يكون أكبر من 0.`));
}

function nonNegativeInteger(label: string) {
  return z.preprocess((value) => {
    const text = typeof value === "string" ? value.trim() : value;
    return text === "" || text === null || text === undefined ? 0 : Number(text);
  }, z.number({ error: `${label} غير صحيح.` }).int(`${label} يجب أن يكون رقما صحيحا.`).min(0, `${label} لا يمكن أن يكون سالبا.`));
}

function checkbox(value: unknown) {
  return value === "on" || value === "true" || value === true;
}

export const productStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
export const categoryStatusSchema = z.enum(["ACTIVE", "HIDDEN"]);

export const productFormSchema = z
  .object({
    id: optionalText(80),
    name: requiredText("اسم المنتج"),
    slug: requiredText("الرابط المختصر", 120).refine((value) => slugPattern.test(value), "الرابط المختصر يجب أن يكون بحروف إنجليزية صغيرة وأرقام وشرطات فقط."),
    category_id: optionalText(80),
    short_description: optionalText(600),
    full_description: optionalText(4000),
    price: requiredPositiveDecimal("سعر البيع"),
    compare_at_price: optionalDecimal("سعر المقارنة"),
    cost_price: optionalDecimal("سعر التكلفة"),
    sku: optionalText(120),
    stock: nonNegativeInteger("المخزون"),
    status: productStatusSchema.default("DRAFT"),
    main_image_url: optionalText(1200),
    is_featured: z.preprocess(checkbox, z.boolean()),
    is_best_seller: z.preprocess(checkbox, z.boolean()),
    internal_notes: optionalText(4000),
    variants_enabled: z.preprocess(checkbox, z.boolean()),
    offers_enabled: z.preprocess(checkbox, z.boolean()),
    bundles_enabled: z.preprocess(checkbox, z.boolean()),
    allow_variant_offer_combo: z.preprocess(checkbox, z.boolean()),
    allow_variant_bundle_combo: z.preprocess(checkbox, z.boolean()),
    allow_offer_bundle_combo: z.preprocess(checkbox, z.boolean()),
    allow_variant_offer_bundle_combo: z.preprocess(checkbox, z.boolean()),
    gallery_image_urls: optionalText(8000),
    detail_image_urls: optionalText(8000),
    variant_groups_text: optionalText(4000),
    offers_text: optionalText(4000),
    bundles_text: optionalText(4000)
  })
  .superRefine((value, ctx) => {
    if (value.compare_at_price !== null && value.compare_at_price <= 0) {
      ctx.addIssue({ code: "custom", path: ["compare_at_price"], message: "سعر المقارنة يجب أن يكون أكبر من 0." });
    }
    if (value.cost_price !== null && value.cost_price < 0) {
      ctx.addIssue({ code: "custom", path: ["cost_price"], message: "سعر التكلفة لا يمكن أن يكون سالبا." });
    }
    if (value.status === "PUBLISHED" && !value.main_image_url) {
      ctx.addIssue({ code: "custom", path: ["main_image_url"], message: "الصورة الرئيسية مطلوبة قبل النشر." });
    }
  });

export const categoryFormSchema = z.object({
  id: optionalText(80),
  name: requiredText("اسم التصنيف"),
  slug: requiredText("الرابط المختصر", 120).refine((value) => slugPattern.test(value), "الرابط المختصر يجب أن يكون بحروف إنجليزية صغيرة وأرقام وشرطات فقط."),
  description: optionalText(1000),
  image_url: optionalText(1200),
  status: categoryStatusSchema.default("ACTIVE"),
  sort_order: nonNegativeInteger("ترتيب العرض")
});

export type ProductFormInput = z.infer<typeof productFormSchema>;
export type CategoryFormInput = z.infer<typeof categoryFormSchema>;
