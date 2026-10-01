import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useEffect } from 'react';
import { BookingConsole } from '@/components/travel/booking-console';
import { DestinationDiscovery } from '@/components/sections/destination-discovery';
import { HotelShowcase } from '@/components/sections/hotel-showcase';
import { HolidayPackages } from '@/components/sections/holiday-packages';
import { TravelStories } from '@/components/sections/travel-stories';
import { Deals } from '@/components/sections/deals-section';
import { PlanYourEscape } from '@/components/sections/plan-your-escape';
import { destinations, travelStories } from '@/data/travel-content';
import type { TravelServiceId } from '@/types/travel';
const serviceNames:Record<string,TravelServiceId>={flights:'flights',hotels:'hotels',trains:'trains',buses:'buses',cabs:'cabs',holidays:'packages'};
const headlines:Record<string,string>={flights:'Meet your next horizon.',hotels:'Somewhere worth staying.',trains:'Take the scenic route.',buses:'The journey is part of it.',cabs:'From arrival to anywhere.',holidays:'Less planning. More living.'};
const information:Record<string,[string,string]>={
 about:['A world beyond the everyday.','HawaiAdda, a Dream company, brings flights, stays, journeys and experiences into one place. We believe a trip begins with curiosity. This is an early look at that world.'],
 contact:['Let’s talk travel.','Our contact channels are being prepared. Customer support and booking services are not open in this preview.'],
 login:['Your next chapter.','Accounts are coming soon. You can explore destinations and plan a journey without signing in.'],
 careers:['Build a world worth exploring.','Career opportunities will be published here when recruitment opens.'],
 'partner-with-us':['Better journeys, together.','Our partner programme is in development. Applications are not open yet.'],
 'help-center':['A little direction.','Browse destinations, select your travel mood, or prepare a search. This preview does not make reservations or accept payments.'],
 cancellation:['Change of plans?','There are no active reservations in this preview. Cancellation rules will be displayed with live supplier offers before booking.'],
 refunds:['A clear way back.','No payments are collected in this preview. Refund terms will be published when booking becomes available.'],
 terms:['Terms of use','This experience is a frontend preview. Sample prices and travel ideas are illustrative, not offers to book. Full service terms will be published before launch.'],
 privacy:['Your privacy','Trip enquiries are sent to our travel team and stored in Google Sheets when you submit the form. The WhatsApp option opens your enquiry details in WhatsApp, where you choose whether to send them. Search and assistant previews remain local. Travel photographs and fonts are loaded from external providers.'],
};
export function RoutePage(){
 const slug=decodeURIComponent(window.location.pathname.slice(1));
 const destination=slug.startsWith('destination/')?destinations.find(d=>d.id===slug.split('/')[1]):undefined;
 const story=slug.startsWith("story/")?travelStories.find(s=>s.id===slug.split("/")[1]):undefined;
 const service=serviceNames[slug];
 const social=['instagram','youtube','facebook','linkedin'].includes(slug);
 const info=information[slug] ?? (social?['Stay curious.','Official social channels will be linked here when the brand launches.']:['This path is still being explored.','Head back to the world of HawaiAdda and find your next destination.']);
 const title=story?story.title:destination?destination.city:headlines[slug] ?? ({destinations:'Where will you go next?',deals:'The world, for less.',stories:'Stories worth travelling for.',experiences:'Come back with a story.'}[slug]) ?? info[0];
 useEffect(()=>{document.title=`${title} — HawaiAdda`; document.querySelector('meta[name="description"]')?.setAttribute("content", destination ? `${destination.note} Explore ${destination.city} with HawaiAdda.` : `${title} Explore flights, stays and journeys with HawaiAdda.`);},[title,destination]);
 return <div className="route-page section-shell"><a href="/" className="inline-flex items-center gap-2 text-xs text-smoke"><ArrowLeft size={14}/> Back to the world</a><p className="eyebrow mt-9">HAWAIADDA · {destination?destination.country:slug.replaceAll('-',' ')}</p><h1>{title}</h1>
 {story?<article><p className="eyebrow">{story.category} · Editorial preview</p><img className="route-photo" src={story.image.src} alt={story.image.alt}/><p className="route-intro">{story.excerpt}</p><p className="route-intro mt-6">The best journeys leave a little room for curiosity. Take an unfamiliar turn, linger over a meal and give yourself permission to move at a different pace. A destination becomes your own through the small things you notice along the way.</p><p className="route-intro mt-6">Start with one place you want to understand, rather than a list you need to finish. Build your days around a few meaningful moments, and leave the rest open. This is a taste of the HawaiAdda journal. More field notes are on their way.</p><a className="secondary-link mt-8" href="/destinations">Find your next story <ArrowUpRight size={16}/></a></article>:destination?<><p className="route-intro">{destination.note}</p><img className="route-photo" src={destination.image.src} alt={destination.image.alt}/><div className="flex flex-wrap justify-between gap-6 border-y border-white/20 py-6"><span>From ₹{destination.startingPrice.toLocaleString('en-IN')}<small className="block text-xs text-smoke">Indicative journey price</small></span><span>{destination.travelDuration}</span><span>{destination.temperature}<small className="block text-xs text-smoke">Seasonal guide</small></span><a className="secondary-link" href={`/flights?destination=${destination.city}`}>Plan this journey <ArrowUpRight size={17}/></a></div><p className="route-intro mt-8">Leave space for the unexpected. Start with your travel dates, then find the rhythm that makes {destination.city} yours.</p></>:service?<><p className="route-intro">Choose your direction. We’ll help you take the first step.</p><BookingConsole initialService={service}/>{slug==='hotels'&&<HotelShowcase/>}{slug==='holidays'&&<HolidayPackages/>}</>:slug==='destinations'?<DestinationDiscovery/>:slug==='deals'?<Deals/>:slug==='stories'?<TravelStories/>:slug==='experiences'?<PlanYourEscape/>:<div className="info-panel"><p>{info[1]}</p><a className="secondary-link" href="/destinations">Explore journeys <ArrowUpRight size={16}/></a></div>}
 </div>;
}
