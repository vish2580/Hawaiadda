import { Clock3, Compass } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { journeys } from "@/data/destinations";

export function JourneysSection() {
  return (
    <section id="journeys" className="bg-porcelain px-gutter py-28 text-obsidian lg:py-40">
      <div className="mx-auto max-w-frame">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-3xl font-display text-[clamp(2.6rem,5.4vw,5.8rem)] font-medium leading-[.98] tracking-[-0.065em]">Routes with a reason to linger.</h2>
          <p className="max-w-sm leading-7 text-[#555b63]">A small edit of journeys for travellers who prefer depth over distance covered.</p>
        </Reveal>
        <div className="mt-16 space-y-16 lg:mt-24 lg:space-y-24">
          {journeys.map((journey, index) => (
            <div key={journey.id} id={journey.id} className="scroll-mt-28">
              <Reveal className={`grid items-center gap-8 lg:grid-cols-12 ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className={`relative overflow-hidden lg:col-span-7 ${index === 1 ? "aspect-[5/4] lg:ml-16" : "aspect-[4/3]"}`}>
                  <img src={journey.image} alt={`${journey.place} landscape`} loading="lazy" className="size-full object-cover transition-transform duration-700 hover:scale-[1.025]" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                  <p className="absolute bottom-5 left-5 text-sm text-white">{journey.place}</p>
                </div>
                <div className="lg:col-span-5 lg:px-10">
                  <div className="flex gap-5 text-sm text-[#60656d]"><span className="flex items-center gap-2"><Clock3 className="size-4" />{journey.days} days</span><span className="flex items-center gap-2"><Compass className="size-4" />{journey.pace}</span></div>
                  <h3 className="mt-6 font-display text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">{journey.title}</h3>
                  <p className="mt-6 max-w-md leading-8 text-[#555b63]">{journey.description}</p>
                  <a href="#plan" className="mt-8 inline-block border-b border-obsidian pb-1 text-sm font-semibold hover:border-horizon hover:text-[#8f5b15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusk">Plan this route</a>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
