import { commerce } from "@/lib/commerce";
import type { CheckoutLineInput } from "@/lib/commerce/types";
import { type AgentResult, notIntegrated, ok } from "./types";

/**
 * Cart/checkout actions for future agent (and server-side) use.
 *
 * V1's real cart lives client-side (localStorage, see components/commerce/CartProvider).
 * These functions define the shape a server-persisted cart and a real
 * payment integration will need — createCart/addToCart resolve `not_integrated`
 * honestly rather than simulating a server cart that doesn't exist.
 * createCheckout does call through to the commerce provider, which itself
 * currently returns `not_integrated` until a payment provider is connected.
 */

export interface AgentCart {
  id: string;
  lines: CheckoutLineInput[];
}

export async function createCart(): Promise<AgentResult<AgentCart>> {
  return notIntegrated(
    "Server-persisted carts are not yet implemented. Use the client-side cart, or check back once a commerce backend is connected.",
  );
}

export async function addToCart(
  _cartId: string,
  _line: CheckoutLineInput,
): Promise<AgentResult<AgentCart>> {
  return notIntegrated("Server-persisted carts are not yet implemented.");
}

export async function checkout(lines: CheckoutLineInput[]) {
  const result = await commerce.createCheckout({ lines });
  if (result.status === "not_integrated") {
    return notIntegrated(result.message);
  }
  return ok(result);
}
