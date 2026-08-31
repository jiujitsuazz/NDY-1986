import type { Size } from "./product";

export interface CartLine {
  productId: string;
  sku: string;
  name: string;
  size: Size;
  quantity: number;
  unitPrice: number;
  currency: string;
  image: string;
}

export interface Cart {
  lines: CartLine[];
  updatedAt: string;
}

export const EMPTY_CART: Cart = {
  lines: [],
  updatedAt: new Date(0).toISOString(),
};
