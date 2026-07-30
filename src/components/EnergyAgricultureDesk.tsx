import Link from "next/link";
import { ArticleImage } from "@/components/ArticleImage";
import { categoryMap } from "@/config/categories";
import type { ArticlePreview } from "@/types/article";

interface EnergyAgricultureDeskProps {
  energyStory: ArticlePreview;
  agricultureStory: ArticlePreview;
  supporting: ArticlePreview[];
}

export function EnergyAgricultureDesk({
  energyStory,
  agricultureStory,
  supporting,
}: EnergyAgricultureDeskProps) {
  const intro = categoryMap["energy-agriculture"].introduction;

  return (
    <section aria-label="Energy and agriculture desk" className="bg-prairie-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <h2 className="font-serif-heading text-2xl font-semibold text-storm-charcoal">
          Energy &amp; Agriculture Desk
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-gray">{intro}</p>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-stretch">
          <Link href={`/article/${energyStory.slug}`} className="group block lg:w-1/3">
            <ArticleImage
              src={energyStory.coverImage}
              alt={energyStory.title}
              aspectClassName="aspect-[4/5]"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
            <h3 className="font-serif-heading mt-3 text-lg font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
              {energyStory.title}
            </h3>
          </Link>

          <div className="flex flex-col justify-center border-y border-border-stone py-6 lg:w-1/3 lg:border-x lg:border-y-0 lg:px-6 lg:py-0">
            <span className="text-xs font-semibold uppercase tracking-wide text-red-earth">
              Editor&rsquo;s Note
            </span>
            <p className="mt-3 font-serif-heading text-lg leading-relaxed text-storm-charcoal">
              Oklahoma&rsquo;s energy and agricultural economies remain deeply
              intertwined, from the wind farms rising over wheat country to the
              grid investments reshaping rural power delivery.
            </p>
          </div>

          <Link href={`/article/${agricultureStory.slug}`} className="group block lg:w-1/3">
            <ArticleImage
              src={agricultureStory.coverImage}
              alt={agricultureStory.title}
              aspectClassName="aspect-[4/5]"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
            <h3 className="font-serif-heading mt-3 text-lg font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
              {agricultureStory.title}
            </h3>
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-border-stone pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {supporting.slice(0, 4).map((story) => (
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
      </div>
    </section>
  );
}
