import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { isValidCategorySlug } from "@/config/categories";
import { isValidRegionSlug } from "@/config/regions";
import { isValidDateString } from "@/lib/dates";
import { paginateArticles as paginate } from "@/lib/pagination";
import type {
  Article,
  ArticlePreview,
  CategorySlug,
  PaginatedResult,
  RegionSlug,
} from "@/types/article";

const CONTENT_ROOT = path.join(process.cwd(), "content", "articles");

/**
 * Recursively walks a directory and returns all file paths ending in .md.
 * Subfolders are purely organizational; this never assumes a fixed layout.
 */
function walkMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

let cachedPreviews: ArticlePreview[] | null = null;

/**
 * Loads every article's frontmatter + raw body from disk, recursively.
 * Malformed individual files are skipped (logged) rather than crashing
 * the whole site. Results are cached in-memory per server process.
 */
function loadAllArticlePreviews(): ArticlePreview[] {
  if (cachedPreviews) {
    return cachedPreviews;
  }

  const files = walkMarkdownFiles(CONTENT_ROOT);
  const previews: ArticlePreview[] = [];

  for (const filePath of files) {
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);
      const relativePath = path.relative(CONTENT_ROOT, filePath);
      const filenameSlug = path.basename(filePath, ".md");

      if (!data.title || !data.slug || !data.excerpt || !data.category ||
          !data.region || !data.date || !data.coverImage ||
          typeof data.featured !== "boolean" || !data.imageCredit) {
        console.warn(`Skipping article with missing fields: ${relativePath}`);
        continue;
      }

      if (data.slug !== filenameSlug) {
        console.warn(
          `Skipping article where filename !== slug: ${relativePath}`
        );
        continue;
      }

      if (!isValidCategorySlug(data.category)) {
        console.warn(`Skipping article with invalid category: ${relativePath}`);
        continue;
      }

      if (!isValidRegionSlug(data.region)) {
        console.warn(`Skipping article with invalid region: ${relativePath}`);
        continue;
      }

      if (!isValidDateString(data.date)) {
        console.warn(`Skipping article with invalid date: ${relativePath}`);
        continue;
      }

      previews.push({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        category: data.category as CategorySlug,
        region: data.region as RegionSlug,
        date: data.date,
        coverImage: data.coverImage,
        featured: data.featured,
        imageCredit: data.imageCredit,
        filePath: relativePath,
        rawBody: content,
      });
    } catch (error) {
      console.warn(`Skipping unreadable article file: ${filePath}`, error);
    }
  }

  // De-duplicate on slug, keeping the first occurrence, so a stray
  // duplicate never breaks routing.
  const seenSlugs = new Set<string>();
  const deduped: ArticlePreview[] = [];
  for (const preview of previews) {
    if (seenSlugs.has(preview.slug)) {
      console.warn(`Duplicate slug encountered, skipping: ${preview.slug}`);
      continue;
    }
    seenSlugs.add(preview.slug);
    deduped.push(preview);
  }

  deduped.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  cachedPreviews = deduped;
  return cachedPreviews;
}

export function getAllArticles(): ArticlePreview[] {
  return loadAllArticlePreviews();
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const preview = loadAllArticlePreviews().find((a) => a.slug === slug);
  if (!preview) {
    return null;
  }

  const processed = await remark().use(remarkHtml).process(preview.rawBody);
  const contentHtml = processed.toString();

  return {
    ...preview,
    contentHtml,
  };
}

export function getArticlesByCategory(category: CategorySlug): ArticlePreview[] {
  return loadAllArticlePreviews().filter((a) => a.category === category);
}

export function getArticlesByRegion(region: RegionSlug): ArticlePreview[] {
  return loadAllArticlePreviews().filter((a) => a.region === region);
}

export function getArticlesByCategoryAndRegion(
  category: CategorySlug,
  region: RegionSlug
): ArticlePreview[] {
  return loadAllArticlePreviews().filter(
    (a) => a.category === category && a.region === region
  );
}

export function getFeaturedArticles(limit: number): ArticlePreview[] {
  return loadAllArticlePreviews()
    .filter((a) => a.featured)
    .slice(0, limit);
}

export function getLatestArticles(limit: number): ArticlePreview[] {
  return loadAllArticlePreviews().slice(0, limit);
}

/**
 * Returns related stories for an article, prioritized:
 * same category+region > same category > same region > recent other-category.
 * Excludes the current article, never duplicates, newest first within tiers.
 */
export function getRelatedArticles(
  article: ArticlePreview | Article,
  limit: number
): ArticlePreview[] {
  const all = loadAllArticlePreviews().filter((a) => a.slug !== article.slug);
  const used = new Set<string>();
  const result: ArticlePreview[] = [];

  const tiers: ((a: ArticlePreview) => boolean)[] = [
    (a) => a.category === article.category && a.region === article.region,
    (a) => a.category === article.category,
    (a) => a.region === article.region,
    () => true,
  ];

  for (const tierFilter of tiers) {
    if (result.length >= limit) break;
    for (const candidate of all) {
      if (result.length >= limit) break;
      if (used.has(candidate.slug)) continue;
      if (!tierFilter(candidate)) continue;
      used.add(candidate.slug);
      result.push(candidate);
    }
  }

  return result.slice(0, limit);
}

export function paginateArticles<T>(
  items: T[],
  page: number,
  pageSize: number
): PaginatedResult<T> {
  return paginate(items, page, pageSize);
}

export function getHomepageArticles(): ArticlePreview[] {
  return loadAllArticlePreviews();
}
