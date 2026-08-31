import { NextResponse } from "next/server";
import { checkout } from "@/lib/agents";
import type { CheckoutLineInput } from "@/lib/commerce/types";

/**
 * Placeholder checkout endpoint. Delegates to the commerce abstraction
 * (lib/commerce), which currently has no payment provider connected and
 * says so explicitly. This route exists so the request/response contract
 * for a future real integration is already in place.
 */
export async function POST(request: Request) {
  let body: { lines?: CheckoutLineInput[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json({ error: "At least one cart line is required." }, { status: 400 });
  }

  const result = await checkout(body.lines);

  if (result.status === "not_integrated") {
    return NextResponse.json({ status: "not_integrated", message: result.message }, { status: 200 });
  }

  return NextResponse.json({ status: "ok", data: result.data });
}
