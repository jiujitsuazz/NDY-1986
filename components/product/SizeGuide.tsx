import { coreSizeGuide, sizeGuideNote } from "@/data/sizeGuide";

export function SizeGuide() {
  return (
    <details className="group border-t border-ndy-charcoal py-4">
      <summary className="cursor-pointer list-none text-sm tracking-label text-ndy-bone">
        <span className="inline-flex items-center gap-2">
          SIZE GUIDE
          <span aria-hidden="true" className="transition group-open:rotate-45">
            +
          </span>
        </span>
      </summary>
      <div className="mt-4 overflow-x-auto">
        <p className="mb-4 max-w-md text-sm text-ndy-ash">{sizeGuideNote}</p>
        <table className="w-full min-w-[420px] text-left text-sm">
          <caption className="sr-only">The Core measurements by size, garment laid flat, in centimetres</caption>
          <thead>
            <tr className="border-b border-ndy-graphite text-ndy-ash">
              <th scope="col" className="py-2 pr-4 font-normal">
                Size
              </th>
              <th scope="col" className="py-2 pr-4 font-normal">
                Chest (cm)
              </th>
              <th scope="col" className="py-2 pr-4 font-normal">
                Length (cm)
              </th>
              <th scope="col" className="py-2 font-normal">
                Sleeve (cm)
              </th>
            </tr>
          </thead>
          <tbody>
            {coreSizeGuide.map((row) => (
              <tr key={row.size} className="border-b border-ndy-charcoal text-ndy-fog">
                <th scope="row" className="py-2 pr-4 font-normal text-ndy-bone">
                  {row.size}
                </th>
                <td className="py-2 pr-4">{row.chestCm}</td>
                <td className="py-2 pr-4">{row.lengthCm}</td>
                <td className="py-2">{row.sleeveCm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
