"use client";

import { useEffect } from "react";
import { recordProductView, setPurchaseIntent } from "@/lib/personalisation/client";

export function RecordProductView({ productId }: { productId: string }) {
  useEffect(() => {
    recordProductView(productId);
    setPurchaseIntent("considering");
  }, [productId]);

  return null;
}
