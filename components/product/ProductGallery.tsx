"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types/product";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [activeId, setActiveId] = useState(images[0]?.id);
  const active = images.find((image) => image.id === activeId) ?? images[0]!;

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ndy-charcoal">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: active.objectPosition ?? "center" }}
          priority
        />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3" role="tablist" aria-label="Product images">
        {images.map((image) => (
          <button
            key={image.id}
            role="tab"
            aria-selected={image.id === active.id}
            aria-label={image.alt}
            onClick={() => setActiveId(image.id)}
            className={`relative aspect-square overflow-hidden bg-ndy-charcoal outline-none transition ${
              image.id === active.id ? "ring-2 ring-ndy-bone" : "ring-1 ring-ndy-graphite hover:ring-ndy-mist"
            }`}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="120px"
              className="object-cover"
              style={{ objectPosition: image.objectPosition ?? "center" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
