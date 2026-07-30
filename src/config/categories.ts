import type { CategoryConfig, CategorySlug } from "@/types/article";

export const categories: CategoryConfig[] = [
  {
    slug: "education",
    label: "Education",
    shortLabel: "Education",
    introduction:
      "Coverage of Oklahoma's colleges, universities, career-technology centers, and rural school districts, from classroom innovation to student opportunity.",
    navigationOrder: 1,
  },
  {
    slug: "healthcare",
    label: "Healthcare",
    shortLabel: "Health",
    introduction:
      "Reporting on hospitals, clinics, and health systems serving Oklahoma City, Tulsa, tribal communities, and rural counties across the state.",
    navigationOrder: 2,
  },
  {
    slug: "business-leaders",
    label: "Business Leaders",
    shortLabel: "Leaders",
    introduction:
      "Profiles of the entrepreneurs and executives shaping Oklahoma industry, from energy and aerospace to agriculture and hospitality.",
    navigationOrder: 3,
  },
  {
    slug: "finance-economy",
    label: "Finance & Economy",
    shortLabel: "Economy",
    introduction:
      "Analysis of Oklahoma's economic trends, from statewide development corridors to banking, housing, and workforce shifts.",
    navigationOrder: 4,
  },
  {
    slug: "community",
    label: "Community",
    shortLabel: "Community",
    introduction:
      "Stories from neighborhoods, small towns, and tribal communities across Oklahoma, covering the people and places that hold them together.",
    navigationOrder: 5,
  },
  {
    slug: "energy-agriculture",
    label: "Energy & Agriculture",
    shortLabel: "Energy & Ag",
    introduction:
      "Coverage of Oklahoma's energy infrastructure and agricultural economy, from wind and grid modernization to ranching and grain production.",
    navigationOrder: 6,
  },
  {
    slug: "beauty-wellness",
    label: "Beauty & Wellness",
    shortLabel: "Wellness",
    introduction:
      "A look at the salons, studios, and wellness practices helping Oklahomans across the state look after themselves, inside and out.",
    navigationOrder: 7,
  },
];

export const categoryMap: Record<CategorySlug, CategoryConfig> = categories.reduce(
  (acc, category) => {
    acc[category.slug] = category;
    return acc;
  },
  {} as Record<CategorySlug, CategoryConfig>
);

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return categories.find((category) => category.slug === slug);
}

export function isValidCategorySlug(slug: string): slug is CategorySlug {
  return categories.some((category) => category.slug === slug);
}
