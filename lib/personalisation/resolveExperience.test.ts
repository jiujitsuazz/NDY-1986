import { describe, expect, it } from "vitest";
import { resolveExperience } from "./resolveExperience";
import { DEFAULT_VISITOR_CONTEXT } from "@/types/experience";
import type { IntentSignals } from "@/types/experience";

const noSignals: IntentSignals = {
  hasCampaignParams: false,
  landedOnProduct: false,
  referrerIsSearchOrAds: false,
  override: null,
};

describe("resolveExperience", () => {
  it("shows brand-discovery to a brand-new visitor with no signals", () => {
    expect(resolveExperience(DEFAULT_VISITOR_CONTEXT, noSignals)).toBe("brand-discovery");
  });

  it("shows returning once the brand story has been seen", () => {
    const ctx = { ...DEFAULT_VISITOR_CONTEXT, brandStorySeen: true };
    expect(resolveExperience(ctx, noSignals)).toBe("returning");
  });

  it("shows returning after a second visit even without brandStorySeen", () => {
    const ctx = { ...DEFAULT_VISITOR_CONTEXT, visitCount: 2 };
    expect(resolveExperience(ctx, noSignals)).toBe("returning");
  });

  it("shows high-intent when campaign params are present, even for a first-time visitor", () => {
    const signals: IntentSignals = { ...noSignals, hasCampaignParams: true };
    expect(resolveExperience(DEFAULT_VISITOR_CONTEXT, signals)).toBe("high-intent");
  });

  it("shows high-intent when the referrer is a search engine or ad platform", () => {
    const signals: IntentSignals = { ...noSignals, referrerIsSearchOrAds: true };
    expect(resolveExperience(DEFAULT_VISITOR_CONTEXT, signals)).toBe("high-intent");
  });

  it("always shows customer to a known customer, regardless of intent signals", () => {
    const ctx = { ...DEFAULT_VISITOR_CONTEXT, customer: true };
    const signals: IntentSignals = { ...noSignals, hasCampaignParams: true };
    expect(resolveExperience(ctx, signals)).toBe("customer");
  });

  it("lets an explicit override win over every other rule", () => {
    const ctx = { ...DEFAULT_VISITOR_CONTEXT, customer: true };
    const signals: IntentSignals = { ...noSignals, override: "brand-discovery" };
    expect(resolveExperience(ctx, signals)).toBe("brand-discovery");
  });
});
