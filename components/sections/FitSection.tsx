import Image from "next/image";
import { coreHoodie } from "@/data/product";

export function FitSection() {
  const fitImage = coreHoodie.images.find((image) => image.role === "fit") ?? coreHoodie.images[0]!;

  return (
    <section className="border-b border-ndy-charcoal py-20 sm:py-28">
      <div className="container-ndy grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="text-xs tracking-widest2 text-ndy-mist">FIT</p>
          <h2 className="mt-3 text-4xl text-ndy-bone sm:text-5xl">CUT TO MOVE.</h2>
          <p className="mt-6 max-w-md text-base text-ndy-fog">
            Athletic through the body and shoulders, tapered at the cuff and hem. Close enough to train in.
            Loose enough to layer. No excess fabric to catch on a bar or a bag strap.
          </p>
        </div>
        <div className="relative order-first aspect-[4/5] w-full overflow-hidden bg-ndy-charcoal lg:order-last">
          <Image
            src={fitImage.src}
            alt={fitImage.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
