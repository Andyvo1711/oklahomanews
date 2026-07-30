import type { RegionConfig, RegionSlug } from "@/types/article";

export const regions: RegionConfig[] = [
  {
    slug: "oklahoma-city-metro",
    label: "Oklahoma City Metro",
    shortDescription:
      "The capital region, spanning downtown OKC, Edmond, Moore, Midwest City, and Yukon.",
    cityKeywords: ["Oklahoma City", "Edmond", "Moore", "Midwest City", "Yukon"],
    homepageOrder: 1,
  },
  {
    slug: "tulsa-metro",
    label: "Tulsa Metro",
    shortDescription:
      "Tulsa and its surrounding communities, including Broken Arrow, Bixby, Owasso, and Jenks.",
    cityKeywords: ["Tulsa", "Broken Arrow", "Bixby", "Owasso", "Jenks"],
    homepageOrder: 2,
  },
  {
    slug: "central-oklahoma",
    label: "Central Oklahoma",
    shortDescription:
      "Norman, Shawnee, Stillwater, and the college towns and farm communities of the state's heart.",
    cityKeywords: ["Norman", "Shawnee", "Stillwater", "Chandler"],
    homepageOrder: 3,
  },
  {
    slug: "eastern-oklahoma",
    label: "Eastern Oklahoma",
    shortDescription:
      "Muskogee, Tahlequah, Claremore, and the Cherokee Nation communities of Green Country.",
    cityKeywords: ["Muskogee", "Tahlequah", "Claremore", "Cherokee Nation"],
    homepageOrder: 4,
  },
  {
    slug: "western-oklahoma",
    label: "Western Oklahoma",
    shortDescription:
      "Enid, Ponca City, and the wheat and energy country stretching toward the panhandle.",
    cityKeywords: ["Enid", "Ponca City", "Woodward", "Elk City"],
    homepageOrder: 5,
  },
  {
    slug: "southern-oklahoma",
    label: "Southern Oklahoma",
    shortDescription:
      "Ardmore, Lawton, and the ranching and Chickasaw Nation communities along the Red River.",
    cityKeywords: ["Ardmore", "Lawton", "Duncan", "Chickasaw Nation"],
    homepageOrder: 6,
  },
  {
    slug: "northern-oklahoma",
    label: "Northern Oklahoma",
    shortDescription:
      "Bartlesville, Ponca City's northern neighbors, and the Osage Nation communities near the Kansas line.",
    cityKeywords: ["Bartlesville", "Osage Nation", "Pawhuska"],
    homepageOrder: 7,
  },
];

export const regionMap: Record<RegionSlug, RegionConfig> = regions.reduce(
  (acc, region) => {
    acc[region.slug] = region;
    return acc;
  },
  {} as Record<RegionSlug, RegionConfig>
);

export function getRegionBySlug(slug: string): RegionConfig | undefined {
  return regions.find((region) => region.slug === slug);
}

export function isValidRegionSlug(slug: string): slug is RegionSlug {
  return regions.some((region) => region.slug === slug);
}
