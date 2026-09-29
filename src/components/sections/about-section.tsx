import { ArrowUpRight, Compass, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section id="about" className="section-shell py-24 scroll-mt-20 border-b border-white/10 bg-gradient-to-b from-obsidian via-[#0c0f14] to-obsidian">
      <div className="mx-auto max-w-frame px-gutter">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-horizon/30 bg-horizon/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-horizon">
              <Sparkles className="size-3.5" />
              <span>ABOUT DREAM HAWAI ADDA</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-porcelain leading-[1.15]">
              More Than Just <br className="hidden sm:block" />
              <span className="text-horizon">Travel Bookings</span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-smoke/90 max-w-2xl">
              We help you plan your journey around your preferences, plans and budget — with personalised assistance from destination selection to bookings and trip coordination.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-horizon/30 hover:bg-white/[0.04]">
                <Compass className="size-6 text-horizon mb-2" />
                <h4 className="text-sm font-semibold text-porcelain">Tailored Itineraries</h4>
                <p className="text-xs text-smoke mt-1">Built to your exact schedule and interests.</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-horizon/30 hover:bg-white/[0.04]">
                <Users className="size-6 text-horizon mb-2" />
                <h4 className="text-sm font-semibold text-porcelain">Personal Assistance</h4>
                <p className="text-xs text-smoke mt-1">Dedicated travel specialist by your side.</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-horizon/30 hover:bg-white/[0.04]">
                <ShieldCheck className="size-6 text-horizon mb-2" />
                <h4 className="text-sm font-semibold text-porcelain">Seamless Logistics</h4>
                <p className="text-xs text-smoke mt-1">End-to-end stays, rides & flights.</p>
              </div>
            </div>

            <div className="pt-2">
              <Button asChild size="lg" className="bg-horizon hover:bg-horizon/90 text-obsidian font-semibold px-8 shadow-lg shadow-horizon/20">
                <a href="#enquiry">
                  Plan My Trip <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white/[0.02]">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=82"
                alt="Traveller overlooking scenic mountain horizon"
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl border border-white/15 bg-obsidian/85 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-horizon">Dream Hawai Adda Promise</p>
                <p className="text-sm font-medium text-porcelain mt-1">"Your journey crafted with care, clarity and local expertise."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
