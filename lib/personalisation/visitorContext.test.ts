import { describe, expect, it } from "vitest";
import { parseVisitorContext, serializeVisitorContext } from "./visitorContext";
import { DEFAULT_VISITOR_CONTEXT } from "@/types/experience";

describe("visitorContext serialisation", () => {
  it("returns the default context for missing or empty input", () => {
    expect(parseVisitorContext(undefined)).toEqual(DEFAULT_VISITOR_CONTEXT);
    expect(parseVisitorContext(null)).toEqual(DEFAULT_VISITOR_CONTEXT);
    expect(parseVisitorContext("")).toEqual(DEFAULT_VISITOR_CONTEXT);
  });

  it("returns the default context for malformed JSON rather than throwing", () => {
    expect(parseVisitorContext("{not json")).toEqual(DEFAULT_VISITOR_CONTEXT);
  });

  it("round-trips a valid context", () => {
    const context = {
      visitCount: 3,
      brandStorySeen: true,
      lastVisitedAt: "2026-01-01T00:00:00.000Z",
      recentProducts: ["core-hoodie-black"],
      customer: false,
      purchaseIntent: "considering" as const,
    };
    expect(parseVisitorContext(serializeVisitorContext(context))).toEqual(context);
  });

  it("caps recentProducts at 5 and falls back on an invalid purchaseIntent", () => {
    const raw = JSON.stringify({
      recentProducts: ["a", "b", "c", "d", "e", "f"],
      purchaseIntent: "not-a-real-value",
    });
    const parsed = parseVisitorContext(raw);
    expect(parsed.recentProducts).toHaveLength(5);
    expect(parsed.purchaseIntent).toBe("unknown");
  });
});
