import type { Product, Size, StockStatus } from "@/types/product";

export interface InventoryStatus {
  size: Size;
  status: StockStatus;
  quantity?: number;
}

export interface CheckoutLineInput {
  productId: string;
  size: Size;
  quantity: number;
}

export interface CheckoutInput {
  lines: CheckoutLineInput[];
}

export type CheckoutResult =
  | { status: "not_integrated"; message: string }
  | { status: "created"; checkoutUrl: string; id: string };

/**
 * Vendor-agnostic commerce abstraction. The frontend and agent service
 * layer talk to this interface only — never to a specific vendor SDK
 * directly. V1 ships a mock provider backed by data/product.ts; a future
 * ShopifyCommerceProvider or StripeCommerceProvider can implement the same
 * interface and be swapped in via lib/commerce/index.ts without touching
 * any calling code.
 */
export interface CommerceProvider {
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | null>;
  getInventory(productId: string, size?: Size): Promise<InventoryStatus[]>;
  createCheckout(input: CheckoutInput): Promise<CheckoutResult>;
}
