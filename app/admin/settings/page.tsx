import { Image, MessageCircle, Settings, Truck } from "lucide-react";
import { AdminTrackingSettingsForm } from "@/components/admin/admin-tracking-settings-form";
import { AdminShell } from "@/components/admin/admin-shell";
import { adminSettingsPreview } from "@/components/admin/admin-demo-data";
import { AdminFormSection, AdminPageHeader } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStoreSettings } from "@/lib/storefront/data";

export default async function AdminSettingsPage() {
  const settings = await getStoreSettings();

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          title="الإعدادات"
          description="إعدادات المتجر، واتساب، التوصيل، صور Cloudflare R2، وتتبع الإعلانات. إعدادات التتبع تحفظ مباشرة في Supabase بعد تطبيق migration الخاص بها."
        />

        <div className="grid gap-4 xl:grid-cols-2">
          <AdminFormSection title="المتجر" description="الاسم والهاتف ونص الإعلان." icon={Settings}>
            <div className="grid gap-4">
              <Input defaultValue={settings.store_name} placeholder="اسم المتجر" />
              <Input defaultValue={settings.store_phone ?? ""} dir="ltr" placeholder="رقم الهاتف" />
              <Input defaultValue={settings.announcement_text ?? ""} placeholder="نص الإعلان في الصفحة الرئيسية" />
              <Button type="button">حفظ إعدادات المتجر</Button>
            </div>
          </AdminFormSection>

          <AdminFormSection title="واتساب" description="رقم التأكيد وقالب الرسالة." icon={MessageCircle}>
            <div className="grid gap-4">
              <Input defaultValue={settings.whatsapp_number ?? adminSettingsPreview.whatsapp} dir="ltr" placeholder="رقم واتساب" />
              <textarea
                className="min-h-28 rounded-md border border-input bg-card px-3 py-2 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring"
                defaultValue="Salam [Customer Name], hna [Store Name]. واش كتأكد الطلب؟"
              />
              <Button type="button">حفظ إعدادات واتساب</Button>
            </div>
          </AdminFormSection>

          <AdminFormSection title="التوصيل" description="طنجة هي المدينة الافتراضية في MVP." icon={Truck}>
            <div className="grid gap-4">
              <Input defaultValue={adminSettingsPreview.defaultCity} placeholder="المدينة الافتراضية" />
              <Input defaultValue={`${settings.delivery_fee_tanger ?? 0} درهم`} placeholder="رسوم التوصيل في طنجة" />
              <Input defaultValue={`${settings.free_delivery_threshold ?? 500} درهم`} placeholder="حد التوصيل المجاني" />
              <Button type="button">حفظ إعدادات التوصيل</Button>
            </div>
          </AdminFormSection>

          <AdminFormSection title="صور المنتجات" description="الملفات تذهب إلى Cloudflare R2، وSupabase يحفظ URLs فقط." icon={Image}>
            <div className="grid gap-4">
              <Input defaultValue={process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL ?? ""} dir="ltr" placeholder="R2 public base URL" />
              <Input defaultValue="product-images" dir="ltr" placeholder="R2 bucket name" />
              <Input defaultValue="WebP quality 82%" placeholder="قاعدة الضغط الافتراضية" />
              <Button type="button">حفظ إعدادات الصور</Button>
            </div>
          </AdminFormSection>

          <div className="xl:col-span-2">
            <AdminTrackingSettingsForm settings={settings} />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
