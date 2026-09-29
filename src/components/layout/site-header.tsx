import { Compass, MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#enquiry" },
] as const;

const WHATSAPP_URL = "https://wa.me/919800000000?text=Hi%20Dream%20Hawai%20Adda,%20I%20would%20like%20to%20plan%20my%20next%20journey!";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
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
        <a href="#top" className="font-display text-lg font-semibold tracking-[0.12em] text-porcelain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion flex items-center">
          <Compass className="mr-2 size-6 text-horizon animate-pulse" aria-hidden="true" />
          <span>HAWAIADDA</span>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-porcelain/75 transition-colors hover:text-horizon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right Corner WhatsApp Button */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-2 text-xs font-semibold text-emerald-300 shadow-lg shadow-emerald-950/50 backdrop-blur-md transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-600 hover:text-white hover:shadow-emerald-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 group-hover:bg-white group-hover:text-emerald-600 transition-colors">
              <MessageCircle className="size-3.5 fill-current" />
            </span>
            <span>WhatsApp · Click to message</span>
            <ArrowUpRight className="size-3.5 opacity-70 group-hover:opacity-100 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <Button
          ref={menuButton}
          variant="ghost"
          size="icon"
          className="lg:hidden text-porcelain"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="h-[calc(100dvh-4.75rem)] overflow-y-auto border-t border-white/10 bg-obsidian px-gutter py-8 lg:hidden">
          <div className="flex flex-col items-start gap-2">
            {navLinks.map(({ label, href }, index) => (
              <a
                ref={index === 0 ? firstMobileLink : undefined}
                key={label}
                href={href}
                onClick={close}
                className="flex min-h-14 w-full items-center justify-between border-b border-white/10 text-lg font-medium text-porcelain transition-colors hover:text-horizon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
              >
                <span>{label}</span>
                <ArrowUpRight className="size-4 text-smoke" />
              </a>
            ))}

            <div className="mt-6 w-full">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/60 transition-all hover:bg-emerald-500 active:scale-[0.98]"
              >
                <MessageCircle className="size-4 fill-current" />
                <span>WhatsApp · Click to message</span>
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
