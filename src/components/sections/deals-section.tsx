import { ArrowRight } from "lucide-react";
import { TravelImage } from "@/components/ui/travel-image";
import { deals } from "@/data/travel-content";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function Deals() {
  return (
    <section id="deals" className="scroll-mt-20 bg-obsidian px-gutter py-28 text-porcelain lg:py-36" aria-labelledby="deals-title">
      <div className="mx-auto max-w-frame">
        <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-10 md:flex-row md:items-end"><div><p className="text-sm font-semibold text-smoke">A LITTLE FURTHER. A LITTLE LESS.</p><h2 id="deals-title" className="mt-4 font-display text-[clamp(2.6rem,5vw,5.3rem)] tracking-[-0.06em]">The world, for less.</h2></div><p className="max-w-md text-sm leading-6 text-smoke">A few reasons to stop saying “someday”. Sample fares for your next escape.</p></div>
        <div className="grid lg:grid-cols-12">
          {deals.map((deal, index) => (
            <article key={deal.id} className={`group border-b border-white/15 py-8 lg:col-span-4 lg:px-6 ${index === 0 ? "lg:pl-0" : "lg:border-l"} ${index === deals.length - 1 ? "lg:pr-0" : ""}`}>
              <div className={`overflow-hidden ${index === 1 ? "aspect-[4/5]" : "aspect-[4/3]"}`}><TravelImage image={deal.image} className="transition-transform duration-700 group-hover:scale-[1.025]" /></div>
              <p className="mt-6 text-xs text-smoke">{deal.kind}</p><h3 className="mt-2 font-display text-2xl leading-tight tracking-[-0.04em]">{deal.title}</h3><p className="mt-3 text-sm text-smoke">{deal.route}</p>
              <div className="mt-6 flex items-end justify-between gap-4"><div><strong className="font-display text-2xl">{money.format(deal.price)}</strong><p className="mt-1 text-xs text-smoke">{deal.qualifier}</p></div><a href="#plan" className="grid size-11 place-items-center border border-white/25 hover:bg-obsidian hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusk" aria-label={`Explore ${deal.title}`}><ArrowRight className="size-4" /></a></div>
              <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-smoke">{deal.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
