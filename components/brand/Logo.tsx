import Link from "next/link";

/**
 * The NDY logo always routes back to "/" — the canonical brand homepage.
 * This is a deliberate UX guarantee: personalisation should never trap a
 * visitor inside one experience archetype with no way back to the default.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-display text-lg font-bold tracking-widest2 text-ndy-bone ${className}`}
      aria-label="NDY 1986 — home"
    >
      NDY <span className="text-ndy-mist">1986</span>
    </Link>
  );
}
