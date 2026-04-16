import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#111111",
        accent: "#E299C0",
        "tv-bg": "#0a0a0a",
        "tv-text": "#f0f0f0",
        "tv-muted": "#888888",
        "tv-pink": "#E299C0",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "ui-sans-serif",
          "sans-serif",
        ],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        serif: ["Georgia", "Times New Roman", "serif"],
        handwritten: ["var(--font-caveat)", "cursive"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "poster-gleam": {
          "0%": {
            transform: "translateX(-140%) skewX(-14deg)",
            opacity: "0",
          },
          "18%": { opacity: "1" },
          "82%": { opacity: "1" },
          "100%": {
            transform: "translateX(220%) skewX(-14deg)",
            opacity: "0",
          },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "poster-gleam": "poster-gleam 0.72s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
