/**
 * Dark, cinematic background used wherever campaign photography or film
 * will eventually go (currently the brand story and mission sections — the
 * hero now uses real photography, see components/brand/HeroImage.tsx).
 * Built from layered CSS gradients and an SVG grain filter — no external
 * image dependency, so the site works at full quality before photography
 * exists for a given section.
 *
 * To replace with real photography: swap this component's usage for a
 * `next/image` (or `<video>`) element. See README "Replacing imagery".
 */

const VARIANTS = {
  story: "radial-gradient(circle at 70% 60%, #1f1f1f 0%, #060606 60%), linear-gradient(200deg, #101010 0%, #000000 100%)",
  mission: "radial-gradient(circle at 20% 80%, #1a1a1a 0%, #070707 55%), linear-gradient(140deg, #141414 0%, #030303 100%)",
} as const;

export function CinematicPlaceholder({
  variant,
  className = "",
}: {
  variant: keyof typeof VARIANTS;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 ${className}`}
      style={{ background: VARIANTS[variant] }}
    >
      <svg className="h-full w-full opacity-[0.06] mix-blend-overlay" aria-hidden="true">
        <filter id={`grain-${variant}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${variant})`} />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-ndy-black via-transparent to-ndy-black/40" />
    </div>
  );
}
