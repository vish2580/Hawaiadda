import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Thanks for your interest. Newsletter signup is coming soon; your email has not been saved.");
  };
  return (
    <section id="newsletter" className="bg-horizon px-gutter py-20 text-obsidian" aria-labelledby="newsletter-title">
      <div className="mx-auto grid max-w-frame gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="text-sm font-semibold">Postcards, occasionally</p><h2 id="newsletter-title" className="mt-4 max-w-xl font-display text-[clamp(2.7rem,5vw,5rem)] leading-[.98] tracking-[-0.06em]">A better reason to open your inbox.</h2></div><div><p className="max-w-xl leading-7 text-obsidian/70">Seasonal routes, useful field notes and places we cannot stop thinking about. A little inspiration for your next chapter.</p><form onSubmit={submit} className="mt-7 flex max-w-2xl border-b-2 border-obsidian"><label htmlFor="newsletter-email" className="sr-only">Email address</label><input id="newsletter-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="min-h-14 min-w-0 flex-1 bg-transparent px-1 text-base outline-none placeholder:text-obsidian/55 focus-visible:ring-2 focus-visible:ring-dusk" /><button type="submit" className="inline-flex min-h-14 items-center gap-2 px-3 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusk">Join the list <ArrowRight className="size-4" /></button></form><p className="mt-3 min-h-5 text-xs leading-5 text-obsidian/65" aria-live="polite">{message || "Newsletter preview. Your email will not be saved or subscribed."}</p></div></div>
    </section>
  );
}
