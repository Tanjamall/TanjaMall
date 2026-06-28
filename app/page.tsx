import { HomeStorefront } from "@/components/storefront/home-storefront";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { getCategories, getProducts, getStoreSettings } from "@/lib/storefront/data";

export default async function HomePage() {
  const [categories, products, settings] = await Promise.all([
    getCategories(),
    getProducts(),
    getStoreSettings()
  ]);

  return (
    <StorefrontShell categories={categories} settings={settings}>
      <HomeStorefront categories={categories} products={products} />
    </StorefrontShell>
  );
}
