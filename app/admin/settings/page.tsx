import { Image } from "lucide-react";
import { AdminStoreSettingsForm } from "@/components/admin/admin-store-settings-form";
import { AdminTrackingSettingsForm } from "@/components/admin/admin-tracking-settings-form";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminFormSection, AdminPageHeader } from "@/components/admin/admin-ui";
import { Input } from "@/components/ui/input";
import { requireAdmin } from "@/lib/admin/auth";
import { getStoreSettings } from "@/lib/storefront/data";

export default async function AdminSettingsPage() {
  const admin = await requireAdmin();
  const settings = await getStoreSettings();

  return (
    <AdminShell adminUser={admin}>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="إعدادات مباشرة"
          title="الإعدادات"
          description="إدارة بيانات المتجر، واتساب، التوصيل، صور Cloudflare R2، وتتبع الإعلانات."
        />

        <div className="grid gap-4 xl:grid-cols-2">
          <AdminStoreSettingsForm settings={settings} />

          <AdminFormSection title="صور المنتجات" description="إعدادات التخزين الفعلية للصور للقراءة فقط." icon={Image}>
            <div className="grid gap-4">
              <Input disabled defaultValue={process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL ?? "https://images.tanjamall.com"} dir="ltr" />
              <Input disabled defaultValue="tanjamall-product-images" dir="ltr" />
              <Input disabled defaultValue="WebP" dir="ltr" />
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
