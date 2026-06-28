import { ArrowLeft, Bell, Boxes, CheckCircle2, ChevronDown, CircleDollarSign, ClipboardList, Eye, Filter, Home, Image, LayoutDashboard, MessageCircle, MoreHorizontal, Package, Pencil, Plus, Search, Settings, ShieldCheck, ShoppingBag, Star, Tags, Trash2, Truck } from "lucide-react";
import type { ReactNode } from "react";
const navItems = [{
  label: "لوحة التحكم",
  icon: LayoutDashboard,
  active: true
}, {
  label: "الطلبات",
  icon: ClipboardList
}, {
  label: "المنتجات",
  icon: Package
}, {
  label: "التصنيفات",
  icon: Tags
}, {
  label: "الوسائط",
  icon: Image
}, {
  label: "واتساب",
  icon: MessageCircle
}, {
  label: "الإعدادات",
  icon: Settings
}];
const stats = [{
  label: "طلبات جديدة",
  value: "18",
  note: "6 تحتاج تأكيد",
  icon: ClipboardList,
  tone: "orange"
}, {
  label: "مبيعات مؤكدة",
  value: "12,480 درهم",
  note: "هذا الأسبوع",
  icon: CircleDollarSign,
  tone: "green"
}, {
  label: "منتجات منشورة",
  value: "64",
  note: "9 مميزة",
  icon: Boxes,
  tone: "ink"
}, {
  label: "مخزون منخفض",
  value: "7",
  note: "راجعها اليوم",
  icon: Truck,
  tone: "red"
}];
const productRows = [{
  name: "بروجيكتور 120 واط بالطاقة الشمسية",
  category: "أضواء ومصابيح",
  price: "249 درهم",
  stock: "24",
  status: "منشور",
  featured: true
}, {
  name: "مصباح الطاقة الشمسية 500 واط",
  category: "أقوى العروض",
  price: "549 درهم",
  stock: "8",
  status: "منشور",
  featured: true
}, {
  name: "حقيبة استحمام محمولة للتخييم",
  category: "المنزل والحديقة",
  price: "349 درهم",
  stock: "3",
  status: "مسودة",
  featured: false
}, {
  name: "جهاز الطوارئ للسيارة ونفخ العجلات",
  category: "اكسسوارات السيارات",
  price: "249 درهم",
  stock: "17",
  status: "منشور",
  featured: false
}];
const orderRows = [{
  number: "TM-1048",
  customer: "سعيد العمراني",
  phone: "0612345678",
  total: "498 درهم",
  status: "جديد",
  area: "طنجة البالية"
}, {
  number: "TM-1047",
  customer: "مريم الإدريسي",
  phone: "0666123456",
  total: "549 درهم",
  status: "تم التواصل",
  area: "مرشان"
}, {
  number: "TM-1046",
  customer: "يوسف العلوي",
  phone: "0677001122",
  total: "898 درهم",
  status: "مؤكد",
  area: "وسط المدينة"
}, {
  number: "TM-1045",
  customer: "هند المرابط",
  phone: "0655998877",
  total: "249 درهم",
  status: "قيد التجهيز",
  area: "بني مكادة"
}];
const categories = [{
  name: "الإلكترونيات",
  slug: "electronics",
  products: 18,
  order: 1,
  status: "نشط"
}, {
  name: "المنزل والحديقة",
  slug: "home-garden",
  products: 14,
  order: 2,
  status: "نشط"
}, {
  name: "أضواء ومصابيح",
  slug: "lights",
  products: 11,
  order: 3,
  status: "نشط"
}, {
  name: "ألعاب",
  slug: "toys",
  products: 5,
  order: 4,
  status: "مخفي"
}];
const statusStyles: Record<string, string> = {
  منشور: "bg-emerald-50 text-emerald-700 border-emerald-200",
  مسودة: "bg-zinc-100 text-zinc-700 border-zinc-200",
  جديد: "bg-orange-50 text-orange-700 border-orange-200",
  "تم التواصل": "bg-sky-50 text-sky-700 border-sky-200",
  مؤكد: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "قيد التجهيز": "bg-amber-50 text-amber-700 border-amber-200",
  نشط: "bg-emerald-50 text-emerald-700 border-emerald-200",
  مخفي: "bg-zinc-100 text-zinc-600 border-zinc-200"
};
function Sidebar() {
  return <aside className="sticky top-6 h-[calc(100vh-48px)] w-72 shrink-0 rounded-lg border border-white/10 bg-[#131921] p-4 text-white shadow-xl shadow-slate-950/10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-orange-300">لوحة إدارة</p>
          <h1 className="text-2xl font-black tracking-normal">
            <span className="text-[#ff9900]">Tanja</span>Mall
          </h1>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-md bg-white/10">
          <ShieldCheck size={22} />
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map(item => <button key={item.label} className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-right text-sm font-bold transition ${item.active ? "bg-[#ff9900] text-[#111827]" : "text-white/74 hover:bg-white/8"}`}>
          
            <item.icon size={19} />
            <span>{item.label}</span>
          </button>)}
      </nav>

      <div className="absolute bottom-4 left-4 right-4 rounded-md border border-white/10 bg-white/7 p-4">
        <p className="text-sm font-extrabold">وضع التصميم</p>
        <p className="mt-1 text-xs leading-6 text-white/62">سيتم ربط هذه الشاشات ببيانات Supabase في التنفيذ.</p>
      </div>
    </aside>;
}
function Topbar({
  title,
  subtitle
}: {
  title: string;
  subtitle: string;
}) {
  return <header className="mb-5 flex items-center justify-between rounded-lg border border-[#dfe7df] bg-white px-5 py-4 shadow-sm">
      <div>
        <p className="text-sm font-bold text-[#b46200]">{subtitle}</p>
        <h2 className="mt-1 text-2xl font-black text-[#0f1f18]">{title}</h2>
      </div>
      <div className="flex items-center gap-2">
        <button className="grid h-10 w-10 place-items-center rounded-md border border-[#dfe7df] bg-white text-[#18231f]">
          <Bell size={18} />
        </button>
        <button className="flex items-center gap-2 rounded-md border border-[#dfe7df] bg-white px-3 py-2 text-sm font-bold text-[#18231f]">
          سعيد <ChevronDown size={16} />
        </button>
      </div>
    </header>;
}
function Card({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`rounded-lg border border-[#dfe7df] bg-white shadow-sm ${className}`}>{children}</section>;
}
function SectionTitle({
  title,
  action
}: {
  title: string;
  action?: string;
}) {
  return <div className="flex items-center justify-between border-b border-[#edf1ed] px-5 py-4">
      <h3 className="text-lg font-black text-[#0f1f18]">{title}</h3>
      {action ? <button className="rounded-md bg-[#ff9900] px-3 py-2 text-sm font-extrabold text-[#111827]">{action}</button> : null}
    </div>;
}
function StatusBadge({
  value
}: {
  value: string;
}) {
  return <span className={`rounded-full border px-2.5 py-1 text-xs font-extrabold ${statusStyles[value] ?? statusStyles["مسودة"]}`}>{value}</span>;
}
function AdminFrame({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return <div className="rounded-xl border border-[#d8e2dc] bg-[#f7f6f1] p-6 shadow-[0_18px_50px_rgba(15,31,24,0.08)]">
      <Topbar title={title} subtitle={subtitle} />
      {children}
    </div>;
}
function DashboardScreen() {
  return <AdminFrame title="لوحة التحكم" subtitle="نظرة عامة على المتجر">
      <div className="grid grid-cols-4 gap-4">
        {stats.map(stat => <Card key={stat.label} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-[#66736c]">{stat.label}</p>
                <p className="mt-2 text-2xl font-black text-[#0f1f18]">{stat.value}</p>
                <p className="mt-1 text-xs font-bold text-[#9b6a17]">{stat.note}</p>
              </div>
              <div className={`grid h-11 w-11 place-items-center rounded-md ${stat.tone === "orange" ? "bg-orange-100 text-orange-700" : stat.tone === "green" ? "bg-emerald-100 text-emerald-700" : stat.tone === "red" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"}`}>
                <stat.icon size={22} />
              </div>
            </div>
          </Card>)}
      </div>

      <div className="mt-4 grid grid-cols-[1.55fr_0.95fr] gap-4">
        <Card>
          <SectionTitle title="آخر الطلبات" action="فتح الطلبات" />
          <div className="divide-y divide-[#edf1ed]">
            {orderRows.map(order => <div key={order.number} className="grid grid-cols-[1fr_1fr_0.9fr_0.8fr_auto] items-center gap-3 px-5 py-4 text-sm">
                <div>
                  <p className="font-black text-[#0f1f18]">{order.number}</p>
                  <p className="text-xs font-bold text-[#66736c]">{order.area}</p>
                </div>
                <p className="font-bold">{order.customer}</p>
                <p className="font-bold text-[#66736c]">{order.total}</p>
                <StatusBadge value={order.status} />
                <button className="grid h-9 w-9 place-items-center rounded-md border border-[#dfe7df]"><Eye size={17} /></button>
              </div>)}
          </div>
        </Card>

        <Card>
          <SectionTitle title="قائمة اليوم" />
          <div className="space-y-3 p-5">
            {["تأكيد 6 طلبات جديدة عبر واتساب", "مراجعة 7 منتجات مخزونها منخفض", "نشر منتجين في قسم أقوى العروض", "تحديث رسوم التوصيل لطنجة"].map((item, index) => <div key={item} className="flex items-start gap-3 rounded-md bg-[#f7f6f1] p-3">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#ff9900] text-xs font-black text-[#111827]">{index + 1}</div>
                <p className="text-sm font-bold leading-6 text-[#24312b]">{item}</p>
              </div>)}
          </div>
        </Card>
      </div>
    </AdminFrame>;
}
function ProductsScreen() {
  return <AdminFrame title="المنتجات" subtitle="إدارة المنتجات المنشورة والمسودات">
      <Card>
        <div className="flex items-center justify-between border-b border-[#edf1ed] p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-72 items-center gap-2 rounded-md border border-[#dfe7df] bg-white px-3 text-[#66736c]">
              <Search size={17} />
              <span className="text-sm font-bold">ابحث عن منتج...</span>
            </div>
            <button className="flex items-center gap-2 rounded-md border border-[#dfe7df] px-3 py-2 text-sm font-bold"><Filter size={17} /> الحالة</button>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-[#ff9900] px-4 py-2 text-sm font-black text-[#111827]"><Plus size={17} /> منتج جديد</button>
        </div>
        <div className="overflow-hidden">
          <table className="w-full text-right text-sm">
            <thead className="bg-[#f7f6f1] text-xs font-black text-[#66736c]">
              <tr>
                <th className="px-5 py-3">المنتج</th>
                <th className="px-5 py-3">التصنيف</th>
                <th className="px-5 py-3">السعر</th>
                <th className="px-5 py-3">المخزون</th>
                <th className="px-5 py-3">الحالة</th>
                <th className="px-5 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf1ed]">
              {productRows.map(product => <tr key={product.name}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-md bg-gradient-to-br from-[#fff1d6] to-[#dfe7df]" />
                      <div>
                        <p className="font-black text-[#0f1f18]">{product.name}</p>
                        {product.featured ? <p className="mt-1 flex items-center gap-1 text-xs font-bold text-[#b46200]"><Star size={13} /> مميز في الصفحة الرئيسية</p> : null}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-bold text-[#66736c]">{product.category}</td>
                  <td className="px-5 py-4 font-black text-[#b46200]">{product.price}</td>
                  <td className="px-5 py-4 font-bold">{product.stock}</td>
                  <td className="px-5 py-4"><StatusBadge value={product.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="grid h-9 w-9 place-items-center rounded-md border border-[#dfe7df]"><Pencil size={16} /></button>
                      <button className="grid h-9 w-9 place-items-center rounded-md border border-[#dfe7df]"><MoreHorizontal size={16} /></button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminFrame>;
}
function ProductEditorScreen() {
  const fields = ["اسم المنتج", "الرابط المختصر", "التصنيف", "السعر", "سعر المقارنة", "المخزون"];
  return <AdminFrame title="تحرير المنتج" subtitle="نموذج المنتج الكامل">
      <div className="grid grid-cols-[1.25fr_0.75fr] gap-4">
        <Card>
          <SectionTitle title="المعلومات الأساسية" />
          <div className="grid grid-cols-2 gap-4 p-5">
            {fields.map(field => <label key={field} className="space-y-2">
                <span className="text-sm font-black text-[#24312b]">{field}</span>
                <div className="h-11 rounded-md border border-[#dfe7df] bg-[#fbfbf8]" />
              </label>)}
            <label className="col-span-2 space-y-2">
              <span className="text-sm font-black text-[#24312b]">وصف قصير</span>
              <div className="h-24 rounded-md border border-[#dfe7df] bg-[#fbfbf8]" />
            </label>
            <label className="col-span-2 space-y-2">
              <span className="text-sm font-black text-[#24312b]">ملاحظات داخلية</span>
              <div className="h-20 rounded-md border border-[#dfe7df] bg-[#fbfbf8]" />
            </label>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <SectionTitle title="النشر والظهور" />
            <div className="space-y-3 p-5">
              {["الحالة: مسودة", "منتج مميز", "الأكثر مبيعا", "إخفاء من المتجر"].map(item => <div key={item} className="flex items-center justify-between rounded-md border border-[#edf1ed] p-3">
                  <span className="text-sm font-bold">{item}</span>
                  <div className="h-6 w-11 rounded-full bg-[#ff9900] p-1"><div className="h-4 w-4 rounded-full bg-white" /></div>
                </div>)}
            </div>
          </Card>
          <Card>
            <SectionTitle title="صور المنتج" />
            <div className="grid grid-cols-3 gap-3 p-5">
              {[1, 2, 3, 4, 5, 6].map(item => <div key={item} className="grid aspect-square place-items-center rounded-md border border-dashed border-[#cad8cf] bg-[#f7f6f1] text-[#66736c]">
                  <Image size={22} />
                </div>)}
            </div>
          </Card>
        </div>
      </div>
    </AdminFrame>;
}
function CategoriesScreen() {
  return <AdminFrame title="التصنيفات" subtitle="ترتيب وإظهار تصنيفات الواجهة">
      <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
        <Card>
          <SectionTitle title="كل التصنيفات" action="تصنيف جديد" />
          <div className="divide-y divide-[#edf1ed]">
            {categories.map(category => <div key={category.slug} className="grid grid-cols-[1fr_1fr_0.6fr_0.7fr_auto] items-center gap-3 px-5 py-4 text-sm">
                <p className="font-black">{category.name}</p>
                <p className="font-bold text-[#66736c]">{category.slug}</p>
                <p className="font-bold">{category.products}</p>
                <StatusBadge value={category.status} />
                <button className="grid h-9 w-9 place-items-center rounded-md border border-[#dfe7df]"><Pencil size={16} /></button>
              </div>)}
          </div>
        </Card>
        <Card>
          <SectionTitle title="تحرير تصنيف" />
          <div className="space-y-4 p-5">
            {["اسم التصنيف", "الرابط", "أيقونة التصنيف", "الترتيب"].map(field => <label key={field} className="block space-y-2">
                <span className="text-sm font-black">{field}</span>
                <div className="h-11 rounded-md border border-[#dfe7df] bg-[#fbfbf8]" />
              </label>)}
            <button className="w-full rounded-md bg-[#ff9900] py-3 text-sm font-black text-[#111827]">حفظ التصنيف</button>
          </div>
        </Card>
      </div>
    </AdminFrame>;
}
function OrdersScreen() {
  return <AdminFrame title="الطلبات" subtitle="متابعة طلبات الدفع عند الاستلام">
      <Card>
        <div className="flex items-center justify-between border-b border-[#edf1ed] p-5">
          <div className="flex gap-2">
            {["الكل", "جديد", "مؤكد", "قيد التجهيز", "تم التسليم"].map((tab, index) => <button key={tab} className={`rounded-md px-3 py-2 text-sm font-black ${index === 0 ? "bg-[#131921] text-white" : "border border-[#dfe7df] bg-white text-[#24312b]"}`}>{tab}</button>)}
          </div>
          <div className="flex h-10 w-72 items-center gap-2 rounded-md border border-[#dfe7df] bg-white px-3 text-[#66736c]">
            <Search size={17} />
            <span className="text-sm font-bold">رقم الطلب أو الهاتف...</span>
          </div>
        </div>
        <div className="divide-y divide-[#edf1ed]">
          {orderRows.map(order => <div key={order.number} className="grid grid-cols-[0.85fr_1fr_0.9fr_0.8fr_0.85fr_auto] items-center gap-3 px-5 py-4 text-sm">
              <p className="font-black text-[#0f1f18]">{order.number}</p>
              <div>
                <p className="font-bold">{order.customer}</p>
                <p className="text-xs font-bold text-[#66736c]">{order.phone}</p>
              </div>
              <p className="font-bold text-[#66736c]">{order.area}</p>
              <p className="font-black text-[#b46200]">{order.total}</p>
              <StatusBadge value={order.status} />
              <button className="flex items-center gap-2 rounded-md bg-[#25d366] px-3 py-2 text-sm font-black text-white"><MessageCircle size={16} /> تأكيد</button>
            </div>)}
        </div>
      </Card>
    </AdminFrame>;
}
function OrderDetailScreen() {
  return <AdminFrame title="تفاصيل الطلب TM-1048" subtitle="تأكيد واتساب وتحديث الحالة">
      <div className="grid grid-cols-[1.25fr_0.75fr] gap-4">
        <Card>
          <SectionTitle title="منتجات الطلب" />
          <div className="space-y-3 p-5">
            {["بروجيكتور 120 واط بالطاقة الشمسية", "جهاز الطوارئ للسيارة ونفخ العجلات"].map((item, index) => <div key={item} className="flex items-center justify-between rounded-md border border-[#edf1ed] p-4">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-md bg-gradient-to-br from-[#fff1d6] to-[#dfe7df]" />
                  <div>
                    <p className="font-black">{item}</p>
                    <p className="text-xs font-bold text-[#66736c]">الكمية: {index + 1}</p>
                  </div>
                </div>
                <p className="font-black text-[#b46200]">{index === 0 ? "249" : "249"} درهم</p>
              </div>)}
          </div>
        </Card>
        <Card>
          <SectionTitle title="العميل والتأكيد" />
          <div className="space-y-4 p-5">
            <div className="rounded-md bg-[#f7f6f1] p-4">
              <p className="font-black">سعيد العمراني</p>
              <p className="mt-1 text-sm font-bold text-[#66736c]">طنجة البالية، شارع المقاومة، رقم 24</p>
              <p className="mt-1 text-sm font-bold text-[#66736c]">0612345678</p>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25d366] py-3 text-sm font-black text-white"><MessageCircle size={18} /> فتح رسالة واتساب</button>
            <div className="rounded-md border border-[#dfe7df] p-4">
              <p className="text-sm font-black">الحالة</p>
              <div className="mt-3 flex items-center justify-between rounded-md bg-orange-50 px-3 py-2 text-sm font-black text-orange-700">جديد <ChevronDown size={16} /></div>
            </div>
            <div className="rounded-md border border-[#dfe7df] p-4">
              <p className="text-sm font-black">ملاحظات داخلية</p>
              <div className="mt-3 h-24 rounded-md bg-[#fbfbf8]" />
            </div>
          </div>
        </Card>
      </div>
    </AdminFrame>;
}
function SettingsScreen() {
  return <AdminFrame title="الإعدادات" subtitle="بيانات المتجر والتوصيل">
      <div className="grid grid-cols-3 gap-4">
        {[{
        title: "المتجر",
        fields: ["اسم المتجر", "رقم الهاتف", "نص الإعلان في الصفحة الرئيسية"]
      }, {
        title: "واتساب",
        fields: ["رقم واتساب", "قالب رسالة التأكيد", "رابط الدعم"]
      }, {
        title: "التوصيل",
        fields: ["المدينة الافتراضية", "رسوم التوصيل في طنجة", "حد التوصيل المجاني"]
      }].map(group => <Card key={group.title}>
            <SectionTitle title={group.title} />
            <div className="space-y-4 p-5">
              {group.fields.map(field => <label key={field} className="block space-y-2">
                  <span className="text-sm font-black">{field}</span>
                  <div className="h-11 rounded-md border border-[#dfe7df] bg-[#fbfbf8]" />
                </label>)}
              <button className="w-full rounded-md bg-[#ff9900] py-3 text-sm font-black text-[#111827]">حفظ</button>
            </div>
          </Card>)}
      </div>
    </AdminFrame>;
}
function MobilePreview() {
  return <div className="mx-auto w-[390px] rounded-[28px] border-[10px] border-[#131921] bg-[#f7f6f1] p-4 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <button className="grid h-10 w-10 place-items-center rounded-md bg-white"><ArrowLeft size={18} /></button>
        <p className="font-black">طلبات اليوم</p>
        <button className="grid h-10 w-10 place-items-center rounded-md bg-[#ff9900]"><Plus size={18} /></button>
      </div>
      <div className="space-y-3">
        {orderRows.slice(0, 3).map(order => <div key={order.number} className="rounded-lg border border-[#dfe7df] bg-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-black">{order.number}</p>
                <p className="text-sm font-bold text-[#66736c]">{order.customer}</p>
              </div>
              <StatusBadge value={order.status} />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="font-black text-[#b46200]">{order.total}</p>
              <button className="grid h-10 w-10 place-items-center rounded-md bg-[#25d366] text-white"><MessageCircle size={18} /></button>
            </div>
          </div>)}
      </div>
    </div>;
}
export const TanjaMallAdminDashboardSystem = () => {
  return <main dir="rtl" className="min-h-screen w-full bg-[#ece8df] p-8 font-['Cairo'] text-[#0f1f18]">
      <div className="mx-auto flex max-w-[1720px] gap-6">
        <Sidebar />
        <div className="min-w-0 flex-1 space-y-8">
          <div className="rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm">
            <p className="text-sm font-black text-[#b46200]">MagicPath admin design component</p>
            <div className="mt-2 flex items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl font-black text-[#0f1f18]">نظام إدارة TanjaMall</h1>
                <p className="mt-3 max-w-3xl text-base font-bold leading-8 text-[#66736c]">
                  لوحة عربية RTL مبنية كمرجع بصري للتنفيذ القادم: شاشات إدارة المنتجات والطلبات والتصنيفات والإعدادات مع تأكيد واتساب. الواجهة العملية تستخدم ألوان TanjaMall، بينما يبقى تصميم المتجر الحالي كما هو.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full bg-[#131921] px-4 py-2 text-sm font-black text-white">Desktop-first</span>
                <span className="rounded-full bg-[#ff9900] px-4 py-2 text-sm font-black text-[#111827]">shadcn-style</span>
                <span className="rounded-full bg-[#dfe7df] px-4 py-2 text-sm font-black text-[#24312b]">Supabase-ready</span>
              </div>
            </div>
          </div>

          <DashboardScreen />
          <ProductsScreen />
          <ProductEditorScreen />
          <div className="grid grid-cols-2 gap-8">
            <CategoriesScreen />
            <OrdersScreen />
          </div>
          <OrderDetailScreen />
          <SettingsScreen />

          <div className="grid grid-cols-[0.8fr_1.2fr] gap-8">
            <Card className="p-6">
              <h3 className="text-2xl font-black">نسخة الهاتف للإدارة</h3>
              <p className="mt-2 text-sm font-bold leading-7 text-[#66736c]">
                الإدارة Desktop-first، لكن هذه البطاقة توضح كيف تظهر أهم إجراءات الطلبات على الهاتف عند الحاجة.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm font-bold">
                {["بحث سريع", "أزرار واتساب", "حالات واضحة", "لا بيانات وهمية في النهائي"].map(item => <div key={item} className="flex items-center gap-2 rounded-md bg-[#f7f6f1] p-3">
                    <CheckCircle2 size={17} className="text-emerald-600" />
                    <span>{item}</span>
                  </div>)}
              </div>
            </Card>
            <MobilePreview />
          </div>

          <div className="rounded-xl border border-[#d8e2dc] bg-[#131921] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-orange-300">Implementation notes</p>
                <h3 className="mt-1 text-2xl font-black">المكونات المطلوبة للتنفيذ</h3>
              </div>
              <ShoppingBag className="text-[#ff9900]" size={34} />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm font-bold leading-7 text-white/78">
              <p className="rounded-md bg-white/7 p-4">AdminPageHeader, AdminStatCard, StatusBadge, WhatsAppButton</p>
              <p className="rounded-md bg-white/7 p-4">TanStack Table للمنتجات والطلبات، React Hook Form + Zod للنماذج</p>
              <p className="rounded-md bg-white/7 p-4">كل البيانات النهائية من Supabase، مع عدم عرض cost_price أو internal_notes للواجهة العامة</p>
            </div>
          </div>
        </div>
      </div>
    </main>;
};