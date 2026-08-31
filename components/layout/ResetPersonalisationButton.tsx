"use client";

import { useRouter } from "next/navigation";
import { resetVisitorContext } from "@/lib/personalisation/client";

export function ResetPersonalisationButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        resetVisitorContext();
        router.push("/");
        router.refresh();
      }}
      className="text-xs text-ndy-ash underline decoration-ndy-graphite underline-offset-4 transition hover:text-ndy-mist"
    >
      Reset my personalised experience
    </button>
  );
}
