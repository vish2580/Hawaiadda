import { MapPin } from "lucide-react";
import { lazy, Suspense, useCallback, useState } from "react";
import { Reveal } from "@/components/animations/reveal";
const DestinationGlobe = lazy(() => import("@/components/travel/destination-globe").then(m => ({ default: m.DestinationGlobe })));
import { destinations } from "@/data/destinations";

export function WorldSection() {
  const [activeId, setActiveId] = useState(destinations[0].id);
  const select = useCallback((id: string) => setActiveId(id), []);
  const active = destinations.find((item) => item.id === activeId) ?? destinations[0];

  return (
    <section id="world" className="overflow-hidden bg-obsidian px-gutter py-28 text-porcelain lg:py-40">
      <div className="mx-auto grid max-w-frame items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <p className="text-sm text-horizon">Choose a point on the map</p>
          <h2 className="mt-5 max-w-xl font-display text-[clamp(2.6rem,5vw,5.4rem)] font-medium leading-[1.02] tracking-[-0.06em]">The world is waiting.</h2>
          <p className="mt-7 max-w-md leading-8 text-smoke">One small point on the map. A whole new way to see the world. Choose a destination and follow your curiosity.</p>
          <div className="mt-10 border-l border-horizon/50 pl-6" aria-live="polite">
            <div className="flex items-center gap-2 text-sm text-smoke"><MapPin className="size-4 text-horizon" />{active.region}, {active.country}</div>
            <h3 className="mt-2 font-display text-3xl tracking-[-0.04em]">{active.city}</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-smoke">{active.note}</p>
            <div className="mt-4 flex flex-wrap gap-6 text-sm"><span>From {active.fare}</span><span>{active.duration}</span></div><a className="secondary-link mt-4" href={`/destination/${active.id}`}>Explore {active.city} →</a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2" aria-label="Featured destinations">
            {destinations.map((destination) => (
              <button key={destination.id} type="button" onClick={() => select(destination.id)} className={`border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion ${activeId === destination.id ? "border-horizon bg-horizon text-obsidian" : "border-white/15 text-smoke hover:border-white/40 hover:text-porcelain"}`} aria-pressed={activeId === destination.id}>
                {destination.city}
              </button>
            ))}
          </div>
        </Reveal>
        <Suspense fallback={<div className="aspect-square grid place-items-center text-smoke">Opening your world…</div>}><DestinationGlobe activeId={activeId} onSelect={select} /></Suspense>
      </div>
    </section>
  );
}
