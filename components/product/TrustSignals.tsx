import { coreHoodie } from "@/data/product";

export function TrustSignals() {
  return (
    <ul className="grid grid-cols-1 gap-4 border-y border-ndy-charcoal py-8 text-sm text-ndy-mist sm:grid-cols-3">
      <li>
        <p className="text-ndy-bone">Shipping</p>
        <p className="mt-1 text-ndy-ash">
          {coreHoodie.shipping.standard.label} · {coreHoodie.shipping.standard.estimatedDays}
        </p>
      </li>
      <li>
        <p className="text-ndy-bone">Returns</p>
        <p className="mt-1 text-ndy-ash">{coreHoodie.returns.windowDays}-day returns</p>
      </li>
      <li>
        <p className="text-ndy-bone">Made to last</p>
        <p className="mt-1 text-ndy-ash">{coreHoodie.gsm} GSM heavyweight cotton</p>
      </li>
    </ul>
  );
}
