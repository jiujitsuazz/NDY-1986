import { commerce } from "@/lib/commerce";
import { coreSizeGuide, sizeGuideNote } from "@/data/sizeGuide";
import type { Product, ReturnsInfo, Size } from "@/types/product";
import { type AgentResult, ok, notIntegrated } from "./types";

/**
 * Product-facing agent service layer.
 *
 * These functions are the same ones the human-facing pages call under the
 * hood (via lib/commerce) — a shopping agent gets the same canonical data a
 * browser gets, never a stripped-down or stale copy. This file, plus
 * orderService.ts and cartService.ts, is what /agents documents and what
 * /api/products exposes over HTTP.
 */

export interface SizingInformation {
  fit: string;
  note: string;
  measurements: typeof coreSizeGuide;
}

export interface DeliveryEstimateInput {
  region: string;
  method: "standard" | "express";
}

export interface DeliveryEstimate {
  region: string;
  method: "standard" | "express";
  label: string;
  estimatedDays: string;
  cost: number;
  currency: string;
}

export async function searchProducts(query?: string): Promise<Product[]> {
  const all = await commerce.getProducts();
  if (!query) return all;
  const needle = query.toLowerCase();
  return all.filter((product) =>
    [product.name, product.category, product.colour, ...product.useCases, ...product.attributes]
      .join(" ")
      .toLowerCase()
      .includes(needle),
  );
}

export async function getProductDetails(idOrSlug: string): Promise<Product | null> {
  const byId = await commerce.getProduct(idOrSlug);
  if (byId) return byId;
  const all = await commerce.getProducts();
  return all.find((product) => product.slug === idOrSlug) ?? null;
}

export async function checkStock(productId: string, size?: Size) {
  return commerce.getInventory(productId, size);
}

export async function getSizingInformation(productId: string): Promise<AgentResult<SizingInformation>> {
  const product = await commerce.getProduct(productId);
  if (!product) return notIntegrated("Unknown product.");
  return ok({ fit: product.fit, note: sizeGuideNote, measurements: coreSizeGuide });
}

export async function calculateDelivery(
  productId: string,
  input: DeliveryEstimateInput,
): Promise<AgentResult<DeliveryEstimate>> {
  const product = await commerce.getProduct(productId);
  if (!product) return notIntegrated("Unknown product.");
  if (!product.shipping.regions.includes(input.region)) {
    return notIntegrated(
      `Delivery to "${input.region}" is not yet configured. Supported regions: ${product.shipping.regions.join(", ")}.`,
    );
  }
  const option = product.shipping[input.method];
  return ok({
    region: input.region,
    method: input.method,
    label: option.label,
    estimatedDays: option.estimatedDays,
    cost: option.cost,
    currency: product.shipping.currency,
  });
}

export async function getReturnsPolicy(productId: string): Promise<AgentResult<ReturnsInfo>> {
  const product = await commerce.getProduct(productId);
  if (!product) return notIntegrated("Unknown product.");
  return ok(product.returns);
}
