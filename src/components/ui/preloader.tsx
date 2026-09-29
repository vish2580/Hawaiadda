import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const SESSION_KEY = "hawaiadda-intro-seen";

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    try { return sessionStorage.getItem(SESSION_KEY) !== "true"; } catch { return true; }
  });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const pause = reducedMotion ? 120 : 700;
    const leave = window.setTimeout(() => setLeaving(true), pause);
    const remove = window.setTimeout(() => {
      setVisible(false);
      try { sessionStorage.setItem(SESSION_KEY, "true"); } catch { /* Storage may be disabled. */ }
    }, pause + (reducedMotion ? 20 : 360));
    return () => { window.clearTimeout(leave); window.clearTimeout(remove); };
  }, [reducedMotion, visible]);

  if (!visible) return null;
  return (
    <div className={cn("pointer-events-none fixed inset-0 z-[120] grid place-items-center bg-obsidian text-porcelain transition-[opacity,visibility] duration-300", leaving && "invisible opacity-0")} aria-hidden="true">
      <div className="text-center"><p className="font-display text-3xl font-semibold tracking-[-0.06em]">Hawai<span className="text-horizon">Adda</span></p><span className="mx-auto mt-5 block h-px w-24 origin-left animate-[intro-line_.65s_ease-out_forwards] bg-horizon" /></div>
    </div>
  );
}
