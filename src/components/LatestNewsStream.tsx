import Link from "next/link";
import { ArticleImage } from "@/components/ArticleImage";
import { CategoryLabel, RegionLabel } from "@/components/StoryMeta";
import type { ArticlePreview } from "@/types/article";

export function LatestNewsStream({ articles }: { articles: ArticlePreview[] }) {
  if (articles.length === 0) return null;

  return (
    <ul className="divide-y divide-border-stone">
      {articles.map((story) => (
        <li key={story.slug} className="flex gap-4 py-6 first:pt-0">
          <Link href={`/article/${story.slug}`} className="shrink-0">
            <div className="relative h-20 w-28 overflow-hidden bg-cloud-gray sm:h-24 sm:w-36">
              <ArticleImage
                src={story.coverImage}
                alt={story.title}
                aspectClassName="aspect-auto h-full w-full"
                sizes="144px"
              />
            </div>
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <CategoryLabel category={story.category} />
              <RegionLabel region={story.region} />
            </div>
            <Link href={`/article/${story.slug}`} className="group block">
              <h3 className="font-serif-heading mt-1 text-lg font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
                {story.title}
              </h3>
            </Link>
            <p className="mt-1 line-clamp-2 text-sm text-muted-gray">{story.excerpt}</p>
            <Link
              href={`/article/${story.slug}`}
              className="mt-1 inline-block text-sm font-medium text-prairie-blue hover:text-deep-sky"
            >
              Read the story
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
