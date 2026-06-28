import { StorefrontPlaceholder } from "@/components/storefront/storefront-placeholder";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return (
    <StorefrontPlaceholder
      title="صفحة المنتج"
      description={`مسار المنتج جاهز: ${slug}. سيتم الحفاظ على إيقاع صفحة المنتج الحالي.`}
    />
  );
}
