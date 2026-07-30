import Link from "next/link";
import type { ArticlePreview } from "@/types/article";

export function NewsBriefRail({ articles }: { articles: ArticlePreview[] }) {
  if (articles.length === 0) return null;

  return (
    <section
      aria-label="News brief"
      className="border-b border-border-stone bg-canvas-white"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2.5 md:px-8">
        <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-red-earth">
          News Brief
        </span>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {articles.slice(0, 4).map((article, index) => (
            <li
              key={article.slug}
              className={
                index > 0 ? "border-l border-border-stone pl-6" : ""
              }
            >
              <Link
                href={`/article/${article.slug}`}
                className="text-storm-charcoal hover:text-prairie-blue"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
