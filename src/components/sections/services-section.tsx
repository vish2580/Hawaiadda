import { ArrowUpRight, BedDouble, CarFront, Compass, Heart, Plane, Sparkles, Users } from "lucide-react";

const servicesList = [
  {
    id: "flights-trains",
    title: "Flights & Train Bookings",
    description: "Travel arrangements made simple.",
    icon: Plane,
    tag: "Ticketing & Logistics",
    details: "Domestic & international flight tickets, Tatkal & confirmed train reservations with best route advice.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Airplane flying above clouds during sunset"
  },
  {
    id: "hotels-resorts",
    title: "Hotels & Resorts",
    description: "Stay options based on your preferences and budget.",
    icon: BedDouble,
    tag: "Verified Stays",
    details: "Handpicked boutique hotels, luxury resorts, cozy homestays, and budget accommodations.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Luxury resort swimming pool overlooking twilight sky"
  },
  {
    id: "tours",
    title: "Domestic & International Tours",
    description: "Explore India and destinations around the world.",
    icon: Compass,
    tag: "Custom Packages",
    details: "Curated tours across Sikkim, Darjeeling, Bhutan, Nepal, Kashmir, Thailand, Vietnam, Bali and more.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Scenic overland tour through mountain landscapes"
  },
  {
    id: "transportation",
    title: "Transportation",
    description: "Cabs, transfers and local travel coordination.",
    icon: CarFront,
    tag: "Transfers & Cabs",
    details: "Airport pickups/drops (Bagdogra, Guwahati, etc.), reliable outstation cabs, and local sightseeing vehicles.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Car driving along scenic mountain highway"
  },
  {
    id: "honeymoon",
    title: "Honeymoon & Couple Trips",
    description: "Trips planned around your special moments.",
    icon: Heart,
    tag: "Romantic Getaways",
    details: "Candlelight dinners, secluded viewpoints, luxury suites, and specially tailored romantic itineraries.",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Couple enjoying romantic sunset beach viewpoint"
  },
  {
    id: "family-corporate",
    title: "Family, Group & Corporate Travel",
    description: "Travel solutions for every kind of traveller.",
    icon: Users,
    tag: "Group Solutions",
    details: "Effortless group bookings, school excursions, corporate retreats, and fun family holidays.",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Group of travellers celebrating on mountain summit"
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-shell py-24 scroll-mt-20 border-b border-white/10 bg-obsidian relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-horizon/10 blur-[130px]" />

      <div className="mx-auto max-w-frame px-gutter relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-horizon/30 bg-horizon/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-horizon">
            <Sparkles className="size-3.5" />
            <span>SERVICES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-porcelain">
            Everything You Need to Travel
          </h2>
          <p className="text-smoke text-sm sm:text-base">
            From single tickets to complete all-inclusive holidays, we manage every detail so you can travel worry-free.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <a
                key={service.id}
                href="#enquiry"
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-[#0b0f17] p-6 sm:p-8 min-h-[340px] transition-all duration-500 hover:-translate-y-2 hover:border-horizon/60 hover:shadow-2xl hover:shadow-horizon/15"
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover object-center opacity-30 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-45"
                  />
                  {/* Layered Gradient Overlays for High Contrast & Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070a0f] via-[#070a0f]/85 to-[#070a0f]/60" />
                  <div className="absolute inset-0 bg-obsidian/40 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-20" />
                </div>

                {/* Content Container (Above Background) */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex size-13 items-center justify-center rounded-xl bg-horizon/20 border border-horizon/40 text-horizon shadow-md shadow-horizon/10 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-horizon group-hover:text-obsidian group-hover:border-transparent">
                        <Icon className="size-6 transition-colors" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-porcelain/90 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">
                        {service.tag}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-porcelain transition-colors group-hover:text-horizon">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-horizon/95">
                      {service.description}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-smoke/90">
                      {service.details}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-xs font-semibold text-porcelain/90 group-hover:text-horizon transition-colors">
                    <span>Enquire for this service</span>
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
