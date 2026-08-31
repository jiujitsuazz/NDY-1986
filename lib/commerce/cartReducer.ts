import type { Cart, CartLine } from "@/types/cart";
import { EMPTY_CART } from "@/types/cart";

export type CartAction =
  | { type: "ADD_LINE"; line: CartLine }
  | { type: "REMOVE_LINE"; sku: string; size: CartLine["size"] }
  | { type: "SET_QUANTITY"; sku: string; size: CartLine["size"]; quantity: number }
  | { type: "CLEAR" }
  | { type: "REPLACE"; cart: Cart };

const CART_STORAGE_KEY = "ndy_cart";

function sameLine(a: Pick<CartLine, "sku" | "size">, b: Pick<CartLine, "sku" | "size">) {
  return a.sku === b.sku && a.size === b.size;
}

/**
 * Pure cart reducer — no localStorage, no React. Kept separate from the
 * provider component so it can be unit tested directly and so a future
 * server-backed cart can reuse the same transition logic.
 */
export function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "ADD_LINE": {
      const existing = state.lines.find((line) => sameLine(line, action.line));
      const lines = existing
        ? state.lines.map((line) =>
            sameLine(line, action.line) ? { ...line, quantity: line.quantity + action.line.quantity } : line,
          )
        : [...state.lines, action.line];
      return { lines, updatedAt: new Date().toISOString() };
    }
    case "REMOVE_LINE": {
      return {
        lines: state.lines.filter((line) => !sameLine(line, action)),
        updatedAt: new Date().toISOString(),
      };
    }
    case "SET_QUANTITY": {
      if (action.quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_LINE", sku: action.sku, size: action.size });
      }
      return {
        lines: state.lines.map((line) =>
          sameLine(line, action) ? { ...line, quantity: action.quantity } : line,
        ),
        updatedAt: new Date().toISOString(),
      };
    }
    case "CLEAR":
      return { ...EMPTY_CART, updatedAt: new Date().toISOString() };
    case "REPLACE":
      return action.cart;
    default:
      return state;
  }
}

export function cartSubtotal(cart: Cart): number {
  return cart.lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
}

export function cartItemCount(cart: Cart): number {
  return cart.lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function loadCartFromStorage(): Cart {
  if (typeof window === "undefined") return EMPTY_CART;
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return EMPTY_CART;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.lines)) return EMPTY_CART;
    return parsed as Cart;
  } catch {
    return EMPTY_CART;
  }
}

export function saveCartToStorage(cart: Cart) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export { CART_STORAGE_KEY };
