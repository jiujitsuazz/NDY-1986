"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { CartIndicator } from "./CartIndicator";

const NAV_LINKS = [
  { label: "THE CORE", href: "/the-core" },
  { label: "OUR STORY", href: "/our-story" },
  { label: "MISSION", href: "/mission" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-ndy-charcoal/80 bg-ndy-black/85 backdrop-blur">
      <div className="container-ndy flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-label transition hover:text-ndy-bone ${
                pathname === link.href ? "text-ndy-bone" : "text-ndy-mist"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden sm:block">
            <CartIndicator />
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-px w-6 bg-ndy-bone transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`absolute left-0 top-2 h-px w-6 bg-ndy-bone transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`absolute left-0 top-4 h-px w-6 bg-ndy-bone transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-ndy-charcoal md:hidden">
          <ul className="container-ndy flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base tracking-label text-ndy-bone"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-ndy-charcoal pt-3 sm:hidden">
              <CartIndicator />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
