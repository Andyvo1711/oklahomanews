import Link from "next/link";
import { regionMap } from "@/config/regions";
import type { RegionalHomepageGroup } from "@/lib/regions";

export function StatewideSnapshot({ groups }: { groups: RegionalHomepageGroup[] }) {
  const withArticles = groups.filter((g) => g.articles.length > 0);
  if (withArticles.length === 0) return null;

  return (
    <section aria-label="Statewide snapshot" className="border-y border-border-stone bg-canvas-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-gray">
          Statewide Snapshot
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {withArticles.map(({ region, articles }) => {
            const config = regionMap[region];
            const headline = articles[0];
            if (!headline) return null;
            return (
              <div key={region} className="border-t border-border-stone pt-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-red-earth">
                  {config.label}
                </span>
                <Link
                  href={`/article/${headline.slug}`}
                  className="mt-1 block text-sm font-medium leading-snug text-storm-charcoal hover:text-prairie-blue"
                >
                  {headline.title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
