import { Instagram, ArrowUpRight, Mail, Phone, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';
import { PageExperienceHero } from '@/components/ui/page-experience-hero';
import { pageExperiences } from '@/data/page-experiences';
import { Reveal } from '@/components/animations/reveal';
import { navLinks } from '@/data/navigation';
import { whyUsPoints, howItWorksSteps } from '@/data/travel-content';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesSection } from '@/components/sections/services-section';
import { DestinationsSection } from '@/components/sections/destinations-section';
import { EnquirySection } from '@/components/sections/enquiry-section';

export function CompanyPage({ path }: { path: string }) {
  const title = navLinks.find(link => link.href === path)?.label ?? 'HawaiAdda';
  useEffect(() => { document.title = `${title} — Dream Hawai Adda`; }, [title]);
  const why = path === '/why-choose-us';
  const how = path === '/how-we-work';
  return <div className="company-experience pb-16">
    <PageExperienceHero path={path as keyof typeof pageExperiences} title={title}/>
    <div id="page-content" className="experience-content mx-auto max-w-frame px-gutter">
      {(why || how) && <><h2 className="mt-8 max-w-3xl text-2xl sm:text-4xl leading-tight text-horizon">{why ? 'Your Trip. Our Expertise.' : 'Tell Us Your Plans. We’ll Take It From There.'}</h2>
        <div className={`experience-details ${how ? "experience-steps" : "experience-benefits"}`}>
          {(why ? whyUsPoints.map(p => ({ title:p.title, description:p.description, number:p.number, icon:p.icon })) : howItWorksSteps.map(p => ({ ...p, number:p.step }))).map(({title:heading,description,number,icon:Icon}) => <Reveal key={heading} className="experience-detail"><article>
            <div className="flex items-center gap-4 text-horizon"><Icon size={24}/><span className="text-sm">{number}</span></div>
            <h3 className="mt-5 text-xl">{heading}</h3><p className="mt-3 text-smoke leading-7">{description}</p>
          </article></Reveal>)}
        </div><a className="primary-link mt-8" href="/book-your-trip">Talk to Our Travel Expert <ArrowUpRight size={18}/></a></>}
      {path === '/contact' && <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <a href="tel:+919933840222" className="contact-experience info-panel !mt-0"><Phone className="text-horizon"/><h2 className="mt-5 text-xl">Phone Call</h2><p>+91 99338 40222</p></a>
        <a href="mailto:dreamhawaiiadda@gmail.com" className="contact-experience info-panel !mt-0 break-words"><Mail className="text-horizon"/><h2 className="mt-5 text-xl">Email Us</h2><p>dreamhawaiiadda@gmail.com</p></a>
        <a href="https://wa.me/919933840222" target="_blank" rel="noopener noreferrer" className="contact-experience info-panel !mt-0"><MessageCircle className="text-horizon"/><h2 className="mt-5 text-xl">WhatsApp</h2><p>Talk to our travel expert <ArrowUpRight className="inline" size={16}/></p></a>
        <a href="https://www.instagram.com/dreamhawaiadda/" target="_blank" rel="noopener noreferrer" className="contact-experience info-panel !mt-0"><Instagram className="text-horizon"/><h2 className="mt-5 text-xl">Instagram</h2><p>@dreamhawaiadda</p><ArrowUpRight size={16}/></a>
      </div>}
    </div>
    {path === '/about' && <AboutSection/>}
    {path === '/services' && <ServicesSection/>}
    {path === '/destinations' && <DestinationsSection/>}
    {(path === '/book-your-trip' || path === '/plan-your-trip') && <EnquirySection/>}
  </div>;
}
