"use client";

import { useActionState } from "react";
import type { ReactNode, TextareaHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import {
  BadgePercent,
  Boxes,
  Image as ImageIcon,
  Layers3,
  PackageCheck,
  Settings2,
  ShoppingBag,
  Tags
} from "lucide-react";
import { saveProductAction, type ProductEditorState } from "@/app/admin/products/actions";
import { AdminImageUploadButton } from "@/components/admin/admin-image-upload-button";
import { AdminFormSection, StatusBadge } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { AdminCategory, ProductEditorData } from "@/lib/admin/catalog";
import { imageUploadRules } from "@/lib/images/r2";
import type { ProductFormInput } from "@/lib/validators/catalog";

const tabs = ["الأساسيات", "السعر والمخزون", "الصور", "تفاصيل المنتج", "البيع المتقدم", "النشر"];

function Field({
  label,
  children,
  className = ""
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="text-sm font-black text-foreground">{label}</span>
      {children}
    </label>
  );
}

function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-28 rounded-md border border-input bg-card px-3 py-2 text-sm font-bold outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring ${props.className ?? ""}`}
    />
  );
}

function CheckboxField({
  name,
  label,
  description,
  defaultChecked
}: {
  name: keyof ProductFormInput;
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex min-h-24 items-start gap-3 rounded-md border border-border bg-background p-4">
      <input className="mt-1 h-5 w-5 accent-primary" defaultChecked={defaultChecked} name={name} type="checkbox" />
      <span>
        <span className="block text-sm font-black">{label}</span>
        <span className="mt-1 block text-xs font-bold leading-6 text-muted-foreground">{description}</span>
      </span>
    </label>
  );
}

function lines(values: string[]) {
  return values.filter(Boolean).join("\n");
}

function productDefaults(editorData?: ProductEditorData): Partial<ProductFormInput> {
  const product = editorData?.product;
  return {
    id: product?.id ?? null,
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    category_id: product?.category_id ?? null,
    short_description: product?.short_description ?? "",
    full_description: product?.full_description ?? "",
    price: product?.price ?? 1,
    compare_at_price: product?.compare_at_price ?? null,
    cost_price: product?.cost_price ?? null,
    sku: product?.sku ?? "",
    stock: product?.stock ?? 0,
    status: product?.status ?? "DRAFT",
    main_image_url: product?.main_image_url ?? "",
    is_featured: product?.is_featured ?? false,
    is_best_seller: product?.is_best_seller ?? false,
    internal_notes: product?.internal_notes ?? "",
    variants_enabled: product?.variants_enabled ?? false,
    offers_enabled: product?.offers_enabled ?? false,
    bundles_enabled: product?.bundles_enabled ?? false,
    allow_variant_offer_combo: product?.allow_variant_offer_combo ?? false,
    allow_variant_bundle_combo: product?.allow_variant_bundle_combo ?? false,
    allow_offer_bundle_combo: product?.allow_offer_bundle_combo ?? false,
    allow_variant_offer_bundle_combo: product?.allow_variant_offer_bundle_combo ?? false,
    gallery_image_urls: lines(editorData?.galleryImages.map((image) => image.image_url) ?? []),
    detail_image_urls: lines(editorData?.detailImages.map((image) => image.image_url) ?? []),
    variant_groups_text: lines(editorData?.variantGroups.map((group) => `${group.name}: ${group.options.join(", ")}`) ?? []),
    offers_text: lines(
      editorData?.offers.map((offer) =>
        [offer.name, offer.quantity, offer.price, offer.compare_at_price ?? "", offer.badge_text ?? "", offer.is_enabled ? "on" : "off"].join(" | ")
      ) ?? []
    ),
    bundles_text: lines(
      editorData?.bundles.map((bundle) =>
        [bundle.name, bundle.price, bundle.compare_at_price ?? "", bundle.badge_text ?? "", bundle.image_url ?? "", bundle.is_enabled ? "on" : "off"].join(" | ")
      ) ?? []
    )
  };
}

export function ProductEditorForm({
  mode,
  categories = [],
  editorData
}: {
  mode: "new" | "edit";
  categories?: AdminCategory[];
  editorData?: ProductEditorData;
}) {
  const defaults = productDefaults(editorData);
  const [state, formAction, isPending] = useActionState<ProductEditorState, FormData>(saveProductAction, {});
  const { getValues, register, setValue } = useForm<ProductFormInput>({ defaultValues: defaults });
  const product = editorData?.product;
  const isPublished = product?.status === "PUBLISHED";
  const previewHref = product?.slug ? `/products/${product.slug}` : "/products";
  const canUploadImages = Boolean(product?.id);
  const productIdForUpload = product?.id ?? "";
  const uploadDisabledMessage = "احفظ المنتج كمسودة أولا قبل رفع الصور.";

  function appendImageUrl(field: "gallery_image_urls" | "detail_image_urls", url: string) {
    const current = getValues(field) ?? "";
    const next = [current.trim(), url].filter(Boolean).join("\n");
    setValue(field, next, { shouldDirty: true });
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" {...register("id")} value={product?.id ?? ""} />

      <section className="rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm">
        <p className="text-sm font-black text-accent-foreground">MagicPath product editor design</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-6" style={{ direction: "ltr" }}>
          <div className="flex flex-wrap gap-2" dir="ltr">
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">Supabase connected</span>
            <span className="rounded-full bg-secondary px-4 py-2 text-sm font-black text-secondary-foreground">R2 upload enabled</span>
            <span className="rounded-full bg-accent px-4 py-2 text-sm font-black text-accent-foreground">Admin only</span>
          </div>
          <div className="text-right" dir="rtl">
            <h2 className="text-4xl font-black">{mode === "new" ? "إضافة منتج جديد" : "تعديل المنتج"}</h2>
            <p className="mt-3 max-w-4xl text-base font-bold leading-8 text-muted-foreground">
              هذه الصفحة تتحكم في بطاقة المنتج، صفحة المنتج، الصور، صور التفاصيل، ونموذج الطلب. الصور تضغط إلى WebP ثم ترفع إلى Cloudflare R2.
            </p>
          </div>
        </div>
      </section>

      <nav className="flex flex-wrap gap-2 rounded-lg border border-border bg-white p-2 shadow-sm">
        {tabs.map((tab, index) => (
          <a
            key={tab}
            className={`rounded-md px-4 py-2 text-sm font-black ${
              index === 0 ? "bg-primary text-primary-foreground" : index === 4 ? "bg-[#131921] text-white" : "text-muted-foreground hover:bg-muted"
            }`}
            href={`#section-${index}`}
          >
            {tab}
          </a>
        ))}
      </nav>

      <div className="grid gap-6 lg:grid-cols-[390px_minmax(0,1fr)]" style={{ direction: "ltr" }}>
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start" dir="rtl">
          <Card className="overflow-hidden">
            <div className="bg-[#131921] p-5 text-white">
              <p className="text-sm font-black text-orange-300">حالة المنتج</p>
              <div className="mt-3 flex items-center justify-between">
                <h2 className="text-2xl font-black">{isPublished ? "منشور" : product?.status === "ARCHIVED" ? "مؤرشف" : "مسودة"}</h2>
                <StatusBadge status={product?.status ?? "DRAFT"} />
              </div>
            </div>
            <CardContent className="grid gap-3 pt-5">
              <Button disabled={isPending} name="intent" type="submit" value="publish">
                <PackageCheck className="h-4 w-4" aria-hidden="true" />
                {isPending ? "جار الحفظ..." : "حفظ ونشر المنتج"}
              </Button>
              <Button disabled={isPending} name="intent" type="submit" value="draft" variant="secondary">
                حفظ كمسودة
              </Button>
              <Button asChild variant="secondary">
                <a href={previewHref} target="_blank" rel="noreferrer">
                  معاينة صفحة المنتج
                </a>
              </Button>
              {state.message ? (
                <p className={state.status === "success" ? "text-sm font-black text-emerald-700" : "text-sm font-black text-destructive"}>
                  {state.message}
                </p>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>جاهزية النشر</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {!defaults.main_image_url ? <div className="rounded-md bg-accent px-3 py-2 text-sm font-black text-accent-foreground">أضف صورة رئيسية قبل النشر</div> : null}
              {!defaults.detail_image_urls ? <div className="rounded-md bg-accent px-3 py-2 text-sm font-black text-accent-foreground">أضف صور تفاصيل Shoppex-style</div> : null}
              {!defaults.category_id ? <div className="rounded-md bg-accent px-3 py-2 text-sm font-black text-accent-foreground">اختر التصنيف</div> : null}
            </CardContent>
          </Card>
        </aside>

        <div className="space-y-6" dir="rtl">
          <AdminFormSection
            title="الأساسيات"
            description="هذه البيانات تظهر في بطاقة المنتج وصفحة المنتج والبحث."
            icon={ShoppingBag}
          >
            <div id="section-0" className="grid gap-4 md:grid-cols-2">
              <Field label="اسم المنتج" className="md:col-span-2">
                <Input {...register("name")} placeholder="اسم المنتج" />
              </Field>
              <Field label="الرابط المختصر">
                <Input {...register("slug")} dir="ltr" placeholder="product-slug" />
              </Field>
              <Field label="التصنيف">
                <select
                  {...register("category_id")}
                  className="h-11 rounded-md border border-input bg-card px-3 py-2 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue={defaults.category_id ?? ""}
                >
                  <option value="">بدون تصنيف</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="الحالة">
                <select
                  {...register("status")}
                  className="h-11 rounded-md border border-input bg-card px-3 py-2 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue={defaults.status ?? "DRAFT"}
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </Field>
              <Field label="SKU">
                <Input {...register("sku")} dir="ltr" placeholder="SKU-001" />
              </Field>
              <Field label="وصف قصير للبيع" className="md:col-span-2">
                <Textarea {...register("short_description")} placeholder="وصف قصير يظهر في صفحة المنتج" />
              </Field>
              <Field label="وصف كامل / ملاحظات وصفية" className="md:col-span-2">
                <Textarea {...register("full_description")} placeholder="وصف إضافي عند الحاجة" />
              </Field>
            </div>
          </AdminFormSection>

          <AdminFormSection title="السعر والمخزون" description="سعر التكلفة يبقى داخليا ولا يظهر في المتجر." icon={Tags}>
            <div id="section-1" className="grid gap-4 md:grid-cols-4">
              <Field label="سعر البيع">
                <Input {...register("price")} inputMode="decimal" />
              </Field>
              <Field label="سعر المقارنة">
                <Input {...register("compare_at_price")} inputMode="decimal" />
              </Field>
              <Field label="سعر التكلفة">
                <Input {...register("cost_price")} inputMode="decimal" />
              </Field>
              <Field label="المخزون">
                <Input {...register("stock")} inputMode="numeric" />
              </Field>
              <CheckboxField defaultChecked={defaults.is_featured === true} description="يظهر في أقسام مختارة في الواجهة." label="منتج مميز" name="is_featured" />
              <CheckboxField defaultChecked={defaults.is_best_seller === true} description="يظهر في أقوى العروض أو الأكثر طلبا." label="الأكثر مبيعا" name="is_best_seller" />
            </div>
          </AdminFormSection>

          <AdminFormSection
            title="الصور"
            description={`الصور تضغط إلى WebP في المتصفح ثم ترفع إلى Cloudflare R2 بجودة ${Math.round(imageUploadRules.webpQuality * 100)}%.`}
            icon={ImageIcon}
          >
            <div id="section-2" className="grid gap-4">
              <Field label="رابط الصورة الرئيسية">
                <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_180px]">
                  <Input {...register("main_image_url")} dir="ltr" placeholder="https://..." />
                  <AdminImageUploadButton
                    disabled={!canUploadImages}
                    disabledMessage={uploadDisabledMessage}
                    label="رفع الرئيسية"
                    onUploaded={(url) => setValue("main_image_url", url, { shouldDirty: true })}
                    productId={productIdForUpload}
                    purpose="main"
                  />
                </div>
              </Field>
              <Field label="صور المعرض - رابط واحد في كل سطر">
                <Textarea {...register("gallery_image_urls")} dir="ltr" />
                <AdminImageUploadButton
                  disabled={!canUploadImages}
                  disabledMessage={uploadDisabledMessage}
                  label="رفع صورة للمعرض"
                  onUploaded={(url) => appendImageUrl("gallery_image_urls", url)}
                  productId={productIdForUpload}
                  purpose="gallery"
                />
              </Field>
            </div>
          </AdminFormSection>

          <AdminFormSection title="تفاصيل المنتج" description="قسم تفاصيل المنتج في Shoppex يعتمد أساسا على صور متتالية، وليس جدول نصوص طويل." icon={ImageIcon}>
            <div id="section-3">
              <Field label="صور التفاصيل - رابط واحد في كل سطر">
                <Textarea {...register("detail_image_urls")} className="min-h-40" dir="ltr" />
                <AdminImageUploadButton
                  disabled={!canUploadImages}
                  disabledMessage={uploadDisabledMessage}
                  label="رفع صورة تفاصيل"
                  onUploaded={(url) => appendImageUrl("detail_image_urls", url)}
                  productId={productIdForUpload}
                  purpose="detail"
                />
              </Field>
            </div>
          </AdminFormSection>

          <AdminFormSection title="إعدادات البيع المتقدم" description="يمكن تشغيل المتغيرات، العروض، والباقات منفردة أو مع بعضها." icon={Settings2}>
            <div id="section-4" className="grid gap-3 md:grid-cols-3">
              <CheckboxField defaultChecked={defaults.variants_enabled === true} description="لون، حجم، قوة، موديل." label="تفعيل المتغيرات" name="variants_enabled" />
              <CheckboxField defaultChecked={defaults.offers_enabled === true} description="قطعة، قطعتين، تخفيض كمية." label="تفعيل العروض" name="offers_enabled" />
              <CheckboxField defaultChecked={defaults.bundles_enabled === true} description="منتج مع منتجات أخرى." label="تفعيل الباقات" name="bundles_enabled" />
              <CheckboxField defaultChecked={defaults.allow_variant_offer_combo === true} description="يسمح باختيار متغير مع عرض." label="متغير + عرض" name="allow_variant_offer_combo" />
              <CheckboxField defaultChecked={defaults.allow_variant_bundle_combo === true} description="يسمح باختيار متغير مع باقة." label="متغير + باقة" name="allow_variant_bundle_combo" />
              <CheckboxField defaultChecked={defaults.allow_offer_bundle_combo === true} description="يسمح باختيار عرض مع باقة." label="عرض + باقة" name="allow_offer_bundle_combo" />
              <CheckboxField defaultChecked={defaults.allow_variant_offer_bundle_combo === true} description="يسمح باستخدام الثلاثة معا." label="متغير + عرض + باقة" name="allow_variant_offer_bundle_combo" />
            </div>
          </AdminFormSection>

          <AdminFormSection title="المتغيرات" description="اكتب كل مجموعة بهذا الشكل: اللون: أسود, أبيض, أخضر" icon={Layers3}>
            <Field label="مجموعات المتغيرات">
              <Textarea {...register("variant_groups_text")} className="min-h-36" />
            </Field>
          </AdminFormSection>

          <AdminFormSection title="العروض" description="سطر لكل عرض: الاسم | الكمية | السعر | سعر المقارنة | الشارة | on/off" icon={BadgePercent}>
            <Field label="العروض">
              <Textarea {...register("offers_text")} className="min-h-36" />
            </Field>
          </AdminFormSection>

          <AdminFormSection title="الباقات مع منتجات أخرى" description="سطر لكل باقة: الاسم | السعر | سعر المقارنة | الشارة | رابط الصورة | on/off" icon={Boxes}>
            <Field label="الباقات">
              <Textarea {...register("bundles_text")} className="min-h-36" />
            </Field>
          </AdminFormSection>

          <AdminFormSection title="النشر والملاحظات الداخلية" description="هذه الملاحظات إدارية فقط ولا تظهر للعميل." icon={PackageCheck}>
            <div id="section-5" className="grid gap-4">
              <Field label="ملاحظات داخلية">
                <Textarea {...register("internal_notes")} className="min-h-32" />
              </Field>
              <div className="flex flex-wrap gap-2">
                <Button disabled={isPending} name="intent" type="submit" value="draft" variant="secondary">
                  حفظ كمسودة
                </Button>
                <Button disabled={isPending} name="intent" type="submit" value="publish">
                  حفظ ونشر
                </Button>
              </div>
            </div>
          </AdminFormSection>
        </div>
      </div>
    </form>
  );
}
