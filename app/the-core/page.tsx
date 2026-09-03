import type { Metadata } from "next";
import Link from "next/link";
import { coreHoodie } from "@/data/product";
import { brand } from "@/data/brand";
import { buildBreadcrumbJsonLd, buildProductJsonLd } from "@/lib/structuredData";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { SizeGuide } from "@/components/product/SizeGuide";
import { ShippingReturnsInfo } from "@/components/product/ShippingReturnsInfo";
import { RecordProductView } from "@/components/product/RecordProductView";

const productUrl = `${brand.url}/the-core`;

export const metadata: Metadata = {
  title: `The Core — ${coreHoodie.gsm} GSM Athletic Hoodie`,
  description: coreHoodie.shortDescription,
  alternates: { canonical: "/the-core" },
  openGraph: {
    title: `The Core — ${brand.name}`,
    description: coreHoodie.shortDescription,
    url: productUrl,
    images: [coreHoodie.images[0]!.src],
  },
};

export default function TheCorePage() {
  const product = coreHoodie;
  const productJsonLd = buildProductJsonLd(product, productUrl);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: brand.url },
    { name: "The Core", url: productUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <RecordProductView productId={product.id} />

      <nav aria-label="Breadcrumb" className="container-ndy pt-6 text-xs text-ndy-ash">
        <ol className="flex gap-2">
          <li>
            <Link href="/" className="hover:text-ndy-mist">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ndy-mist">The Core</li>
        </ol>
      </nav>

      <article className="container-ndy grid gap-10 py-8 lg:grid-cols-2 lg:gap-16 lg:py-12">
        <ProductGallery images={product.images} />

        <div>
          <p className="text-xs tracking-widest2 text-ndy-mist">{product.brand} — {product.brandMeaning}</p>
          <h1 className="mt-3 text-5xl text-ndy-bone sm:text-6xl">{product.name.toUpperCase()}</h1>
          <p className="mt-4 text-2xl text-ndy-bone">£??</p>

          <p className="mt-6 max-w-md text-base text-ndy-fog">{product.description}</p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm tracking-label text-ndy-mist">
            <li>{product.gsm} GSM</li>
            <li>{product.fabricComposition.cotton}% COTTON</li>
            <li>{product.fit.toUpperCase()} FIT</li>
            <li>{product.colour.toUpperCase()}</li>
            <li>
              {product.branding.style.toUpperCase()} {product.branding.position.toUpperCase()} BRANDING
            </li>
          </ul>

          <div className="mt-8">
            <PurchasePanel product={product} />
          </div>

          <div className="mt-8">
            <SizeGuide />
            <ShippingReturnsInfo product={product} />
            <details className="group border-t border-b border-ndy-charcoal py-4">
              <summary className="cursor-pointer list-none text-sm tracking-label text-ndy-bone">
                <span className="inline-flex items-center gap-2">
                  CARE
                  <span aria-hidden="true" className="transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-ndy-fog">
                {product.careInstructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </article>
    </>
  );
}
