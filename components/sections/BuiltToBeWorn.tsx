import { coreHoodie } from "@/data/product";

const specs = [
  { label: "WEIGHT", value: `${coreHoodie.gsm} GSM` },
  { label: "COMPOSITION", value: `${coreHoodie.fabricComposition.cotton}% COTTON` },
  { label: "FIT", value: coreHoodie.fit.toUpperCase() },
  { label: "BRANDING", value: `${coreHoodie.branding.style.toUpperCase()}, ${coreHoodie.branding.position.toUpperCase()}` },
];

export function BuiltToBeWorn() {
  return (
    <section className="border-b border-ndy-charcoal bg-ndy-charcoal/40 py-20 sm:py-28">
      <div className="container-ndy">
        <h2 className="text-3xl text-ndy-bone sm:text-4xl">BUILT TO BE WORN</h2>
        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {specs.map((spec) => (
            <div key={spec.label} className="border-t border-ndy-graphite pt-4">
              <p className="text-xs tracking-widest2 text-ndy-ash">{spec.label}</p>
              <p className="mt-2 text-lg text-ndy-bone sm:text-xl">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
