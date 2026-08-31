import Link from "next/link";

/**
 * Honest placeholder for order status/tracking. No order management system
 * is connected yet (see lib/agents/orderService.ts) — this card says so
 * plainly rather than fabricating an order.
 */
export function OrderStatusCard() {
  return (
    <div className="border border-ndy-graphite p-8">
      <p className="text-xs tracking-widest2 text-ndy-ash">YOUR ORDERS</p>
      <p className="mt-4 max-w-md text-ndy-fog">
        Order tracking isn&apos;t connected yet — it will appear here once our fulfilment system is live. In
        the meantime, any questions about an existing order go straight to a human.
      </p>
      <a
        href="mailto:hello@ndy1986.com"
        className="mt-6 inline-block border-b border-ndy-graphite pb-1 text-sm tracking-label text-ndy-bone transition hover:border-ndy-bone"
      >
        CONTACT US
      </a>
      <span className="mx-3 text-ndy-graphite">/</span>
      <Link
        href="/the-core"
        className="inline-block border-b border-ndy-graphite pb-1 text-sm tracking-label text-ndy-bone transition hover:border-ndy-bone"
      >
        BACK TO THE CORE
      </Link>
    </div>
  );
}
