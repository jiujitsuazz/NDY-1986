import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { brand } from "@/data/brand";
import { ResetPersonalisationButton } from "./ResetPersonalisationButton";

export function Footer() {
  return (
    <footer className="border-t border-ndy-charcoal">
      <div className="container-ndy grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-ndy-ash">{brand.tagline}</p>
        </div>

        <nav aria-label="Shop">
          <h2 className="mb-4 text-xs tracking-label text-ndy-ash">SHOP</h2>
          <ul className="flex flex-col gap-2 text-sm text-ndy-mist">
            <li><Link href="/the-core" className="hover:text-ndy-bone">The Core</Link></li>
            <li><Link href="/cart" className="hover:text-ndy-bone">Basket</Link></li>
          </ul>
        </nav>

        <nav aria-label="Brand">
          <h2 className="mb-4 text-xs tracking-label text-ndy-ash">BRAND</h2>
          <ul className="flex flex-col gap-2 text-sm text-ndy-mist">
            <li><Link href="/our-story" className="hover:text-ndy-bone">Our Story</Link></li>
            <li><Link href="/mission" className="hover:text-ndy-bone">Mission</Link></li>
            <li><Link href="/agents" className="hover:text-ndy-bone">For Developers &amp; Agents</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-xs tracking-label text-ndy-ash">CONTACT</h2>
          <a href={`mailto:${brand.contactEmail}`} className="text-sm text-ndy-mist hover:text-ndy-bone">
            {brand.contactEmail}
          </a>
        </div>
      </div>

      <div className="container-ndy flex flex-col gap-4 border-t border-ndy-charcoal py-6 text-xs text-ndy-ash sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} NDY 1986. NOT DEAD YET.</p>
        <ResetPersonalisationButton />
      </div>
    </footer>
  );
}
