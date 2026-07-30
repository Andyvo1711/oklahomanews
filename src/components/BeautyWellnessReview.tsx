import Link from "next/link";
import { ArticleImage } from "@/components/ArticleImage";
import type { ArticlePreview } from "@/types/article";

interface BeautyWellnessReviewProps {
  feature: ArticlePreview;
  compact: ArticlePreview[];
}

export function BeautyWellnessReview({ feature, compact }: BeautyWellnessReviewProps) {
  return (
    <section
      aria-label="Beauty and wellness review"
      className="border-y border-border-stone bg-canvas-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <h2 className="font-serif-heading text-2xl font-semibold text-storm-charcoal">
          Beauty &amp; Wellness Review
        </h2>

        <Link href={`/article/${feature.slug}`} className="group mt-6 flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/2">
            <ArticleImage
              src={feature.coverImage}
              alt={feature.title}
              aspectClassName="aspect-[16/9]"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="font-serif-heading text-xl font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm text-muted-gray">{feature.excerpt}</p>
          </div>
        </Link>

        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-border-stone pt-6 sm:grid-cols-2">
          {compact.slice(0, 4).map((story) => (
            <li key={story.slug}>
              <Link href={`/article/${story.slug}`} className="group block">
                <h4 className="text-sm font-medium leading-snug text-storm-charcoal group-hover:text-prairie-blue">
                  {story.title}
                </h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
