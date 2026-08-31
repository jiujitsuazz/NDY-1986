import { describe, expect, it } from "vitest";
import { coreHoodie, getProductById, getProductBySlug, products } from "./product";

describe("canonical product data", () => {
  it("matches the launch spec for The Core", () => {
    expect(coreHoodie.brand).toBe("NDY 1986");
    expect(coreHoodie.brandMeaning).toBe("NOT DEAD YET");
    expect(coreHoodie.colour).toBe("black");
    expect(coreHoodie.gsm).toBe(350);
    expect(coreHoodie.fabricComposition.cotton).toBe(80);
    expect(coreHoodie.fit).toBe("athletic");
    expect(coreHoodie.branding).toMatchObject({
      style: "minimal",
      position: "left chest",
      text: "NDY 1986",
    });
  });

  it("exposes every launch size exactly once, S through XXL", () => {
    const sizes = coreHoodie.sizes.map((entry) => entry.size);
    expect(sizes).toEqual(["S", "M", "L", "XL", "XXL"]);
    expect(new Set(sizes).size).toBe(sizes.length);
  });

  it("gives every image meaningful alt text", () => {
    for (const image of coreHoodie.images) {
      expect(image.alt.length).toBeGreaterThan(10);
    }
  });

  it("has a positive price and a valid ISO currency code", () => {
    expect(coreHoodie.offer.price).toBeGreaterThan(0);
    expect(coreHoodie.offer.currency).toMatch(/^[A-Z]{3}$/);
  });

  it("looks products up by id and slug", () => {
    expect(getProductById(coreHoodie.id)).toBe(coreHoodie);
    expect(getProductBySlug(coreHoodie.slug)).toBe(coreHoodie);
    expect(getProductById("does-not-exist")).toBeUndefined();
  });

  it("keeps the catalogue as the single source products are drawn from", () => {
    expect(products).toContain(coreHoodie);
  });
});
