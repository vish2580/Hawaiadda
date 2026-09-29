import { Check, Clock3, Compass } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { TravelImage } from "@/components/ui/travel-image";
import { holidayPackages } from "@/data/travel-content";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function HolidayPackages() {
  return (
    <section id="holidays" className="scroll-mt-20 bg-obsidian px-gutter py-28 text-porcelain lg:py-40" aria-labelledby="holidays-title">
      <div className="mx-auto max-w-frame">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_.5fr] lg:items-end"><h2 id="holidays-title" className="max-w-4xl font-display text-[clamp(2.8rem,5.6vw,5.9rem)] leading-[.96] tracking-[-0.065em]">Less planning. More living.</h2><p className="max-w-sm leading-7 text-smoke">Three strong routes with enough structure to feel easy and enough room to become yours.</p></Reveal>
        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {holidayPackages.map((item, index) => (
            <article key={item.id} className={`grid items-center gap-9 lg:grid-cols-12 ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className={`relative overflow-hidden lg:col-span-7 ${index === 1 ? "aspect-[5/4] lg:ml-12" : "aspect-[4/3]"}`}><TravelImage image={item.image} className="transition-transform duration-700 hover:scale-[1.025]" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 p-6 pt-24 text-white"><span className="text-sm">{item.place}</span></div></div>
              <div className="lg:col-span-5 lg:px-9"><div className="flex flex-wrap gap-5 text-sm text-smoke"><span className="flex items-center gap-2"><Clock3 className="size-4" />{item.days} days</span><span className="flex items-center gap-2"><Compass className="size-4" />{item.pace}</span></div><h3 className="mt-6 font-display text-3xl leading-tight tracking-[-0.045em] sm:text-5xl">{item.title}</h3><p className="mt-6 max-w-md leading-8 text-smoke">{item.description}</p><ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-smoke">{item.inclusions.map((inclusion) => <li key={inclusion} className="flex items-center gap-1.5"><Check className="size-3.5 text-[#8f5b15]" />{inclusion}</li>)}</ul><p className="mt-7 font-display text-2xl">From {money.format(item.price)} <span className="font-body text-xs font-normal text-smoke">per person, indicative</span></p><a href={`/holidays?destination=${encodeURIComponent(item.place)}`} className="mt-7 inline-block border-b border-white/30 pb-1 text-sm font-semibold hover:border-horizon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusk">Make this route yours</a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
