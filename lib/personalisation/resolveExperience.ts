import type { ExperienceType, IntentSignals, VisitorContext } from "@/types/experience";

/**
 * Rules-based experience resolver.
 *
 * This is deliberately simple today — a small, ordered set of rules over
 * first-party behavioural state and request-time intent signals. The
 * function is pure (no I/O, no randomness) so it is trivially testable and
 * swappable: a future AI-driven intent engine can implement the same
 * signature (VisitorContext, IntentSignals) => ExperienceType and be dropped
 * in without touching any UI component.
 *
 * Precedence, most specific first:
 *   1. Explicit override (dev/preview tooling)
 *   2. Known customer -> customer relationship experience
 *   3. Clear high-intent signal (campaign params, search/ads referrer) -> product-first
 *   4. Has seen the brand before -> returning, commerce-leaning experience
 *   5. Otherwise -> full cinematic brand discovery
 */
export function resolveExperience(
  visitorContext: VisitorContext,
  intentSignals: IntentSignals,
): ExperienceType {
  if (intentSignals.override) return intentSignals.override;

  if (visitorContext.customer) return "customer";

  if (intentSignals.hasCampaignParams || intentSignals.referrerIsSearchOrAds) {
    return "high-intent";
  }

  if (visitorContext.visitCount > 1 || visitorContext.brandStorySeen) {
    return "returning";
  }

  return "brand-discovery";
}
