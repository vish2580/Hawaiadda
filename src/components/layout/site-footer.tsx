import { ArrowUpRight, Compass, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#07090c] pt-16 pb-12 text-smoke">
      <div className="mx-auto max-w-frame px-gutter">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] pb-14 border-b border-white/10">
          <div>
            <a href="#top" className="flex items-center gap-3 text-2xl font-bold tracking-wider text-porcelain">
              <Compass className="size-7 text-horizon animate-pulse" />
              <span>DREAM HAWAI ADDA</span>
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
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#top" className="transition hover:text-horizon">Home</a></li>
              <li><a href="#about" className="transition hover:text-horizon">About Us</a></li>
              <li><a href="#destinations" className="transition hover:text-horizon">Destinations</a></li>
              <li><a href="#services" className="transition hover:text-horizon">Our Services</a></li>
              <li><a href="#why-us" className="transition hover:text-horizon">Why Choose Us</a></li>
              <li><a href="#how-it-works" className="transition hover:text-horizon">How It Works</a></li>
              <li><a href="#enquiry" className="transition hover:text-horizon">Contact & Enquiry</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-porcelain">Connect With Us</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="tel:+919800000000" className="flex items-center gap-2.5 transition hover:text-horizon">
                  <Phone className="size-4 text-horizon" /> Phone Call
                </a>
              </li>
              <li>
                <a href="https://wa.me/919800000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition hover:text-emerald-400">
                  <MessageCircle className="size-4 text-emerald-400" /> WhatsApp Chat
                </a>
              </li>
              <li>
                <a href="mailto:info@dreamhawaiadda.com" className="flex items-center gap-2.5 transition hover:text-horizon">
                  <Mail className="size-4 text-horizon" /> Email Us
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition hover:text-pink-400">
                  <Instagram className="size-4 text-pink-400" /> Instagram
                </a>
              </li>
            </ul>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <span className="text-xs text-smoke">Ready to travel?</span>
              <a href="#enquiry" className="mt-1 flex items-center justify-between text-sm font-semibold text-horizon hover:underline">
                Talk to Our Travel Expert <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-smoke/70">
          <p>© {new Date().getFullYear()} Dream Hawai Adda. All rights reserved. 📍 Siliguri, West Bengal.</p>
          <div className="flex items-center gap-6">
            <a href="#top" className="flex items-center gap-1.5 transition hover:text-horizon">
              Back to top <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

