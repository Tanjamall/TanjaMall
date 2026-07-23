import { CartPage } from "@/components/storefront/cart-page";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { getCategories, getStoreSettings } from "@/lib/storefront/data";

export default async function CartRoute() {
  const [categories, settings] = await Promise.all([getCategories(), getStoreSettings()]);

  return (
    <StorefrontShell categories={categories} settings={settings}>
      <CartPage settings={settings} />
    </StorefrontShell>
  );
}
