import Link from "next/link";
import { site } from "@/config/site";
import { categories } from "@/config/categories";
import { regions } from "@/config/regions";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-stone bg-prairie-paper">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <p className="font-serif-heading text-lg font-semibold uppercase tracking-tight text-storm-charcoal">
              Oklahoma News
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted-gray">
              {site.supportingLine}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-storm-charcoal">Categories</h2>
            <ul className="mt-3 space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-sm text-muted-gray hover:text-prairie-blue"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-storm-charcoal">Regions</h2>
            <ul className="mt-3 space-y-2">
              {regions.map((region) => (
                <li key={region.slug}>
                  <Link
                    href={`/regions#${region.slug}`}
                    className="text-sm text-muted-gray hover:text-prairie-blue"
                  >
                    {region.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-storm-charcoal">More</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/latest" className="text-sm text-muted-gray hover:text-prairie-blue">
                  Latest
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-muted-gray hover:text-prairie-blue">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border-stone pt-6">
          <p className="text-xs text-muted-gray">
            &copy; {year} Oklahoma News. All rights reserved.
          </p>
          <p className="mt-2 max-w-2xl text-xs text-muted-gray">
            Oklahoma News is an independent editorial publication. Stories are reported
            and edited for a general Oklahoma readership; business and community profiles
            may include illustrative composites unless otherwise noted.
          </p>
        </div>
      </div>
    </footer>
  );
}
