import type { Metadata } from "next";
import Link from "next/link";
import { searchArticles } from "@/lib/search";
import { ArticleImage } from "@/components/ArticleImage";
import { CategoryLabel, RegionLabel } from "@/components/StoryMeta";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Search",
  description: `Search Oklahoma stories from ${site.name}.`,
  alternates: { canonical: "/search" },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? searchArticles(query) : [];
  const [featured, ...rest] = results;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <h1 className="font-serif-heading text-3xl font-semibold text-storm-charcoal md:text-4xl">
        Search
      </h1>

      <form action="/search" method="get" className="mt-6" role="search">
        <label htmlFor="search-page-input" className="sr-only">
          Search Oklahoma stories
        </label>
        <input
          id="search-page-input"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Search Oklahoma stories"
          className="w-full border border-border-stone bg-canvas-white px-4 py-3 text-lg text-storm-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-sky"
        />
      </form>

      <div className="mt-6 border-t border-border-stone" />

      <div className="mt-8">
        {!query && (
          <p className="text-base text-muted-gray">Enter a keyword to search Oklahoma stories.</p>
        )}

        {query && results.length === 0 && (
          <p className="text-base text-muted-gray">No stories matched your search.</p>
        )}

        {featured && (
          <Link href={`/article/${featured.slug}`} className="group block">
            <ArticleImage
              src={featured.coverImage}
              alt={featured.title}
              aspectClassName="aspect-[16/9]"
              sizes="(min-width: 1024px) 780px, 100vw"
            />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <CategoryLabel category={featured.category} />
              <RegionLabel region={featured.region} />
            </div>
            <h2 className="font-serif-heading mt-2 text-2xl font-semibold leading-tight text-storm-charcoal group-hover:text-prairie-blue">
              {featured.title}
            </h2>
            <p className="mt-2 text-base text-muted-gray">{featured.excerpt}</p>
          </Link>
        )}

        {rest.length > 0 && (
          <ul className="mt-8 divide-y divide-border-stone border-t border-border-stone">
            {rest.map((story) => (
              <li key={story.slug} className="py-5">
                <div className="flex flex-wrap items-center gap-3">
                  <CategoryLabel category={story.category} />
                  <RegionLabel region={story.region} />
                </div>
                <Link
                  href={`/article/${story.slug}`}
                  className="group mt-1 block"
                >
                  <h3 className="text-base font-medium leading-snug text-storm-charcoal group-hover:text-prairie-blue">
                    {story.title}
                  </h3>
                </Link>
                <p className="mt-1 text-sm text-muted-gray">{story.excerpt}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
