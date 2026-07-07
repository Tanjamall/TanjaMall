import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import { Archive, EyeOff, Plus, Search, Send } from "lucide-react";
import { updateProductStatusAction } from "@/app/admin/products/actions";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminDataTable, AdminPageHeader, StatusBadge } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatMad, getAdminProducts } from "@/lib/admin/catalog";

type AdminProductsPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
};

function ProductStatusAction({
  id,
  status,
  label,
  icon
}: {
  id: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  label: string;
  icon: ReactNode;
}) {
  return (
    <form action={updateProductStatusAction}>
      <input name="id" type="hidden" value={id} />
      <input name="status" type="hidden" value={status} />
      <Button size="sm" type="submit" variant="secondary">
        {icon}
        {label}
      </Button>
    </form>
  );
}

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  const params = await searchParams;
  const products = await getAdminProducts({ query: params.q, status: params.status });

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          title="المنتجات"
          description="إدارة المنتجات والمسودات والنشر. هذه البيانات متصلة الآن بـ Supabase، والمنتجات المنشورة فقط تظهر في المتجر."
          eyebrow="Task 8 live Supabase data"
        >
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4" aria-hidden="true" />
              منتج جديد
            </Link>
          </Button>
        </AdminPageHeader>

        <Card>
          <CardHeader>
            <CardTitle>كل المنتجات</CardTitle>
            <CardDescription>ابحث، صف حسب الحالة، عدل، انشر، أو أرشف المنتج من نفس الجدول.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="flex flex-wrap gap-2" dir="rtl">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input className="pr-9" defaultValue={params.q ?? ""} name="q" placeholder="ابحث عن منتج..." />
              </div>
              <select
                className="h-11 rounded-md border border-input bg-card px-3 py-2 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring"
                defaultValue={params.status ?? "ALL"}
                name="status"
              >
                <option value="ALL">كل الحالات</option>
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
              <Button type="submit" variant="secondary">
                بحث
              </Button>
            </form>

            <AdminDataTable
              columns={["المنتج", "التصنيف", "السعر", "المخزون", "الحالة", "مميز", "الأكثر مبيعا", "إجراءات"]}
              emptyText="لا توجد منتجات مطابقة."
              rows={products.map((product) => [
                <div key={`${product.id}-name`} className="min-w-52">
                  <p className="font-black">{product.name}</p>
                  <p className="mt-1 text-xs font-bold text-muted-foreground" dir="ltr">{product.slug}</p>
                </div>,
                product.category_name ?? "-",
                formatMad(product.price),
                product.stock,
                <StatusBadge key={`${product.id}-status`} status={product.status} />,
                product.is_featured ? "نعم" : "لا",
                product.is_best_seller ? "نعم" : "لا",
                <div key={`${product.id}-actions`} className="flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="secondary">
                    <Link href={`/admin/products/${product.id}/edit` as Route}>تعديل</Link>
                  </Button>
                  {product.status !== "PUBLISHED" ? (
                    <ProductStatusAction id={product.id} status="PUBLISHED" label="نشر" icon={<Send className="h-4 w-4" aria-hidden="true" />} />
                  ) : (
                    <ProductStatusAction id={product.id} status="DRAFT" label="إلغاء النشر" icon={<EyeOff className="h-4 w-4" aria-hidden="true" />} />
                  )}
                  {product.status !== "ARCHIVED" ? (
                    <ProductStatusAction id={product.id} status="ARCHIVED" label="أرشفة" icon={<Archive className="h-4 w-4" aria-hidden="true" />} />
                  ) : null}
                </div>
              ])}
            />
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
