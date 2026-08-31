import Link from "next/link";
import { CinematicPlaceholder } from "@/components/brand/CinematicPlaceholder";

interface HeroProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  compact?: boolean;
}

export function Hero({ eyebrow, heading, subheading, primaryCta, secondaryCta, compact = false }: HeroProps) {
  return (
    <section
      className={`relative flex ${compact ? "min-h-[70vh]" : "min-h-[100svh]"} items-end overflow-hidden border-b border-ndy-charcoal`}
    >
      <CinematicPlaceholder variant="hero" />
      <div className="container-ndy relative z-10 pb-16 pt-40 sm:pb-24">
        <p className="mb-4 text-xs tracking-widest2 text-ndy-mist sm:text-sm">{eyebrow}</p>
        <h1 className="text-balance text-6xl leading-[0.95] text-ndy-bone sm:text-8xl lg:text-9xl">
          {heading}
        </h1>
        <p className="mt-6 max-w-md text-lg text-ndy-fog sm:text-xl">{subheading}</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center border border-ndy-bone bg-ndy-bone px-8 py-4 text-sm font-medium tracking-label text-ndy-black transition hover:bg-transparent hover:text-ndy-bone"
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center border border-ndy-graphite px-8 py-4 text-sm font-medium tracking-label text-ndy-bone transition hover:border-ndy-bone"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
