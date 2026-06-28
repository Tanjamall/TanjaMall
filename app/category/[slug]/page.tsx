import { StorefrontPlaceholder } from "@/components/storefront/storefront-placeholder";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  return (
    <StorefrontPlaceholder
      title="صفحة التصنيف"
      description={`مسار التصنيف جاهز: ${slug}. التصميم البصري سيبقى مطابقا للنسخة الحالية.`}
    />
  );
}
