import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, MessageCircle, Phone, UserRound } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminFormSection, AdminPageHeader, StatusBadge, WhatsAppButton } from "@/components/admin/admin-ui";
import { OrderManagementForm } from "@/components/admin/order-management-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminOrder } from "@/lib/admin/orders";
import { formatOrderAddress, formatOrderDate, formatOrderMad } from "@/lib/orders";
import { getStoreSettings } from "@/lib/storefront/data";
import { buildWhatsAppConfirmationUrl } from "@/lib/whatsapp/confirmation";

type AdminOrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminOrderPage({ params }: AdminOrderPageProps) {
  const admin = await requireAdmin();
  const { id } = await params;
  const [order, settings] = await Promise.all([getAdminOrder(id), getStoreSettings()]);
  if (!order) notFound();
  const deliveryAddress = formatOrderAddress(order.city, order.area, order.address);

  const whatsappUrl = buildWhatsAppConfirmationUrl({
    storeName: settings.store_name,
    whatsappNumber: settings.whatsapp_number ?? "",
    customerName: order.customer_name,
    orderNumber: order.order_number,
    lines: order.items.map((item) => ({ name: item.product_name, quantity: item.quantity })),
    total: order.total,
    address: deliveryAddress
  });

  return (
    <AdminShell adminUser={admin}>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow={`أنشئ في ${formatOrderDate(order.created_at)}`}
          title={`الطلب ${order.order_number}`}
          description="بيانات العميل، المنتجات المحفوظة وقت الشراء، حالة التنفيذ، وتأكيد واتساب."
        >
          <Button asChild variant="secondary">
            <Link href={"/admin/orders" as Route}>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              كل الطلبات
            </Link>
          </Button>
          <WhatsAppButton href={whatsappUrl} label="فتح واتساب" />
        </AdminPageHeader>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle>منتجات الطلب</CardTitle>
                    <CardDescription className="mt-1">الاسم والسعر والصورة محفوظة كما كانت عند إنشاء الطلب.</CardDescription>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              </CardHeader>
              <CardContent className="grid gap-3">
                {order.items.map((item) => (
                  <div className="flex items-center gap-4 rounded-md border border-border p-3" key={item.id}>
                    <div
                      aria-label={item.product_name}
                      className="h-16 w-16 shrink-0 rounded-md border border-border bg-secondary bg-cover bg-center"
                      role="img"
                      style={item.product_image_url ? { backgroundImage: `url(${JSON.stringify(item.product_image_url)})` } : undefined}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-black">{item.product_name}</p>
                      <p className="mt-1 text-xs font-bold text-muted-foreground">
                        الكمية: {item.quantity} · سعر الوحدة: {formatOrderMad(item.unit_price)}
                      </p>
                    </div>
                    <p className="whitespace-nowrap font-black text-accent-foreground">{formatOrderMad(item.total_price)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الحساب</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm font-bold">
                <div className="flex justify-between"><span>المجموع الفرعي</span><span>{formatOrderMad(order.subtotal)}</span></div>
                <div className="flex justify-between"><span>رسوم التوصيل</span><span>{formatOrderMad(order.delivery_fee)}</span></div>
                <div className="flex justify-between border-t border-border pt-3 text-lg font-black text-accent-foreground">
                  <span>الإجمالي</span><span>{formatOrderMad(order.total)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ملاحظة العميل</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-bold leading-7 text-muted-foreground">{order.notes_from_customer || "لا توجد ملاحظة من العميل."}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>بيانات العميل والتوصيل</CardTitle>
                <CardDescription>الدفع نقدا عند الاستلام.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm font-bold leading-7">
                <p className="flex items-center gap-2"><UserRound className="h-4 w-4 text-accent-foreground" aria-hidden="true" />{order.customer_name}</p>
                <p className="flex items-center gap-2" dir="ltr"><Phone className="h-4 w-4 text-accent-foreground" aria-hidden="true" />{order.customer_phone}</p>
                <p className="flex items-start gap-2"><MapPin className="mt-1 h-4 w-4 shrink-0 text-accent-foreground" aria-hidden="true" />{deliveryAddress}</p>
                <WhatsAppButton href={whatsappUrl} label="تأكيد الطلب عبر واتساب" />
              </CardContent>
            </Card>

            <AdminFormSection
              description="غيّر مرحلة الطلب واحفظ ملاحظات لا يراها العميل."
              icon={MessageCircle}
              title="الحالة والملاحظات"
            >
              <OrderManagementForm
                currentStatus={order.status}
                internalNotes={order.internal_notes}
                orderId={order.id}
              />
            </AdminFormSection>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
