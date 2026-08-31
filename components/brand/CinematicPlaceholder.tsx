/**
 * Dark, cinematic background used wherever campaign photography or film
 * will eventually go (hero, brand story, fit sections). Built from layered
 * CSS gradients and an SVG grain filter — no external image dependency, so
 * the site works at full quality before any photography exists.
 *
 * To replace with real photography: swap this component's usage for a
 * `next/image` (or `<video>`) element pointed at /public/images/campaign/*.
 * See README "Replacing imagery" for the exact swap points.
 */

const VARIANTS = {
  hero: "radial-gradient(circle at 30% 20%, #2a2a2a 0%, #0a0a0a 55%), linear-gradient(160deg, #161616 0%, #050505 100%)",
  story: "radial-gradient(circle at 70% 60%, #1f1f1f 0%, #060606 60%), linear-gradient(200deg, #101010 0%, #000000 100%)",
  fit: "radial-gradient(circle at 50% 30%, #202020 0%, #050505 65%), linear-gradient(180deg, #131313 0%, #000000 100%)",
  mission: "radial-gradient(circle at 20% 80%, #1a1a1a 0%, #070707 55%), linear-gradient(140deg, #141414 0%, #030303 100%)",
} as const;

export function CinematicPlaceholder({
  variant = "hero",
  className = "",
}: {
  variant?: keyof typeof VARIANTS;
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
