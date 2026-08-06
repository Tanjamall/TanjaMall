import { AdminStoreSettingsForm } from "@/components/admin/admin-store-settings-form";
import { AdminTrackingSettingsForm } from "@/components/admin/admin-tracking-settings-form";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/admin/auth";
import { getStoreSettings } from "@/lib/storefront/data";

export default async function AdminSettingsPage() {
  const admin = await requireAdmin();
  const settings = await getStoreSettings();

  return (
    <AdminShell adminUser={admin}>
      <div className="space-y-6">
        <div className="grid gap-4">
          <AdminStoreSettingsForm settings={settings} />

          <div>
            <AdminTrackingSettingsForm settings={settings} />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
