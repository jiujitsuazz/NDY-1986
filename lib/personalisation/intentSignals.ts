import type { ExperienceType, IntentSignals } from "@/types/experience";
import { EXPERIENCE_OVERRIDE_PARAM } from "./constants";

const CAMPAIGN_PARAMS = ["utm_source", "utm_campaign", "gclid", "fbclid", "ref"];
const SEARCH_OR_ADS_HOSTS = ["google.", "bing.", "duckduckgo.", "facebook.", "instagram.", "tiktok."];
const VALID_EXPERIENCES: ExperienceType[] = ["brand-discovery", "returning", "high-intent", "customer"];

/**
 * Derives ephemeral, per-request intent signals from search params and the
 * referrer header. Nothing here is persisted verbatim — only the resulting
 * experience choice (and generic behavioural fields) ever reach storage.
 */
export function deriveIntentSignals(
  searchParams: URLSearchParams,
  referrer: string | null,
  allowOverride: boolean,
): IntentSignals {
  const hasCampaignParams = CAMPAIGN_PARAMS.some((key) => searchParams.has(key));

  let referrerIsSearchOrAds = false;
  if (referrer) {
    try {
      const host = new URL(referrer).hostname;
      referrerIsSearchOrAds = SEARCH_OR_ADS_HOSTS.some((needle) => host.includes(needle));
    } catch {
      referrerIsSearchOrAds = false;
    }
  }

  const overrideParam = searchParams.get(EXPERIENCE_OVERRIDE_PARAM);
  const requestedOverride =
    overrideParam && VALID_EXPERIENCES.includes(overrideParam as ExperienceType)
      ? (overrideParam as ExperienceType)
      : null;

  return {
    hasCampaignParams,
    landedOnProduct: false,
    referrerIsSearchOrAds,
    override: allowOverride ? requestedOverride : null,
  };
}
