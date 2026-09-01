import type { Product } from "@/types/product";

/**
 * THE CORE — the single canonical product record for NDY 1986 at launch.
 *
 * Every surface (product page, homepage sections, API routes, JSON-LD,
 * agent service layer) reads from this file rather than hardcoding facts.
 * When a second product is introduced, add it to `products` below — no
 * component or route should need structural changes.
 */
export const coreHoodie: Product = {
  id: "core-hoodie-black",
  slug: "the-core",
  brand: "NDY 1986",
  brandMeaning: "NOT DEAD YET",
  name: "The Core",
  category: "hoodie",
  colour: "black",
  fabricComposition: { cotton: 80, polyester: 20 },
  gsm: 350,
  fit: "athletic",
  branding: {
    style: "minimal",
    position: "left chest",
    text: "NDY 1986",
  },
  useCases: ["gym", "training", "casual wear", "layering"],
  attributes: [
    "minimal branding",
    "athletic silhouette",
    "heavyweight feel",
    "black",
    "brushed-back fleece interior",
  ],
  shortDescription:
    "A 350 GSM heavyweight hoodie in black, cut for an athletic fit, with minimal NDY 1986 branding on the left chest.",
  description:
    "The Core is built to be worn, not just owned. 350 GSM heavyweight cotton, cut close through the body and arms for an athletic fit that layers well without adding bulk. No noise. No oversized branding. Just NDY 1986, small, on the left chest. Made for training, for the walk there and back, and for every day in between.",
  sku: "NDY-CORE-BLK",
  sizes: [
    { size: "S", status: "in_stock", quantity: 42 },
    { size: "M", status: "in_stock", quantity: 58 },
    { size: "L", status: "in_stock", quantity: 51 },
    { size: "XL", status: "low_stock", quantity: 6 },
    { size: "XXL", status: "in_stock", quantity: 23 },
  ],
  images: [
    {
      id: "core-front",
      src: "/images/core-front.jpg",
      alt: "NDY 1986 The Core hoodie in black, front view studio shot, minimal left-chest branding and NDY hem tag",
      role: "primary",
    },
    {
      id: "core-detail-chest",
      src: "/images/core-detail-chest.jpg",
      alt: "Close-up of The Core hoodie's hood, drawstrings, and minimal NDY 1986 left-chest branding",
      role: "detail",
      objectPosition: "75% center",
    },
    {
      id: "core-fit",
      src: "/images/core-fit.svg",
      alt: "The Core hoodie worn, showing athletic silhouette and fit",
      role: "fit",
    },
    {
      id: "core-fabric",
      src: "/images/core-fabric.svg",
      alt: "Close detail of 350 GSM brushed cotton fabric on The Core hoodie",
      role: "fabric",
    },
  ],
  offer: {
    price: 95,
    currency: "GBP",
    availability: "InStock",
    condition: "NewCondition",
    sku: "NDY-CORE-BLK",
  },
  shipping: {
    regions: ["United Kingdom", "European Union", "United States", "Rest of World"],
    standard: { label: "Standard", estimatedDays: "3–5 working days", cost: 4.5 },
    express: { label: "Express", estimatedDays: "1–2 working days", cost: 9.95 },
    currency: "GBP",
  },
  returns: {
    windowDays: 30,
    condition: "Unworn, unwashed, with tags attached.",
    cost: "Free returns within the UK. International returns are paid by the customer.",
    process:
      "Start a return from your order confirmation email or contact us directly. Refunds are issued to the original payment method once the item is received.",
  },
  collection: "core",
  careInstructions: [
    "Machine wash cold, inside out",
    "Do not bleach",
    "Tumble dry low",
    "Do not iron directly on branding",
  ],
};

export const products: Product[] = [coreHoodie];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
