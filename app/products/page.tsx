import { ProductListing } from "@/components/storefront/product-listing";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { getCategories, getProducts, getStoreSettings } from "@/lib/storefront/data";

type ProductsPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const [{ q }, categories, products, settings] = await Promise.all([
    searchParams,
    getCategories(),
    getProducts(),
    getStoreSettings()
  ]);

  return (
    <StorefrontShell categories={categories} settings={settings}>
      <ProductListing
        categories={categories}
        products={products}
        title={q ? `نتائج البحث عن: ${q}` : "كل المنتجات"}
        description={q ? "يمكنك تغيير الترتيب أو اختيار تصنيف آخر." : null}
        query={q}
      />
    </StorefrontShell>
  );
}
