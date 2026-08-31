import { Hero } from "@/components/sections/Hero";
import { CoreShowcase } from "@/components/sections/CoreShowcase";
import { BuiltToBeWorn } from "@/components/sections/BuiltToBeWorn";
import { WhatNdyMeans } from "@/components/sections/WhatNdyMeans";
import { MissionSection } from "@/components/sections/MissionSection";
import { CoreCTA } from "@/components/sections/CoreCTA";
import { homepageContent } from "@/data/content/homepage";
import type { VisitorContext } from "@/types/experience";
import { coreHoodie } from "@/data/product";

/**
 * A visitor who has already had the brand introduction. Skips the full
 * cinematic film and leads with the product; brand story is still one
 * scroll away, never removed. Order: recognition -> relevance -> convenience -> purchase.
 */
export function ReturningVisitorExperience({ visitorContext }: { visitorContext: VisitorContext }) {
  const hasViewedCore = visitorContext.recentProducts.includes(coreHoodie.id);

  return (
    <>
      <Hero {...homepageContent.returning} compact />
      {hasViewedCore && (
        <div className="container-ndy py-6 text-sm tracking-label text-ndy-ash">
          PICKING UP WHERE YOU LEFT OFF — THE CORE
        </div>
      )}
      <CoreShowcase />
      <BuiltToBeWorn />
      <WhatNdyMeans />
      <MissionSection />
      <CoreCTA />
    </>
  );
}
