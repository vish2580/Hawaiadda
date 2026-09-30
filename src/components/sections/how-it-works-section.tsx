import { ArrowUpRight, CheckCircle2, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { howItWorksSteps } from "@/data/travel-content";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-shell py-24 scroll-mt-20 border-b border-white/10 bg-[#090b0f]">
      <div className="mx-auto max-w-frame px-gutter">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-horizon/30 bg-horizon/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-horizon">
            <Sparkles className="size-3.5" />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-porcelain">
            Tell Us Your Plans. <br />
            <span className="text-horizon">We’ll Take It From There.</span>
          </h2>
          <p className="text-smoke text-sm sm:text-base">
            A simple, transparent 4-step process to get your entire journey designed and booked effortlessly.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {howItWorksSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-horizon/50 hover:bg-white/[0.05] hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-horizon/20 border border-horizon/40 font-mono text-sm font-bold text-horizon">
                      {step.step}
                    </span>
                    <Icon className="size-5 text-smoke group-hover:text-horizon transition-colors" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-porcelain group-hover:text-horizon transition-colors">
                    {step.step} — {step.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-smoke/90">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-[11px] font-semibold text-horizon">
                  <CheckCircle2 className="size-3.5" /> Step {idx + 1} of 4
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Button asChild size="lg" className="bg-horizon hover:bg-horizon/90 text-obsidian font-bold px-8 shadow-xl shadow-horizon/20">
            <a href="/book-your-trip">
              <PhoneCall className="mr-2 size-4" /> Talk to Our Travel Expert <ArrowUpRight className="ml-1.5 size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
