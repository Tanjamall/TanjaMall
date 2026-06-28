import Link from "next/link";
import { CategoryIcon } from "@/components/storefront/category-icon";
import type { StoreCategory } from "@/lib/storefront/types";

const categoryColors = ["#dfe9df", "#fff2d7", "#edf3ef", "#ffedc7", "#f4f2ed", "#ffe3a4"];

type CategoryStripProps = {
  categories: StoreCategory[];
};

export function CategoryStrip({ categories }: CategoryStripProps) {
  return (
    <section aria-label="التصنيفات">
      <div className="section-head">
        <h2 className="section-title">التصنيفات</h2>
        <Link className="view-all" href="/products">مشاهدة الكل</Link>
      </div>
      <div className="h-scroll category-strip">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            className="category-tile"
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
