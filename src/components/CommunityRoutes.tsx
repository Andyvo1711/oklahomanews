import Link from "next/link";
import { ArticleImage } from "@/components/ArticleImage";
import { regionMap } from "@/config/regions";
import type { ArticlePreview } from "@/types/article";

export function CommunityRoutes({ articles }: { articles: ArticlePreview[] }) {
  if (articles.length === 0) return null;

  return (
    <section aria-label="Community routes" className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h2 className="font-serif-heading text-2xl font-semibold text-storm-charcoal">
        Community Routes
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-gray">
        Dispatches from towns and neighborhoods across the state, one stop at a time.
      </p>

      <div className="mt-6 flex flex-col divide-y divide-border-stone lg:flex-row lg:divide-x lg:divide-y-0">
        {articles.slice(0, 5).map((story, index) => (
          <Link
            key={story.slug}
            href={`/article/${story.slug}`}
            className="group block flex-1 py-5 first:pt-0 lg:px-6 lg:py-0 lg:first:pl-0 lg:last:pr-0"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-red-earth">
              {regionMap[story.region]?.label ?? story.region}
            </span>
            {index % 2 === 0 && (
              <ArticleImage
                src={story.coverImage}
                alt={story.title}
                aspectClassName="aspect-[4/3]"
                sizes="(min-width: 1024px) 20vw, 100vw"
              />
            )}
            <h3 className="font-serif-heading mt-2 text-base font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
              {story.title}
            </h3>
            {index % 2 === 0 && (
              <p className="mt-2 text-sm text-muted-gray">{story.excerpt}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
