import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/storefront/product-detail-client";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { getCategories, getProductBySlug, getProducts, getRelatedProducts, getStoreSettings } from "@/lib/storefront/data";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [categories, product, products, settings] = await Promise.all([
    getCategories(),
    getProductBySlug(slug),
    getProducts(),
    getStoreSettings()
  ]);

  if (!product) notFound();

  return (
    <StorefrontShell categories={categories} settings={settings}>
      <ProductDetailClient
        product={product}
        relatedProducts={getRelatedProducts(product, products)}
        settings={settings}
      />
    </StorefrontShell>
  );
}
