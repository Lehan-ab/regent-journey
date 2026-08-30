import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#02091F",
          secondary: "#050F2D",
          card: "#071331",
          cardHover: "#0a1b42",
          dialogue: "#09173a",
        },
        border: {
          card: "#52627E",
          cardHighlight: "#7588AA",
          cardDark: "#26354D",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B8C0D2",
          muted: "#6B7B99",
        },
        regent: {
          maroon: "#800000",
          maroonLight: "#9E0E0E",
          maroonDark: "#520000",
          gold: "#FFC719",
          blue: "#20A9F6",
          blueDark: "#1078B3",
          green: "#9BEA2D",
          greenDark: "#6EA81B",
          purple: "#9D4EDD",
        },
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        pixelHeading: ["var(--font-pixel-heading)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        "retro-blue": "0 4px 0 #0f6498",
        "retro-blue-active": "0 1px 0 #0f6498",
        "retro-green": "0 4px 0 #5f8d1b",
        "retro-green-active": "0 1px 0 #5f8d1b",
        "retro-yellow": "0 4px 0 #b38600",
        "retro-yellow-active": "0 1px 0 #b38600",
        "retro-maroon": "0 4px 0 #4a0000",
        "retro-maroon-active": "0 1px 0 #4a0000",
        "retro-outline": "0 4px 0 #28374d",
        "retro-outline-active": "0 1px 0 #28374d",
        "retro-card": "0 6px 0 #030817",
        "retro-card-lg": "0 8px 0 #01040e",
      },
      animation: {
        "float-gentle": "float 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "bounce-slight": "bounceSlight 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.03)" },
        },
        bounceSlight: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
