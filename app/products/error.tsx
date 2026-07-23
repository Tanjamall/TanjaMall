"use client";

import { StorefrontErrorState } from "@/components/storefront/storefront-state";

export default function ProductsError({ reset }: { error: Error; reset: () => void }) {
  return <StorefrontErrorState reset={reset} />;
}
