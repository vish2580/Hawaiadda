import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { TravelImage } from "@/components/ui/travel-image";
import { destinations, moods } from "@/data/travel-content";
import { cn } from "@/lib/utils";

export function PlanYourEscape() {
  const [activeId, setActiveId] = useState(moods[0].id);
  const active = moods.find((mood) => mood.id === activeId) ?? moods[0];
  const suggestions = useMemo(() => destinations.filter((item) => active.destinationIds.includes(item.id)), [active]);
  const lead = suggestions[0] ?? destinations[0];

  return (
    <section id="escape" className="scroll-mt-20 bg-[#111419] px-gutter py-28 text-porcelain lg:py-40" aria-labelledby="escape-title">
      <div className="mx-auto grid max-w-frame gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-sm text-horizon">Start with a feeling</p>
          <h2 id="escape-title" className="mt-5 max-w-xl font-display text-[clamp(2.8rem,5.2vw,5.4rem)] leading-[.98] tracking-[-0.065em]">Don’t know where to go?</h2>
          <p className="mt-6 max-w-md leading-8 text-smoke">You do not need a destination yet. Tell us what the days should feel like and we will narrow the map.</p>
          <div className="mt-10 grid grid-cols-2 gap-px bg-white/10" role="group" aria-label="Travel moods">
            {moods.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" aria-pressed={activeId === id} onClick={() => setActiveId(id)} className={cn("flex min-h-20 items-center gap-3 bg-[#111419] px-4 text-left text-sm font-semibold focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ion", activeId === id ? "text-horizon" : "text-porcelain/65 hover:text-porcelain")}>
                <Icon className="size-5" strokeWidth={1.5} />{label}
              </button>
            ))}
          </div>
        </div>
        <div className="relative min-h-[560px] overflow-hidden">
          <TravelImage key={lead.id} image={lead.image} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
            <p className="text-sm text-horizon">{active.prompt}</p>
            <h3 className="mt-3 max-w-xl font-display text-3xl tracking-[-0.04em] sm:text-5xl">{active.description}</h3>
            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-white/75">
              <span>Try</span>{suggestions.map((item) => <a key={item.id} href={`/destination/${item.id}`} className="border border-white/25 px-3 py-2 hover:border-horizon hover:text-horizon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion">{item.city}</a>)}
              <a href="#personalized" className="ml-auto inline-flex min-h-10 items-center gap-2 font-semibold text-white hover:text-horizon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion">Shape this mood <ArrowRight className="size-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
