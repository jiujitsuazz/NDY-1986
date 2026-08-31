"use client";

import { useEffect, useRef } from "react";
import { markBrandStorySeen } from "@/lib/personalisation/client";

/**
 * Marks the brand story as "seen" once the visitor has scrolled far enough
 * to reach it. This is what lets a future visit skip straight to the
 * returning-visitor experience instead of replaying the full brand film.
 */
export function BrandStoryTracker() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          markBrandStorySeen();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={sentinelRef} aria-hidden="true" />;
}
