import { brand } from "@/data/brand";
import type { Product } from "@/types/product";

/**
 * Builds Schema.org JSON-LD objects from the same canonical data used by
 * the rest of the site (data/brand.ts, data/product.ts). Never hand-author
 * structured data separately from the content it describes.
 */

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: brand.url,
    description: brand.description,
    sameAs: Object.values(brand.social),
    email: brand.contactEmail,
  };
}

export function buildBrandJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.name,
    slogan: brand.meaning,
    description: brand.description,
    url: brand.url,
  };
}

export function buildProductJsonLd(product: Product, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.brand} ${product.name}`,
    description: product.description,
    sku: product.sku,
    url,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    color: product.colour,
    material: `${product.fabricComposition.cotton}% cotton`,
    additionalProperty: [
      { "@type": "PropertyValue", name: "GSM", value: product.gsm },
      { "@type": "PropertyValue", name: "Fit", value: product.fit },
    ],
    image: product.images.map((image) => `${brand.url}${image.src}`),
    offers: {
      "@type": "Offer",
      priceCurrency: product.offer.currency,
      price: product.offer.price,
      availability: `https://schema.org/${product.offer.availability}`,
      itemCondition: `https://schema.org/${product.offer.condition}`,
      url,
    },
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
