import { FolderPlus } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { adminCategories } from "@/components/admin/admin-demo-data";
import { AdminDataTable, AdminFormSection, AdminPageHeader, StatusBadge } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminPreviewCategoriesPage() {
  return (
    <AdminShell preview>
      <div className="space-y-6">
        <AdminPageHeader title="التصنيفات" description="معاينة إدارة التصنيفات وترتيب ظهورها في المتجر.">
          <Button type="button">
            <FolderPlus className="h-4 w-4" aria-hidden="true" />
            تصنيف جديد
          </Button>
        </AdminPageHeader>

        <div className="grid gap-4 xl:grid-cols-[1fr_420px]">
          <Card>
            <CardHeader>
              <CardTitle>كل التصنيفات</CardTitle>
              <CardDescription>ACTIVE يظهر للعميل، HIDDEN يبقى للإدارة فقط.</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                columns={["التصنيف", "المنتجات", "الترتيب", "الحالة", "إجراءات"]}
                rows={adminCategories.map((category) => [
                  category.name,
                  category.products,
                  category.sortOrder,
                  <StatusBadge key={category.id} status={category.status} />,
                  <Button key={`${category.id}-edit`} type="button" variant="secondary" size="sm">
                    تعديل
                  </Button>
                ])}
              />
            </CardContent>
          </Card>

          <AdminFormSection title="نموذج التصنيف" description="نموذج بصري مؤقت." icon={FolderPlus}>
            <div className="grid gap-4">
              <Input placeholder="اسم التصنيف" />
              <Input placeholder="category-slug" dir="ltr" />
              <Input placeholder="ترتيب العرض" inputMode="numeric" />
              <Button type="button">حفظ التصنيف</Button>
            </div>
          </AdminFormSection>
        </div>
      </div>
    </AdminShell>
  );
}
