import { NextResponse, type NextRequest } from "next/server";
import { SESSION_GAP_MS, VISITOR_COOKIE_MAX_AGE, VISITOR_COOKIE_NAME } from "@/lib/personalisation/constants";
import { parseVisitorContext, serializeVisitorContext } from "@/lib/personalisation/visitorContext";

/**
 * Owns visitCount/lastVisitedAt on the first-party `ndy_visitor` cookie so
 * Server Components can resolve the correct experience on the very first
 * response — no client-side flash of the wrong archetype. A "visit" is a
 * new session boundary (gap > SESSION_GAP_MS since the last one), not every
 * single page load.
 *
 * Runs only for page navigations (see matcher below) — never for API
 * routes, static assets, or the well-known discovery file.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const existing = request.cookies.get(VISITOR_COOKIE_NAME)?.value;
  const context = parseVisitorContext(existing);
  const now = Date.now();
  const lastVisitedMs = context.lastVisitedAt ? Date.parse(context.lastVisitedAt) : null;
  const isNewSession = !lastVisitedMs || now - lastVisitedMs > SESSION_GAP_MS;

  const updated = {
    ...context,
    visitCount: isNewSession ? context.visitCount + 1 : context.visitCount || 1,
    lastVisitedAt: new Date(now).toISOString(),
  };

  response.cookies.set(VISITOR_COOKIE_NAME, serializeVisitorContext(updated), {
    maxAge: VISITOR_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|\\.well-known).*)",
  ],
};
