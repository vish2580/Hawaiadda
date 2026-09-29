import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#050607",
        porcelain: "#F4F2ED",
        horizon: "#B2E5DC",
        ion: "#78DCE8",
        dusk: "#0C151A",
        smoke: "#A3ABB5",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      maxWidth: { frame: "1440px" },
      spacing: { gutter: "clamp(1.25rem, 4vw, 4.5rem)" },
      keyframes: {
        "signal-pulse": { "0%, 100%": { opacity: "0.35" }, "50%": { opacity: "1" } },
      },
      animation: { "signal-pulse": "signal-pulse 2.4s ease-in-out infinite" },
    },
  },
  plugins: [],
} satisfies Config;
