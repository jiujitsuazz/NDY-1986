import "server-only";
import { cookies, headers } from "next/headers";
import type { VisitorContext } from "@/types/experience";
import { VISITOR_COOKIE_NAME } from "./constants";
import { parseVisitorContext } from "./visitorContext";
import { deriveIntentSignals } from "./intentSignals";
import { resolveExperience } from "./resolveExperience";
import type { ExperienceType } from "@/types/experience";

/**
 * Server-side read of the visitor's behavioural context. proxy.ts
 * (Next.js Proxy — formerly "middleware") is responsible for writing/
 * updating this cookie on navigation — this function only reads it, so it
 * is safe to call from any Server Component.
 */
export async function getVisitorContext(): Promise<VisitorContext> {
  const store = await cookies();
  return parseVisitorContext(store.get(VISITOR_COOKIE_NAME)?.value);
}

/**
 * Resolves which experience archetype a Server Component should render for
 * the current request. `enablePreviewOverride` should be false in
 * production unless preview mode has been explicitly enabled — see
 * lib/personalisation/previewMode.ts.
 */
export async function resolveExperienceForRequest(
  searchParams: URLSearchParams,
  enablePreviewOverride: boolean,
): Promise<{ experience: ExperienceType; visitorContext: VisitorContext }> {
  const visitorContext = await getVisitorContext();
  const headerList = await headers();
  const referrer = headerList.get("referer");
  const intentSignals = deriveIntentSignals(searchParams, referrer, enablePreviewOverride);
  const experience = resolveExperience(visitorContext, intentSignals);
  return { experience, visitorContext };
}
