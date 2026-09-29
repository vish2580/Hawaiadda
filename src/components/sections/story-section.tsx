import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { title: "Listen before we map", body: "Your appetite for movement, stillness, food and surprise becomes the route—not a preset package." },
  { title: "Edit what doesn’t matter", body: "We protect your time with fewer transfers, well-placed stays and enough white space to notice where you are." },
  { title: "Leave room for the unplanned", body: "The right framework creates freedom: a trusted driver, a local number, and a day that can still change shape." },
];

export function StorySection() {
  const root = useRef<HTMLElement>(null);
  const path = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!root.current || !path.current || reducedMotion) return;
    const context = gsap.context(() => {
      gsap.fromTo(path.current, { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 65%", end: "bottom 70%", scrub: 0.5 },
      });
      gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((chapter) => {
        gsap.fromTo(chapter, { opacity: 0.28 }, {
          opacity: 1,
          scrollTrigger: { trigger: chapter, start: "top 70%", end: "bottom 45%", scrub: true },
        });
      });
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={root} id="approach" className="bg-dusk px-gutter py-28 text-porcelain lg:py-40">
      <div className="mx-auto grid max-w-frame gap-16 lg:grid-cols-[.85fr_1.15fr] lg:gap-28">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <p className="text-sm text-ion">How we shape a journey</p>
          <h2 className="mt-5 font-display text-[clamp(2.7rem,5vw,5.2rem)] font-medium leading-[1.01] tracking-[-0.06em]">Planning is part instinct, part precision.</h2>
          <p className="mt-7 max-w-md leading-8 text-porcelain/60">Technology helps us see the options. Human judgement decides what belongs.</p>
        </div>
        <div className="relative pl-10 sm:pl-16">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-white/[0.12]">
            <div ref={path} className="absolute inset-0 origin-top bg-horizon" />
          </div>
          {chapters.map((chapter, index) => (
            <article key={chapter.title} data-chapter className="relative flex min-h-[310px] flex-col justify-center border-b border-white/10 last:border-0">
              <span className="absolute -left-[2.75rem] grid size-6 place-items-center bg-dusk text-xs text-horizon sm:-left-[4.75rem]">{index + 1}</span>
              <h3 className="font-display text-3xl font-medium tracking-[-0.04em] sm:text-5xl">{chapter.title}</h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-porcelain/60">{chapter.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
