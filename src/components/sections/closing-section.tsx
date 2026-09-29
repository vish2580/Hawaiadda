import { Button } from "@/components/ui/button";

export function ClosingSection() {
  return (
    <section className="relative isolate overflow-hidden bg-obsidian px-gutter py-32 text-center text-porcelain lg:py-48">
      <img src="https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&w=2000&q=85" alt="A road leading toward distant mountains at dusk" loading="lazy" className="absolute inset-0 -z-20 size-full object-cover opacity-35" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,6,7,.9),rgba(5,6,7,.5),rgba(5,6,7,.9))]" />
      <p className="text-sm text-horizon">Your next route can start here</p>
      <h2 className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[.98] tracking-[-0.065em]">Tell us what you want to remember.</h2>
      <p className="mx-auto mt-7 max-w-lg leading-8 text-porcelain/[0.65]">We’ll begin with a conversation, not a package. No pressure, no prebuilt itinerary.</p>
      <Button asChild className="mt-9"><a href="#plan">Start planning</a></Button>
    </section>
  );
}
