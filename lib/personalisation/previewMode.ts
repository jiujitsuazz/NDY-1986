/**
 * Whether the ?experience= override and the on-screen experience switcher
 * are allowed to run. On by default outside production; in production it
 * requires an explicit opt-in via NEXT_PUBLIC_ENABLE_EXPERIENCE_PREVIEW=true
 * so client and server agree on the same flag without extra plumbing.
 */
export function isExperiencePreviewEnabled(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return process.env.NEXT_PUBLIC_ENABLE_EXPERIENCE_PREVIEW === "true";
}
