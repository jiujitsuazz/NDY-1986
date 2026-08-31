"use client";

import Link from "next/link";
import { useCart } from "@/components/commerce/CartProvider";

export function CartIndicator() {
  const { itemCount } = useCart();
  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 text-sm tracking-label text-ndy-bone transition hover:text-ndy-mist"
      aria-label={`Basket, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
    >
      <span>BASKET</span>
      <span
        className="flex h-5 min-w-5 items-center justify-center rounded-full border border-ndy-graphite px-1 text-xs text-ndy-mist"
        aria-hidden="true"
      >
        {itemCount}
      </span>
    </Link>
  );
}
