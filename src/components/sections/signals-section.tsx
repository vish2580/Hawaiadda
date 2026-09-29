import { Quote } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { travelSignals } from "@/data/destinations";

export function SignalsSection() {
  return (
    <section className="bg-obsidian px-gutter py-28 text-porcelain lg:py-40">
      <div className="mx-auto max-w-frame">
        <Reveal className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {travelSignals.map((signal) => (
            <div key={signal.label} className="bg-obsidian p-8 sm:p-10">
              <strong className="font-display text-5xl font-medium tracking-[-0.06em] text-horizon sm:text-6xl">{signal.value}</strong>
              <p className="mt-3 max-w-[12rem] text-sm leading-6 text-smoke">{signal.label}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="mx-auto mt-28 max-w-4xl text-center">
          <Quote className="mx-auto size-7 text-horizon" strokeWidth={1.4} />
          <blockquote className="mt-8 font-display text-[clamp(2rem,4.2vw,4.6rem)] leading-[1.12] tracking-[-0.055em]">“They didn’t fill every hour. They gave every day a point of view.”</blockquote>
          <p className="mt-7 text-sm text-smoke">Mira and Rohan, across Ladakh</p>
        </Reveal>
      </div>
    </section>
  );
}
