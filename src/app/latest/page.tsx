import type { Metadata } from "next";
import { getAllArticles, paginateArticles } from "@/lib/articles";
import { parsePageParam } from "@/lib/pagination";
import { LatestNewsStream } from "@/components/LatestNewsStream";
import { Pagination } from "@/components/Pagination";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Latest",
  description: `The latest stories from ${site.name}, updated as they're reported.`,
  alternates: { canonical: "/latest" },
};

const PAGE_SIZE = 12;

interface LatestPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function LatestPage({ searchParams }: LatestPageProps) {
  const { page: pageParam } = await searchParams;
  const page = parsePageParam(pageParam);

  const all = getAllArticles();
  const paginated = paginateArticles(all, page, PAGE_SIZE);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <h1 className="font-serif-heading text-3xl font-semibold text-storm-charcoal md:text-4xl">
        Latest News
      </h1>
      <p className="mt-3 max-w-2xl text-base text-muted-gray">
        The newest reporting from across Oklahoma, most recent first.
      </p>
      <div className="mt-6 border-t border-border-stone" />

      <div className="mt-8">
        <LatestNewsStream articles={paginated.items} />
      </div>

      <Pagination
        basePath="/latest"
        currentPage={paginated.currentPage}
        totalPages={paginated.totalPages}
        hasNextPage={paginated.hasNextPage}
        hasPreviousPage={paginated.hasPreviousPage}
      />
    </div>
  );
}
