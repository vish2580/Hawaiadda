import { BadgeCheck, Sparkles } from "lucide-react";
import { whyUsPoints } from "@/data/travel-content";

export function WhyUsSection() {
  return (
    <section id="why-us" className="section-shell py-24 scroll-mt-20 border-b border-white/10 bg-obsidian">
      <div className="mx-auto max-w-frame px-gutter">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-horizon/30 bg-horizon/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-horizon">
            <Sparkles className="size-3.5" />
            <span>WHY US</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-porcelain">
            Your Trip. Our Expertise.
          </h2>
          <p className="text-smoke text-sm sm:text-base">
            We bridge seamless booking capabilities with personalized, boots-on-the-ground travel guidance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {whyUsPoints.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-horizon/50 hover:bg-white/[0.05] hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-display text-2xl font-black text-horizon/60 group-hover:text-horizon transition-colors">
                      {item.number}
                    </span>
                    <div className="flex size-10 items-center justify-center rounded-xl bg-horizon/15 border border-horizon/30 text-horizon">
                      <Icon className="size-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-porcelain group-hover:text-horizon transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-smoke/90">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-horizon">
                    <BadgeCheck className="size-3.5" /> {item.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
