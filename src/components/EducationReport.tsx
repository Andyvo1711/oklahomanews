import Link from "next/link";
import { ArticleImage } from "@/components/ArticleImage";
import type { ArticlePreview } from "@/types/article";

interface EducationReportProps {
  main: ArticlePreview;
  strip: ArticlePreview[];
  secondary: ArticlePreview[];
}

export function EducationReport({ main, strip, secondary }: EducationReportProps) {
  return (
    <section aria-label="Education report" className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h2 className="font-serif-heading text-2xl font-semibold text-storm-charcoal">
        Education Report
      </h2>

      <Link href={`/article/${main.slug}`} className="group mt-5 block max-w-3xl">
        <h3 className="font-serif-heading text-xl font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
          {main.title}
        </h3>
        <p className="mt-2 text-sm text-muted-gray">{main.excerpt}</p>
      </Link>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {strip.slice(0, 4).map((story) => (
          <Link key={story.slug} href={`/article/${story.slug}`} className="group block">
            <ArticleImage
              src={story.coverImage}
              alt={story.title}
              aspectClassName="aspect-[4/3]"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
            <span className="mt-2 block text-xs font-medium leading-snug text-storm-charcoal group-hover:text-prairie-blue">
              {story.title}
            </span>
          </Link>
        ))}
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-border-stone pt-4 sm:grid-cols-2">
        {secondary.slice(0, 4).map((story) => (
          <li key={story.slug}>
            <Link
              href={`/article/${story.slug}`}
              className="text-sm font-medium text-storm-charcoal hover:text-prairie-blue"
            >
              {story.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
