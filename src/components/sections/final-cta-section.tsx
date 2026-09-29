import { ArrowUpRight, MessageCircle, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="section-shell py-28 relative overflow-hidden border-b border-white/10 bg-[#07090d]">
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-horizon/15 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative mx-auto max-w-4xl px-gutter text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-horizon/30 bg-horizon/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-horizon">
          <Sparkles className="size-3.5" />
          <span>START YOUR ADVENTURE</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-porcelain leading-[1.1]">
          Your Next Journey <br />
          <span className="text-horizon">Starts Here.</span>
        </h2>

        <p className="text-base sm:text-xl text-smoke max-w-xl mx-auto leading-relaxed">
          Tell us where you want to go. We’ll help you plan the rest.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="w-full sm:w-auto bg-horizon hover:bg-horizon/90 text-obsidian font-bold px-8 py-6 text-base shadow-2xl shadow-horizon/30">
            <a href="#enquiry">
              <PhoneCall className="mr-2 size-5" /> Talk to Our Travel Expert <ArrowUpRight className="ml-1.5 size-5" />
            </a>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-white/20 hover:border-emerald-400 hover:text-emerald-400 px-7 py-6 text-base">
            <a href="https://wa.me/919800000000?text=Hi%20Dream%20Hawai%20Adda,%20I%20want%20to%20plan%20my%20next%20journey!" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 size-5 text-emerald-400" /> WhatsApp Us
            </a>
          </Button>
        </div>

        <p className="text-xs text-smoke/70 pt-2">
          📍 Siliguri, West Bengal • Domestic & International Tour Operator
        </p>
      </div>
    </section>
  );
}
