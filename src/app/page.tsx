import type { Metadata } from "next";
import {
  getArticlesByCategory,
  getArticlesByRegion,
  getFeaturedArticles,
  getLatestArticles,
} from "@/lib/articles";
import { getRegionalHomepageGroups } from "@/lib/regions";
import { site } from "@/config/site";
import { NewsBriefRail } from "@/components/NewsBriefRail";
import { LeadDesk } from "@/components/LeadDesk";
import { StatewideSnapshot } from "@/components/StatewideSnapshot";
import { OkcTulsaSplitDesk } from "@/components/OkcTulsaSplitDesk";
import { EducationReport } from "@/components/EducationReport";
import { HealthAcrossOklahoma } from "@/components/HealthAcrossOklahoma";
import { EnergyAgricultureDesk } from "@/components/EnergyAgricultureDesk";
import { BusinessEconomyExchange } from "@/components/BusinessEconomyExchange";
import { CommunityRoutes } from "@/components/CommunityRoutes";
import { BeautyWellnessReview } from "@/components/BeautyWellnessReview";
import { RegionalNewsboard } from "@/components/RegionalNewsboard";
import { LatestNewsStream } from "@/components/LatestNewsStream";
import { NewsletterDemo } from "@/components/NewsletterDemo";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    type: "website",
  },
};

export default function Home() {
  const featured = getFeaturedArticles(3);
  const latest = getLatestArticles(20);

  // Build a de-duplicated pool for the lead desk, preferring featured stories.
  const leadPool = [...featured, ...latest].filter(
    (article, index, all) => all.findIndex((a) => a.slug === article.slug) === index
  );
  const [leadMain, leadSecondary, ...leadRest] = leadPool;

  const statewideGroups = getRegionalHomepageGroups(1, [
    "oklahoma-city-metro",
    "tulsa-metro",
    "central-oklahoma",
    "eastern-oklahoma",
    "western-oklahoma",
    "southern-oklahoma",
  ]);

  const okcArticles = getArticlesByRegion("oklahoma-city-metro");
  const tulsaArticles = getArticlesByRegion("tulsa-metro");

  const educationArticles = getArticlesByCategory("education");
  const healthcareArticles = getArticlesByCategory("healthcare");
  const wellnessArticles = getArticlesByCategory("beauty-wellness");
  const energyArticles = getArticlesByCategory("energy-agriculture");
  const businessArticles = getArticlesByCategory("business-leaders");
  const economyArticles = getArticlesByCategory("finance-economy");
  const communityArticles = getArticlesByCategory("community");

  const regionalGroups = getRegionalHomepageGroups(2);

  const latestStream = getLatestArticles(12);

  return (
    <>
      <NewsBriefRail articles={latest.slice(0, 4)} />

      {leadMain && leadSecondary && (
        <LeadDesk main={leadMain} secondary={leadSecondary} topStories={leadRest} />
      )}

      <StatewideSnapshot groups={statewideGroups} />

      {okcArticles.length > 0 && tulsaArticles.length > 0 && (
        <OkcTulsaSplitDesk okc={okcArticles} tulsa={tulsaArticles} />
      )}

      {educationArticles.length >= 5 && (
        <EducationReport
          main={educationArticles[0]}
          strip={educationArticles.slice(1, 5)}
          secondary={educationArticles.slice(5, 9)}
        />
      )}

      {healthcareArticles.length >= 5 && (
        <HealthAcrossOklahoma
          large={healthcareArticles.slice(0, 2)}
          briefs={healthcareArticles.slice(2, 5)}
          crossover={wellnessArticles[0]}
        />
      )}

      {energyArticles.length >= 6 && (
        <EnergyAgricultureDesk
          energyStory={energyArticles[0]}
          agricultureStory={energyArticles[1]}
          supporting={energyArticles.slice(2, 6)}
        />
      )}

      {businessArticles.length >= 2 && economyArticles.length >= 1 && (
        <BusinessEconomyExchange
          profile={businessArticles[0]}
          analysis={economyArticles[0]}
          compact={[...businessArticles.slice(2), ...economyArticles.slice(1)].slice(0, 5)}
          imageStory={businessArticles[1]}
        />
      )}

      <CommunityRoutes articles={communityArticles} />

      {wellnessArticles.length >= 5 && (
        <BeautyWellnessReview
          feature={wellnessArticles[0]}
          compact={wellnessArticles.slice(1, 5)}
        />
      )}

      <RegionalNewsboard groups={regionalGroups} />

      <section aria-label="Latest news" className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif-heading text-2xl font-semibold text-storm-charcoal">
            Latest News
          </h2>
          <Link href="/latest" className="text-sm font-medium text-prairie-blue hover:text-deep-sky">
            View all latest
          </Link>
        </div>
        <div className="mt-6">
          <LatestNewsStream articles={latestStream} />
        </div>
      </section>

      <NewsletterDemo />
    </>
  );
}
