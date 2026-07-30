"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/config/categories";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="border border-border-stone px-3 py-1.5 text-sm font-medium text-storm-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-sky"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <nav
          id="mobile-nav-panel"
          aria-label="Mobile navigation"
          className="absolute left-0 right-0 top-full z-40 border-t border-border-stone bg-canvas-white shadow-sm"
        >
          <ul className="flex flex-col divide-y divide-border-stone">
            <li>
              <Link
                href="/"
                className="block px-4 py-3 text-sm font-medium text-storm-charcoal hover:text-prairie-blue"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className="block px-4 py-3 text-sm font-medium text-storm-charcoal hover:text-prairie-blue"
                  onClick={() => setOpen(false)}
                >
                  {category.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/regions"
                className="block px-4 py-3 text-sm font-medium text-storm-charcoal hover:text-prairie-blue"
                onClick={() => setOpen(false)}
              >
                Regions
              </Link>
            </li>
            <li>
              <Link
                href="/latest"
                className="block px-4 py-3 text-sm font-medium text-storm-charcoal hover:text-prairie-blue"
                onClick={() => setOpen(false)}
              >
                Latest
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
