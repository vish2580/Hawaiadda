import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);
export function JourneyProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);
  return <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-horizon" aria-hidden="true" />;
}
