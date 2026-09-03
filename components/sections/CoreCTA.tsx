import Link from "next/link";

export function CoreCTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-ndy flex flex-col items-start gap-8 sm:items-center sm:text-center">
        <h2 className="text-4xl text-ndy-bone sm:text-6xl">THE CORE.</h2>
        <p className="max-w-md text-ndy-fog">No noise. No oversized branding. Just NDY. £??.</p>
        <Link
          href="/the-core"
          className="inline-flex items-center justify-center border border-ndy-bone bg-ndy-bone px-10 py-4 text-sm font-medium tracking-label text-ndy-black transition hover:bg-transparent hover:text-ndy-bone"
        >
          SHOP THE CORE
        </Link>
      </div>
    </section>
  );
}
