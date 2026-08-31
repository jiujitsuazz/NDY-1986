export function SocialProofSection() {
  return (
    <section className="border-b border-ndy-charcoal py-16 sm:py-20">
      <div className="container-ndy">
        <p className="text-xs tracking-widest2 text-ndy-ash">AS WORN</p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex aspect-square items-center justify-center border border-ndy-graphite/60 text-xs tracking-label text-ndy-ash"
            >
              RESERVED
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
