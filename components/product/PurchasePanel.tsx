"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, Size } from "@/types/product";
import { useCart } from "@/components/commerce/CartProvider";
import { StockBadge } from "./StockBadge";
import { setPurchaseIntent } from "@/lib/personalisation/client";

export function PurchasePanel({ product }: { product: Product }) {
  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addLine } = useCart();
  const router = useRouter();

  const primaryImage = product.images.find((image) => image.role === "primary") ?? product.images[0]!;
  const selectedSizeEntry = product.sizes.find((entry) => entry.size === size);

  function handleAddToBasket() {
    if (!size || !selectedSizeEntry || selectedSizeEntry.status === "out_of_stock") {
      setError("Select a size to continue.");
      return;
    }
    setError(null);
    addLine({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      size,
      quantity,
      unitPrice: product.offer.price,
      currency: product.offer.currency,
      image: primaryImage.src,
    });
    setPurchaseIntent("ready");
    setAdded(true);
  }

  return (
    <div>
      <fieldset>
        <legend className="text-xs tracking-widest2 text-ndy-ash">SIZE</legend>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {product.sizes.map((entry) => {
            const disabled = entry.status === "out_of_stock";
            const isSelected = size === entry.size;
            return (
              <button
                key={entry.size}
                type="button"
                disabled={disabled}
                aria-pressed={isSelected}
                onClick={() => {
                  setSize(entry.size);
                  setError(null);
                  setAdded(false);
                }}
                className={`flex flex-col items-center gap-1 border px-2 py-3 text-sm transition ${
                  isSelected ? "border-ndy-bone text-ndy-bone" : "border-ndy-graphite text-ndy-mist"
                } ${disabled ? "cursor-not-allowed opacity-40" : "hover:border-ndy-bone"}`}
              >
                {entry.size}
              </button>
            );
          })}
        </div>
        {selectedSizeEntry && selectedSizeEntry.status === "low_stock" && (
          <p className="mt-2">
            <StockBadge status="low_stock" /> — only a few left
          </p>
        )}
      </fieldset>

      <div className="mt-6 flex items-center gap-4">
        <label htmlFor="quantity" className="text-xs tracking-widest2 text-ndy-ash">
          QTY
        </label>
        <div className="flex items-center border border-ndy-graphite">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="px-3 py-2 text-ndy-mist hover:text-ndy-bone"
          >
            −
          </button>
          <span id="quantity" className="w-8 text-center text-ndy-bone" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            aria-label="Increase quantity"
            className="px-3 py-2 text-ndy-mist hover:text-ndy-bone"
          >
            +
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-ndy-fog">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToBasket}
          className="flex-1 border border-ndy-bone bg-ndy-bone px-8 py-4 text-sm font-medium tracking-label text-ndy-black transition hover:bg-transparent hover:text-ndy-bone"
        >
          ADD TO BASKET
        </button>
        {added && (
          <button
            type="button"
            onClick={() => router.push("/cart")}
            className="flex-1 border border-ndy-graphite px-8 py-4 text-sm font-medium tracking-label text-ndy-bone transition hover:border-ndy-bone"
          >
            VIEW BASKET
          </button>
        )}
      </div>
      {added && (
        <p className="mt-3 text-sm text-ndy-mist" role="status">
          Added to basket.
        </p>
      )}
    </div>
  );
}
