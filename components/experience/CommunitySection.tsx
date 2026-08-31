export function CommunitySection() {
  return (
    <section className="border-b border-ndy-charcoal py-20 sm:py-28">
      <div className="container-ndy grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs tracking-widest2 text-ndy-mist">OWNERSHIP</p>
          <h2 className="mt-3 text-3xl text-ndy-bone sm:text-4xl">YOU&apos;RE PART OF IT NOW.</h2>
          <p className="mt-6 max-w-md text-ndy-fog">
            Not a loyalty scheme. Not points. You own The Core — that&apos;s what puts you here. What comes next
            is built for people who already showed up once.
          </p>
        </div>
        <div className="border border-ndy-graphite p-8">
          <p className="text-xs tracking-widest2 text-ndy-ash">NDY STORIES</p>
          <p className="mt-4 text-ndy-fog">
            Reserved for the people wearing NDY. Stories from owners will live here as the community
            grows.
          </p>
        </div>
      </div>
    </section>
  );
}
