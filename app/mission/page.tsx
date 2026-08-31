import type { Metadata } from "next";
import { brand } from "@/data/brand";
import { CinematicPlaceholder } from "@/components/brand/CinematicPlaceholder";
import { NextChapterSignup } from "@/components/experience/NextChapterSignup";

export const metadata: Metadata = {
  title: "Mission",
  description: "Why NDY 1986 exists, beyond selling hoodies.",
  alternates: { canonical: "/mission" },
};

export default function MissionPage() {
  return (
    <article>
      <section className="relative flex min-h-[50vh] items-end overflow-hidden border-b border-ndy-charcoal">
        <CinematicPlaceholder variant="mission" />
        <div className="container-ndy relative z-10 pb-16 pt-32">
          <p className="text-xs tracking-widest2 text-ndy-mist">MISSION</p>
          <h1 className="mt-4 text-5xl text-ndy-bone sm:text-7xl">NOT A CHARITY.</h1>
        </div>
      </section>

      <section className="border-b border-ndy-charcoal py-20 sm:py-28">
        <div className="container-ndy max-w-2xl space-y-6 text-xl leading-relaxed text-ndy-fog sm:text-2xl">
          {brand.mission.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <NextChapterSignup />
    </article>
  );
}
