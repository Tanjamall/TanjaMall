import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type StorefrontPlaceholderProps = {
  title: string;
  description: string;
};

export function StorefrontPlaceholder({ title, description }: StorefrontPlaceholderProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[520px] bg-background">
      <section className="bg-[#131921] px-5 py-5 text-white">
        <div className="text-center text-2xl font-black" dir="ltr">
          <span className="text-primary">Tanja</span>Mall
        </div>
      </section>
      <section className="px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm font-bold text-muted-foreground">
              هذه صفحة تأسيسية مؤقتة. التصميم الحالي المعتمد محفوظ كمرجع ولن يتم تغييره بدون طلب صريح.
            </p>
            <div className="grid gap-2">
              <Button asChild>
                <Link href="/products">المنتجات</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/cart">السلة</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
