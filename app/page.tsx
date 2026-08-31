import type { Metadata } from "next";
import { Suspense } from "react";
import { resolveExperienceForRequest } from "@/lib/personalisation/server";
import { isExperiencePreviewEnabled } from "@/lib/personalisation/previewMode";
import { BrandDiscoveryExperience } from "@/components/experience/BrandDiscoveryExperience";
import { ReturningVisitorExperience } from "@/components/experience/ReturningVisitorExperience";
import { HighIntentExperience } from "@/components/experience/HighIntentExperience";
import { CustomerExperience } from "@/components/experience/CustomerExperience";
import { DevExperienceSwitcher } from "@/components/experience/DevExperienceSwitcher";
import { brand } from "@/data/brand";

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.meaning}`,
  alternates: { canonical: "/" },
};

interface HomePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * The canonical NDY 1986 homepage. Renders one of four controlled
 * experience archetypes based on lib/personalisation/resolveExperience —
 * never an arbitrary, uncontrolled layout. See README "How visitor
 * experiences work" for the full rundown.
 */
export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = await searchParams;
  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(resolvedParams)) {
    if (typeof value === "string") urlSearchParams.set(key, value);
  }

  const previewEnabled = isExperiencePreviewEnabled();
  const { experience, visitorContext } = await resolveExperienceForRequest(urlSearchParams, previewEnabled);

  return (
    <>
      {experience === "brand-discovery" && <BrandDiscoveryExperience />}
      {experience === "returning" && <ReturningVisitorExperience visitorContext={visitorContext} />}
      {experience === "high-intent" && <HighIntentExperience />}
      {experience === "customer" && <CustomerExperience />}
      {previewEnabled && (
        <Suspense fallback={null}>
          <DevExperienceSwitcher current={experience} />
        </Suspense>
      )}
    </>
  );
}
