import { Bot, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { travelApi } from "@/services/travel-api";
import type { AssistantMessage } from "@/types/travel";

const suggestions = ["5 Days in Sikkim & Gangtok", "Darjeeling tea gardens weekend", "Bhutan cultural tour", "Kashmir honeymoon itinerary"];

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    { id: "welcome", role: "assistant", content: "Welcome to Dream Hawai Adda! How can we help you plan your next domestic or international journey?" },
  ]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  useEffect(() => { messagesEnd.current?.scrollIntoView({ block: "nearest" }); }, [busy, messages]);

  const send = async (contentOverride?: string) => {
    const content = (contentOverride ?? input).trim();
    if (!content || busy) return;
    const next: AssistantMessage[] = [...messages, { id: crypto.randomUUID(), role: "user", content }];
    setMessages(next); setInput(""); setBusy(true);
    try {
      const response = await travelApi.askAssistant(next);
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: response }]);
    } catch {
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: "The idea service is unavailable in this preview. Your note has not been submitted." }]);
    } finally { setBusy(false); }
  };
  const submit = (event: FormEvent) => { event.preventDefault(); void send(); };

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
      {open && (
        <section id="adda-ai-dialog" role="dialog" aria-modal="false" aria-labelledby="adda-ai-title" className="mb-3 flex h-[min(590px,76vh)] w-[min(400px,calc(100vw-2.5rem))] flex-col border border-white/15 bg-[#0b0d10] text-porcelain shadow-[0_24px_80px_rgba(0,0,0,.55)]">
          <header className="flex items-center justify-between border-b border-white/10 p-4"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center bg-horizon text-obsidian rounded-lg"><Sparkles className="size-4" /></span><div><h2 id="adda-ai-title" className="text-sm font-semibold">Dream Travel Assistant</h2><p className="text-xs text-smoke">Ask questions & plan routes</p></div></div><Button variant="ghost" size="icon" className="size-9 min-h-9" onClick={() => { setOpen(false); triggerRef.current?.focus(); }} aria-label="Close Assistant"><X className="size-4" /></Button></header>
          <div className="flex-1 space-y-4 overflow-y-auto p-4" aria-busy={busy}><div className="space-y-4">{messages.map((message) => <div key={message.id} className={`max-w-[88%] p-3 text-sm leading-6 ${message.role === "user" ? "ml-auto bg-porcelain text-obsidian" : "border border-white/[0.12] bg-white/[0.04] text-porcelain/80"}`}>{message.content}</div>)}</div>{messages.length === 1 && <div className="flex flex-wrap gap-2" aria-label="Suggested prompts">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => void send(suggestion)} className="border border-white/15 px-3 py-2 text-left text-xs leading-5 text-porcelain/65 hover:border-horizon hover:text-horizon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion">{suggestion}</button>)}</div>}{busy && <p className="text-xs text-smoke" role="status">Shaping a first thought…</p>}<div ref={messagesEnd} /></div>
          <form className="flex gap-2 border-t border-white/10 p-3" onSubmit={submit}><label className="sr-only" htmlFor="assistant-input">Describe your trip</label><input ref={inputRef} id="assistant-input" value={input} onChange={(event) => setInput(event.target.value)} className="min-w-0 flex-1 bg-white/[0.06] px-3 text-sm outline-none focus:ring-2 focus:ring-ion" placeholder="Try: 6 days, mountains, slow pace" /><Button size="icon" type="submit" disabled={busy || !input.trim()} aria-label="Send message"><Send className="size-4" /></Button></form>
          <p className="px-4 pb-3 text-[11px] leading-4 text-smoke">Preview only. Messages stay on this page; no AI service is connected.</p>
        </section>
      )}
      <Button ref={triggerRef} size="icon" className="size-14 min-h-14 rounded-full shadow-[0_12px_35px_rgba(240,179,90,.2)]" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="adda-ai-dialog" aria-label={open ? "Close Adda AI" : "Open Adda AI"}>{open ? <X className="size-5" /> : <Bot className="size-5" />}</Button>
    </div>
  );
}
