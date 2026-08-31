import { brand } from "@/data/brand";

export function StatementSection() {
  return (
    <section className="border-b border-ndy-charcoal bg-ndy-black py-28 sm:py-40">
      <div className="container-ndy max-w-3xl">
        <div className="space-y-2 text-4xl leading-tight text-ndy-fog sm:text-5xl lg:text-6xl">
          {brand.statement.lines.map((line, index) => (
            <p
              key={line}
              className={index === brand.statement.lines.length - 1 ? "text-ndy-bone" : ""}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
