import Link from "next/link";
import { brand } from "@/data/brand";

export function WhatNdyMeans() {
  return (
    <section className="relative overflow-hidden border-b border-ndy-charcoal py-20 sm:py-28">
      <div className="container-ndy max-w-2xl">
        <p className="text-xs tracking-widest2 text-ndy-mist">{brand.story.heading}</p>
        <div className="mt-6 space-y-5 text-2xl leading-snug text-ndy-fog sm:text-3xl">
          {brand.story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link
          href="/our-story"
          className="mt-8 inline-block border-b border-ndy-graphite pb-1 text-sm tracking-label text-ndy-bone transition hover:border-ndy-bone"
        >
          READ OUR STORY
        </Link>
      </div>
    </section>
  );
}
