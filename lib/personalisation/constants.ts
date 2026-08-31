export const VISITOR_COOKIE_NAME = "ndy_visitor";

/** ~1 year. Behavioural preference, not an auth token — long-lived is fine. */
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** A gap longer than this since the last visit counts as a new "visit" for visitCount purposes. */
export const SESSION_GAP_MS = 30 * 60 * 1000;

/** Query param used to preview a specific experience archetype. Dev/preview only. */
export const EXPERIENCE_OVERRIDE_PARAM = "experience";
