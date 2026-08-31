import { getProductById, products } from "@/data/product";
import type { Product, Size } from "@/types/product";
import type { CheckoutInput, CheckoutResult, CommerceProvider, InventoryStatus } from "./types";

/**
 * Local, in-memory commerce provider used during development and until a
 * real payment/inventory integration is connected. It is intentionally
 * isolated here — no page or component imports mock data directly, they go
 * through the CommerceProvider interface so this file can be deleted wholesale
 * once a production provider (Shopify, Stripe, etc.) is wired up in
 * lib/commerce/index.ts.
 */
export const mockCommerceProvider: CommerceProvider = {
  async getProducts(): Promise<Product[]> {
    return products;
  },

  async getProduct(id: string): Promise<Product | null> {
    return getProductById(id) ?? null;
  },

  async getInventory(productId: string, size?: Size): Promise<InventoryStatus[]> {
    const product = getProductById(productId);
    if (!product) return [];
    const sizes = size ? product.sizes.filter((entry) => entry.size === size) : product.sizes;
    return sizes.map((entry) => ({ size: entry.size, status: entry.status, quantity: entry.quantity }));
  },

  async createCheckout(_input: CheckoutInput): Promise<CheckoutResult> {
    return {
      status: "not_integrated",
      message:
        "Checkout is not yet connected to a payment provider. This is a clearly marked placeholder — no payment has been, or can be, processed.",
    };
  },
};
