import { Hero } from "@/components/sections/Hero";
import { StatementSection } from "@/components/sections/StatementSection";
import { CoreShowcase } from "@/components/sections/CoreShowcase";
import { BuiltToBeWorn } from "@/components/sections/BuiltToBeWorn";
import { FitSection } from "@/components/sections/FitSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { WhatNdyMeans } from "@/components/sections/WhatNdyMeans";
import { MissionSection } from "@/components/sections/MissionSection";
import { CoreCTA } from "@/components/sections/CoreCTA";
import { BrandStoryTracker } from "./BrandStoryTracker";
import { homepageContent } from "@/data/content/homepage";

/**
 * The most cinematic experience — a full brand film for a visitor who has
 * never engaged with NDY before. Order: emotion -> story -> product -> trust -> purchase.
 */
export function BrandDiscoveryExperience() {
  return (
    <>
      <Hero {...homepageContent.brandDiscovery} />
      <BrandStoryTracker />
      <StatementSection />
      <CoreShowcase />
      <BuiltToBeWorn />
      <FitSection />
      <SocialProofSection />
      <WhatNdyMeans />
      <MissionSection />
      <CoreCTA />
    </>
  );
}
