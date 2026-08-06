import { Settings } from "lucide-react";
import { AdminTrackingSettingsForm } from "@/components/admin/admin-tracking-settings-form";
import { AdminShell } from "@/components/admin/admin-shell";
import { adminSettingsPreview } from "@/components/admin/admin-demo-data";
import { AdminFormSection } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { StoreSettings } from "@/lib/storefront/types";

const previewTrackingSettings: StoreSettings = {
  store_name: adminSettingsPreview.storeName,
  store_phone: adminSettingsPreview.phone,
  whatsapp_number: adminSettingsPreview.whatsapp,
  default_city: adminSettingsPreview.defaultCity,
  supported_cities: [adminSettingsPreview.defaultCity],
  announcement_text: null,
  delivery_fee_tanger: 0,
  free_delivery_threshold: 500,
  meta_pixel_enabled: true,
  meta_pixel_id: adminSettingsPreview.metaPixelId,
  tiktok_pixel_enabled: true,
  tiktok_pixel_id: adminSettingsPreview.tiktokPixelId,
  google_tag_manager_enabled: true,
  google_tag_manager_id: adminSettingsPreview.googleTagManagerId
};

export default function AdminPreviewSettingsPage() {
  return (
    <AdminShell preview>
      <div className="space-y-6">
        <div className="grid gap-4">
          <AdminFormSection title="المتجر" description="الاسم والهاتف ونص الإعلان." icon={Settings}>
            <div className="grid gap-4">
              <Input defaultValue={adminSettingsPreview.storeName} placeholder="اسم المتجر" />
              <Input defaultValue={adminSettingsPreview.phone} dir="ltr" placeholder="رقم الهاتف" />
              <Input placeholder="نص الإعلان في الصفحة الرئيسية" />
              <Button type="button">حفظ إعدادات المتجر</Button>
            </div>
          </AdminFormSection>

          <div>
            <AdminTrackingSettingsForm preview settings={previewTrackingSettings} />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
