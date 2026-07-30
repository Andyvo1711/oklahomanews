import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles";
import { categoryMap } from "@/config/categories";
import { formatDisplayDate } from "@/lib/dates";
import { CategoryLabel, RegionLabel } from "@/components/StoryMeta";
import { ArticleImage } from "@/components/ArticleImage";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return {};
  }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/article/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: [{ url: article.coverImage }],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article, 4);
  const category = categoryMap[article.category];

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div className="mx-auto max-w-[780px]">
        <div className="flex flex-wrap items-center gap-3">
          <CategoryLabel category={article.category} />
          <RegionLabel region={article.region} />
        </div>
        <h1 className="font-serif-heading mt-3 text-3xl font-semibold leading-tight text-storm-charcoal md:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-muted-gray">{article.excerpt}</p>
        <p className="mt-3 text-sm text-muted-gray">{formatDisplayDate(article.date)}</p>
      </div>

      <div className="mx-auto mt-8 max-w-[1180px]">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-cloud-gray">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(min-width: 1180px) 1180px, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <p className="mt-2 text-xs text-muted-gray">{article.imageCredit}</p>
      </div>

      <div
        className="article-body mx-auto mt-8 max-w-[780px]"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      <div className="mx-auto mt-6 max-w-[780px]">
        <Link
          href={`/category/${category.slug}`}
          className="text-sm font-medium text-prairie-blue hover:text-deep-sky"
        >
          Back to {category.label}
        </Link>
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-12 max-w-[1180px] border-t border-border-stone pt-8">
          <h2 className="font-serif-heading text-xl font-semibold text-storm-charcoal">
            Related Stories
          </h2>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row">
            <Link href={`/article/${related[0].slug}`} className="group block lg:w-1/2">
              <ArticleImage
                src={related[0].coverImage}
                alt={related[0].title}
                aspectClassName="aspect-[16/9]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <h3 className="font-serif-heading mt-3 text-lg font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
                {related[0].title}
              </h3>
            </Link>
            <ul className="divide-y divide-border-stone lg:w-1/2">
              {related.slice(1, 4).map((story) => (
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
      )}
    </article>
  );
}
