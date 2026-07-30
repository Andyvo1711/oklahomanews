# Oklahoma News

**Reporting Across the Sooner State**

Independent coverage of Oklahoma communities, business, education, health, leadership, and daily life — from Oklahoma City and Tulsa to the state's rural and tribal communities.

## Overview

Oklahoma News is a statewide digital newsroom built with Next.js (App Router). Content lives entirely as Markdown files on disk — there is no database or CMS. Every article is auto-discovered recursively from `content/articles/`, so publishing a new story never requires a code change.

## Design concept

The site is built as a compact, contemporary regional newsroom rather than a generic blog or a traditional centered newspaper masthead:

- Compact two-row header with a left-aligned wordmark and a thin Red Earth accent line (no logo icon, no centered masthead).
- A wide breaking-news rail, an asymmetrical lead-news composition, and geographic region sections in place of repeated identical card grids.
- A muted, grounded palette (Canvas White, Prairie Paper, Storm Charcoal, Prairie Blue, Deep Sky, Red Earth, Wheat) evoking open plains, prairie skies, and Oklahoma's energy and agricultural landscape — without leaning on cowboy-novelty visuals.
- Source Serif 4 for headlines and article body copy, Inter for navigation and interface text (loaded via `next/font`).

## Tech stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- React 19
- Tailwind CSS v4 (with `@tailwindcss/typography`)
- `gray-matter` for frontmatter parsing, `remark` / `remark-html` for Markdown rendering
- `tsx` to run the content validation script

## Folder structure

```
content/articles/<category-slug>/<slug>.md   Markdown articles, grouped by category folder (organizational only)
src/app/                                     Routes (home, article, category, regions, latest, search, not-found)
src/components/                              Homepage sections and shared UI (header, footer, cards, pagination, etc.)
src/config/                                  categories.ts, regions.ts, site.ts — the canonical category/region/site config
src/lib/                                     articles.ts, regions.ts, search.ts, dates.ts, pagination.ts — data access layer
src/types/article.ts                         Shared TypeScript types for articles, categories, and regions
scripts/validate-content.ts                  Content validation script (run via `npm run validate:content`)
```

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Validate all article content:

```bash
npm run validate:content
```

Build for production (also runs content validation automatically via `prebuild`):

```bash
npm run build
```

## Adding an article

Create a new Markdown file at `content/articles/<category-slug>/<slug>.md`. The filename (without `.md`) must exactly equal the `slug` field in the frontmatter. No other code changes are required — the article will be picked up automatically the next time the site builds or the dev server reloads.

Required frontmatter (no more, no less — `description` and `author` fields are rejected by validation):

```yaml
---
title: "Article Title"
slug: "article-title"
excerpt: "A concise one- or two-sentence summary."
category: "community"
region: "oklahoma-city-metro"
date: "2026-07-15"
coverImage: "https://images.unsplash.com/..."
featured: false
imageCredit: "Photo: Unsplash/Photographer Name"
---

Markdown body content, with at least two `##` subheadings.
```

### Category slugs

`education`, `healthcare`, `business-leaders`, `finance-economy`, `community`, `energy-agriculture`, `beauty-wellness`

### Region slugs

`oklahoma-city-metro`, `tulsa-metro`, `central-oklahoma`, `eastern-oklahoma`, `western-oklahoma`, `southern-oklahoma`, `northern-oklahoma`

The `region` field is required and is never inferred or guessed at render time — it must be set explicitly in each article's frontmatter.

### Image requirements

- `coverImage` must be a real `https://images.unsplash.com/...` or `https://images.pexels.com/...` URL.
- Every article's `coverImage` URL must be globally unique across the entire site.
- Images render through `next/image` with fixed aspect ratios and `object-cover`, configured in `next.config.ts` to allow both Unsplash and Pexels as remote image hosts.

## Unlimited-article architecture

There are no fixed or maximum article counts anywhere in the code or in content validation. `src/lib/articles.ts` recursively walks `content/articles/` at request time, parses frontmatter with `gray-matter`, validates category/region/date values, and skips (rather than crashes on) any malformed file. Adding, removing, or reorganizing articles never requires touching a route, component, or config file.

## Dynamic pagination

Category archives (`/category/[slug]`), the latest stream (`/latest`), and search results are all paginated server-side via a shared `paginateArticles()` helper, driven by a `?page=` query parameter (e.g. `/latest?page=2`). Category pages show 10 archive stories per page; `/latest` shows 12 per page. Pagination clamps to the nearest valid page and never throws on an out-of-range page number.

## Regional grouping

`src/lib/regions.ts` groups articles by region for the homepage's Statewide Snapshot and Regional Newsboard sections, and powers the `/regions` page, where each of the seven regions gets its own distinct layout rather than a repeated card template.

## Date-display rule

Publication dates are shown in exactly one place: the `/article/[slug]` page (formatted as, for example, "July 15, 2026"). Dates are never shown on the homepage, category pages, regions page, search results, the latest stream, related stories, or the footer.

## Article-count rule

Article, result, category, and region totals are never displayed anywhere in the public UI. Counts are used only internally, to compute pagination.
