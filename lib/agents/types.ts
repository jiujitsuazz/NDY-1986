/**
 * Result envelope for agent-facing service functions. Functions backed by
 * real data (product catalogue, shipping tables, returns policy) resolve
 * with `status: "ok"`. Functions that would require a system we have not
 * yet integrated (persisted server-side carts, real payment, order
 * tracking) resolve with `status: "not_integrated"` and a clear message —
 * they never fabricate a success.
 */
export type AgentResult<T> =
  | { status: "ok"; data: T }
  | { status: "not_integrated"; message: string };

export function ok<T>(data: T): AgentResult<T> {
  return { status: "ok", data };
}

export function notIntegrated<T>(message: string): AgentResult<T> {
  return { status: "not_integrated", message };
}
