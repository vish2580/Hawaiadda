import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { TravelImage } from "@/components/ui/travel-image";
import { hotels } from "@/data/travel-content";
import { cn } from "@/lib/utils";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function HotelShowcase() {
  const [activeId, setActiveId] = useState(hotels[0].id);
  const active = hotels.find((hotel) => hotel.id === activeId) ?? hotels[0];
  return (
    <section id="hotels" className="scroll-mt-20 bg-dusk px-gutter py-28 text-porcelain lg:py-40" aria-labelledby="hotels-title">
      <div className="mx-auto grid max-w-frame gap-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-20">
        <div className="relative min-h-[550px] overflow-hidden"><TravelImage key={active.id} image={active.image} className="absolute inset-0" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" /><p className="absolute bottom-7 left-7 max-w-sm text-sm leading-6 text-white/75">Stay inspiration · Sample property, indicative price</p></div>
        <div className="flex flex-col justify-center"><p className="text-sm text-ion">Stay for the place, not just the night</p><h2 id="hotels-title" className="mt-5 font-display text-[clamp(2.8rem,5vw,5.4rem)] leading-[.98] tracking-[-0.065em]">Hotels with a sense of where you are.</h2>
          <div className="mt-10 border-t border-white/15">
            {hotels.map((hotel) => (
              <button key={hotel.id} type="button" onClick={() => setActiveId(hotel.id)} aria-pressed={activeId === hotel.id} className={cn("group flex w-full items-center justify-between gap-5 border-b border-white/15 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ion", activeId === hotel.id ? "text-porcelain" : "text-porcelain/55 hover:text-porcelain")}>
                <div><span className="font-display text-xl tracking-[-0.03em]">{hotel.name}</span><span className="mt-1 block text-xs text-smoke">{hotel.location} · {hotel.character}</span></div><div className="shrink-0 text-right"><span className="text-sm">From {money.format(hotel.price)}</span><span className="mt-1 flex items-center justify-end gap-1 text-xs text-smoke">{hotel.qualifier}<ArrowUpRight className="size-3.5" /></span></div>
              </button>
            ))}
          </div><a href={`/hotels?destination=${encodeURIComponent(active.location)}`} className="mt-8 inline-flex min-h-11 w-fit items-center border-b border-horizon text-sm font-semibold text-horizon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion">Explore stays</a>
        </div>
      </div>
    </section>
  );
}
