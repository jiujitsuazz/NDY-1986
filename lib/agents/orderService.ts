import { type AgentResult, notIntegrated } from "./types";

/**
 * Post-purchase actions. No order management system exists yet — these are
 * clean, typed stubs describing the future integration surface rather than
 * fabricated responses.
 */

export interface OrderStatus {
  orderId: string;
  status: "placed" | "processing" | "shipped" | "delivered" | "returned";
  trackingUrl?: string;
}

export async function trackOrder(_orderId: string): Promise<AgentResult<OrderStatus>> {
  return notIntegrated(
    "Order tracking is not yet connected to a fulfilment system. This endpoint is reserved for that future integration.",
  );
}

export async function startReturn(_orderId: string, _reason?: string): Promise<AgentResult<{ returnId: string }>> {
  return notIntegrated(
    "Self-serve returns are not yet automated. Contact hello@ndy1986.com to start a return in the meantime.",
  );
}
