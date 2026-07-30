import type { PaginatedResult } from "@/types/article";

/**
 * Paginates an already-sorted array. Page numbers are 1-indexed.
 * Never throws on out-of-range pages; clamps to the nearest valid page.
 */
export function paginateArticles<T>(
  items: T[],
  page: number,
  pageSize: number
): PaginatedResult<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: items.slice(start, end),
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

export function parsePageParam(value: string | string[] | undefined): number {
  if (Array.isArray(value)) {
    value = value[0];
  }
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}
