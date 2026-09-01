import Image from "next/image";

/**
 * Real campaign photography for the hero. Replaces the CinematicPlaceholder
 * gradient once genuine imagery exists — see README "How to replace
 * imagery" for the swap pattern this follows.
 */
export function HeroImage() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src="/images/core-front.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ndy-black via-ndy-black/10 to-ndy-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-ndy-black/70 via-transparent to-transparent" />
    </div>
  );
}
