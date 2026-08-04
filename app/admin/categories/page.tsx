import Link from "next/link";
import { Eye, EyeOff, FolderPlus } from "lucide-react";
import { updateCategoryStatusAction } from "@/app/admin/categories/actions";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminDataTable, StatusBadge } from "@/components/admin/admin-ui";
import { CategoryForm } from "@/components/admin/category-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminCategories } from "@/lib/admin/catalog";

type AdminCategoriesPageProps = {
  searchParams: Promise<{
    edit?: string;
  }>;
};

function CategoryStatusAction({
  id,
  status,
  label
}: {
  id: string;
  status: "ACTIVE" | "HIDDEN";
  label: string;
}) {
  return (
    <form action={updateCategoryStatusAction}>
      <input name="id" type="hidden" value={id} />
      <input name="status" type="hidden" value={status} />
      <Button size="sm" type="submit" variant="secondary">
        {status === "ACTIVE" ? <Eye className="h-4 w-4" aria-hidden="true" /> : <EyeOff className="h-4 w-4" aria-hidden="true" />}
        {label}
      </Button>
    </form>
  );
}

export default async function AdminCategoriesPage({ searchParams }: AdminCategoriesPageProps) {
  await requireAdmin();
  const params = await searchParams;
  const categories = await getAdminCategories();
  const editingCategory = categories.find((category) => category.id === params.edit);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="grid gap-4 xl:grid-cols-[1fr_420px]">
          <Card>
            <CardHeader className="flex-row items-center justify-between gap-3">
              <div>
                <CardTitle>كل التصنيفات</CardTitle>
                <CardDescription className="mt-1">ACTIVE يظهر للعميل، HIDDEN يبقى للإدارة فقط.</CardDescription>
              </div>
              <Button asChild className="shrink-0">
                <Link href="/admin/categories">
                  <FolderPlus className="h-4 w-4" aria-hidden="true" />
                  تصنيف جديد
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                columns={["التصنيف", "الرابط", "المنتجات", "الترتيب", "الحالة", "إجراءات"]}
                rows={categories.map((category) => [
                  <div key={`${category.id}-name`}>
                    <p className="font-black">{category.name}</p>
                    {category.description ? <p className="mt-1 text-xs font-bold text-muted-foreground">{category.description}</p> : null}
                  </div>,
                  <span key={`${category.id}-slug`} dir="ltr">{category.slug}</span>,
                  category.product_count,
                  category.sort_order,
                  <StatusBadge key={`${category.id}-status`} status={category.status} />,
                  <div key={`${category.id}-actions`} className="flex flex-wrap gap-2">
                    <Button asChild type="button" variant="secondary" size="sm">
                      <Link href={`/admin/categories?edit=${category.id}`}>تعديل</Link>
                    </Button>
                    {category.status === "ACTIVE" ? (
                      <CategoryStatusAction id={category.id} label="إخفاء" status="HIDDEN" />
                    ) : (
                      <CategoryStatusAction id={category.id} label="إظهار" status="ACTIVE" />
                    )}
                  </div>
                ])}
              />
            </CardContent>
          </Card>

          <CategoryForm category={editingCategory} />
        </div>
      </div>
    </AdminShell>
  );
}
