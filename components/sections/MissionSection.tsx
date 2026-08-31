import Link from "next/link";
import { brand } from "@/data/brand";
import { CinematicPlaceholder } from "@/components/brand/CinematicPlaceholder";

export function MissionSection() {
  return (
    <section className="relative overflow-hidden border-b border-ndy-charcoal py-24 sm:py-32">
      <CinematicPlaceholder variant="mission" />
      <div className="container-ndy relative z-10 max-w-2xl">
        <p className="text-xs tracking-widest2 text-ndy-mist">{brand.mission.heading}</p>
        <div className="mt-6 space-y-5 text-xl leading-relaxed text-ndy-fog sm:text-2xl">
          {brand.mission.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link
          href="/mission"
          className="mt-8 inline-block border-b border-ndy-graphite pb-1 text-sm tracking-label text-ndy-bone transition hover:border-ndy-bone"
        >
          MORE ON OUR MISSION
        </Link>
      </div>
    </section>
  );
}
