import type { Metadata } from "next";
import type { ReactElement } from "react";
import Link from "next/link";
import { regions } from "@/config/regions";
import { getRecentArticlesForRegion } from "@/lib/regions";
import { ArticleImage } from "@/components/ArticleImage";
import { CategoryLabel } from "@/components/StoryMeta";
import { site } from "@/config/site";
import type { ArticlePreview } from "@/types/article";

export const metadata: Metadata = {
  title: "Regions",
  description: `Explore ${site.name} coverage by region, from Oklahoma City and Tulsa to the state's rural and tribal communities.`,
  alternates: { canonical: "/regions" },
};

function OkcLayout({ articles }: { articles: ArticlePreview[] }) {
  const [main, ...rest] = articles;
  if (!main) return <EmptyRegionNote />;
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <Link href={`/article/${main.slug}`} className="group block lg:w-2/3">
        <ArticleImage src={main.coverImage} alt={main.title} aspectClassName="aspect-[16/9]" />
        <h3 className="font-serif-heading mt-3 text-xl font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
          {main.title}
        </h3>
        <p className="mt-2 text-sm text-muted-gray">{main.excerpt}</p>
      </Link>
      <ul className="divide-y divide-border-stone lg:w-1/3">
        {rest.slice(0, 4).map((story) => (
          <li key={story.slug} className="py-3 first:pt-0">
            <CategoryLabel category={story.category} />
            <Link href={`/article/${story.slug}`} className="mt-1 block text-sm font-medium text-storm-charcoal hover:text-prairie-blue">
              {story.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TulsaLayout({ articles }: { articles: ArticlePreview[] }) {
  const [main, ...rest] = articles;
  if (!main) return <EmptyRegionNote />;
  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <Link href={`/article/${main.slug}`} className="group block sm:w-2/5">
        <ArticleImage src={main.coverImage} alt={main.title} aspectClassName="aspect-[3/4]" />
        <h3 className="font-serif-heading mt-3 text-xl font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
          {main.title}
        </h3>
        <p className="mt-2 text-sm text-muted-gray">{main.excerpt}</p>
      </Link>
      <ul className="divide-y divide-border-stone sm:w-3/5">
        {rest.slice(0, 5).map((story) => (
          <li key={story.slug} className="py-3 first:pt-0">
            <Link href={`/article/${story.slug}`} className="text-sm font-medium text-storm-charcoal hover:text-prairie-blue">
              {story.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HorizontalRowsLayout({ articles }: { articles: ArticlePreview[] }) {
  if (articles.length === 0) return <EmptyRegionNote />;
  return (
    <div className="flex flex-col divide-y divide-border-stone">
      {articles.slice(0, 4).map((story) => (
        <Link key={story.slug} href={`/article/${story.slug}`} className="group flex items-center gap-4 py-4 first:pt-0">
          <div className="w-24 shrink-0 sm:w-32">
            <ArticleImage src={story.coverImage} alt={story.title} aspectClassName="aspect-[4/3]" sizes="128px" />
          </div>
          <h3 className="text-base font-medium leading-snug text-storm-charcoal group-hover:text-prairie-blue">
            {story.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}

function ImageStripLayout({ articles }: { articles: ArticlePreview[] }) {
  if (articles.length === 0) return <EmptyRegionNote />;
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {articles.slice(0, 4).map((story) => (
        <Link key={story.slug} href={`/article/${story.slug}`} className="group block">
          <ArticleImage src={story.coverImage} alt={story.title} aspectClassName="aspect-[3/4]" sizes="(min-width: 640px) 25vw, 50vw" />
          <h3 className="mt-2 text-sm font-medium leading-snug text-storm-charcoal group-hover:text-prairie-blue">
            {story.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}

function TextForwardLayout({ articles }: { articles: ArticlePreview[] }) {
  if (articles.length === 0) return <EmptyRegionNote />;
  const [main, ...rest] = articles;
  return (
    <div>
      <Link href={`/article/${main.slug}`} className="group block max-w-2xl">
        <h3 className="font-serif-heading text-2xl font-semibold leading-snug text-storm-charcoal group-hover:text-prairie-blue">
          {main.title}
        </h3>
        <p className="mt-2 text-sm text-muted-gray">{main.excerpt}</p>
      </Link>
      <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-border-stone pt-4 sm:grid-cols-2">
        {rest.slice(0, 4).map((story) => (
          <li key={story.slug}>
            <Link href={`/article/${story.slug}`} className="text-sm font-medium text-storm-charcoal hover:text-prairie-blue">
              {story.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AlternatingRowsLayout({ articles }: { articles: ArticlePreview[] }) {
  if (articles.length === 0) return <EmptyRegionNote />;
  return (
    <div className="flex flex-col divide-y divide-border-stone">
      {articles.slice(0, 4).map((story, index) => (
        <Link
          key={story.slug}
          href={`/article/${story.slug}`}
          className={`group flex flex-col gap-4 py-5 first:pt-0 sm:flex-row ${index % 2 === 1 ? "sm:flex-row-reverse" : ""}`}
        >
          <div className="sm:w-1/3">
            <ArticleImage src={story.coverImage} alt={story.title} aspectClassName="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
          </div>
          <div className="sm:w-2/3">
            <h3 className="text-base font-medium leading-snug text-storm-charcoal group-hover:text-prairie-blue">
              {story.title}
            </h3>
            <p className="mt-1 text-sm text-muted-gray">{story.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function CompactColumnsLayout({ articles }: { articles: ArticlePreview[] }) {
  if (articles.length === 0) return <EmptyRegionNote />;
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3">
      {articles.slice(0, 6).map((story) => (
        <Link key={story.slug} href={`/article/${story.slug}`} className="group block border-t border-border-stone pt-3">
          <h3 className="text-sm font-medium leading-snug text-storm-charcoal group-hover:text-prairie-blue">
            {story.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}

function EmptyRegionNote() {
  return <p className="text-sm text-muted-gray">No stories are available for this region yet.</p>;
}

const LAYOUTS: Record<string, (props: { articles: ArticlePreview[] }) => ReactElement> = {
  "oklahoma-city-metro": OkcLayout,
  "tulsa-metro": TulsaLayout,
  "central-oklahoma": HorizontalRowsLayout,
  "eastern-oklahoma": ImageStripLayout,
  "western-oklahoma": TextForwardLayout,
  "southern-oklahoma": AlternatingRowsLayout,
  "northern-oklahoma": CompactColumnsLayout,
};

export default function RegionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h1 className="font-serif-heading text-3xl font-semibold text-storm-charcoal md:text-4xl">
        Regions
      </h1>
      <p className="mt-3 max-w-2xl text-base text-muted-gray">
        Oklahoma News organizes its coverage by region, from the state capital to the ranchland
        and tribal communities along its borders.
      </p>

      <nav aria-label="Region jump links" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-border-stone py-4">
        {regions.map((region) => (
          <a key={region.slug} href={`#${region.slug}`} className="text-sm font-medium text-prairie-blue hover:text-deep-sky">
            {region.label}
          </a>
        ))}
      </nav>

      <div className="mt-10 flex flex-col gap-14">
        {regions.map((region) => {
          const Layout = LAYOUTS[region.slug] ?? HorizontalRowsLayout;
          const articles = getRecentArticlesForRegion(region.slug, 6);
          return (
            <section key={region.slug} id={region.slug} aria-labelledby={`${region.slug}-heading`}>
              <h2
                id={`${region.slug}-heading`}
                className="font-serif-heading text-2xl font-semibold text-storm-charcoal"
              >
                {region.label}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-gray">{region.shortDescription}</p>
              <div className="mt-6">
                <Layout articles={articles} />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
