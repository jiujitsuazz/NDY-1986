import { mockCommerceProvider } from "./mockProvider";
import type { CommerceProvider } from "./types";

/**
 * The active commerce provider for the whole application. Swap this single
 * export for a real integration (e.g. a ShopifyCommerceProvider) once one
 * exists — every caller depends on the CommerceProvider interface, not on
 * this file's contents.
 */
export const commerce: CommerceProvider = mockCommerceProvider;

export type { CommerceProvider, CheckoutInput, CheckoutResult, InventoryStatus } from "./types";
