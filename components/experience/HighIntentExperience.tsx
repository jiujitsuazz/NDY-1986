import { Hero } from "@/components/sections/Hero";
import { CoreShowcase } from "@/components/sections/CoreShowcase";
import { BuiltToBeWorn } from "@/components/sections/BuiltToBeWorn";
import { CoreCTA } from "@/components/sections/CoreCTA";
import { TrustSignals } from "@/components/product/TrustSignals";
import { homepageContent } from "@/data/content/homepage";

/**
 * A visitor who arrived with clear product intent — a search result, an ad,
 * a direct link, an AI recommendation. Skips the emotional brand film
 * entirely. Order: product -> evidence -> trust -> purchase.
 */
export function HighIntentExperience() {
  return (
    <>
      <Hero {...homepageContent.highIntent} compact />
      <div className="container-ndy">
        <TrustSignals />
      </div>
      <CoreShowcase />
      <BuiltToBeWorn />
      <CoreCTA />
    </>
  );
}
