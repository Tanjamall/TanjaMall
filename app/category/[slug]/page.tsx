import { notFound } from "next/navigation";
import { ProductListing } from "@/components/storefront/product-listing";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { getCategories, getProductsByCategorySlug, getStoreSettings } from "@/lib/storefront/data";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [categories, products, settings] = await Promise.all([
    getCategories(),
    getProductsByCategorySlug(slug),
    getStoreSettings()
  ]);
  const category = categories.find((item) => item.slug === slug);

  if (!category) notFound();

  return (
    <StorefrontShell categories={categories} settings={settings}>
      <ProductListing
        categories={categories}
        products={products}
        title={category.name}
        description={category.description ?? `${products.length} منتج في هذا التصنيف`}
        activeCategorySlug={category.slug}
      />
    </StorefrontShell>
  );
}
