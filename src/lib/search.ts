import { getAllArticles } from "@/lib/articles";
import { categoryMap } from "@/config/categories";
import { regionMap } from "@/config/regions";
import type { ArticlePreview } from "@/types/article";

/**
 * Searches title/excerpt/body/category label/region label, case-insensitive
 * and trimmed. Returns an empty array for an empty query.
 */
export function searchArticles(query: string): ArticlePreview[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return [];
  }

  const all = getAllArticles();
  return all.filter((article) => {
    const haystacks = [
      article.title,
      article.excerpt,
      article.rawBody,
      categoryMap[article.category]?.label ?? article.category,
      regionMap[article.region]?.label ?? article.region,
    ];
    return haystacks.some((value) => value.toLowerCase().includes(trimmed));
  });
}
