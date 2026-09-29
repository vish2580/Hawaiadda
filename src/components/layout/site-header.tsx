import { Compass, ChevronDown, LogIn, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { travelServices } from "@/data/travel-content";
import { cn } from "@/lib/utils";

const links = [
  ["Explore", "/destinations"],
  ["Flights", "/flights"],
  ["Hotels", "/hotels"],
  ["Trains", "/trains"],
  ["Holidays", "/holidays"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [serviceMenu, setServiceMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMobileLink.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        const nav = document.getElementById("mobile-navigation");
        const links = nav?.querySelectorAll<HTMLAnchorElement>("a[href]");
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === menuButton.current) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); menuButton.current?.focus(); }
      }
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [open]);

  const close = () => setOpen(false);
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b transition-all duration-300", scrolled || open ? "border-white/10 bg-obsidian/92 backdrop-blur-xl" : "border-transparent bg-transparent")}>
      <div className="mx-auto flex h-[4.75rem] max-w-frame items-center justify-between px-gutter">
        <a href="/" className="font-display text-lg font-semibold tracking-[0.12em] text-porcelain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"><Compass className="inline-block mr-2 size-6 text-horizon" aria-hidden="true" /> HAWAIADDA</a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => <a key={label} href={href} className="text-sm text-porcelain/70 transition-colors hover:text-porcelain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion">{label}</a>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" className="h-10 min-h-10"><a href="/login"><LogIn className="size-4" />Login</a></Button>
          <Button asChild variant="outline" className="h-10 min-h-10"><a href="/flights">Get Started</a></Button>
          <div className="relative">
            <Button variant="ghost" className="h-10 min-h-10" aria-expanded={serviceMenu} aria-controls="service-menu" onClick={() => setServiceMenu((value) => !value)}>Menu <ChevronDown className={cn("size-4 transition-transform", serviceMenu && "rotate-180")} /></Button>
            {serviceMenu && <div id="service-menu" className="absolute right-0 top-[calc(100%+1rem)] w-72 border border-white/15 bg-[#0b0d10] p-2 shadow-2xl">{travelServices.map(({ id, label, icon: Icon }) => <a key={id} href={id === "packages" ? "/holidays" : `/${id}`} onClick={() => setServiceMenu(false)} className="flex min-h-11 items-center gap-3 px-3 text-sm text-porcelain/70 hover:bg-white/[0.06] hover:text-porcelain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"><Icon className="size-4 text-horizon" />{label}</a>)}</div>}
          </div>
        </div>
        <Button ref={menuButton} variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="h-[calc(100dvh-4.75rem)] overflow-y-auto border-t border-white/10 bg-obsidian px-gutter py-8 lg:hidden">
          <div className="flex flex-col items-start gap-1">
            {links.map(([label, href], index) => <a ref={index === 0 ? firstMobileLink : undefined} key={label} href={href} onClick={close} className="flex min-h-14 w-full items-center border-b border-white/10 text-xl text-porcelain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion">{label}</a>)}
            <div className="mt-8 grid w-full grid-cols-2 gap-3"><Button asChild variant="outline"><a href="/login" onClick={close}>Login</a></Button><Button asChild><a href="/flights" onClick={close}>Get Started</a></Button></div>
            <p className="mt-8 text-xs text-smoke">More services</p><div className="mt-3 flex flex-wrap gap-2">{travelServices.map(({ id, label }) => <a key={id} href={id === "packages" ? "/holidays" : `/${id}`} onClick={close} className="border border-white/15 px-3 py-2 text-sm text-porcelain/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion">{label}</a>)}</div>
          </div>
        </nav>
      )}
    </header>
  );
}
