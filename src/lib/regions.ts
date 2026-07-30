import { getAllArticles } from "@/lib/articles";
import { regions } from "@/config/regions";
import type { ArticlePreview, RegionSlug } from "@/types/article";

export interface RegionalHomepageGroup {
  region: RegionSlug;
  articles: ArticlePreview[];
}

/**
 * Returns articles grouped by region, ordered per the region config's
 * homepageOrder, useful for the Regional Newsboard and Statewide Snapshot
 * sections. Regions with zero articles still appear with an empty array so
 * layout components can decide how to render that case.
 */
export function getRegionalHomepageGroups(
  perRegionLimit: number,
  regionSlugs?: RegionSlug[]
): RegionalHomepageGroup[] {
  const all = getAllArticles();
  const orderedSlugs =
    regionSlugs ??
    [...regions].sort((a, b) => a.homepageOrder - b.homepageOrder).map((r) => r.slug);

  return orderedSlugs.map((region) => ({
    region,
    articles: all.filter((a) => a.region === region).slice(0, perRegionLimit),
  }));
}

/**
 * Returns the most recent articles for a single region.
 */
export function getRecentArticlesForRegion(
  region: RegionSlug,
  limit: number
): ArticlePreview[] {
  return getAllArticles()
    .filter((a) => a.region === region)
    .slice(0, limit);
}
