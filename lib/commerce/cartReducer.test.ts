import { beforeEach, describe, expect, it } from "vitest";
import {
  cartItemCount,
  cartReducer,
  CART_STORAGE_KEY,
  cartSubtotal,
  loadCartFromStorage,
  saveCartToStorage,
} from "./cartReducer";
import { EMPTY_CART } from "@/types/cart";
import type { CartLine } from "@/types/cart";

const line: CartLine = {
  productId: "core-hoodie-black",
  sku: "NDY-CORE-BLK",
  name: "The Core",
  size: "M",
  quantity: 1,
  unitPrice: 95,
  currency: "GBP",
  image: "/images/core-front.jpg",
};

function installFakeLocalStorage() {
  const store = new Map<string, string>();
  const fakeLocalStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
    removeItem: (key: string) => void store.delete(key),
  };
  // @ts-expect-error -- minimal stub, not a full Window
  globalThis.window = { localStorage: fakeLocalStorage };
}

describe("storage persistence", () => {
  beforeEach(() => {
    installFakeLocalStorage();
  });

  it("round-trips a cart through save and load", () => {
    const cart = { lines: [{ ...line }], updatedAt: "2026-01-01T00:00:00.000Z" };
    saveCartToStorage(cart);
    expect(loadCartFromStorage()).toEqual(cart);
  });

  it("loading never writes to storage — only explicit saves do", () => {
    // Regression test: the cart provider used to run a reactive "save on
    // cart change" effect that also fired for the initial load-from-storage
    // dispatch, clobbering a real cart with EMPTY_CART on the very next
    // tick. Persistence must only ever be a side effect of an explicit
    // save call, never of a read.
    const stored = { lines: [{ ...line }], updatedAt: "2026-01-01T00:00:00.000Z" };
    saveCartToStorage(stored);
    loadCartFromStorage();
    loadCartFromStorage();
    expect(loadCartFromStorage()).toEqual(stored);
  });

  it("returns an empty cart and does not throw when storage is empty or malformed", () => {
    expect(loadCartFromStorage()).toEqual(EMPTY_CART);
    window.localStorage.setItem(CART_STORAGE_KEY, "{not json");
    expect(loadCartFromStorage()).toEqual(EMPTY_CART);
  });
});

describe("cartReducer", () => {
  it("adds a new line", () => {
    const next = cartReducer(EMPTY_CART, { type: "ADD_LINE", line });
    expect(next.lines).toHaveLength(1);
    expect(next.lines[0]).toMatchObject({ size: "M", quantity: 1 });
  });

  it("merges quantities when the same sku/size is added again", () => {
    const once = cartReducer(EMPTY_CART, { type: "ADD_LINE", line });
    const twice = cartReducer(once, { type: "ADD_LINE", line });
    expect(twice.lines).toHaveLength(1);
    expect(twice.lines[0]!.quantity).toBe(2);
  });

  it("keeps separate lines for different sizes of the same product", () => {
    const withM = cartReducer(EMPTY_CART, { type: "ADD_LINE", line });
    const withBoth = cartReducer(withM, { type: "ADD_LINE", line: { ...line, size: "L" } });
    expect(withBoth.lines).toHaveLength(2);
  });

  it("removes a line", () => {
    const withLine = cartReducer(EMPTY_CART, { type: "ADD_LINE", line });
    const removed = cartReducer(withLine, { type: "REMOVE_LINE", sku: line.sku, size: line.size });
    expect(removed.lines).toHaveLength(0);
  });

  it("treats setting quantity to zero as a removal", () => {
    const withLine = cartReducer(EMPTY_CART, { type: "ADD_LINE", line });
    const updated = cartReducer(withLine, {
      type: "SET_QUANTITY",
      sku: line.sku,
      size: line.size,
      quantity: 0,
    });
    expect(updated.lines).toHaveLength(0);
  });

  it("clears the cart", () => {
    const withLine = cartReducer(EMPTY_CART, { type: "ADD_LINE", line });
    expect(cartReducer(withLine, { type: "CLEAR" }).lines).toHaveLength(0);
  });

  it("computes subtotal and item count across multiple lines", () => {
    const withM = cartReducer(EMPTY_CART, { type: "ADD_LINE", line: { ...line, quantity: 2 } });
    const withBoth = cartReducer(withM, {
      type: "ADD_LINE",
      line: { ...line, size: "L", quantity: 1 },
    });
    expect(cartSubtotal(withBoth)).toBe(95 * 3);
    expect(cartItemCount(withBoth)).toBe(3);
  });
});
