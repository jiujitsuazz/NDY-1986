import Image from "next/image";
import Link from "next/link";
import { coreHoodie } from "@/data/product";

export function CoreShowcase() {
  const primaryImage = coreHoodie.images.find((image) => image.role === "primary") ?? coreHoodie.images[0]!;

  return (
    <section className="border-b border-ndy-charcoal py-20 sm:py-28" id="the-core">
      <div className="container-ndy grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ndy-charcoal">
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
            style={{ objectPosition: primaryImage.objectPosition ?? "center" }}
            priority={false}
          />
        </div>
        <div>
          <p className="text-xs tracking-widest2 text-ndy-mist">{coreHoodie.brand}</p>
          <h2 className="mt-3 text-5xl text-ndy-bone sm:text-6xl">{coreHoodie.name.toUpperCase()}</h2>
          <p className="mt-6 max-w-md text-base text-ndy-fog">{coreHoodie.shortDescription}</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm tracking-label text-ndy-mist">
            <li>{coreHoodie.gsm} GSM</li>
            <li>{coreHoodie.fabricComposition.cotton}% COTTON</li>
            <li>{coreHoodie.fit.toUpperCase()} FIT</li>
            <li>{coreHoodie.colour.toUpperCase()}</li>
          </ul>
          <Link
            href="/the-core"
            className="mt-10 inline-flex items-center justify-center border border-ndy-bone bg-ndy-bone px-8 py-4 text-sm font-medium tracking-label text-ndy-black transition hover:bg-transparent hover:text-ndy-bone"
          >
            SHOP THE CORE — £{coreHoodie.offer.price}
          </Link>
        </div>
      </div>
    </section>
  );
}
