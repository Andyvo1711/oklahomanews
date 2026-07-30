import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/config/categories";
import { regions } from "@/config/regions";
import { getArticlesByCategory, getArticlesByCategoryAndRegion, paginateArticles } from "@/lib/articles";
import { parsePageParam } from "@/lib/pagination";
import { ArticleImage } from "@/components/ArticleImage";
import { RegionLabel } from "@/components/StoryMeta";
import { Pagination } from "@/components/Pagination";
import { site } from "@/config/site";
import type { ArticlePreview } from "@/types/article";

type ArchiveBlockType =
  | "full-width-image"
  | "compact-text-row"
  | "image-left"
  | "image-right"
  | "text-only-pair";

interface ArchiveBlock {
  type: ArchiveBlockType;
  items: ArticlePreview[];
}

const BLOCK_CYCLE: { type: ArchiveBlockType; size: number }[] = [
  { type: "full-width-image", size: 1 },
  { type: "compact-text-row", size: 1 },
  { type: "image-left", size: 1 },
  { type: "text-only-pair", size: 2 },
  { type: "image-right", size: 1 },
];

/**
 * Splits an archive list into a mixed, non-repetitive sequence of block
 * types (full-width image, compact text row, image-left, image-right,
 * text-only pair) rather than a uniform grid.
 */
function buildArchiveBlocks(items: ArticlePreview[]): ArchiveBlock[] {
  const blocks: ArchiveBlock[] = [];
  let cursor = 0;
  let cycleIndex = 0;

  while (cursor < items.length) {
    const step = BLOCK_CYCLE[cycleIndex % BLOCK_CYCLE.length];
    const slice = items.slice(cursor, cursor + step.size);
    if (slice.length === 0) break;

    if (slice.length < step.size) {
      // Not enough items left for a pair; fall back to a single row.
      blocks.push({ type: "compact-text-row", items: [slice[0]] });
      cursor += 1;
    } else {
      blocks.push({ type: step.type, items: slice });
      cursor += step.size;
    }
    cycleIndex += 1;
  }

  return blocks;
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.label,
    description: category.introduction,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title: `${category.label} | ${site.name}`,
      description: category.introduction,
      type: "website",
    },
  };
}

const PAGE_SIZE = 10;

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const { page: pageParam } = await searchParams;
  const page = parsePageParam(pageParam);

  const allArticles = getArticlesByCategory(category.slug);
  const [featured, ...rest] = allArticles;

  // Regional rail: one story per region for this category, where available.
  const regionalRail = regions
    .map((region) => getArticlesByCategoryAndRegion(category.slug, region.slug)[0])
    .filter((article): article is NonNullable<typeof article> => Boolean(article))
    .filter((article) => article.slug !== featured?.slug)
    .slice(0, 4);

  const archivePool = rest.filter(
    (article) => !regionalRail.some((r) => r.slug === article.slug)
  );
  const paginated = paginateArticles(archivePool, page, PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h1 className="font-serif-heading text-3xl font-semibold text-storm-charcoal md:text-4xl">
        {category.label}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-muted-gray">{category.introduction}</p>
      <div className="mt-6 border-t border-border-stone" />

      {featured && (
        <section aria-label="Featured story" className="mt-8 flex flex-col gap-6 lg:flex-row">
          <Link href={`/article/${featured.slug}`} className="group block lg:w-2/3">
            <ArticleImage
              src={featured.coverImage}
              alt={featured.title}
              aspectClassName="aspect-[16/9]"
              priority
              sizes="(min-width: 1024px) 66vw, 100vw"
            />
            <h2 className="font-serif-heading mt-4 text-2xl font-semibold leading-tight text-storm-charcoal group-hover:text-prairie-blue">
              {featured.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-gray">{featured.excerpt}</p>
          </Link>
          <div className="lg:w-1/3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-gray">
              Across the Regions
            </h3>
            <ul className="mt-3 divide-y divide-border-stone">
              {regionalRail.map((story) => (
                <li key={story.slug} className="py-3 first:pt-0">
                  <RegionLabel region={story.region} />
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
        </section>
      )}

      <section aria-label={`More ${category.label} stories`} className="mt-12">
        <h2 className="font-serif-heading text-xl font-semibold text-storm-charcoal">
          More {category.label}
        </h2>
        <div className="mt-6 flex flex-col divide-y divide-border-stone">
          {buildArchiveBlocks(paginated.items).map((block) => {
            if (block.type === "full-width-image") {
              const story = block.items[0];
              return (
                <Link key={story.slug} href={`/article/${story.slug}`} className="group block py-6 first:pt-0">
                  <ArticleImage
                    src={story.coverImage}
                    alt={story.title}
                    aspectClassName="aspect-[21/9]"
                    sizes="100vw"
                  />
                  <h3 className="font-serif-heading mt-3 text-xl font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
                    {story.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-muted-gray">{story.excerpt}</p>
                </Link>
              );
            }
            if (block.type === "compact-text-row") {
              const story = block.items[0];
              return (
                <Link key={story.slug} href={`/article/${story.slug}`} className="group block py-5">
                  <h3 className="text-base font-medium leading-snug text-storm-charcoal group-hover:text-prairie-blue">
                    {story.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-gray">{story.excerpt}</p>
                </Link>
              );
            }
            if (block.type === "image-left") {
              const story = block.items[0];
              return (
                <Link
                  key={story.slug}
                  href={`/article/${story.slug}`}
                  className="group flex flex-col gap-4 py-6 sm:flex-row"
                >
                  <div className="sm:w-1/3">
                    <ArticleImage
                      src={story.coverImage}
                      alt={story.title}
                      aspectClassName="aspect-[4/3]"
                      sizes="(min-width: 640px) 33vw, 100vw"
                    />
                  </div>
                  <div className="sm:w-2/3">
                    <h3 className="font-serif-heading text-lg font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-gray">{story.excerpt}</p>
                  </div>
                </Link>
              );
            }
            if (block.type === "image-right") {
              const story = block.items[0];
              return (
                <Link
                  key={story.slug}
                  href={`/article/${story.slug}`}
                  className="group flex flex-col-reverse gap-4 py-6 sm:flex-row"
                >
                  <div className="sm:w-2/3">
                    <h3 className="font-serif-heading text-lg font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-gray">{story.excerpt}</p>
                  </div>
                  <div className="sm:w-1/3">
                    <ArticleImage
                      src={story.coverImage}
                      alt={story.title}
                      aspectClassName="aspect-[4/3]"
                      sizes="(min-width: 640px) 33vw, 100vw"
                    />
                  </div>
                </Link>
              );
            }
            // text-only-pair
            return (
              <div key={block.items.map((i) => i.slug).join("-")} className="grid grid-cols-1 gap-x-8 gap-y-4 py-6 sm:grid-cols-2">
                {block.items.map((story) => (
                  <Link key={story.slug} href={`/article/${story.slug}`} className="group block">
                    <h3 className="text-base font-medium leading-snug text-storm-charcoal group-hover:text-prairie-blue">
                      {story.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-gray">{story.excerpt}</p>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>

        <Pagination
          basePath={`/category/${category.slug}`}
          currentPage={paginated.currentPage}
          totalPages={paginated.totalPages}
          hasNextPage={paginated.hasNextPage}
          hasPreviousPage={paginated.hasPreviousPage}
        />
      </section>
    </div>
  );
}
