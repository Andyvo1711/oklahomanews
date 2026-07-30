import { categoryMap } from "@/config/categories";
import { regionMap } from "@/config/regions";
import type { CategorySlug, RegionSlug } from "@/types/article";

export function CategoryLabel({ category }: { category: CategorySlug }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-wide text-deep-sky">
      {categoryMap[category]?.label ?? category}
    </span>
  );
}

export function RegionLabel({ region }: { region: RegionSlug }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-wide text-red-earth">
      {regionMap[region]?.label ?? region}
    </span>
  );
}
