import Link from "next/link";
import { site } from "@/config/site";
import { categories } from "@/config/categories";
import { formatEditionDate } from "@/lib/dates";
import { MobileNav } from "@/components/MobileNav";
import { SearchToggle } from "@/components/SearchToggle";

export function SiteHeader() {
  const editionDate = formatEditionDate();

  return (
    <header className="relative border-b border-border-stone bg-canvas-white">
      <div className="absolute left-0 top-0 h-full w-[3px] bg-red-earth" aria-hidden="true" />
      {/* Row 1 */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 pl-6 md:px-8 md:pl-9">
        <div className="flex items-baseline gap-4 min-w-0">
          <Link
            href="/"
            className="font-serif-heading text-xl md:text-2xl font-semibold uppercase tracking-tight text-storm-charcoal whitespace-nowrap"
          >
            Oklahoma News
          </Link>
          <span className="hidden lg:inline text-sm text-muted-gray whitespace-nowrap">
            {site.tagline}
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden sm:inline text-xs text-muted-gray whitespace-nowrap">
            {editionDate}
          </span>
          <div className="hidden md:block">
            <SearchToggle />
          </div>
          <MobileNav />
        </div>
      </div>

      {/* Row 2 - desktop/tablet nav */}
      <nav
        aria-label="Primary navigation"
        className="hidden md:block border-t border-border-stone px-6 md:px-9"
      >
        <ul className="flex gap-6 overflow-x-auto whitespace-nowrap py-2 text-sm font-medium">
          <li>
            <Link href="/" className="text-storm-charcoal hover:text-prairie-blue">
              Home
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/category/${category.slug}`}
                className="text-storm-charcoal hover:text-prairie-blue"
              >
                {category.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/regions" className="text-storm-charcoal hover:text-prairie-blue">
              Regions
            </Link>
          </li>
          <li>
            <Link href="/latest" className="text-storm-charcoal hover:text-prairie-blue">
              Latest
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
