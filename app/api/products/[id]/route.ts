import { NextResponse } from "next/server";
import { getProductDetails } from "@/lib/agents";

/**
 * Single product, matched by id or slug (e.g. "core-hoodie-black" or
 * "the-core"). Returns 404 with a clear error body for an unknown product
 * rather than an empty 200 — important for an agent parsing this
 * programmatically.
 */
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const product = await getProductDetails(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ product: { ...product, url: "/the-core" } });
}
