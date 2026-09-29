import { ArrowDown, ArrowUpRight, Compass, Pause, Play } from "lucide-react";
import { lazy, Suspense, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookingConsole } from "@/components/travel/booking-console";
import { useReducedMotion } from "@/hooks/use-media-query";
import { images } from "@/data/images";

const TravelUniverse = lazy(() => import("@/components/animations/TravelUniverse"));
gsap.registerPlugin(ScrollTrigger);

export function HorizonHeroSection() {
  const host = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  useLayoutEffect(() => {
    if (reduced || paused) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-enter",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: "power3.out", clearProps: "transform,opacity" }
      );
      gsap.to(".hero-photograph", {
        yPercent: 12,
        scale: 1.06,
        ease: "none",
        scrollTrigger: { trigger: host.current, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, host);
    return () => ctx.revert();
  }, [reduced, paused]);

  return (
    <>
      <section ref={host} id="top" className="travel-hero">
        <img className="hero-photograph" src={images.hero.src} alt={images.hero.alt} loading="eager" />
        <div className="hero-shade" />
        {!paused && !reduced && (
          <div className="hero-universe">
            <Suspense fallback={null}>
              <TravelUniverse />
            </Suspense>
          </div>
        )}
        <div className="hero-coordinate">26°43′ N &nbsp; 88°26′ E <span>DREAM HAWAI ADDA • SILIGURI</span></div>
        <div className="hero-content">
          <p className="eyebrow hero-enter"><span className="signal-dot" /> TOUR OPERATOR & TRAVEL AGENCY</p>
          <h1 className="hero-enter">Your Trip.<br />Your <em>Way.</em></h1>
          <p className="hero-description hero-enter">
            Dream Hawai Adda is a travel agency and tour operator helping you plan and book domestic and international journeys — from flights and hotels to complete holidays and transportation.
          </p>

          <div className="hero-actions hero-enter mt-8">
            <a href="#enquiry" className="primary-link font-semibold shadow-lg shadow-horizon/25">
              Talk to Our Travel Expert <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#about"><ArrowDown size={15} /> SCROLL TO DISCOVER</a>
          <span><Compass size={15} /> TRAVEL. PLANNED YOUR WAY.</span>
          <button aria-label={paused ? "Play atmospheric motion" : "Pause atmospheric motion"} onClick={() => setPaused(!paused)}>
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      </section>
      <div className="booking-wrap">
        <BookingConsole />
      </div>
    </>
  );
}
