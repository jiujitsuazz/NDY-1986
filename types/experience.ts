/**
 * Personalisation / intent-driven experience types.
 *
 * These types are the contract between visitor behaviour (lib/personalisation)
 * and the rendered experience (components/experience). The resolver logic is
 * intentionally simple and rules-based today (see resolveExperience.ts) but
 * this contract is stable enough that a smarter, AI-driven resolver could be
 * swapped in later without touching any UI component.
 */

export type ExperienceType =
  | "brand-discovery"
  | "returning"
  | "high-intent"
  | "customer";

export type PurchaseIntent = "unknown" | "browsing" | "considering" | "ready";

/**
 * Behavioural, first-party visitor state. Deliberately excludes anything
 * demographic, biometric, or otherwise sensitive — this is a record of what
 * a visitor has done on this site, not who they are.
 */
export interface VisitorContext {
  visitCount: number;
  brandStorySeen: boolean;
  lastVisitedAt: string | null;
  recentProducts: string[];
  customer: boolean;
  purchaseIntent: PurchaseIntent;
}

/**
 * Signals available at request time that hint at intent beyond stored
 * behavioural history — e.g. campaign parameters or a direct product link.
 * These are ephemeral (per-request) and are never persisted verbatim.
 */
export interface IntentSignals {
  hasCampaignParams: boolean;
  landedOnProduct: boolean;
  referrerIsSearchOrAds: boolean;
  /** Explicit override for previews/testing, e.g. ?experience=customer */
  override: ExperienceType | null;
}

export const DEFAULT_VISITOR_CONTEXT: VisitorContext = {
  visitCount: 0,
  brandStorySeen: false,
  lastVisitedAt: null,
  recentProducts: [],
  customer: false,
  purchaseIntent: "unknown",
};
