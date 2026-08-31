"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { Cart, CartLine } from "@/types/cart";
import { EMPTY_CART } from "@/types/cart";
import {
  cartItemCount,
  cartReducer,
  cartSubtotal,
  loadCartFromStorage,
  saveCartToStorage,
} from "@/lib/commerce/cartReducer";
import type { CartAction } from "@/lib/commerce/cartReducer";

interface CartContextValue {
  cart: Cart;
  itemCount: number;
  subtotal: number;
  addLine: (line: CartLine) => void;
  removeLine: (sku: string, size: CartLine["size"]) => void;
  setQuantity: (sku: string, size: CartLine["size"], quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, EMPTY_CART);

  // Loads any previously-saved cart once, on mount. This only ever
  // dispatches — it never writes to storage — so it can't race with the
  // explicit saves below (see dispatchAndPersist).
  useEffect(() => {
    dispatch({ type: "REPLACE", cart: loadCartFromStorage() });
  }, []);

  const value = useMemo<CartContextValue>(() => {
    // Every user-initiated mutation computes its own next state and
    // persists it immediately, rather than reacting to `cart` changes after
    // the fact — that would also fire for the initial load-from-storage
    // dispatch above and risk clobbering storage with a stale, pre-load
    // value.
    function dispatchAndPersist(action: CartAction) {
      const next = cartReducer(cart, action);
      dispatch(action);
      saveCartToStorage(next);
    }

    return {
      cart,
      itemCount: cartItemCount(cart),
      subtotal: cartSubtotal(cart),
      addLine: (line) => dispatchAndPersist({ type: "ADD_LINE", line }),
      removeLine: (sku, size) => dispatchAndPersist({ type: "REMOVE_LINE", sku, size }),
      setQuantity: (sku, size, quantity) => dispatchAndPersist({ type: "SET_QUANTITY", sku, size, quantity }),
      clear: () => dispatchAndPersist({ type: "CLEAR" }),
    };
  }, [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
