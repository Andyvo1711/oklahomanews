import Link from "next/link";
import { ArticleImage } from "@/components/ArticleImage";
import type { ArticlePreview } from "@/types/article";

interface OkcTulsaSplitDeskProps {
  okc: ArticlePreview[];
  tulsa: ArticlePreview[];
}

export function OkcTulsaSplitDesk({ okc, tulsa }: OkcTulsaSplitDeskProps) {
  const [okcMain, ...okcRest] = okc;
  const [tulsaMain, ...tulsaRest] = tulsa;
  if (!okcMain || !tulsaMain) return null;

  return (
    <section aria-label="Oklahoma City and Tulsa" className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-gray">
        OKC &amp; Tulsa Desk
      </h2>
      <div className="mt-5 flex flex-col gap-10 lg:flex-row">
        {/* OKC side ~60% */}
        <div className="lg:w-[60%]">
          <span className="text-xs font-semibold uppercase tracking-wide text-red-earth">
            Oklahoma City Metro
          </span>
          <Link href={`/article/${okcMain.slug}`} className="group mt-2 block">
            <ArticleImage
              src={okcMain.coverImage}
              alt={okcMain.title}
              aspectClassName="aspect-[16/9]"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
            <h3 className="font-serif-heading mt-3 text-2xl font-semibold leading-tight text-storm-charcoal group-hover:text-prairie-blue">
              {okcMain.title}
            </h3>
          </Link>
          <ul className="mt-4 space-y-3 border-t border-border-stone pt-4">
            {okcRest.slice(0, 2).map((story) => (
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
        </div>

        {/* Divider */}
        <div className="hidden lg:block lg:w-px lg:translate-y-4 lg:bg-border-stone" aria-hidden="true" />

        {/* Tulsa side ~40% */}
        <div className="lg:w-[40%]">
          <span className="text-xs font-semibold uppercase tracking-wide text-red-earth">
            Tulsa Metro
          </span>
          <Link href={`/article/${tulsaMain.slug}`} className="group mt-2 block">
            <ArticleImage
              src={tulsaMain.coverImage}
              alt={tulsaMain.title}
              aspectClassName="aspect-[3/4]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <h3 className="font-serif-heading mt-3 text-xl font-semibold leading-tight text-storm-charcoal group-hover:text-prairie-blue">
              {tulsaMain.title}
            </h3>
          </Link>
          <ul className="mt-4 space-y-3 border-t border-border-stone pt-4">
            {tulsaRest.slice(0, 3).map((story) => (
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
        </div>
      </div>
    </section>
  );
}
