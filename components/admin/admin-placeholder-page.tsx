import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type AdminPlaceholderPageProps = {
  title: string;
  description: string;
};

export function AdminPlaceholderPage({ title, description }: AdminPlaceholderPageProps) {
  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-muted-foreground">TanjaMall Admin</p>
          <h1 className="text-3xl font-black text-foreground">{title}</h1>
        </div>
        <Badge variant="secondary">Task 1 placeholder</Badge>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>جاهز للبناء</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-bold text-muted-foreground">
            سيتم استبدال هذا المحتوى ببيانات Supabase الحقيقية في المهام القادمة.
          </p>
        </CardContent>
      </Card>
      <div className="grid gap-3 md:grid-cols-3">
        {["طلبات جديدة", "منتجات منشورة", "بانتظار التأكيد"].map((label) => (
          <Card key={label}>
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle>0</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>جدول مؤقت</CardTitle>
          <CardDescription>مكان جاهز لجداول TanStack Table لاحقا.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>العنصر</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>المصدر</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Supabase</TableCell>
                <TableCell>قادم</TableCell>
                <TableCell>Task 2+</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
