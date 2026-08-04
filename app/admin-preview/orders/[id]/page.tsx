import { MessageCircle } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminFormSection, AdminPageHeader, StatusBadge, WhatsAppButton } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AdminPreviewOrderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminPreviewOrderPage({ params }: AdminPreviewOrderPageProps) {
  const { id } = await params;

  return (
    <AdminShell preview>
      <div className="space-y-6">
        <AdminPageHeader title={`تفاصيل الطلب ${id}`} description="معاينة تفاصيل الطلب وتأكيد واتساب.">
          <WhatsAppButton href="https://wa.me/212708012888" label="فتح واتساب" />
        </AdminPageHeader>

        <div className="grid gap-4 xl:grid-cols-[1fr_420px]">
          <Card>
            <CardHeader>
              <CardTitle>منتجات الطلب</CardTitle>
              <CardDescription>Order items ستأتي من Supabase مع snapshot للمنتجات والأسعار.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {["بروجيكتور 120 واط بالطاقة الشمسية", "جهاز الطوارئ للسيارة ونفخ العجلات"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-md border border-border p-4">
                  <div>
                    <p className="font-black">{item}</p>
                    <p className="mt-1 text-xs font-bold text-muted-foreground">الكمية: 1</p>
                  </div>
                  <p className="font-black text-accent-foreground">249 درهم</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <AdminFormSection title="الحالة والملاحظات" description="معاينة تحديث الحالة والملاحظات." icon={MessageCircle}>
            <div className="grid gap-3">
              <StatusBadge status="NEW" />
              <div className="grid grid-cols-2 gap-2">
                {["CONTACTED", "CONFIRMED", "PREPARING", "DELIVERED"].map((status) => (
                  <Button key={status} type="button" variant="secondary" size="sm">
                    {status}
                  </Button>
                ))}
              </div>
              <textarea
                className="min-h-24 rounded-md border border-input bg-card px-3 py-2 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="ملاحظات داخلية"
              />
            </div>
          </AdminFormSection>
        </div>
      </div>
    </AdminShell>
  );
}
