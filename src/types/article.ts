export type CategorySlug =
  | "education"
  | "healthcare"
  | "business-leaders"
  | "finance-economy"
  | "community"
  | "energy-agriculture"
  | "beauty-wellness";

export type RegionSlug =
  | "oklahoma-city-metro"
  | "tulsa-metro"
  | "central-oklahoma"
  | "eastern-oklahoma"
  | "western-oklahoma"
  | "southern-oklahoma"
  | "northern-oklahoma";

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  category: CategorySlug;
  region: RegionSlug;
  date: string;
  coverImage: string;
  featured: boolean;
  imageCredit: string;
}

export interface ArticleMeta extends ArticleFrontmatter {
  /** Relative path under content/articles, for diagnostics only */
  filePath: string;
}

export interface Article extends ArticleMeta {
  /** Raw markdown body, used for search indexing */
  rawBody: string;
  /** Rendered HTML body, computed only where needed (article page) */
  contentHtml: string;
}

export interface ArticlePreview extends ArticleMeta {
  rawBody: string;
}

export interface CategoryConfig {
  slug: CategorySlug;
  label: string;
  shortLabel: string;
  introduction: string;
  navigationOrder: number;
}

export interface RegionConfig {
  slug: RegionSlug;
  label: string;
  shortDescription: string;
  cityKeywords: string[];
  homepageOrder: number;
}

export interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
