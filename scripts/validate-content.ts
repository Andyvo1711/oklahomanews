import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isValidCategorySlug } from "../src/config/categories";
import { isValidRegionSlug } from "../src/config/regions";
import { isValidDateString } from "../src/lib/dates";

const CONTENT_ROOT = path.join(process.cwd(), "content", "articles");

const REQUIRED_FIELDS = [
  "title",
  "slug",
  "excerpt",
  "category",
  "region",
  "date",
  "coverImage",
  "featured",
  "imageCredit",
];

const FORBIDDEN_FIELDS = ["description", "author"];

const IMAGE_HOST_PATTERN = /^https:\/\/images\.(unsplash|pexels)\.com\//;
const SUBHEADING_PATTERN = /^##\s+.+/gm;

function walkMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

function main() {
  const errors: string[] = [];
  const files = walkMarkdownFiles(CONTENT_ROOT);

  if (files.length === 0) {
    errors.push("No articles found under content/articles. At least one article is required.");
  }

  const seenSlugs = new Map<string, string>();
  const seenImages = new Map<string, string>();

  for (const filePath of files) {
    const relativePath = path.relative(CONTENT_ROOT, filePath);
    const raw = fs.readFileSync(filePath, "utf8");

    let parsed: matter.GrayMatterFile<string>;
    try {
      parsed = matter(raw);
    } catch (error) {
      errors.push(`${relativePath}: failed to parse frontmatter (${error})`);
      continue;
    }

    const { data, content } = parsed;
    const filenameSlug = path.basename(filePath, ".md");

    // Required fields present
    for (const field of REQUIRED_FIELDS) {
      if (data[field] === undefined || data[field] === null || data[field] === "") {
        errors.push(`${relativePath}: missing required field "${field}"`);
      }
    }

    // Forbidden fields absent
    for (const field of FORBIDDEN_FIELDS) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        errors.push(`${relativePath}: contains forbidden field "${field}"`);
      }
    }

    // Filename === slug
    if (data.slug && data.slug !== filenameSlug) {
      errors.push(
        `${relativePath}: filename "${filenameSlug}" does not match slug "${data.slug}"`
      );
    }

    // Slug uniqueness
    if (data.slug) {
      if (seenSlugs.has(data.slug)) {
        errors.push(
          `${relativePath}: duplicate slug "${data.slug}" also used in ${seenSlugs.get(data.slug)}`
        );
      } else {
        seenSlugs.set(data.slug, relativePath);
      }
    }

    // Category valid
    if (data.category && !isValidCategorySlug(data.category)) {
      errors.push(`${relativePath}: invalid category "${data.category}"`);
    }

    // Region valid
    if (data.region && !isValidRegionSlug(data.region)) {
      errors.push(`${relativePath}: invalid region "${data.region}"`);
    }

    // Date format and real calendar date
    if (data.date && !isValidDateString(data.date)) {
      errors.push(`${relativePath}: invalid date "${data.date}" (expected YYYY-MM-DD, real calendar date)`);
    }

    // Cover image host
    if (data.coverImage && !IMAGE_HOST_PATTERN.test(data.coverImage)) {
      errors.push(
        `${relativePath}: coverImage must be an images.unsplash.com or images.pexels.com URL`
      );
    }

    // Cover image global uniqueness
    if (data.coverImage) {
      if (seenImages.has(data.coverImage)) {
        errors.push(
          `${relativePath}: duplicate coverImage also used in ${seenImages.get(data.coverImage)}`
        );
      } else {
        seenImages.set(data.coverImage, relativePath);
      }
    }

    // featured is boolean
    if (data.featured !== undefined && typeof data.featured !== "boolean") {
      errors.push(`${relativePath}: "featured" must be a boolean`);
    }

    // Body non-empty
    if (!content || content.trim().length === 0) {
      errors.push(`${relativePath}: article body is empty`);
    }

    // At least 2 markdown subheadings
    const subheadingMatches = content.match(SUBHEADING_PATTERN);
    if (!subheadingMatches || subheadingMatches.length < 2) {
      errors.push(`${relativePath}: article body must contain at least 2 "##" subheadings`);
    }
  }

  if (errors.length > 0) {
    console.error(`Content validation failed with ${errors.length} error(s):\n`);
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }

  console.log(`Content validation passed for ${files.length} article(s).`);
}

main();
