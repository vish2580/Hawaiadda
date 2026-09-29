import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { TravelImage } from '@/components/ui/travel-image';
import { destinations } from '@/data/travel-content';

const preferences = [
  { label: 'Escape', destination: 'bali' },
  { label: 'Adventure', destination: 'leh' },
  { label: 'Luxury', destination: 'dubai' },
  { label: 'Romance', destination: 'maldives' },
  { label: 'Discovery', destination: 'kyoto' },
  { label: 'Relax', destination: 'zanzibar' },
];

export function PersonalizedTravel() {
  const [selected, setSelected] = useState(preferences[0]);
  const destination = destinations.find(d => d.id === selected.destination) ?? destinations[0];
  return <section id="personalized" className="section-shell">
    <div className="grid overflow-hidden border border-white/15 lg:grid-cols-2">
      <div className="relative min-h-[430px]">
        <TravelImage key={destination.id} image={destination.image} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute bottom-9 left-9 right-9" aria-live="polite">
          <p className="eyebrow">YOUR NEXT CHAPTER</p>
          <h3 className="mt-3 text-4xl">{destination.city}</h3>
          <p className="mt-3 text-sm text-white/80">{destination.note}</p>
        </div>
      </div>
      <div className="p-7 sm:p-12">
        <p className="eyebrow">FOLLOW A FEELING</p>
        <h2 className="mt-5 text-5xl leading-tight tracking-[-.05em]">Your kind<br />of journey.</h2>
        <p className="mt-6 text-sm leading-7 text-smoke">Some travel to get lost. Some travel to find themselves. What’s your mood?</p>
        <div className="my-8 flex flex-wrap gap-3" aria-label="Your travel mood">
          {preferences.map(p => <button key={p.label} type="button" aria-pressed={selected.label === p.label} onClick={() => setSelected(p)} className={`min-h-11 border px-4 text-sm ${selected.label === p.label ? 'border-horizon bg-horizon/10 text-horizon' : 'border-white/20 text-smoke hover:text-white'}`}>{p.label}</button>)}
        </div>
        <a className="primary-link" href={`/destination/${destination.id}`}>Explore {destination.city} <ArrowUpRight size={17} /></a>
        <p className="mt-5 text-xs text-smoke">Curated inspiration, shaped by your mood.</p>
      </div>
    </div>
  </section>;
}
