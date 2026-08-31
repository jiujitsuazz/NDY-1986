import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/agents";

/**
 * Machine-readable product catalogue. Same canonical data (data/product.ts)
 * that renders the human-facing pages — no separate, stale copy for
 * machines. Intended for future product growth: this always returns the
 * full catalogue, one item today, many later, with no shape change needed.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? undefined;
  const products = await searchProducts(query);

  return NextResponse.json({
    count: products.length,
    products: products.map((product) => ({ ...product, url: "/the-core" })),
  });
}
