import { describe, expect, it } from "vitest";
import {
  calculateDelivery,
  checkStock,
  getProductDetails,
  getReturnsPolicy,
  getSizingInformation,
  searchProducts,
} from "./productService";
import { coreHoodie } from "@/data/product";

describe("agent product service", () => {
  it("searchProducts returns the full catalogue with no query", async () => {
    const results = await searchProducts();
    expect(results).toHaveLength(1);
    expect(results[0]!.id).toBe(coreHoodie.id);
  });

  it("searchProducts filters by use case", async () => {
    expect(await searchProducts("gym")).toHaveLength(1);
    expect(await searchProducts("nonexistent-keyword-xyz")).toHaveLength(0);
  });

  it("getProductDetails resolves by id or slug and returns null for unknown ids", async () => {
    expect((await getProductDetails(coreHoodie.id))?.id).toBe(coreHoodie.id);
    expect((await getProductDetails(coreHoodie.slug))?.id).toBe(coreHoodie.id);
    expect(await getProductDetails("unknown")).toBeNull();
  });

  it("checkStock reports a status for every configured size", async () => {
    const stock = await checkStock(coreHoodie.id);
    expect(stock.map((entry) => entry.size)).toEqual(coreHoodie.sizes.map((s) => s.size));
  });

  it("checkStock can be narrowed to a single size", async () => {
    const stock = await checkStock(coreHoodie.id, "XL");
    expect(stock).toHaveLength(1);
    expect(stock[0]!.size).toBe("XL");
  });

  it("getSizingInformation returns measurements for a known product", async () => {
    const result = await getSizingInformation(coreHoodie.id);
    expect(result.status).toBe("ok");
    if (result.status === "ok") {
      expect(result.data.measurements.length).toBeGreaterThan(0);
      expect(result.data.fit).toBe("athletic");
    }
  });

  it("getSizingInformation reports not_integrated for an unknown product rather than throwing", async () => {
    const result = await getSizingInformation("unknown");
    expect(result.status).toBe("not_integrated");
  });

  it("calculateDelivery resolves a supported region and rejects an unsupported one honestly", async () => {
    const ok = await calculateDelivery(coreHoodie.id, { region: "United Kingdom", method: "standard" });
    expect(ok.status).toBe("ok");

    const unsupported = await calculateDelivery(coreHoodie.id, { region: "Mars", method: "standard" });
    expect(unsupported.status).toBe("not_integrated");
  });

  it("getReturnsPolicy returns the canonical returns data", async () => {
    const result = await getReturnsPolicy(coreHoodie.id);
    expect(result.status).toBe("ok");
    if (result.status === "ok") {
      expect(result.data.windowDays).toBe(coreHoodie.returns.windowDays);
    }
  });
});
