import { ArrowUpRight, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#07090c] pt-16 pb-12 text-smoke">
      <div className="mx-auto max-w-frame px-gutter">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] pb-14 border-b border-white/10">
          <div>
            <a href="/" aria-label="Dream Hawai Adda home" className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion">
              <img
                src="/images/dream-hawai-adda-logo.png"
                alt="Dream Hawai Adda — Ek Safar Humare Saath"
                width="1656"
                height="950"
                className="h-16 w-auto object-contain"
              />
            </a>
            <p className="mt-3 text-base font-medium text-horizon">Travel. Planned Your Way.</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-smoke/90">
              Your premier travel agency and tour operator helping you plan and book domestic and international journeys — from flights and hotels to complete holidays and transportation.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-porcelain font-medium">
              <MapPin className="size-4 text-horizon shrink-0" />
              <span>Siliguri, West Bengal, India</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-porcelain">Quick Navigation</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="/" className="transition hover:text-horizon">Home</a></li>
              <li><a href="/about" className="transition hover:text-horizon">About Us</a></li>
              <li><a href="/services" className="transition hover:text-horizon">Services</a></li>
              <li><a href="/destinations" className="transition hover:text-horizon">Destinations</a></li>
              <li><a href="/how-we-work" className="transition hover:text-horizon">How We Work</a></li>
              <li><a href="/book-your-trip" className="transition hover:text-horizon">Plan Your Trip</a></li>
              <li><a href="/contact" className="transition hover:text-horizon">Contact Us</a></li>
            </ul>

            {/* Little Map in Quick Navigation */}
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-2.5 transition-all hover:border-horizon/40">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-porcelain">
                  <MapPin className="size-3.5 text-horizon" /> Dream Creations
                </span>
                <a
                  href="https://www.google.com/maps/place/Dream+Creations/@26.7264651,88.4311389,17z/data=!3m1!5s0x39e4410f02d9df5f:0x4ed4d502d771cad2!4m14!1m7!3m6!1s0x39e441747567c84b:0x53c3c3763bcb076d!2sDream+Creations!8m2!3d26.7264603!4d88.4337138!16s%2Fg%2F11sc75rwh4!3m5!1s0x39e441747567c84b:0x53c3c3763bcb076d!8m2!3d26.7264603!4d88.4337138!16s%2Fg%2F11sc75rwh4?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-horizon hover:underline"
                >
                  View Map <ArrowUpRight className="size-3" />
                </a>
              </div>
              <div className="relative h-28 w-full overflow-hidden rounded-lg bg-black/40">
                <iframe
                  title="Dream Creations Location Map"
                  src="https://maps.google.com/maps?q=26.7264603,88.4337138+(Dream+Creations)&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="h-full w-full border-0 grayscale contrast-125 opacity-85 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-porcelain">Connect With Us</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="tel:+919933840222" className="flex items-center gap-2.5 transition hover:text-horizon">
                  <Phone className="size-4 text-horizon" /> +91 99338 40222
                </a>
              </li>
              <li>
                <a href="https://wa.me/919933840222" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition hover:text-emerald-400">
                  <MessageCircle className="size-4 text-emerald-400" /> WhatsApp Chat
                </a>
              </li>
              <li>
                <a href="mailto:dreamhawaiiadda@gmail.com" className="flex items-center gap-2.5 transition hover:text-horizon">
                  <Mail className="size-4 text-horizon" /> dreamhawaiiadda@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/dreamhawaiadda/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition hover:text-pink-400">
                  <Instagram className="size-4 text-pink-400" /> @dreamhawaiadda
                </a>
              </li>
            </ul>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <span className="text-xs text-smoke">Ready to travel?</span>
              <a href="/book-your-trip" className="mt-1 flex items-center justify-between text-sm font-semibold text-horizon hover:underline">
                Talk to Our Travel Expert <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-smoke/70">
          <p>© {new Date().getFullYear()} Dream Hawai Adda. All rights reserved. 📍 Siliguri, West Bengal.</p>
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-1.5 transition hover:text-horizon">
              Back to top <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

