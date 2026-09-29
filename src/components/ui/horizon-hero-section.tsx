import { ArrowDown, ArrowUpRight, Compass, MapPin, Pause, Play } from "lucide-react";
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
          <div className="hero-actions hero-enter">
            <a href="#enquiry" className="primary-link font-semibold shadow-lg shadow-horizon/25">
              Talk to Our Travel Expert <ArrowUpRight size={18} />
            </a>
            <a href="#about" className="secondary-link">
              Explore More <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-porcelain/90 hero-enter">
            <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">Flights</span>
            <span className="text-horizon">•</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">Hotels</span>
            <span className="text-horizon">•</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">Tours</span>
            <span className="text-horizon">•</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">Holidays</span>
            <span className="text-horizon">•</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">Transportation</span>
          </div>
        </div>
        <a className="hero-place" href="#destinations">
          <span className="place-icon"><MapPin size={19} /></span>
          <span>
            <small>POPULAR DESTINATIONS</small>
            <strong>Sikkim & Darjeeling</strong>
            <span>Himalayas to exotic escapes.</span>
          </span>
          <ArrowUpRight size={20} />
        </a>
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
