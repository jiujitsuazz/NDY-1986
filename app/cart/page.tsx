"use client";

import Link from "next/link";
import { useCart } from "@/components/commerce/CartProvider";

export default function CartPage() {
  const { cart, subtotal, removeLine, setQuantity } = useCart();

  if (cart.lines.length === 0) {
    return (
      <div className="container-ndy flex min-h-[50vh] flex-col items-start justify-center gap-6 py-20">
        <h1 className="text-4xl text-ndy-bone">YOUR BASKET IS EMPTY.</h1>
        <Link
          href="/the-core"
          className="inline-flex items-center justify-center border border-ndy-bone bg-ndy-bone px-8 py-4 text-sm font-medium tracking-label text-ndy-black transition hover:bg-transparent hover:text-ndy-bone"
        >
          SHOP THE CORE
        </Link>
      </div>
    );
  }

  return (
    <div className="container-ndy py-12 sm:py-16">
      <h1 className="text-4xl text-ndy-bone sm:text-5xl">BASKET</h1>

      <ul className="mt-10 flex flex-col divide-y divide-ndy-charcoal border-y border-ndy-charcoal">
        {cart.lines.map((line) => (
          <li key={`${line.sku}-${line.size}`} className="flex items-center gap-6 py-6">
            <div className="h-24 w-20 shrink-0 bg-ndy-charcoal" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={line.image} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-ndy-bone">{line.name}</p>
              <p className="mt-1 text-sm text-ndy-ash">Size {line.size}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center border border-ndy-graphite">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity(line.sku, line.size, line.quantity - 1)}
                    className="px-3 py-1 text-ndy-mist hover:text-ndy-bone"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-ndy-bone">{line.quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity(line.sku, line.size, line.quantity + 1)}
                    className="px-3 py-1 text-ndy-mist hover:text-ndy-bone"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeLine(line.sku, line.size)}
                  className="text-xs text-ndy-ash underline underline-offset-4 hover:text-ndy-mist"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="text-ndy-bone">
              £{(line.unitPrice * line.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-end gap-4">
        <p className="text-lg text-ndy-bone">Subtotal: £{subtotal.toFixed(2)}</p>
        <p className="text-xs text-ndy-ash">Shipping and taxes calculated at checkout.</p>
        <Link
          href="/checkout"
          className="inline-flex items-center justify-center border border-ndy-bone bg-ndy-bone px-10 py-4 text-sm font-medium tracking-label text-ndy-black transition hover:bg-transparent hover:text-ndy-bone"
        >
          CHECKOUT
        </Link>
      </div>
    </div>
  );
}
