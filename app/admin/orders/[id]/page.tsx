import { MessageCircle } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminFormSection, AdminPageHeader, StatusBadge, WhatsAppButton } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AdminOrderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderPage({ params }: AdminOrderPageProps) {
  const { id } = await params;

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          title={`تفاصيل الطلب ${id}`}
          description="تفاصيل الطلب، المنتجات، بيانات العميل، وتأكيد واتساب. البيانات مؤقتة إلى أن يتم ربطها ب Supabase."
        >
          <WhatsAppButton href="https://wa.me/212672975000" label="فتح واتساب" />
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

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>العميل</CardTitle>
                <CardDescription>بيانات التوصيل والدفع عند الاستلام.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm font-bold leading-7">
                <p>سعيد العمراني</p>
                <p dir="ltr">0612345678</p>
                <p>طنجة البالية، شارع المقاومة، رقم 24</p>
                <p className="text-xl font-black text-accent-foreground">المجموع: 498 درهم</p>
              </CardContent>
            </Card>

            <AdminFormSection title="الحالة والملاحظات" description="تحديثات الحالة ستكون محفوظة في جدول orders." icon={MessageCircle}>
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
      </div>
    </AdminShell>
  );
}
