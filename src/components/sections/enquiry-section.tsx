import { Calendar, CheckCircle2, ChevronDown, Loader2, Mail, MapPin, MessageCircle, Phone, Plane, Send, Ticket, User, Users } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface DestinationAirport {
  code: string;
  name: string;
  region: string;
}

const destinationAirports: Record<string, DestinationAirport> = {
  "Sikkim": { code: "SKM", name: "Gangtok & North Sikkim", region: "Himalayas" },
  "Darjeeling": { code: "DAR", name: "Darjeeling Tea Hills", region: "West Bengal" },
  "Bhutan": { code: "PBH", name: "Paro & Thimphu", region: "Bhutan Kingdom" },
  "Nepal": { code: "KTM", name: "Kathmandu & Pokhara", region: "Nepal" },
  "Kashmir": { code: "SXR", name: "Srinagar & Gulmarg", region: "Kashmir Valley" },
  "Thailand": { code: "BKK", name: "Bangkok & Phuket", region: "Thailand" },
  "Vietnam": { code: "DAD", name: "Da Nang & Ha Long", region: "Vietnam" },
  "Bali": { code: "DPS", name: "Denpasar & Ubud", region: "Indonesia" },
  "Maldives": { code: "MLE", name: "Malé Atoll Resorts", region: "Maldives" },
  "Dubai": { code: "DXB", name: "Dubai International", region: "UAE" },
  "Other Destination": { code: "ANY", name: "Custom Holiday Route", region: "Worldwide" },
};

export function EnquirySection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "Sikkim",
    travelDate: "",
    travellers: "2 Travellers (Couple / Duo)",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [website, setWebsite] = useState("");
  const request = useRef<{ data: string; id: string } | null>(null);
  const submitting = useRef(false);
  const successHeading = useRef<HTMLHeadingElement>(null);

  const activeDest = destinationAirports[formData.destination] || destinationAirports["Sikkim"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setIsSubmitting(true);
    setSubmitError("");
    const data = JSON.stringify(formData);
    // Reuse the ID on retry so a delayed response cannot create a second row.
    if (request.current?.data !== data) {
      request.current = { data, id: crypto.randomUUID() };
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch("/api/enquiry.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, requestId: request.current.id, website }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error("Unconfirmed submission");
      setSubmitted(true);
      requestAnimationFrame(() => successHeading.current?.focus());
    } catch {
      setSubmitError("We couldn’t confirm your enquiry was saved. Please retry, or send your details using WhatsApp below.");
    } finally {
      clearTimeout(timeout);
      submitting.current = false;
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Dream Hawai Adda! ✈️ Here is my Boarding Pass Enquiry:\n\n*Name:* ${formData.name || "Traveller"}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Destination:* ${formData.destination} (${activeDest.code})\n*Travel Date:* ${formData.travelDate}\n*Travellers:* ${formData.travellers}\n*Notes:* ${formData.notes || "None"}\n\nPlease help me plan my trip!`
  );

  return (
    <section id="enquiry" className="section-shell py-20 scroll-mt-20 border-b border-white/10 bg-gradient-to-b from-[#06080b] via-[#090d13] to-[#06080b]">
      <div className="mx-auto max-w-frame px-gutter">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-horizon/30 bg-horizon/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-horizon">
              <Ticket className="size-3.5" />
              <span>OFFICIAL BOARDING PASS & TRIP ENQUIRY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-porcelain">
              Have a Trip in Mind? <br />
              <span className="text-horizon">Get Your Boarding Pass</span>
            </h2>
            <p className="text-smoke text-sm sm:text-base leading-relaxed">
              Tell us where you want to go and our travel team will help you plan. Submit your enquiry, then continue the conversation on WhatsApp.
            </p>
          </div>

        </div>

        {/* BOARDING PASS TICKET CONTAINER */}
        <div className="relative mx-auto max-w-5xl rounded-3xl border border-white/20 bg-gradient-to-br from-[#11161f] via-[#0d1117] to-[#0a0d12] shadow-[0_20px_70px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Top Boarding Pass Header Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 bg-gradient-to-r from-[#17202d] to-[#0f151f] px-6 sm:px-8 py-3.5 text-xs text-porcelain">
            <div className="flex items-center gap-3">
              <div className="flex size-7 items-center justify-center rounded-md bg-horizon/20 border border-horizon/40 text-horizon">
                <Plane className="size-4" />
              </div>
              <span className="font-display font-extrabold tracking-[0.18em] text-white">
                DREAM HAWAI ADDA AIRWAYS
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px] tracking-wider text-horizon">
              <span>FLIGHT: <strong className="text-white">HA-882</strong></span>
              <span>•</span>
              <span>GATE: <strong className="text-white">01</strong></span>
              <span>•</span>
              <span className="hidden sm:inline">CLASS: <strong className="text-white">FIRST CLASS HOLIDAY</strong></span>
              <span>•</span>
              <span className="rounded bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-emerald-400 font-semibold">
                BOARDING PASS
              </span>
            </div>
          </div>

          {/* Submitted State View */}
          {submitted ? (
            <div className="p-8 sm:p-14 text-center space-y-6">
              <div className="flex size-20 items-center justify-center rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 text-emerald-400 mx-auto animate-bounce">
                <CheckCircle2 className="size-10" />
              </div>

              <div className="space-y-2">
                <span className="inline-block rounded-full bg-horizon/15 border border-horizon/30 px-3.5 py-1 text-xs font-mono font-bold tracking-wider text-horizon uppercase">
                  ENQUIRY RECEIVED
                </span>
                <h3 ref={successHeading} tabIndex={-1} className="font-display text-3xl sm:text-4xl font-bold text-porcelain">
                  Welcome Aboard, {formData.name || "Traveller"}!
                </h3>
                <p className="text-sm sm:text-base text-smoke max-w-lg mx-auto leading-relaxed">
                  Your trip enquiry for <strong className="text-horizon">{formData.destination}</strong> ({activeDest.code}) on <strong>{formData.travelDate || "your chosen date"}</strong> has been submitted.
                </p>
                <p className="text-sm text-smoke">Your details have been saved for our team. Tap below, then press Send in WhatsApp to share your enquiry there too.</p>
              </div>

              {/* Boarding Pass Receipt Summary */}
              <div className="mx-auto max-w-md rounded-2xl border border-white/15 bg-white/[0.03] p-5 text-left font-mono text-xs text-smoke space-y-2">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>PASSENGER</span>
                  <strong className="text-porcelain">{formData.name || "Traveller"}</strong>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>ROUTE</span>
                  <strong className="text-horizon">IXB (Siliguri) ➔ {activeDest.code} ({formData.destination})</strong>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>TRAVELLERS</span>
                  <strong className="text-porcelain">{formData.travellers}</strong>
                </div>
                <div className="flex justify-between">
                  <span>CONTACT</span>
                  <strong className="text-porcelain">{formData.phone}</strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-obsidian font-bold px-8 shadow-xl shadow-emerald-500/20">
                  <a href={`https://wa.me/919933840222?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 size-5" /> Chat on WhatsApp with Expert
                  </a>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => { setSubmitted(false); setSubmitError(""); }}
                  className="border-white/20 text-xs"
                >
                  Back to enquiry
                </Button>
              </div>
            </div>
          ) : (
            /* Active Interactive Boarding Pass Form */
            <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
              <div className="hidden" aria-hidden="true">
                <label htmlFor="enquiry-website">Leave this field empty</label>
                <input id="enquiry-website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
              </div>
              <fieldset disabled={isSubmitting} className="min-w-0">
              <div className="grid lg:grid-cols-12 relative">
                {/* Left/Main Ticket Area (Cols 1 to 8) */}
                <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
                  {/* Route Visualizer */}
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                    <div className="text-left">
                      <span className="font-mono text-xs text-smoke block">ORIGIN / BASE</span>
                      <span className="font-display text-2xl sm:text-3xl font-black tracking-wider text-porcelain">
                        IXB
                      </span>
                      <span className="text-xs text-smoke block">Siliguri / Bagdogra</span>
                    </div>

                    <div className="flex flex-col items-center px-4 flex-1">
                      <span className="text-[10px] font-mono tracking-widest text-horizon uppercase mb-1">
                        DREAM JOURNEY
                      </span>
                      <div className="relative flex items-center justify-center w-full max-w-[140px] sm:max-w-[200px]">
                        <div className="w-full border-t border-dashed border-horizon/60" />
                        <Plane className="absolute text-horizon size-4 rotate-90" />
                      </div>
                      <span className="text-[10px] text-smoke mt-1 font-mono">NON-STOP LUXURY</span>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xs text-smoke block">DESTINATION</span>
                      <span className="font-display text-2xl sm:text-3xl font-black tracking-wider text-horizon">
                        {activeDest.code}
                      </span>
                      <span className="text-xs text-smoke block">{formData.destination}</span>
                    </div>
                  </div>

                  {/* Form Rows inside Boarding Pass */}
                  <div className="space-y-4">
                    {/* Row 1: Name & Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="enquiry-name" className="block font-mono text-[11px] font-bold uppercase tracking-wider text-smoke mb-1.5">
                          01 // PASSENGER NAME *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-smoke" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Aditi Sen"
                            id="enquiry-name" maxLength={120}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-porcelain placeholder:text-smoke/40 focus:border-horizon focus:outline-none focus:ring-1 focus:ring-horizon"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="enquiry-phone" className="block font-mono text-[11px] font-bold uppercase tracking-wider text-smoke mb-1.5">
                          02 // PHONE / WHATSAPP *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-smoke" />
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +91 98765 43210"
                            id="enquiry-phone" maxLength={30}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-porcelain placeholder:text-smoke/40 focus:border-horizon focus:outline-none focus:ring-1 focus:ring-horizon"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Email & Destination */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="enquiry-email" className="block font-mono text-[11px] font-bold uppercase tracking-wider text-smoke mb-1.5">
                          03 // PASSENGER EMAIL *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-smoke" />
                          <input
                            type="email"
                            required
                            placeholder="e.g. aditi@example.com"
                            id="enquiry-email" maxLength={254}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-porcelain placeholder:text-smoke/40 focus:border-horizon focus:outline-none focus:ring-1 focus:ring-horizon"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="enquiry-destination" className="block font-mono text-[11px] font-bold uppercase tracking-wider text-smoke mb-1.5">
                          04 // CHOOSE DESTINATION *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-smoke pointer-events-none" />
                          <select
                            id="enquiry-destination"
                            value={formData.destination}
                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                            className="w-full rounded-xl border border-white/15 bg-[#141820] py-2.5 pl-10 pr-8 text-sm text-porcelain focus:border-horizon focus:outline-none focus:ring-1 focus:ring-horizon appearance-none"
                          >
                            {Object.keys(destinationAirports).map((dest) => (
                              <option key={dest} value={dest} className="bg-[#141820] text-porcelain">
                                {dest} ({destinationAirports[dest].code})
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-smoke pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Travel Date & Travellers */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="enquiry-travelDate" className="block font-mono text-[11px] font-bold uppercase tracking-wider text-smoke mb-1.5">
                          05 // DEPARTURE DATE *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-smoke" />
                          <input
                            type="date"
                            required
                            id="enquiry-travelDate"
                            value={formData.travelDate}
                            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                            className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-porcelain focus:border-horizon focus:outline-none focus:ring-1 focus:ring-horizon"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="enquiry-travellers" className="block font-mono text-[11px] font-bold uppercase tracking-wider text-smoke mb-1.5">
                          06 // NUMBER OF TRAVELLERS *
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-smoke pointer-events-none" />
                          <select
                            id="enquiry-travellers"
                            value={formData.travellers}
                            onChange={(e) => setFormData({ ...formData, travellers: e.target.value })}
                            className="w-full rounded-xl border border-white/15 bg-[#141820] py-2.5 pl-10 pr-8 text-sm text-porcelain focus:border-horizon focus:outline-none focus:ring-1 focus:ring-horizon appearance-none"
                          >
                            <option value="1 Traveller (Solo)">1 Traveller (Solo)</option>
                            <option value="2 Travellers (Couple / Duo)">2 Travellers (Couple / Duo)</option>
                            <option value="3-5 Travellers (Family)">3-5 Travellers (Family)</option>
                            <option value="6-10 Travellers (Group)">6-10 Travellers (Group)</option>
                            <option value="10+ Travellers (Corporate)">10+ Travellers (Corporate)</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-smoke pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Preferences / Notes */}
                    <div>
                      <label htmlFor="enquiry-notes" className="block font-mono text-[11px] font-bold uppercase tracking-wider text-smoke mb-1.5">
                        07 // SPECIAL CABIN REQUESTS & PREFERENCES
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Hotel preference, cab transfer, honeymoon setup, meal requests, or budget guide..."
                        id="enquiry-notes" maxLength={2000}
                            value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-white/[0.04] p-3 text-sm text-porcelain placeholder:text-smoke/40 focus:border-horizon focus:outline-none focus:ring-1 focus:ring-horizon"
                      />
                    </div>
                  </div>

                  {/* Authentic Flight Ticket Barcode Footer */}
                  <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs text-smoke font-mono">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1 h-8 items-center bg-white/5 px-2 rounded">
                        <span className="w-1 h-6 bg-porcelain/70" />
                        <span className="w-0.5 h-6 bg-porcelain/50" />
                        <span className="w-2 h-6 bg-porcelain/80" />
                        <span className="w-1 h-6 bg-porcelain/60" />
                        <span className="w-0.5 h-6 bg-porcelain/40" />
                        <span className="w-1.5 h-6 bg-porcelain/90" />
                        <span className="w-1 h-6 bg-porcelain/70" />
                        <span className="w-2 h-6 bg-porcelain/80" />
                      </div>
                      <span className="text-[10px] hidden sm:inline">ETKT // 882-90128490</span>
                    </div>
                    <span className="text-[11px] text-horizon">PERSONALISED TRIP PLANNING</span>
                  </div>
                </div>

                {/* Perforated Divider Line with Cutouts */}
                <div className="hidden lg:block absolute top-0 bottom-0 left-[66.666%] w-[1px] border-r border-dashed border-white/20 pointer-events-none">
                  <div className="absolute -top-3 -left-3 size-6 rounded-full bg-[#06080b] border border-white/20" />
                  <div className="absolute -bottom-3 -left-3 size-6 rounded-full bg-[#06080b] border border-white/20" />
                </div>

                {/* Right Boarding Stub Area (Cols 9 to 12) */}
                <div className="lg:col-span-4 border-t lg:border-t-0 border-white/15 bg-white/[0.02] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-[11px] text-smoke">
                      <span>BOARDING STUB</span>
                      <span className="text-horizon font-bold">SEAT: 01A</span>
                    </div>

                    <div className="space-y-4 pt-4 font-mono">
                      <div>
                        <span className="text-[10px] uppercase text-smoke block">PASSENGER</span>
                        <strong className="text-sm text-porcelain truncate block">
                          {formData.name || "GUEST TRAVELLER"}
                        </strong>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] uppercase text-smoke block">FROM</span>
                          <strong className="text-sm text-porcelain">IXB</strong>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-smoke block">TO</span>
                          <strong className="text-sm text-horizon">{activeDest.code}</strong>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] uppercase text-smoke block">DATE</span>
                          <strong className="text-xs text-porcelain">
                            {formData.travelDate || "TBD"}
                          </strong>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-smoke block">PARTY</span>
                          <strong className="text-xs text-porcelain">
                            {formData.travellers.split(" ")[0]} PAX
                          </strong>
                        </div>
                      </div>

                      <div className="rounded-xl border border-horizon/30 bg-horizon/10 p-3 text-center">
                        <span className="text-[10px] uppercase tracking-wider text-horizon font-bold block">
                          STATUS: READY TO ISSUE
                        </span>
                        <span className="text-[11px] text-smoke/90 block mt-0.5">
                          Siliguri Travel Expert Consultation
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    {submitError && (
                      <div role="alert" className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-3 text-sm text-amber-100">
                        <p>{submitError}</p>
                        <a className="mt-3 inline-flex min-h-11 items-center underline" href={`https://wa.me/919933840222?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">Send details on WhatsApp</a>
                      </div>
                    )}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full bg-horizon hover:bg-horizon/90 text-obsidian font-bold text-sm py-6 shadow-2xl shadow-horizon/30 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" /> Sending enquiry…
                        </>
                      ) : (
                        <>
                          <Send className="size-4" /> Talk to Our Travel Expert
                        </>
                      )}
                    </Button>

                    <p className="text-[10px] text-center text-smoke/80 font-mono">
                      We’ll use your details to respond to your trip enquiry.
                    </p>
                  </div>
                </div>
              </div>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
