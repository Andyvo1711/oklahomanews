import Link from "next/link";
import { ArticleImage } from "@/components/ArticleImage";
import type { ArticlePreview } from "@/types/article";

interface HealthAcrossOklahomaProps {
  large: ArticlePreview[];
  briefs: ArticlePreview[];
  crossover?: ArticlePreview;
}

export function HealthAcrossOklahoma({ large, briefs, crossover }: HealthAcrossOklahomaProps) {
  return (
    <section aria-label="Health across Oklahoma" className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h2 className="font-serif-heading text-2xl font-semibold text-storm-charcoal">
        Health Across Oklahoma
      </h2>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-col gap-8 lg:w-2/3">
          {large.slice(0, 2).map((story) => (
            <Link key={story.slug} href={`/article/${story.slug}`} className="group flex flex-col gap-4 sm:flex-row">
              <div className="sm:w-1/2">
                <ArticleImage
                  src={story.coverImage}
                  alt={story.title}
                  aspectClassName="aspect-[16/10]"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div className="sm:w-1/2">
                <h3 className="font-serif-heading text-lg font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
                  {story.title}
                </h3>
                <p className="mt-2 text-sm text-muted-gray">{story.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="lg:w-1/3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-gray">
            Briefs
          </h3>
          <ul className="mt-3 divide-y divide-border-stone">
            {briefs.slice(0, 3).map((story) => (
              <li key={story.slug} className="py-3 first:pt-0">
                <Link
                  href={`/article/${story.slug}`}
                  className="text-sm font-medium leading-snug text-storm-charcoal hover:text-prairie-blue"
                >
                  {story.title}
                </Link>
              </li>
            ))}
          </ul>

          {crossover && (
            <Link
              href={`/article/${crossover.slug}`}
              className="group mt-4 block border-t border-border-stone pt-4"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-red-earth">
                Wellness Crossover
              </span>
              <h4 className="mt-1 text-sm font-medium leading-snug text-storm-charcoal group-hover:text-prairie-blue">
                {crossover.title}
              </h4>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
