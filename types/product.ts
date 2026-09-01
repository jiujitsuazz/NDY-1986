/**
 * Canonical product data model for NDY 1986.
 *
 * This is the single source of truth for product information. It is consumed
 * by: page components (human UI), the JSON-LD structured data builder, the
 * public /api/products endpoints (machine-readable), and the agent-facing
 * service layer in lib/agents. Nothing outside data/product.ts should
 * hardcode product facts — everything reads from this shape.
 */

export type Size = "S" | "M" | "L" | "XL" | "XXL";

export type FitType = "athletic" | "regular" | "relaxed" | "oversized";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "preorder";

export interface FabricComposition {
  cotton: number;
  [material: string]: number;
}

export interface BrandingDetail {
  style: "minimal" | "bold" | "none";
  position: "left chest" | "centre chest" | "back" | "sleeve";
  text: string;
}

export interface SizeInventory {
  size: Size;
  status: StockStatus;
  /** Approximate units remaining; omitted when not meaningful (e.g. preorder). */
  quantity?: number;
}

export interface ProductImage {
  id: string;
  /** Local path under /public, or a future CDN URL. */
  src: string;
  alt: string;
  /** Used to distinguish gallery role for layout/agent purposes. */
  role: "primary" | "detail" | "fit" | "fabric";
  /** CSS object-position, for photography whose focal point isn't centred. Defaults to "center". */
  objectPosition?: string;
}

export interface ShippingInfo {
  regions: string[];
  standard: { label: string; estimatedDays: string; cost: number };
  express: { label: string; estimatedDays: string; cost: number };
  currency: string;
}

export interface ReturnsInfo {
  windowDays: number;
  condition: string;
  cost: string;
  process: string;
}

export interface Offer {
  price: number;
  currency: string;
  availability: "InStock" | "LimitedAvailability" | "OutOfStock" | "PreOrder";
  priceValidUntil?: string;
  condition: "NewCondition";
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  brand: string;
  brandMeaning: string;
  name: string;
  category: string;
  colour: string;
  fabricComposition: FabricComposition;
  gsm: number;
  fit: FitType;
  branding: BrandingDetail;
  useCases: string[];
  attributes: string[];
  description: string;
  shortDescription: string;
  sku: string;
  sizes: SizeInventory[];
  images: ProductImage[];
  offer: Offer;
  shipping: ShippingInfo;
  returns: ReturnsInfo;
  /** Future-proofing: allows grouping into ranges without a rewrite. Not surfaced prominently at launch. */
  collection: string;
  careInstructions: string[];
}
