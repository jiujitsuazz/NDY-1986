import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/data/brand";
import { CinematicPlaceholder } from "@/components/brand/CinematicPlaceholder";

export const metadata: Metadata = {
  title: "Our Story",
  description: `What NDY means, and why NDY 1986 exists. ${brand.description}`,
  alternates: { canonical: "/our-story" },
};

export default function OurStoryPage() {
  return (
    <article>
      <section className="relative flex min-h-[50vh] items-end overflow-hidden border-b border-ndy-charcoal">
        <CinematicPlaceholder variant="story" />
        <div className="container-ndy relative z-10 pb-16 pt-32">
          <p className="text-xs tracking-widest2 text-ndy-mist">OUR STORY</p>
          <h1 className="mt-4 text-5xl text-ndy-bone sm:text-7xl">{brand.meaning}.</h1>
        </div>
      </section>

      <section className="border-b border-ndy-charcoal py-20 sm:py-28">
        <div className="container-ndy max-w-2xl space-y-6 text-2xl leading-snug text-ndy-fog sm:text-3xl">
          {brand.story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-ndy flex flex-col items-start gap-6">
          <p className="max-w-md text-ndy-fog">
            NDY 1986 started as a name and a reason, not a spreadsheet of collections. The Core is the
            first product because it is the only one that needed to exist first.
          </p>
          <Link
            href="/the-core"
            className="inline-flex items-center justify-center border border-ndy-bone bg-ndy-bone px-8 py-4 text-sm font-medium tracking-label text-ndy-black transition hover:bg-transparent hover:text-ndy-bone"
          >
            SHOP THE CORE
          </Link>
        </div>
      </section>
    </article>
  );
}
