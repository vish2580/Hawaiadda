import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!ref.current || reducedMotion) return;
    const context = gsap.context(() => {
      gsap.fromTo(ref.current, { opacity: 0, y: 34 }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 86%", once: true },
      });
    }, ref);
    return () => context.revert();
  }, [reducedMotion]);

  return <div ref={ref} className={cn(className)}>{children}</div>;
}
