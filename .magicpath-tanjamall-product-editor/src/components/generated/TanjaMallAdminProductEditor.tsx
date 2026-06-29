import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgePercent,
  Boxes,
  CheckCircle2,
  Copy,
  Eye,
  GripVertical,
  Image,
  Layers3,
  Link,
  MessageCircle,
  PackageCheck,
  PackagePlus,
  Plus,
  Save,
  Search,
  Settings2,
  ShoppingBag,
  Sparkles,
  Tags,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Upload,
} from "lucide-react";

const tabs = ["الأساسيات", "السعر والمخزون", "الصور", "تفاصيل المنتج", "البيع المتقدم", "النشر"];

const warnings = [
  "أضف صورة رئيسية قبل النشر",
  "راجع علاقة العروض مع المتغيرات",
  "صور التفاصيل غير مكتملة لهذا المنتج",
];

const variantRows = [
  { option: "اللون", values: "أسود، أبيض، أخضر", stock: "حسب المتغير", price: "نفس السعر" },
  { option: "القوة", values: "120W، 200W", stock: "24 / 11", price: "+ 60 درهم" },
];

const offerRows = [
  { title: "قطعة واحدة", qty: "1", price: "249 درهم", badge: "الأكثر طلبا", active: true },
  { title: "قطعتين بسعر خاص", qty: "2", price: "449 درهم", badge: "وفر 49 درهم", active: true },
  { title: "3 قطع للتجار", qty: "3", price: "629 درهم", badge: "عرض محدود", active: false },
];

const bundleRows = [
  { title: "البروجيكتور + كابل تمديد", products: "2 منتجات", price: "319 درهم", active: true },
  { title: "مجموعة الإنارة الخارجية", products: "3 منتجات", price: "699 درهم", active: false },
];

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-lg border border-[#dbe4dd] bg-white shadow-sm ${className}`}>{children}</section>;
}

function CardHeader({ icon: Icon, title, description, action }: { icon: typeof PackagePlus; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-[#edf1ed] px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-[#fff1d6] text-[#b46200]">
          <Icon size={20} />
        </div>
        <div>
          <h2 className="text-lg font-black text-[#10231d]">{title}</h2>
          {description ? <p className="mt-1 text-sm font-bold leading-6 text-[#68766f]">{description}</p> : null}
        </div>
      </div>
      {action}
    </div>
  );
}

function Field({ label, value, wide = false, tall = false }: { label: string; value?: string; wide?: boolean; tall?: boolean }) {
  return (
    <label className={`block space-y-2 ${wide ? "col-span-2" : ""}`}>
      <span className="text-sm font-black text-[#24312b]">{label}</span>
      <div className={`flex items-center rounded-md border border-[#dbe4dd] bg-[#fbfbf8] px-3 text-sm font-bold text-[#6b766f] ${tall ? "h-24 items-start py-3" : "h-11"}`}>
        {value}
      </div>
    </label>
  );
}

function Toggle({ on = true }: { on?: boolean }) {
  return (
    <div className={`flex h-7 w-12 items-center rounded-full p-1 ${on ? "justify-end bg-[#ff9900]" : "justify-start bg-[#dfe6df]"}`}>
      <div className="h-5 w-5 rounded-full bg-white shadow-sm" />
    </div>
  );
}

function StatusPill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "green" | "orange" | "red" }) {
  const styles = {
    neutral: "border-[#dbe4dd] bg-[#f7f6f1] text-[#425048]",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    red: "border-red-200 bg-red-50 text-red-700",
  };

  return <span className={`rounded-full border px-3 py-1 text-xs font-black ${styles[tone]}`}>{children}</span>;
}

function Header() {
  return (
    <div className="sticky top-0 z-20 border-b border-[#d8e2dc] bg-[#f1eee6]/95 px-8 py-5 backdrop-blur">
      <div className="mx-auto flex max-w-[1720px] items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="grid h-11 w-11 place-items-center rounded-md border border-[#dbe4dd] bg-white text-[#17201b]">
            <ArrowRight size={20} />
          </button>
          <div>
            <p className="text-sm font-black text-[#b46200]">المنتجات / تحرير منتج</p>
            <h1 className="mt-1 text-3xl font-black text-[#10231d]">إضافة أو تعديل منتج</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-md border border-[#dbe4dd] bg-white px-4 py-3 text-sm font-black text-[#17201b]">
            <Eye size={18} /> معاينة
          </button>
          <button className="flex items-center gap-2 rounded-md border border-[#dbe4dd] bg-white px-4 py-3 text-sm font-black text-[#17201b]">
            <Save size={18} /> حفظ كمسودة
          </button>
          <button className="flex items-center gap-2 rounded-md bg-[#ff9900] px-5 py-3 text-sm font-black text-[#111827] shadow-sm">
            <PackageCheck size={18} /> نشر المنتج
          </button>
        </div>
      </div>
    </div>
  );
}

function NavigationTabs() {
  return (
    <div className="flex gap-2 rounded-lg border border-[#dbe4dd] bg-white p-2 shadow-sm">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`rounded-md px-4 py-2 text-sm font-black ${index === 4 ? "bg-[#131921] text-white" : index === 0 ? "bg-[#ff9900] text-[#111827]" : "text-[#56635d] hover:bg-[#f7f6f1]"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function BasicsSection() {
  return (
    <Card>
      <CardHeader icon={ShoppingBag} title="الأساسيات" description="هذه البيانات تظهر في بطاقة المنتج وصفحة المنتج والبحث." />
      <div className="grid grid-cols-2 gap-4 p-5">
        <Field label="اسم المنتج" value="بروجيكتور 120 واط بالطاقة الشمسية" wide />
        <Field label="الرابط المختصر" value="solar-projector-120w" />
        <Field label="التصنيف" value="أضواء ومصابيح" />
        <Field label="وصف قصير للبيع" value="إضاءة قوية للخارج مع شحن بالطاقة الشمسية" wide tall />
      </div>
    </Card>
  );
}

function PricingSection() {
  return (
    <Card>
      <CardHeader icon={Tags} title="السعر والمخزون" description="السعر الظاهر للعميل، وسعر التكلفة يبقى داخليا فقط." />
      <div className="grid grid-cols-4 gap-4 p-5">
        <Field label="سعر البيع" value="249 درهم" />
        <Field label="سعر المقارنة" value="449 درهم" />
        <Field label="سعر التكلفة" value="135 درهم" />
        <Field label="المخزون الأساسي" value="24" />
        <Field label="SKU" value="TM-LGT-120W" />
        <Field label="تنبيه مخزون منخفض" value="5" />
        <Field label="حالة المخزون" value="متوفر" />
        <Field label="ضريبة / رسوم" value="غير مفعلة" />
      </div>
    </Card>
  );
}

function MediaSection() {
  return (
    <Card>
      <CardHeader
        icon={Image}
        title="الصور"
        description="الصورة الرئيسية تظهر في البطاقات والمعرض، وصور التفاصيل تظهر كصف عمودي داخل صفحة المنتج."
        action={<button className="flex items-center gap-2 rounded-md bg-[#ff9900] px-3 py-2 text-sm font-black text-[#111827]"><Upload size={16} /> رفع صور</button>}
      />
      <div className="grid grid-cols-[0.7fr_1.3fr] gap-5 p-5">
        <div>
          <p className="mb-3 text-sm font-black text-[#24312b]">الصورة الرئيسية</p>
          <div className="grid aspect-[4/3] place-items-center rounded-lg border border-dashed border-[#cbd8cf] bg-gradient-to-br from-[#fff2dc] to-[#e3ebe4]">
            <div className="text-center">
              <Image className="mx-auto text-[#89968e]" size={42} />
              <p className="mt-3 text-sm font-black text-[#68766f]">اسحب الصورة هنا</p>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-black text-[#24312b]">معرض المنتج</p>
            <StatusPill>5 صور</StatusPill>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="relative grid aspect-square place-items-center rounded-md border border-[#dbe4dd] bg-[#f7f6f1]">
                <Image size={22} className="text-[#89968e]" />
                <button className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-md bg-white text-[#89968e] shadow-sm"><GripVertical size={15} /></button>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-md border border-[#dbe4dd] bg-[#fbfbf8] p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-black">صور تفاصيل المنتج</p>
              <button className="flex items-center gap-2 rounded-md border border-[#dbe4dd] bg-white px-3 py-2 text-sm font-black"><Plus size={16} /> إضافة صورة تفصيلية</button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-md border border-[#dbe4dd] bg-white p-3">
                  <div className="flex items-center gap-3">
                    <GripVertical size={18} className="text-[#89968e]" />
                    <div className="h-16 w-24 rounded-md bg-gradient-to-br from-[#fff2dc] to-[#e3ebe4]" />
                    <div>
                      <p className="text-sm font-black">صورة تفصيلية {item}</p>
                      <p className="text-xs font-bold text-[#68766f]">تظهر أسفل نموذج الطلب في صفحة المنتج</p>
                    </div>
                  </div>
                  <button className="grid h-9 w-9 place-items-center rounded-md border border-red-100 text-red-600"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function SellingModeCard() {
  return (
    <Card>
      <CardHeader icon={Settings2} title="إعدادات البيع المتقدم" description="شغل المتغيرات أو العروض أو الباقات بشكل منفصل أو مع بعض." />
      <div className="grid grid-cols-3 gap-4 p-5">
        {[
          { title: "المتغيرات", desc: "لون، حجم، قوة، موديل", on: true, icon: Layers3 },
          { title: "العروض", desc: "قطعة، قطعتين، تخفيض كمية", on: true, icon: BadgePercent },
          { title: "الباقات", desc: "منتج مع منتجات أخرى", on: true, icon: Boxes },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border border-[#dbe4dd] bg-[#fbfbf8] p-4">
            <div className="mb-4 flex items-start justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-white text-[#b46200] shadow-sm">
                <item.icon size={20} />
              </div>
              <Toggle on={item.on} />
            </div>
            <h3 className="text-base font-black text-[#10231d]">{item.title}</h3>
            <p className="mt-1 text-sm font-bold leading-6 text-[#68766f]">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-[#edf1ed] p-5">
        <p className="mb-3 text-sm font-black text-[#24312b]">طريقة الجمع بين الخيارات</p>
        <div className="grid grid-cols-4 gap-3">
          {[
            "منتج بسيط فقط",
            "متغيرات فقط",
            "عروض فقط",
            "باقات فقط",
            "متغيرات + عروض",
            "عروض + باقات",
            "متغيرات + باقات",
            "الكل معا",
          ].map((mode, index) => (
            <button key={mode} className={`rounded-md border px-3 py-3 text-sm font-black ${index === 7 ? "border-[#ff9900] bg-[#fff1d6] text-[#b46200]" : "border-[#dbe4dd] bg-white text-[#56635d]"}`}>
              {mode}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {["السماح باختيار عرض مع متغير", "السماح باختيار باقة مع متغير", "إجبار اختيار خيار بيع واحد فقط", "حساب المخزون حسب المتغير"].map((rule, index) => (
            <div key={rule} className="flex items-center justify-between rounded-md border border-[#dbe4dd] bg-white p-3">
              <span className="text-sm font-black">{rule}</span>
              <Toggle on={index !== 2} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function VariantsSection() {
  return (
    <Card>
      <CardHeader
        icon={Layers3}
        title="المتغيرات"
        description="استخدمها عندما يكون نفس المنتج له ألوان، أحجام، قوة، أو موديلات."
        action={<button className="flex items-center gap-2 rounded-md border border-[#dbe4dd] bg-white px-3 py-2 text-sm font-black"><Plus size={16} /> متغير جديد</button>}
      />
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between rounded-md bg-[#f7f6f1] p-4">
          <div>
            <p className="font-black text-[#10231d]">المتغيرات مفعلة</p>
            <p className="mt-1 text-sm font-bold text-[#68766f]">يمكن لكل متغير أن يملك سعر ومخزون وصورة منفصلة.</p>
          </div>
          <ToggleRight className="text-[#ff9900]" size={34} />
        </div>
        <table className="w-full overflow-hidden rounded-md text-right text-sm">
          <thead className="bg-[#131921] text-xs font-black text-white">
            <tr>
              <th className="px-4 py-3">نوع المتغير</th>
              <th className="px-4 py-3">القيم</th>
              <th className="px-4 py-3">المخزون</th>
              <th className="px-4 py-3">السعر</th>
              <th className="px-4 py-3">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf1ed] border border-t-0 border-[#dbe4dd] bg-white">
            {variantRows.map((row) => (
              <tr key={row.option}>
                <td className="px-4 py-4 font-black">{row.option}</td>
                <td className="px-4 py-4 font-bold text-[#68766f]">{row.values}</td>
                <td className="px-4 py-4 font-bold">{row.stock}</td>
                <td className="px-4 py-4 font-black text-[#b46200]">{row.price}</td>
                <td className="px-4 py-4"><button className="rounded-md border border-[#dbe4dd] px-3 py-2 font-black">تعديل</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function OffersSection() {
  return (
    <Card>
      <CardHeader
        icon={BadgePercent}
        title="العروض"
        description="هذه هي خيارات الطلب التي يراها العميل داخل نموذج الطلب في صفحة المنتج."
        action={<button className="flex items-center gap-2 rounded-md border border-[#dbe4dd] bg-white px-3 py-2 text-sm font-black"><Plus size={16} /> عرض جديد</button>}
      />
      <div className="grid grid-cols-3 gap-4 p-5">
        {offerRows.map((offer, index) => (
          <div key={offer.title} className={`rounded-lg border p-4 ${index === 0 ? "border-[#ff9900] bg-[#fff8ed]" : "border-[#dbe4dd] bg-white"}`}>
            <div className="mb-4 flex items-start justify-between">
              <StatusPill tone={offer.active ? "green" : "neutral"}>{offer.active ? "مفعل" : "معطل"}</StatusPill>
              {offer.active ? <ToggleRight className="text-[#ff9900]" /> : <ToggleLeft className="text-[#9aa59e]" />}
            </div>
            <h3 className="text-lg font-black text-[#10231d]">{offer.title}</h3>
            <p className="mt-2 text-sm font-bold text-[#68766f]">الكمية: {offer.qty}</p>
            <p className="mt-4 text-2xl font-black text-[#b46200]">{offer.price}</p>
            <div className="mt-4 flex items-center justify-between rounded-md bg-[#f7f6f1] p-3">
              <span className="text-xs font-black text-[#68766f]">الشارة</span>
              <span className="text-sm font-black">{offer.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function BundlesSection() {
  return (
    <Card>
      <CardHeader
        icon={Boxes}
        title="الباقات مع منتجات أخرى"
        description="اربط هذا المنتج بمنتجات إضافية مع سعر باقة واضح."
        action={<button className="flex items-center gap-2 rounded-md border border-[#dbe4dd] bg-white px-3 py-2 text-sm font-black"><Plus size={16} /> باقة جديدة</button>}
      />
      <div className="space-y-4 p-5">
        {bundleRows.map((bundle) => (
          <div key={bundle.title} className="grid grid-cols-[1fr_0.7fr_0.55fr_0.45fr_auto] items-center gap-4 rounded-lg border border-[#dbe4dd] bg-[#fbfbf8] p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-md bg-white text-[#b46200] shadow-sm"><PackagePlus size={24} /></div>
              <div>
                <p className="font-black text-[#10231d]">{bundle.title}</p>
                <p className="mt-1 text-xs font-bold text-[#68766f]">يمكن استخدامه منفصلا أو مع المتغير المختار</p>
              </div>
            </div>
            <div className="flex h-11 items-center gap-2 rounded-md border border-[#dbe4dd] bg-white px-3 text-sm font-bold text-[#68766f]">
              <Search size={16} /> {bundle.products}
            </div>
            <p className="text-lg font-black text-[#b46200]">{bundle.price}</p>
            <StatusPill tone={bundle.active ? "green" : "neutral"}>{bundle.active ? "مفعلة" : "معطلة"}</StatusPill>
            <button className="rounded-md border border-[#dbe4dd] bg-white px-3 py-2 text-sm font-black">تعديل</button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PreviewPanel() {
  return (
    <aside className="sticky top-28 space-y-4">
      <Card className="overflow-hidden">
        <div className="bg-[#131921] p-5 text-white">
          <p className="text-sm font-black text-orange-300">حالة المنتج</p>
          <div className="mt-3 flex items-center justify-between">
            <h2 className="text-2xl font-black">مسودة</h2>
            <StatusPill tone="orange">غير منشور</StatusPill>
          </div>
        </div>
        <div className="space-y-3 p-5">
          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#ff9900] py-3 text-sm font-black text-[#111827]">
            <PackageCheck size={18} /> نشر المنتج
          </button>
          <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#dbe4dd] bg-white py-3 text-sm font-black">
            <Eye size={18} /> معاينة صفحة المنتج
          </button>
        </div>
      </Card>

      <Card>
        <CardHeader icon={Sparkles} title="معاينة البطاقة" />
        <div className="p-5">
          <div className="overflow-hidden rounded-lg border border-[#dbe4dd] bg-white">
            <div className="relative grid aspect-square place-items-center bg-gradient-to-br from-[#fff2dc] to-[#e3ebe4]">
              <StatusPill tone="orange">45%</StatusPill>
              <Image className="absolute text-[#89968e]" size={56} />
            </div>
            <div className="p-4">
              <p className="line-clamp-2 text-sm font-black leading-6">بروجيكتور 120 واط بالطاقة الشمسية</p>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-xl font-black text-[#b46200]">249 درهم</p>
                <p className="text-sm font-bold text-[#9aa59e] line-through">449 درهم</p>
              </div>
              <button className="mt-4 w-full rounded-md bg-[#ff9900] py-3 text-sm font-black text-[#111827]">اطلب</button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader icon={AlertTriangle} title="جاهزية النشر" />
        <div className="space-y-3 p-5">
          {warnings.map((warning, index) => (
            <div key={warning} className="flex items-start gap-3 rounded-md bg-[#fff8ed] p-3">
              {index === 0 ? <AlertTriangle className="mt-0.5 text-orange-600" size={18} /> : <CheckCircle2 className="mt-0.5 text-emerald-600" size={18} />}
              <p className="text-sm font-bold leading-6 text-[#48554f]">{warning}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader icon={Link} title="روابط وواتساب" />
        <div className="space-y-3 p-5">
          <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#dbe4dd] bg-white py-3 text-sm font-black">
            <Copy size={17} /> نسخ رابط المنتج
          </button>
          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25d366] py-3 text-sm font-black text-white">
            <MessageCircle size={17} /> اختبار رسالة واتساب
          </button>
        </div>
      </Card>
    </aside>
  );
}

function PublishSection() {
  return (
    <Card>
      <CardHeader icon={PackageCheck} title="النشر والظهور" description="تحكم أين يظهر المنتج، وما الذي يسمح للعميل باختياره." />
      <div className="grid grid-cols-3 gap-4 p-5">
        {["منشور في المتجر", "منتج مميز", "الأكثر مبيعا", "إظهار في أقوى العروض", "إظهار في التصنيف", "السماح بالطلب المباشر"].map((item, index) => (
          <div key={item} className="flex items-center justify-between rounded-md border border-[#dbe4dd] bg-[#fbfbf8] p-4">
            <span className="text-sm font-black">{item}</span>
            <Toggle on={index !== 0} />
          </div>
        ))}
      </div>
    </Card>
  );
}

export const TanjaMallAdminProductEditor = () => {
  return (
    <main dir="rtl" className="min-h-screen w-full bg-[#ece8df] font-['Cairo'] text-[#10231d]">
      <Header />
      <div className="mx-auto max-w-[1720px] px-8 py-8">
        <div className="mb-6 rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-black text-[#b46200]">MagicPath product editor design</p>
              <h1 className="mt-2 text-4xl font-black">صفحة إنشاء وتعديل المنتج</h1>
              <p className="mt-3 max-w-4xl text-base font-bold leading-8 text-[#68766f]">
                هذه الصفحة تتحكم في كل ما يظهر للعميل: بطاقة المنتج، المعرض، صور التفاصيل، نموذج الطلب، المتغيرات، العروض، والباقات. المتغيرات والعروض والباقات يمكن تشغيلها منفردة أو مجتمعة.
              </p>
            </div>
            <div className="flex gap-2">
              <StatusPill tone="orange">TanjaMall colors</StatusPill>
              <StatusPill>Admin only</StatusPill>
              <StatusPill tone="green">Supabase-ready</StatusPill>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <NavigationTabs />
        </div>

        <div className="grid grid-cols-[1fr_390px] items-start gap-6">
          <div className="space-y-6">
            <BasicsSection />
            <PricingSection />
            <MediaSection />
            <SellingModeCard />
            <VariantsSection />
            <OffersSection />
            <BundlesSection />
            <PublishSection />
          </div>
          <PreviewPanel />
        </div>
      </div>
    </main>
  );
};
