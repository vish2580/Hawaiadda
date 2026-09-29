import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/travel-content";

const destinationFilters = [
  "All",
  "Himalayas",
  "Sikkim & Darjeeling",
  "International Escapes",
] as const;

export function DestinationsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredDestinations = destinations.filter((dest) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Himalayas") return ["sikkim", "darjeeling", "bhutan", "nepal", "kashmir"].includes(dest.id);
    if (activeFilter === "Sikkim & Darjeeling") return ["sikkim", "darjeeling"].includes(dest.id);
    if (activeFilter === "International Escapes") return ["bhutan", "nepal", "thailand", "vietnam", "bali", "maldives", "dubai"].includes(dest.id);
    return true;
  });

  return (
    <section id="destinations" className="section-shell py-24 scroll-mt-20 border-b border-white/10 bg-[#080a0e]">
      <div className="mx-auto max-w-frame px-gutter">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-horizon/30 bg-horizon/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-horizon">
              <Sparkles className="size-3.5" />
              <span>DESTINATIONS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-porcelain">
              Where Will You Go Next?
            </h2>
            <p className="text-smoke text-sm sm:text-base leading-relaxed">
              From the Himalayas to international escapes, we help you plan journeys across India and beyond.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-semibold text-horizon">
              <span className="bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md">Sikkim</span>
              <span>•</span>
              <span className="bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md">Darjeeling</span>
              <span>•</span>
              <span className="bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md">Bhutan</span>
              <span>•</span>
              <span className="bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md">Nepal</span>
              <span>•</span>
              <span className="bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md">Kashmir</span>
              <span>•</span>
              <span className="bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md">Thailand</span>
              <span>•</span>
              <span className="bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md">Vietnam</span>
              <span>•</span>
              <span className="bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md">More</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {destinationFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeFilter === filter
                    ? "bg-horizon text-obsidian shadow-md shadow-horizon/20"
                    : "border border-white/10 bg-white/[0.03] text-porcelain/80 hover:bg-white/[0.08]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-all duration-300 hover:-translate-y-1.5 hover:border-horizon/50 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5">
                <img
                  src={dest.image.src}
                  alt={dest.image.alt || dest.city}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-obsidian/80 border border-white/15 px-2.5 py-0.5 text-[11px] font-medium text-horizon backdrop-blur-md">
                  {dest.region}
                </span>
                <span className="absolute top-3 right-3 rounded-full bg-obsidian/80 border border-white/15 px-2.5 py-0.5 text-[11px] font-medium text-porcelain backdrop-blur-md">
                  {dest.temperature}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-porcelain group-hover:text-horizon transition-colors">
                      {dest.city}
                    </h3>
                    <span className="text-xs text-smoke font-medium">{dest.country}</span>
                  </div>

                  <p className="mt-2 text-xs text-smoke line-clamp-2 leading-relaxed">
                    {dest.note}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-smoke block">Starting from</span>
                    <span className="text-sm font-bold text-porcelain">
                      ₹{dest.startingPrice.toLocaleString("en-IN")}
                      <span className="text-[10px] font-normal text-smoke"> / person</span>
                    </span>
                  </div>

                  <Button asChild size="sm" variant="outline" className="h-8 text-xs border-white/20 hover:border-horizon hover:text-horizon">
                    <a href={`#enquiry?destination=${dest.city}`}>
                      Plan Trip <ArrowUpRight className="size-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button asChild size="lg" className="bg-horizon hover:bg-horizon/90 text-obsidian font-bold px-8 shadow-xl shadow-horizon/20">
            <a href="#enquiry">
              <Compass className="mr-2 size-5" /> Plan Your Journey
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
