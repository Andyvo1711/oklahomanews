import Link from "next/link";
import { ArticleImage } from "@/components/ArticleImage";
import type { ArticlePreview } from "@/types/article";

interface BusinessEconomyExchangeProps {
  profile: ArticlePreview;
  analysis: ArticlePreview;
  compact: ArticlePreview[];
  imageStory?: ArticlePreview;
}

export function BusinessEconomyExchange({
  profile,
  analysis,
  compact,
  imageStory,
}: BusinessEconomyExchangeProps) {
  return (
    <section aria-label="Business and economy exchange" className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h2 className="font-serif-heading text-2xl font-semibold text-storm-charcoal">
        Business &amp; Economy Exchange
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Link href={`/article/${profile.slug}`} className="group block border-b border-border-stone pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
          <span className="text-xs font-semibold uppercase tracking-wide text-red-earth">
            Business Profile
          </span>
          <h3 className="font-serif-heading mt-2 text-xl font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
            {profile.title}
          </h3>
          <p className="mt-2 text-sm text-muted-gray">{profile.excerpt}</p>
        </Link>

        <Link href={`/article/${analysis.slug}`} className="group block">
          <span className="text-xs font-semibold uppercase tracking-wide text-red-earth">
            Economy Analysis
          </span>
          <h3 className="font-serif-heading mt-2 text-xl font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
            {analysis.title}
          </h3>
          <p className="mt-2 text-sm text-muted-gray">{analysis.excerpt}</p>
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-8 border-t border-border-stone pt-6 lg:flex-row">
        <ul className="divide-y divide-border-stone lg:w-2/3">
          {compact.slice(0, 5).map((story) => (
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

        {imageStory && (
          <Link href={`/article/${imageStory.slug}`} className="group block lg:w-1/3">
            <ArticleImage
              src={imageStory.coverImage}
              alt={imageStory.title}
              aspectClassName="aspect-[16/9]"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
            <span className="mt-2 block text-sm font-medium leading-snug text-storm-charcoal group-hover:text-prairie-blue">
              {imageStory.title}
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
