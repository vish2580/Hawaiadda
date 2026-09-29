import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StructuredData } from "@/components/layout/structured-data";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { DestinationsSection } from "@/components/sections/destinations-section";
import { WhyUsSection } from "@/components/sections/why-us-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HorizonHeroSection } from "@/components/ui/horizon-hero-section";
import { FlightCursor } from "@/components/ui/flight-cursor";
import { Preloader } from "@/components/ui/preloader";
import { JourneyProgress } from "@/components/travel/journey-progress";
import { AiAssistant } from "@/components/travel/ai-assistant";
import { RoutePage } from "@/components/pages/route-page";

export default function App() {
  return (
    <>
      <StructuredData />
      <FlightCursor />
      <Preloader />
      <a
        href="#main"
        className="fixed left-3 top-3 z-[130] -translate-y-24 bg-porcelain px-4 py-2 text-sm font-semibold text-obsidian focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <JourneyProgress />

      <main id="main">
        {window.location.pathname !== "/" ? (
          <RoutePage />
        ) : (
          <>
            {/* HERO (Includes Top Booking Console) */}
            <HorizonHeroSection />

            {/* ENQUIRY / BOARDING PASS FORM (Positioned right after Booking) */}
            <EnquirySection />

            {/* ABOUT */}
            <AboutSection />

            {/* SERVICES */}
            <ServicesSection />

            {/* DESTINATIONS */}
            <DestinationsSection />

            {/* WHY US */}
            <WhyUsSection />

            {/* HOW IT WORKS */}
            <HowItWorksSection />

            {/* FINAL CTA */}
            <FinalCtaSection />
          </>
        )}
        <span id="login" className="sr-only" aria-hidden="true">
          Account sign-in requires an authentication service and is not connected in this preview.
        </span>
      </main>
      <SiteFooter />
      <AiAssistant />
    </>
  );
}
