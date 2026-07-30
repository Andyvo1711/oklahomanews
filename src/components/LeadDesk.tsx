import Link from "next/link";
import { ArticleImage } from "@/components/ArticleImage";
import { CategoryLabel } from "@/components/StoryMeta";
import type { ArticlePreview } from "@/types/article";

interface LeadDeskProps {
  main: ArticlePreview;
  secondary: ArticlePreview;
  topStories: ArticlePreview[];
}

export function LeadDesk({ main, secondary, topStories }: LeadDeskProps) {
  return (
    <section aria-label="Top stories" className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main story - ~58% */}
        <div className="lg:w-[58%]">
          <Link href={`/article/${main.slug}`} className="group block">
            <ArticleImage
              src={main.coverImage}
              alt={main.title}
              aspectClassName="aspect-[16/9]"
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <div className="mt-4">
              <CategoryLabel category={main.category} />
              <h1 className="font-serif-heading mt-2 text-3xl font-semibold leading-tight text-storm-charcoal group-hover:text-prairie-blue md:text-4xl">
                {main.title}
              </h1>
              <p className="mt-3 max-w-2xl text-base text-muted-gray">{main.excerpt}</p>
              <span className="mt-3 inline-block text-sm font-medium text-prairie-blue">
                Read the story
              </span>
            </div>
          </Link>
        </div>

        {/* Secondary story - ~22% tall */}
        <div className="lg:w-[22%]">
          <Link href={`/article/${secondary.slug}`} className="group block">
            <ArticleImage
              src={secondary.coverImage}
              alt={secondary.title}
              aspectClassName="aspect-[3/4]"
              sizes="(min-width: 1024px) 22vw, 100vw"
            />
            <div className="mt-4">
              <CategoryLabel category={secondary.category} />
              <h2 className="font-serif-heading mt-2 text-xl font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
                {secondary.title}
              </h2>
              <p className="mt-2 text-sm text-muted-gray">{secondary.excerpt}</p>
            </div>
          </Link>
        </div>

        {/* Top stories column - ~20%, text-only */}
        <div className="lg:w-[20%]">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-gray">
            Top Stories
          </h2>
          <ul className="mt-3 divide-y divide-border-stone">
            {topStories.slice(0, 5).map((story) => (
              <li key={story.slug} className="py-3 first:pt-0">
                <CategoryLabel category={story.category} />
                <Link
                  href={`/article/${story.slug}`}
                  className="mt-1 block text-sm font-medium leading-snug text-storm-charcoal hover:text-prairie-blue"
                >
                  {story.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
