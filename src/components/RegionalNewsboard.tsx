import Link from "next/link";
import { regionMap } from "@/config/regions";
import type { RegionalHomepageGroup } from "@/lib/regions";

const SIZE_PATTERN = [
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

export function RegionalNewsboard({ groups }: { groups: RegionalHomepageGroup[] }) {
  return (
    <section aria-label="Regional newsboard" className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h2 className="font-serif-heading text-2xl font-semibold text-storm-charcoal">
        Regional Newsboard
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
        {groups.map(({ region, articles }, index) => {
          const config = regionMap[region];
          const sizeClass = SIZE_PATTERN[index % SIZE_PATTERN.length];
          return (
            <div
              key={region}
              id={region}
              className={`border-t border-border-stone pt-4 ${sizeClass}`}
            >
              <h3 className="font-serif-heading text-lg font-semibold text-storm-charcoal">
                {config.label}
              </h3>
              <ul className="mt-3 space-y-2">
                {articles.slice(0, 2).map((story) => (
                  <li key={story.slug}>
                    <Link
                      href={`/article/${story.slug}`}
                      className="text-sm font-medium leading-snug text-storm-charcoal hover:text-prairie-blue"
                    >
                      {story.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/regions#${region}`}
                className="mt-3 inline-block text-xs font-semibold uppercase tracking-wide text-prairie-blue hover:text-deep-sky"
              >
                View Region
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
