import { ArrowUpRight, BedDouble, CarFront, Compass, Heart, Plane, Sparkles, Users } from "lucide-react";

const servicesList = [
  {
    id: "flights-trains",
    title: "Flights & Train Bookings",
    description: "Travel arrangements made simple.",
    icon: Plane,
    tag: "Ticketing & Logistics",
    details: "Domestic & international flight tickets, Tatkal & confirmed train reservations with best route advice."
  },
  {
    id: "hotels-resorts",
    title: "Hotels & Resorts",
    description: "Stay options based on your preferences and budget.",
    icon: BedDouble,
    tag: "Verified Stays",
    details: "Handpicked boutique hotels, luxury resorts, cozy homestays, and budget accommodations."
  },
  {
    id: "tours",
    title: "Domestic & International Tours",
    description: "Explore India and destinations around the world.",
    icon: Compass,
    tag: "Custom Packages",
    details: "Curated tours across Sikkim, Darjeeling, Bhutan, Nepal, Kashmir, Thailand, Vietnam, Bali and more."
  },
  {
    id: "transportation",
    title: "Transportation",
    description: "Cabs, transfers and local travel coordination.",
    icon: CarFront,
    tag: "Transfers & Cabs",
    details: "Airport pickups/drops (Bagdogra, Guwahati, etc.), reliable outstation cabs, and local sightseeing vehicles."
  },
  {
    id: "honeymoon",
    title: "Honeymoon & Couple Trips",
    description: "Trips planned around your special moments.",
    icon: Heart,
    tag: "Romantic Getaways",
    details: "Candlelight dinners, secluded viewpoints, luxury suites, and specially tailored romantic itineraries."
  },
  {
    id: "family-corporate",
    title: "Family, Group & Corporate Travel",
    description: "Travel solutions for every kind of traveller.",
    icon: Users,
    tag: "Group Solutions",
    details: "Effortless group bookings, school excursions, corporate retreats, and fun family holidays."
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-shell py-24 scroll-mt-20 border-b border-white/10 bg-obsidian">
      <div className="mx-auto max-w-frame px-gutter">
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
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-horizon/50 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-horizon/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex size-13 items-center justify-center rounded-xl bg-horizon/15 border border-horizon/30 text-horizon transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-6" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-smoke/80 rounded-full border border-white/10 px-2.5 py-1">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-porcelain transition-colors group-hover:text-horizon">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-horizon/90">
                    {service.description}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-smoke/80">
                    {service.details}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-porcelain/80 group-hover:text-horizon">
                  <span>Enquire for this service</span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
