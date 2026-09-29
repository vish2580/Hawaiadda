import { ArrowUpRight } from "lucide-react";
import { TravelImage } from "@/components/ui/travel-image";
import { travelStories } from "@/data/travel-content";

export function TravelStories() {
  const [lead, ...rest] = travelStories;
  return (
    <section id="stories" className="scroll-mt-20 bg-[#0b1013] px-gutter py-28 text-porcelain lg:py-40" aria-labelledby="stories-title">
      <div className="mx-auto max-w-frame"><div className="flex items-end justify-between gap-6 border-b border-white/15 pb-9"><div><p className="text-sm font-semibold text-smoke">Travel stories</p><h2 id="stories-title" className="mt-4 font-display text-[clamp(2.8rem,5vw,5.2rem)] tracking-[-0.06em]">Stories worth travelling for.</h2></div><a href="/stories" className="hidden min-h-11 items-center gap-2 text-sm font-semibold sm:flex">View the journal <ArrowUpRight className="size-4" /></a></div>
        <div className="grid gap-8 pt-10 lg:grid-cols-[1.4fr_.6fr] lg:gap-12">
          <article className="group"><div className="aspect-[16/10] overflow-hidden"><TravelImage image={lead.image} className="transition-transform duration-700 group-hover:scale-[1.02]" /></div><div className="mt-6 flex gap-4 text-xs text-smoke"><span>{lead.category}</span><span>{lead.readTime}</span></div><h3 className="mt-3 max-w-3xl font-display text-3xl leading-tight tracking-[-0.045em] sm:text-5xl"><a href={`/story/${lead.id}`}>{lead.title}</a></h3><p className="mt-4 max-w-2xl leading-7 text-smoke">{lead.excerpt}</p></article>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {rest.map((story) => <article key={story.id} className="grid grid-cols-[120px_1fr] gap-5 py-6 sm:grid-cols-[180px_1fr]"><div className="aspect-square overflow-hidden"><TravelImage image={story.image} /></div><div><p className="text-xs text-smoke">{story.category} · {story.readTime}</p><h3 className="mt-3 font-display text-xl leading-tight tracking-[-0.035em] sm:text-2xl"><a href={`/story/${story.id}`}>{story.title}</a></h3><p className="mt-3 hidden text-sm leading-6 text-smoke sm:block">{story.excerpt}</p></div></article>)}
          </div>
        </div>
      </div>
    </section>
  );
}
