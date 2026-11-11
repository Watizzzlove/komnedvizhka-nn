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
        brand: {
          dark: "#080D10",        // Phenomenon Obsidian text & dark surfaces
          slate: "#121A1F",       // Deep secondary dark
          surface: "#FFFFFF",     // Clean card surface
          canvas: "#F8F8F8",      // Soft warm alabaster canvas
          "canvas-alt": "#F0EFEF", // Muted stone
          border: "#E9E9E9",      // Fine card outline
          "border-dark": "rgba(255, 255, 255, 0.1)",
          orange: "#FF7A00",      // Phenomenon signature amber/orange
          coral: "#FF3D2E",       // Energetic coral
          muted: "#64748B",       // Secondary text
        },
      },
      fontFamily: {
        heading: ["'Kharkiv Tone'", "'Bricolage Grotesque'", "Arial", "sans-serif"],
        sans: ["'Albert Sans'", "Arial", "sans-serif"],
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(8, 13, 16, 0.04), 0 1px 2px -1px rgba(8, 13, 16, 0.04)",
        hover: "0 12px 24px -6px rgba(8, 13, 16, 0.08), 0 4px 8px -4px rgba(8, 13, 16, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
