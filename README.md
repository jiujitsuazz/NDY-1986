# NDY 1986 — NOT DEAD YET

A premium, minimal, adaptive commerce platform for a single product: **The Core**. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

This isn't a generic clothing storefront. It's a small, deliberately-scoped e-commerce platform where the homepage adapts to visitor intent through a rules-based experience resolver, product data flows from one canonical source to humans and machines alike, and the commerce layer is abstracted so a real payment/inventory provider can be dropped in without a rewrite.

---

## 1. Project architecture

```
app/                        Routes (App Router)
  page.tsx                  Homepage — resolves and renders one of 4 experiences
  the-core/page.tsx          Product page (PDP)
  our-story/, mission/       Brand content pages
  cart/, checkout/           Cart and honest checkout placeholder
  agents/page.tsx            Human-readable docs for developers & AI agents
  api/products/               Machine-readable product endpoints
  api/checkout/, api/newsletter/  Placeholder write endpoints
  robots.ts, sitemap.ts      SEO
components/
  brand/                     Logo, cinematic background placeholder
  layout/                    Header, Footer, cart indicator
  commerce/                  CartProvider (React context + localStorage)
  product/                   Gallery, size selector, size guide, purchase panel
  sections/                  Shared homepage sections (Hero, Statement, CoreShowcase, …)
  experience/                The 4 experience archetypes + dev preview switcher
data/                        Canonical content: product.ts, brand.ts, sizeGuide.ts
types/                       Product, Cart, VisitorContext/Experience types
lib/
  personalisation/           Visitor context, intent signals, resolveExperience
  commerce/                  CommerceProvider abstraction, mock provider, cart logic
  agents/                    Agent-facing service functions (search, stock, delivery…)
  structuredData.ts          JSON-LD builders
public/
  images/                    Replaceable placeholder product imagery (SVG)
  .well-known/ndy-commerce.json  Agent discovery document
proxy.ts                     Next.js Proxy (formerly "middleware") — owns visit tracking
```

**Design principle throughout:** UI components never hardcode product facts, brand copy, or personalisation logic. They read from `data/`, `lib/personalisation/`, and `lib/commerce/`. This is what lets the site scale from 1 product to 100 without a rewrite, and what keeps the human-facing site and the machine-facing API answering from the same source of truth.

---

## 2. Install

```bash
npm install
```

Requires Node 20+.

## 3. Run in development

```bash
npm run dev
```

Visit `http://localhost:3000`. In development, the experience-preview override and the on-screen preview panel are enabled automatically.

---

## 4. How visitor experiences work

The homepage doesn't show every visitor the same thing. Four **controlled experience archetypes** exist — never an arbitrary or AI-generated layout:

| Experience | Who sees it | Shape |
|---|---|---|
| `brand-discovery` | First-time visitors | Full cinematic brand film → story → product → trust → purchase |
| `returning` | Seen the brand story before, not a customer | Commerce-led: product first, story still one scroll away |
| `high-intent` | Arrived via a campaign link, search/ads referrer, or explicit override | Product → evidence → trust → purchase. No brand film. |
| `customer` | Has purchased The Core | Relationship → community → retention. No "you may also like" — there's one product. |

The resolution pipeline:

1. **`getVisitorContext()`** (`lib/personalisation/server.ts`) reads the first-party `ndy_visitor` cookie — a small JSON object of behavioural state, never demographic or biometric data:
   ```json
   {
     "visitCount": 3,
     "brandStorySeen": true,
     "lastVisitedAt": "2026-01-01T12:00:00.000Z",
     "recentProducts": ["core-hoodie-black"],
     "customer": false,
     "purchaseIntent": "considering"
   }
   ```
2. **`deriveIntentSignals()`** looks at the current request's query params (`utm_source`, `gclid`, etc.) and referrer to detect campaign/search/ads intent.
3. **`resolveExperience(visitorContext, intentSignals)`** (`lib/personalisation/resolveExperience.ts`) is a small, pure, fully-tested function that returns one of the four experience names. It has no knowledge of React or the DOM — this is what makes it trivial to test and to eventually replace with a smarter, AI-driven resolver **without touching a single component**.
4. `app/page.tsx` (a Server Component) renders the matching experience component from `components/experience/`.

**`proxy.ts`** (Next.js's current file convention, formerly `middleware.ts`) owns writing `visitCount`/`lastVisitedAt` to the cookie on navigation, so the very first server response already reflects the right experience — no client-side flash of the wrong one.

**The NDY logo always links to `/`.** Personalisation improves the journey; it never traps a visitor inside one archetype with no way out.

## 5. How to simulate each visitor state

In development (or with `NEXT_PUBLIC_ENABLE_EXPERIENCE_PREVIEW=true` set **at build time** in production — it's a `NEXT_PUBLIC_` var, so it must be present when you run `next build`, not just `next start`):

- **On-screen panel:** a "PREVIEW ⚙" button appears bottom-right on the homepage. Open it to jump straight to any of the four experiences, or reset your stored visitor context.
- **Query param:** `?experience=brand-discovery`, `?experience=returning`, `?experience=high-intent`, or `?experience=customer` on `/`.
- **Reset:** "Reset my personalised experience" in the footer clears the cookie and returns you to `brand-discovery`.

The override always wins over stored behaviour — it's for previewing, not for real visitor targeting.

---

## 6. Where product data lives

**`data/product.ts`** is the single canonical record for The Core (and the place to add a second product later — see §8). It follows the `Product` type in `types/product.ts`, covering brand, materials, fit, branding, sizes/inventory, images, pricing, shipping, and returns.

Nothing else hardcodes product facts. The PDP, the homepage sections, the JSON-LD, and the `/api/products` endpoints all read from this file (via `lib/commerce`).

`data/sizeGuide.ts` holds garment measurements, shared by the PDP's size guide and the agent-facing sizing service.

`data/brand.ts` holds brand copy (tagline, story, mission). `data/content/homepage.ts` holds the per-experience hero copy.

---

## 7. How to replace imagery

Imagery is built as replaceable components/files so real campaign photography can drop in without touching layout code:

- **Hero**: `components/brand/HeroImage.tsx` — real photography (`public/images/core-front.jpg`), rendered with `next/image` and a gradient scrim for text contrast. Replace the file and adjust `object-[70%_center]` if the new photo's focal point differs.
- **Brand story / mission backgrounds**: still placeholder — `components/brand/CinematicPlaceholder.tsx` (pure CSS gradients + SVG grain, no image dependency) used in `app/our-story/page.tsx` and `components/sections/MissionSection.tsx`. Swap either usage for a `next/image` (or `<video>`) once photography exists for those sections.
- **Product imagery**: `public/images/core-*` referenced from `data/product.ts` → `images[]`. The primary front-view shot is a real photo (`core-front.jpg`); the detail/fit/fabric shots are still flat SVG placeholders pending more photography. Replace files and update `src` paths there; everything downstream (PDP gallery, JSON-LD `image` array, Open Graph image) updates automatically since it all reads from the same product record.

---

## 8. How to add another product

1. Add a new `Product` object to `data/product.ts` (or split into `data/products/` if the catalogue grows) and push it into the `products` array.
2. Nothing else needs to change structurally: `/api/products`, `/api/products/[id]`, `searchProducts()`, and the agent service layer all already iterate the full catalogue.
3. Give it its own route under `app/` (e.g. `app/the-core/page.tsx` → duplicate the pattern) once there's more than one PDP, and update `data/content/homepage.ts` / navigation if it should be surfaced.
4. The `collection` field on `Product` exists specifically so future ranges (`CORE`, `FOR YOU`, `PREMIUM`) can be introduced without a schema change — they're just not surfaced in navigation while there's one product.

---

## 9. How the commerce abstraction works

`lib/commerce/types.ts` defines a vendor-agnostic `CommerceProvider` interface:

```ts
interface CommerceProvider {
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | null>;
  getInventory(productId: string, size?: Size): Promise<InventoryStatus[]>;
  createCheckout(input: CheckoutInput): Promise<CheckoutResult>;
}
```

`lib/commerce/mockProvider.ts` implements it against local data — this is what powers the site today. `lib/commerce/index.ts` exports the **single active provider** (`commerce`); every caller (pages, API routes, agent services) depends on the interface, never on the mock directly.

**To connect Shopify or Stripe:** write a `ShopifyCommerceProvider` / a Stripe-backed `createCheckout`, implement the same interface, and swap the export in `lib/commerce/index.ts`. No other file changes.

The cart itself (`components/commerce/CartProvider.tsx`) is a separate concern — client-side React context backed by `localStorage`, built around a pure, unit-tested reducer (`lib/commerce/cartReducer.ts`). It persists size, quantity, and subtotal. A server-backed cart would implement the same reducer transitions against a real backend.

**Checkout is a clearly-marked placeholder.** `commerce.createCheckout()` always reports `not_integrated` with an honest message — the app never fabricates a successful payment. `/api/checkout` and the `/checkout` page both surface that message plainly rather than pretending an order was placed.

---

## 10. How AI-agent readiness works

The site is built on the principle that a human browser and a future AI shopping agent are just two interfaces into the same commerce/content layer — never two different sources of truth.

- **`lib/agents/`** exposes the action surface an agent needs: `searchProducts`, `getProductDetails`, `checkStock`, `getSizingInformation`, `calculateDelivery`, `getReturnsPolicy` are fully implemented against real data today. `createCart`, `addToCart`, `checkout`, `trackOrder`, `startReturn` are typed stubs that honestly report `not_integrated` where no backend exists yet — see `lib/agents/types.ts`'s `AgentResult<T>` envelope. Nothing is faked.
- **`/api/products`** and **`/api/products/[id]`** expose the full catalogue as JSON, built from the same `commerce` provider the website uses.
- **`/.well-known/ndy-commerce.json`** is a discovery document listing those endpoints and the status of each capability. It's explicitly labelled as an NDY-defined convention, not an official protocol — see its `_notice` field.
- **`/agents`** is the human-readable version of the same information, for developers integrating against NDY.

## 11. Structured-data implementation

`lib/structuredData.ts` builds Schema.org JSON-LD directly from `data/brand.ts` and `data/product.ts` — never hand-authored separately from the content it describes:

- `Organization` and `Brand` — emitted site-wide from `app/layout.tsx`.
- `Product`, `Offer`, and `BreadcrumbList` — emitted from `app/the-core/page.tsx`.

Key product facts (name, material, fit, colour, price, availability, spec list) are also rendered as plain server-side HTML on the PDP — not hidden behind client-side JavaScript — so both search crawlers and simple text-based agents can read them without executing anything.

---

## 12. Future Shopify/Stripe integration points

- **Payments/checkout:** implement `createCheckout` in a new `CommerceProvider` (e.g. wrapping Stripe Checkout Sessions or Shopify's Storefront API) and swap the export in `lib/commerce/index.ts`.
- **Inventory:** implement `getInventory` against the provider's real stock levels; `SizeInventory.status`/`quantity` in `types/product.ts` already models what the UI needs.
- **Cart:** a server-persisted cart can implement the same action shape as `lib/agents/cartService.ts`'s `createCart`/`addToCart` — currently honest stubs.
- **Orders:** `lib/agents/orderService.ts`'s `trackOrder`/`startReturn` are the integration points for a fulfilment system.

## 13. Privacy approach

- Personalisation is entirely first-party: one cookie (`ndy_visitor`), no fingerprinting, no third-party trackers.
- Only behavioural fields are stored — visit count, whether the brand story's been seen, recently viewed product IDs, customer status, and a coarse purchase-intent label. No demographic or biometric inference.
- **"Reset my personalised experience"** (site footer) clears the cookie immediately and returns the visitor to the default `brand-discovery` state.
- The cart (`ndy_cart` in `localStorage`) holds only size/quantity/price — no personal data.
- Consent/regional cookie-banner requirements aren't implemented in this V1 (the cookie is functional/preference-category, not tracking/advertising) — see "what still needs connecting" below.

## 14. Deployment

Standard Next.js deployment (Vercel, or any Node host):

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_ENABLE_EXPERIENCE_PREVIEW=true` **before** `npm run build` if you want the preview switcher available in that production build (it's off by default in production).

---

## Testing

```bash
npm run lint       # ESLint (eslint-config-next flat config)
npm run typecheck  # tsc --noEmit
npm test           # Vitest — resolveExperience, product data invariants, cart reducer, agent service output
npm run build      # production build + type check
```

Tests focus on the logic most likely to break silently: experience resolution rules, the cart reducer's storage-persistence guard (a real race condition was caught and fixed here — see `lib/commerce/cartReducer.test.ts`), product data invariants (sizes, pricing, alt text), and the agent service layer's honesty (functions with no backend report `not_integrated` rather than a fake success).

---

## What still needs connecting before production

- A real payment provider (Stripe/Shopify) behind `CommerceProvider.createCheckout`.
- A real fulfilment/order system behind `trackOrder`/`startReturn`.
- A real email/ESP integration behind `/api/newsletter` (currently an honest placeholder).
- Real campaign photography and product photography to replace the SVG placeholders in `public/images/`.
- A cookie-consent banner if operating in a jurisdiction that requires one, even for functional cookies.
- Rotate `data/brand.ts`'s placeholder social links and contact email for the real ones.

## Recommended next 5 development steps

1. Wire a real payment provider (Stripe is the more common fit for a single-SKU DTC brand) into `lib/commerce`.
2. Replace SVG placeholder imagery with real campaign and product photography.
3. Add a server-persisted cart/account layer so `customer: true` reflects a real purchase rather than the dev preview override.
4. Introduce a lightweight A/B or multi-armed-bandit layer behind `resolveExperience` once there's enough traffic to justify moving beyond fixed rules.
5. Add the second product/collection once The Core has proven the model — the data layer and API are already shaped for it.
