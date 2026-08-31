import type { Product } from "@/types/product";

export function ShippingReturnsInfo({ product }: { product: Product }) {
  return (
    <div>
      <details className="group border-t border-ndy-charcoal py-4">
        <summary className="cursor-pointer list-none text-sm tracking-label text-ndy-bone">
          <span className="inline-flex items-center gap-2">
            SHIPPING
            <span aria-hidden="true" className="transition group-open:rotate-45">
              +
            </span>
          </span>
        </summary>
        <div className="mt-4 space-y-2 text-sm text-ndy-fog">
          <p>Ships to: {product.shipping.regions.join(", ")}.</p>
          <p>
            {product.shipping.standard.label}: {product.shipping.standard.estimatedDays} — £
            {product.shipping.standard.cost.toFixed(2)}
          </p>
          <p>
            {product.shipping.express.label}: {product.shipping.express.estimatedDays} — £
            {product.shipping.express.cost.toFixed(2)}
          </p>
        </div>
      </details>
      <details className="group border-t border-ndy-charcoal py-4">
        <summary className="cursor-pointer list-none text-sm tracking-label text-ndy-bone">
          <span className="inline-flex items-center gap-2">
            RETURNS
            <span aria-hidden="true" className="transition group-open:rotate-45">
              +
            </span>
          </span>
        </summary>
        <div className="mt-4 space-y-2 text-sm text-ndy-fog">
          <p>{product.returns.windowDays}-day returns. {product.returns.condition}</p>
          <p>{product.returns.cost}</p>
          <p>{product.returns.process}</p>
        </div>
      </details>
    </div>
  );
}
