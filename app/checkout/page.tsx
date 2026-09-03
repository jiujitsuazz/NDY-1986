"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/commerce/CartProvider";

/**
 * Honest checkout placeholder. No payment provider is connected yet — this
 * page says so plainly rather than simulating a successful order. See
 * lib/commerce/mockProvider.ts createCheckout and README "Future Shopify/
 * Stripe integration points" for what replaces this.
 */
export default function CheckoutPage() {
  const { cart } = useCart();
  const [message, setMessage] = useState<string | null>(null);
  const loading = message === null && cart.lines.length > 0;

  useEffect(() => {
    if (cart.lines.length === 0) return;
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lines: cart.lines.map((line) => ({
          productId: line.sku,
          size: line.size,
          quantity: line.quantity,
        })),
      }),
    })
      .then((res) => res.json())
      .then((body) => setMessage(body.message));
  }, [cart.lines]);

  if (cart.lines.length === 0) {
    return (
      <div className="container-ndy flex min-h-[50vh] flex-col items-start justify-center gap-6 py-20">
        <h1 className="text-3xl text-ndy-bone">Your basket is empty.</h1>
        <Link href="/the-core" className="text-sm tracking-label text-ndy-bone underline underline-offset-4">
          SHOP THE CORE
        </Link>
      </div>
    );
  }

  return (
    <div className="container-ndy max-w-xl py-16 sm:py-24">
      <h1 className="text-4xl text-ndy-bone">CHECKOUT</h1>
      <p className="mt-4 text-ndy-fog">Subtotal: £??</p>

      <div className="mt-8 border border-ndy-graphite p-6">
        <p className="text-xs tracking-widest2 text-ndy-ash">PAYMENT</p>
        <p className="mt-3 text-ndy-fog">
          {loading
            ? "Checking checkout availability…"
            : message ?? "Checkout is not yet connected to a payment provider."}
        </p>
        <p className="mt-3 text-sm text-ndy-ash">
          No payment has been, or can be, processed on this page. This is a placeholder for a future
          Stripe or Shopify Checkout integration — see lib/commerce for the abstraction it will plug
          into.
        </p>
      </div>

      <Link
        href="/cart"
        className="mt-6 inline-block text-sm tracking-label text-ndy-mist underline underline-offset-4 hover:text-ndy-bone"
      >
        BACK TO BASKET
      </Link>
    </div>
  );
}
