import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Reveal } from "@/components/animations/reveal";
import { TravelImage } from "@/components/ui/travel-image";
import { destinations } from "@/data/travel-content";
export function DestinationDiscovery(){
 const rail=useRef<HTMLDivElement>(null);
 const move=(direction:number)=>rail.current?.scrollBy({left:direction*rail.current.clientWidth*.7,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto":"smooth"});
 return <section id="discover" className="destination-section section-shell"><Reveal className="section-heading"><div><p className="eyebrow">FOLLOW YOUR CURIOSITY</p><h2>Where will you<br/>go <em>next?</em></h2></div><div className="section-aside"><p>Some places stay with you.<br/>Find the one that feels like you.</p><div className="rail-buttons"><button aria-label="Previous destinations" onClick={()=>move(-1)}><ArrowLeft size={18}/></button><button aria-label="Next destinations" onClick={()=>move(1)}><ArrowRight size={18}/></button></div></div></Reveal>
 <div className="destination-rail scrollbar-none" ref={rail}>{destinations.map((d,i)=><a href={`/destination/${d.id}`} key={d.id} className="destination-panel"><TravelImage image={d.image}/><div className="destination-scrim"/><div className="destination-top"><span>{String(i+1).padStart(2,"0")} / THE COLLECTION</span><span>{d.temperature}</span></div><div className="destination-caption"><p className="eyebrow">{d.country}</p><h3>{d.city}</h3><p>{d.note}</p><div className="destination-bottom"><span><small>JOURNEYS FROM</small>₹{d.startingPrice.toLocaleString("en-IN")}</span><span className="round-arrow"><ArrowUpRight size={21}/></span></div><span className="destination-duration">{d.travelDuration} · Explore {d.city}</span></div></a>)}</div><p className="preview-note">A little inspiration: sample journeys and indicative prices. Live availability coming soon.</p></section>;
}
