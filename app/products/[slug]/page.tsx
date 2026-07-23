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

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description ?? product.full_description ?? product.name,
    image: product.images.map((image) => image.image_url),
    sku: product.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `https://tanjamall.com/products/${product.slug}`
    }
  };

  return (
    <StorefrontShell categories={categories} settings={settings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={getRelatedProducts(product, products)}
        settings={settings}
      />
    </StorefrontShell>
  );
}
