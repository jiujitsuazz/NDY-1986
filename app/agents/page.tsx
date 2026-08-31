import type { Metadata } from "next";
import { brand } from "@/data/brand";

export const metadata: Metadata = {
  title: "For Developers & Agents",
  description: "Structured commerce capabilities of NDY 1986, for integrators and AI shopping agents.",
  alternates: { canonical: "/agents" },
};

const endpoints = [
  { method: "GET", path: "/api/products", description: "Full product catalogue." },
  { method: "GET", path: "/api/products?q=hoodie", description: "Filtered catalogue search." },
  { method: "GET", path: "/api/products/{id}", description: "Single product by id or slug (e.g. the-core)." },
  { method: "POST", path: "/api/checkout", description: "Placeholder checkout — see status note below." },
  { method: "GET", path: "/.well-known/ndy-commerce.json", description: "Machine-readable discovery document." },
];

const futureActions = [
  { name: "createCart / addToCart", status: "Not yet integrated — no server-persisted cart exists." },
  { name: "checkout", status: "Placeholder — delegates to the commerce abstraction, which reports honestly that no payment provider is connected." },
  { name: "trackOrder", status: "Not yet integrated — no order/fulfilment system exists." },
  { name: "startReturn", status: "Not yet integrated — contact hello@ndy1986.com in the meantime." },
];

export default function AgentsPage() {
  return (
    <article className="container-ndy max-w-3xl py-16 sm:py-24">
      <p className="text-xs tracking-widest2 text-ndy-mist">FOR DEVELOPERS &amp; AGENTS</p>
      <h1 className="mt-4 text-4xl text-ndy-bone sm:text-5xl">Structured commerce, by design.</h1>
      <p className="mt-6 max-w-xl text-ndy-fog">
        {brand.name} is built on one canonical product data model. Every surface — the website, the JSON-LD
        embedded in each page, and the endpoints below — reads from that same source. Nothing here is a
        stripped-down or delayed copy of what a human sees in a browser.
      </p>

      <h2 className="mt-12 text-2xl text-ndy-bone">Endpoints</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-ndy-graphite text-ndy-ash">
              <th className="py-2 pr-4 font-normal">Method</th>
              <th className="py-2 pr-4 font-normal">Path</th>
              <th className="py-2 font-normal">Description</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((endpoint) => (
              <tr key={endpoint.path + endpoint.method} className="border-b border-ndy-charcoal text-ndy-fog">
                <td className="py-3 pr-4 font-mono text-ndy-mist">{endpoint.method}</td>
                <td className="py-3 pr-4 font-mono text-ndy-bone">{endpoint.path}</td>
                <td className="py-3">{endpoint.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-2xl text-ndy-bone">Structured data</h2>
      <p className="mt-4 max-w-xl text-ndy-fog">
        Every page carries Schema.org JSON-LD: <code className="text-ndy-bone">Organization</code> and{" "}
        <code className="text-ndy-bone">Brand</code> site-wide, plus <code className="text-ndy-bone">Product</code>,{" "}
        <code className="text-ndy-bone">Offer</code>, and <code className="text-ndy-bone">BreadcrumbList</code> on
        the product page. Product facts — name, material, fit, colour, price, availability — are rendered as
        server-side HTML as well as JSON-LD, so they don&apos;t depend on client-side JavaScript to be readable.
      </p>

      <h2 className="mt-12 text-2xl text-ndy-bone">Actions not yet connected</h2>
      <p className="mt-4 max-w-xl text-ndy-fog">
        Read operations (search, product detail, stock, sizing, delivery estimate, returns policy) are fully
        available today. Write operations that depend on systems we haven&apos;t connected yet are described
        honestly rather than faked:
      </p>
      <ul className="mt-4 space-y-3">
        {futureActions.map((action) => (
          <li key={action.name} className="border-l-2 border-ndy-graphite pl-4">
            <p className="font-mono text-sm text-ndy-bone">{action.name}</p>
            <p className="text-sm text-ndy-ash">{action.status}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-2xl text-ndy-bone">A note on this document</h2>
      <p className="mt-4 max-w-xl text-ndy-fog">
        The discovery file at <code className="text-ndy-bone">/.well-known/ndy-commerce.json</code> is an
        NDY-defined convention, not an official or standardised protocol. It is intended to make integration
        easier today and can be superseded by a real agent-commerce standard later without changing the
        underlying API.
      </p>
    </article>
  );
}
