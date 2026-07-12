import { CheckoutPage } from "@/components/storefront/checkout-page";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { getCategories, getStoreSettings } from "@/lib/storefront/data";

export default async function CheckoutRoute() {
  const [categories, settings] = await Promise.all([getCategories(), getStoreSettings()]);

  return (
    <StorefrontShell categories={categories} settings={settings}>
      <CheckoutPage settings={settings} />
    </StorefrontShell>
  );
}
