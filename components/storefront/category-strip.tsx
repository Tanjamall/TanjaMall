import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { CategoryIcon } from "@/components/storefront/category-icon";
import type { StoreCategory } from "@/lib/storefront/types";

const categoryColors = ["#dfe9df", "#fff2d7", "#edf3ef", "#ffedc7", "#f4f2ed", "#ffe3a4"];

type CategoryStripProps = {
  categories: StoreCategory[];
  includeAll?: boolean;
  activeCategorySlug?: string;
  showViewAll?: boolean;
};

export function CategoryStrip({ categories, includeAll = false, activeCategorySlug, showViewAll = true }: CategoryStripProps) {
  return (
    <section aria-label="التصنيفات">
      <div className="section-head">
        <h2 className="section-title">التصنيفات</h2>
        {showViewAll ? <Link className="view-all" href="/products">مشاهدة الكل</Link> : null}
      </div>
      <div className="h-scroll category-strip">
        {includeAll ? (
          <Link
            className={`category-tile category-tile-all ${!activeCategorySlug ? "active" : ""}`}
            href="/products"
          >
            <span className="category-name">الكل</span>
            <span className="category-icon">
              <LayoutGrid aria-hidden="true" />
            </span>
          </Link>
        ) : null}
        {categories.map((category, index) => (
          <Link
            key={category.id}
            className={`category-tile ${activeCategorySlug === category.slug ? "active" : ""}`}
            href={`/category/${category.slug}`}
            style={{ background: categoryColors[index % categoryColors.length] }}
          >
            <span className="category-name">{category.name}</span>
            <span className="category-icon">
              <CategoryIcon slug={category.slug} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
