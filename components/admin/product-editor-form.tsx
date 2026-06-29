import {
  BadgePercent,
  Boxes,
  Image as ImageIcon,
  Layers3,
  PackageCheck,
  Settings2,
  ShoppingBag,
  Tags,
  Upload
} from "lucide-react";
import { AdminFormSection, StatusBadge } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { imageUploadRules } from "@/lib/images/r2";

const tabs = ["الأساسيات", "السعر والمخزون", "الصور", "تفاصيل المنتج", "البيع المتقدم", "النشر"];

function Field({
  label,
  children,
  className = ""
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="text-sm font-black text-foreground">{label}</span>
      {children}
    </label>
  );
}

function SwitchRow({ label, description, enabled = true }: { label: string; description: string; enabled?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-background p-4">
      <div>
        <p className="text-sm font-black">{label}</p>
        <p className="mt-1 text-xs font-bold leading-6 text-muted-foreground">{description}</p>
      </div>
      <div className={`flex h-7 w-12 shrink-0 items-center rounded-full p-1 ${enabled ? "justify-end bg-primary" : "justify-start bg-muted"}`}>
        <span className="h-5 w-5 rounded-full bg-white shadow-sm" />
      </div>
    </div>
  );
}

export function ProductEditorForm({ mode }: { mode: "new" | "edit" }) {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm">
        <p className="text-sm font-black text-accent-foreground">MagicPath product editor design</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-6" style={{ direction: "ltr" }}>
          <div className="flex flex-wrap gap-2" dir="ltr">
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">Supabase-ready</span>
            <span className="rounded-full bg-secondary px-4 py-2 text-sm font-black text-secondary-foreground">Admin only</span>
            <span className="rounded-full bg-accent px-4 py-2 text-sm font-black text-accent-foreground">TanjaMall colors</span>
          </div>
          <div className="text-right" dir="rtl">
            <h2 className="text-4xl font-black">صفحة إنشاء وتعديل المنتج</h2>
            <p className="mt-3 max-w-4xl text-base font-bold leading-8 text-muted-foreground">
              هذه الصفحة تتحكم في كل ما يظهر للعميل: بطاقة المنتج، المعرض، صور التفاصيل، نموذج الطلب، المتغيرات، العروض، والباقات.
            </p>
          </div>
        </div>
      </section>

      <nav className="flex gap-2 rounded-lg border border-border bg-white p-2 shadow-sm">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`rounded-md px-4 py-2 text-sm font-black ${
              index === 0 ? "bg-primary text-primary-foreground" : index === 4 ? "bg-[#131921] text-white" : "text-muted-foreground hover:bg-muted"
            }`}
            type="button"
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="grid gap-6 lg:grid-cols-[390px_minmax(0,1fr)]" style={{ direction: "ltr" }}>
        <aside className="space-y-4 lg:sticky lg:top-6" dir="rtl">
          <Card className="overflow-hidden">
            <div className="bg-[#131921] p-5 text-white">
              <p className="text-sm font-black text-orange-300">حالة المنتج</p>
              <div className="mt-3 flex items-center justify-between">
                <h2 className="text-2xl font-black">{mode === "new" ? "مسودة" : "منشور"}</h2>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-accent-foreground">
                  {mode === "new" ? "غير منشور" : "منشور"}
                </span>
              </div>
            </div>
            <CardContent className="grid gap-3 pt-5">
              <Button type="button">
                <PackageCheck className="h-4 w-4" aria-hidden="true" />
                نشر المنتج
              </Button>
              <Button type="button" variant="secondary">
                معاينة صفحة المنتج
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>جاهزية النشر</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {["أضف صورة رئيسية", "راجع علاقة العروض مع المتغيرات", "أكمل صور التفاصيل"].map((warning) => (
                <div key={warning} className="rounded-md bg-accent px-3 py-2 text-sm font-black text-accent-foreground">
                  {warning}
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        <div className="space-y-6" dir="rtl">
          <AdminFormSection
            title="الأساسيات"
            description="هذه البيانات تظهر في بطاقة المنتج وصفحة المنتج والبحث."
            icon={ShoppingBag}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="اسم المنتج" className="md:col-span-2">
                <Input defaultValue={mode === "edit" ? "بروجيكتور 120 واط بالطاقة الشمسية" : ""} placeholder="اسم المنتج" />
              </Field>
              <Field label="الرابط المختصر">
                <Input defaultValue={mode === "edit" ? "solar-projector-120w" : ""} dir="ltr" placeholder="product-slug" />
              </Field>
              <Field label="التصنيف">
                <Input defaultValue="أضواء ومصابيح" placeholder="اختر التصنيف" />
              </Field>
              <Field label="وصف قصير للبيع" className="md:col-span-2">
                <textarea
                  className="min-h-24 rounded-md border border-input bg-card px-3 py-2 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue={mode === "edit" ? "إضاءة قوية للخارج مع شحن بالطاقة الشمسية." : ""}
                  placeholder="وصف قصير يظهر في صفحة المنتج"
                />
              </Field>
            </div>
          </AdminFormSection>

          <AdminFormSection title="السعر والمخزون" description="السعر الظاهر للعميل، وسعر التكلفة يبقى داخليا فقط." icon={Tags}>
            <div className="grid gap-4 md:grid-cols-4">
              <Field label="سعر البيع"><Input defaultValue="249" inputMode="decimal" /></Field>
              <Field label="سعر المقارنة"><Input defaultValue="449" inputMode="decimal" /></Field>
              <Field label="سعر التكلفة"><Input defaultValue="135" inputMode="decimal" /></Field>
              <Field label="المخزون"><Input defaultValue="24" inputMode="numeric" /></Field>
            </div>
          </AdminFormSection>

          <AdminFormSection
            title="الصور"
            description={`الصور سترفع إلى Cloudflare R2 بعد تحويلها إلى WebP. الجودة الافتراضية ${Math.round(imageUploadRules.webpQuality * 100)}%.`}
            icon={ImageIcon}
          >
            <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
              <div className="grid min-h-56 place-items-center rounded-lg border border-dashed border-border bg-muted">
                <div className="text-center">
                  <Upload className="mx-auto h-9 w-9 text-muted-foreground" aria-hidden="true" />
                  <p className="mt-3 text-sm font-black">الصورة الرئيسية</p>
                  <p className="mt-1 text-xs font-bold text-muted-foreground">R2 / WebP</p>
                </div>
              </div>
              <div className="grid gap-3">
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="grid aspect-square place-items-center rounded-md border border-border bg-background">
                      <ImageIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AdminFormSection>

          <AdminFormSection title="إعدادات البيع المتقدم" description="يمكن تشغيل المتغيرات، العروض، والباقات منفردة أو مع بعض." icon={Settings2}>
            <div className="grid gap-3 md:grid-cols-3">
              <SwitchRow label="المتغيرات" description="لون، حجم، قوة، موديل" />
              <SwitchRow label="العروض" description="قطعة، قطعتين، تخفيض كمية" />
              <SwitchRow label="الباقات" description="منتج مع منتجات أخرى" />
            </div>
          </AdminFormSection>

          <AdminFormSection title="المتغيرات" description="اختيارات المنتج مثل اللون، الحجم، أو القوة." icon={Layers3}>
            <div className="grid gap-3">
              {["اللون: أسود، أبيض، أخضر", "القوة: 120W، 200W"].map((variant) => (
                <div key={variant} className="flex items-center justify-between rounded-md border border-border p-3">
                  <span className="text-sm font-black">{variant}</span>
                  <Button type="button" variant="secondary" size="sm">تعديل</Button>
                </div>
              ))}
            </div>
          </AdminFormSection>

          <AdminFormSection title="العروض" description="خيارات الطلب التي تظهر داخل صفحة المنتج." icon={BadgePercent}>
            <div className="grid gap-3 md:grid-cols-3">
              {["قطعة واحدة - 249 درهم", "قطعتين بسعر خاص - 449 درهم", "3 قطع للتجار - 629 درهم"].map((offer) => (
                <div key={offer} className="rounded-md border border-border bg-background p-4">
                  <StatusBadge status={offer.includes("3") ? "DRAFT" : "ACTIVE"} />
                  <p className="mt-3 text-sm font-black">{offer}</p>
                </div>
              ))}
            </div>
          </AdminFormSection>

          <AdminFormSection title="الباقات مع منتجات أخرى" description="اربط المنتج بمنتجات إضافية مع سعر باقة واضح." icon={Boxes}>
            <div className="grid gap-3">
              {["البروجيكتور + كابل تمديد - 319 درهم", "مجموعة الإنارة الخارجية - 699 درهم"].map((bundle) => (
                <div key={bundle} className="flex items-center justify-between rounded-md border border-border p-3">
                  <span className="text-sm font-black">{bundle}</span>
                  <Button type="button" variant="secondary" size="sm">تعديل</Button>
                </div>
              ))}
            </div>
          </AdminFormSection>
        </div>
      </div>
    </div>
  );
}
