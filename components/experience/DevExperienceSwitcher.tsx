"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { ExperienceType } from "@/types/experience";
import { markAsCustomer, resetVisitorContext } from "@/lib/personalisation/client";

const OPTIONS: { value: ExperienceType; label: string }[] = [
  { value: "brand-discovery", label: "First-time / Brand Discovery" },
  { value: "returning", label: "Returning Visitor" },
  { value: "high-intent", label: "High-Intent" },
  { value: "customer", label: "Customer" },
];

/**
 * Development-only tool to preview each experience archetype without
 * manipulating cookies by hand. Rendered only when experience preview is
 * enabled (see lib/personalisation/previewMode.ts) — off by default in
 * production.
 */
export function DevExperienceSwitcher({ current }: { current: ExperienceType }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  function setExperience(value: ExperienceType | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("experience", value);
      if (value === "customer") markAsCustomer();
    } else {
      params.delete("experience");
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[200] text-xs">
      {open ? (
        <div className="w-64 border border-ndy-graphite bg-ndy-black p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <p className="tracking-label text-ndy-mist">PREVIEW EXPERIENCE</p>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-ndy-ash">
              ✕
            </button>
          </div>
          <p className="mt-1 text-[11px] text-ndy-ash">Currently: {current}</p>
          <div className="mt-3 flex flex-col gap-1">
            {OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setExperience(option.value)}
                className={`rounded px-2 py-2 text-left transition hover:bg-ndy-charcoal ${
                  current === option.value ? "bg-ndy-charcoal text-ndy-bone" : "text-ndy-mist"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-1 border-t border-ndy-charcoal pt-3">
            <button
              onClick={() => setExperience(null)}
              className="rounded px-2 py-2 text-left text-ndy-mist transition hover:bg-ndy-charcoal"
            >
              Clear override (use resolver)
            </button>
            <button
              onClick={() => {
                resetVisitorContext();
                setExperience(null);
              }}
              className="rounded px-2 py-2 text-left text-ndy-mist transition hover:bg-ndy-charcoal"
            >
              Reset visitor context
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="border border-ndy-graphite bg-ndy-black px-3 py-2 tracking-label text-ndy-mist shadow-2xl"
        >
          PREVIEW ⚙
        </button>
      )}
    </div>
  );
}
