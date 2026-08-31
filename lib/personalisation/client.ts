"use client";

import { DEFAULT_VISITOR_CONTEXT, type PurchaseIntent, type VisitorContext } from "@/types/experience";
import { VISITOR_COOKIE_MAX_AGE, VISITOR_COOKIE_NAME } from "./constants";
import { parseVisitorContext, serializeVisitorContext } from "./visitorContext";

/**
 * Client-side read/write for the `ndy_visitor` first-party cookie.
 *
 * This is the client half of the personalisation system: middleware owns
 * visitCount/lastVisitedAt on navigation, while these helpers let the UI
 * record specific behavioural signals (a product viewed, the brand story
 * scrolled past, a size selected) without a server round-trip. Everything
 * written here stays within the same behavioural, non-sensitive contract
 * defined in types/experience.ts.
 */

function readCookie(): VisitorContext {
  if (typeof document === "undefined") return { ...DEFAULT_VISITOR_CONTEXT };
  const match = document.cookie.match(new RegExp(`(?:^|; )${VISITOR_COOKIE_NAME}=([^;]*)`));
  return parseVisitorContext(match ? decodeURIComponent(match[1] ?? "") : undefined);
}

function writeCookie(context: VisitorContext) {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(serializeVisitorContext(context));
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${VISITOR_COOKIE_NAME}=${value}; Max-Age=${VISITOR_COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

export function getVisitorContextClient(): VisitorContext {
  return readCookie();
}

function update(mutate: (ctx: VisitorContext) => VisitorContext) {
  const current = readCookie();
  const next = mutate(current);
  writeCookie(next);
  return next;
}

export function markBrandStorySeen() {
  return update((ctx) => (ctx.brandStorySeen ? ctx : { ...ctx, brandStorySeen: true }));
}

export function recordProductView(productId: string) {
  return update((ctx) => ({
    ...ctx,
    recentProducts: [productId, ...ctx.recentProducts.filter((id) => id !== productId)].slice(0, 5),
  }));
}

export function setPurchaseIntent(intent: PurchaseIntent) {
  return update((ctx) => ({ ...ctx, purchaseIntent: intent }));
}

/**
 * Marks the visitor as a customer. In production this should only ever be
 * called from a real order-confirmation flow once payment has genuinely
 * succeeded. It is also used by the development experience switcher to
 * preview the CustomerExperience — see components/experience/DevExperienceSwitcher.
 */
export function markAsCustomer() {
  return update((ctx) => ({ ...ctx, customer: true, purchaseIntent: "ready" }));
}

/** Clears all stored personalisation state, returning the visitor to a fresh, anonymous state. */
export function resetVisitorContext() {
  if (typeof document === "undefined") return;
  document.cookie = `${VISITOR_COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
}
