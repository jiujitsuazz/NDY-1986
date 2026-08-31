import { describe, expect, it } from "vitest";
import { checkout, createCart } from "./cartService";
import { startReturn, trackOrder } from "./orderService";

/**
 * These functions must never fabricate success — they should honestly
 * report that no backend is connected until one exists.
 */
describe("agent actions with no backend connected yet", () => {
  it("createCart reports not_integrated", async () => {
    expect((await createCart()).status).toBe("not_integrated");
  });

  it("checkout reports not_integrated via the commerce provider", async () => {
    const result = await checkout([{ productId: "core-hoodie-black", size: "M", quantity: 1 }]);
    expect(result.status).toBe("not_integrated");
  });

  it("trackOrder and startReturn report not_integrated", async () => {
    expect((await trackOrder("order-1")).status).toBe("not_integrated");
    expect((await startReturn("order-1")).status).toBe("not_integrated");
  });
});
