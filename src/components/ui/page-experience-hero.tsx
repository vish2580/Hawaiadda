import { ArrowDown, ArrowUpRight, Compass, MapPin, Plane } from 'lucide-react';
import { useRef, type PointerEvent } from 'react';
import { pageExperiences } from '@/data/page-experiences';
import { useReducedMotion } from '@/hooks/use-media-query';

export function PageExperienceHero({ path, title }: { path: keyof typeof pageExperiences; title: string }) {
  const scene = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const page = pageExperiences[path];
  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    scene.current?.style.setProperty('--tilt-y', `${((event.clientX-bounds.left)/bounds.width-.5)*8}deg`);
    scene.current?.style.setProperty('--tilt-x', `${-((event.clientY-bounds.top)/bounds.height-.5)*6}deg`);
  };
  const reset = () => { scene.current?.style.setProperty('--tilt-y','0deg'); scene.current?.style.setProperty('--tilt-x','0deg'); };
  return <section className="experience-hero" aria-labelledby="experience-title">
    <div className="experience-copy"><a href="/" className="experience-breadcrumb">HAWAIADDA <span>/</span> {title}</a><p className="eyebrow">{page.kicker}</p><h1 id="experience-title">{page.headline.split('\n')[0]}<br/><em>{page.headline.split('\n')[1]}</em></h1><p className="experience-description">{page.description}</p><a href="#page-content" className="primary-link">{path === '/book-your-trip' ? 'Start planning' : path === '/contact' ? 'Let’s connect' : 'Explore the details'} <ArrowDown size={17}/></a><div className="experience-signoff"><Compass size={17}/><span>TRAVEL. PLANNED YOUR WAY.</span><span className="experience-line"/></div></div>
    <div className="experience-stage" onPointerMove={tilt} onPointerLeave={reset} ref={scene}>
      <div className="experience-orbit" aria-hidden="true"/>
      <div className="experience-postcard"><img src={page.image.src} alt={page.image.alt} loading="eager"/><div className="postcard-shade"/><span className="postcard-edition">THE DREAM COLLECTION &nbsp; / &nbsp; 2026</span><div className="postcard-caption"><MapPin size={15}/><span>{page.location}</span><ArrowUpRight size={18}/></div></div>
      <div className="experience-ticket"><span className="ticket-plane"><Plane size={23}/></span><div><small>YOUR BOARDING PASS TO POSSIBILITY</small><strong>{page.caption}</strong></div></div>
      <div className="experience-stamp" aria-hidden="true"><Compass size={28}/><span>GO BEYOND<br/>THE EVERYDAY</span></div>
    </div>
  </section>;
}
