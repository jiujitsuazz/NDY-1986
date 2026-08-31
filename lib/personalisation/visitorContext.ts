import { DEFAULT_VISITOR_CONTEXT, type VisitorContext } from "@/types/experience";

/**
 * Serialisation for the first-party `ndy_visitor` cookie. This is the single
 * source of truth for behavioural state — read by middleware (server) and by
 * client-side helpers (lib/personalisation/client.ts) so both sides agree on
 * shape without a separate localStorage copy to keep in sync.
 *
 * Only non-sensitive behavioural fields live here. See types/experience.ts
 * for the full contract.
 */

export function parseVisitorContext(raw: string | undefined | null): VisitorContext {
  if (!raw) return { ...DEFAULT_VISITOR_CONTEXT };
  try {
    const parsed = JSON.parse(raw);
    return {
      visitCount: typeof parsed.visitCount === "number" ? parsed.visitCount : 0,
      brandStorySeen: Boolean(parsed.brandStorySeen),
      lastVisitedAt: typeof parsed.lastVisitedAt === "string" ? parsed.lastVisitedAt : null,
      recentProducts: Array.isArray(parsed.recentProducts) ? parsed.recentProducts.slice(0, 5) : [],
      customer: Boolean(parsed.customer),
      purchaseIntent: ["unknown", "browsing", "considering", "ready"].includes(parsed.purchaseIntent)
        ? parsed.purchaseIntent
        : "unknown",
    };
  } catch {
    return { ...DEFAULT_VISITOR_CONTEXT };
  }
}

export function serializeVisitorContext(context: VisitorContext): string {
  return JSON.stringify(context);
}
