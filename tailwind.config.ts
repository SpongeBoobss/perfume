import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light surfaces stay neutral so the gold reads as gold, not as a yellow cast over the page.
        paper: "#FFFFFF",
        cream: "#F5F5F3",
        gold: {
          DEFAULT: "#B38D4F",
          light: "#DCC18A",
          // Deeper tone of the gold, used for small text so it stays readable (WCAG AA on paper and cream).
          deep: "#8A6A35",
          // Bright gold for text and hairlines on noir backgrounds.
          bright: "#C9A462",
        },
        ink: "#141414",
        stone: "#6B6965",
        line: "#E8E7E4",
        // Near-black for the dark, boutique-style sections.
        noir: {
          DEFAULT: "#0B0B0B",
          soft: "#141414",
          line: "#2A2A2A",
          // Muted body text on noir (AA).
          mute: "#A3A19C",
          // Headline text on noir.
          ivory: "#F4F2EE",
        },
      },

      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
      letterSpacing: {
        luxe: "0.32em",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        site: "78rem",
      },
    },
  },
  plugins: [],
};

export default config;
