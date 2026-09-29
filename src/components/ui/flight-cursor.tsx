import { useEffect, useRef, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  opacity: number;
}

export function FlightCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const angle = useRef(0);
  const targetAngle = useRef(0);
  const trails = useRef<TrailPoint[]>([]);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const trailIdCounter = useRef(0);

  useEffect(() => {
    // Only activate on devices with a fine pointer (mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible) setVisible(true);

      // Check if hovering over clickable element
      const targetEl = e.target as HTMLElement | null;
      if (targetEl) {
        const isClickable = !!targetEl.closest('a, button, input, select, textarea, [role="button"], label');
        setIsHovering(isClickable);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    const render = () => {
      // Smooth interpolation for position
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      
      pos.current.x += dx * 0.22;
      pos.current.y += dy * 0.22;

      // Calculate direction of movement if moving significantly
      const dist = Math.hypot(dx, dy);
      if (dist > 1.2) {
        // Plane native orientation is 45deg (pointing top-right), so offset by -45deg
        const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        // Smooth angle rotation
        let diff = rawAngle - targetAngle.current;
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;
        targetAngle.current += diff;
      }
      angle.current += (targetAngle.current - angle.current) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) rotate(${angle.current}deg) scale(${
          isClicking ? 0.8 : isHovering ? 1.25 : 1
        })`;
      }

      // Add trail point when moving
      if (dist > 3) {
        trailIdCounter.current += 1;
        trails.current.push({
          x: pos.current.x,
          y: pos.current.y,
          id: trailIdCounter.current,
          opacity: 0.7,
        });
        if (trails.current.length > 8) {
          trails.current.shift();
        }
      }

      // Fade out existing trails
      trails.current.forEach((t) => {
        t.opacity *= 0.85;
      });
      trails.current = trails.current.filter((t) => t.opacity > 0.05);

      if (trailContainerRef.current) {
        trailContainerRef.current.innerHTML = trails.current
          .map(
            (t) =>
              `<div style="position:fixed; left:${t.x}px; top:${t.y}px; width:4px; height:4px; transform:translate(-50%,-50%); border-radius:50%; background: #2dd4bf; opacity:${t.opacity}; pointer-events:none; z-index:9998; box-shadow:0 0 6px #2dd4bf;"></div>`
          )
          .join("");
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [visible, isHovering, isClicking]);

  if (!visible) return null;

  return (
    <>
      {/* Contrail trail particles */}
      <div ref={trailContainerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9998]" />

      {/* Animated Flight Cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform transition-colors duration-150"
      >
        <div className="relative flex items-center justify-center">
          {/* Jet Thruster glow */}
          <div
            className={`absolute -bottom-1 h-3 w-1.5 rounded-full blur-[2px] transition-all duration-200 ${
              isHovering
                ? "bg-amber-400 scale-150 shadow-[0_0_12px_#f59e0b]"
                : "bg-cyan-400 opacity-75 shadow-[0_0_8px_#06b6d4]"
            }`}
          />

          {/* Detailed Jet Silhouette */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-colors duration-200 ${
              isHovering ? "text-horizon scale-110" : "text-white"
            }`}
          >
            {/* Supersonic Passenger Jet Path */}
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>

          {/* Subtle Wingtip Navigation Lights */}
          <div className="absolute top-[50%] -left-1 size-1 rounded-full bg-rose-500 shadow-[0_0_4px_#f43f5e]" />
          <div className="absolute top-[50%] -right-1 size-1 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
        </div>
      </div>
    </>
  );
}
