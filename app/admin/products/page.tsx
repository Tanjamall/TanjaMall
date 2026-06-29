import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { adminProducts } from "@/components/admin/admin-demo-data";
import { AdminDataTable, AdminPageHeader, StatusBadge } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminProductsPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          title="المنتجات"
          description="إدارة المنتجات والمسودات والنشر. الصفوف مؤقتة، والربط الحقيقي مع Supabase يأتي في Task 8."
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
            <CardDescription>جدول إدارة المنتجات سيستخدم TanStack Table عند الربط الحقيقي.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input className="pr-9" placeholder="ابحث عن منتج..." />
              </div>
              <Button type="button" variant="secondary">الحالة</Button>
              <Button type="button" variant="secondary">التصنيف</Button>
            </div>

            <AdminDataTable
              columns={["المنتج", "التصنيف", "السعر", "المخزون", "الحالة", "مميز", "الأكثر مبيعا", "إجراءات"]}
              rows={adminProducts.map((product) => [
                product.name,
                product.category,
                product.price,
                product.stock,
                <StatusBadge key={product.id} status={product.status} />,
                product.featured ? "نعم" : "لا",
                product.bestSeller ? "نعم" : "لا",
                <Button key={`${product.id}-edit`} asChild variant="secondary" size="sm">
                  <Link href={`/admin/products/${product.id}/edit`}>تعديل</Link>
                </Button>
              ])}
            />
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
