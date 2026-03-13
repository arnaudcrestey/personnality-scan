import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        neon: "#5cf2ff",
        deep: "#0f0820",
        glass: "rgba(255,255,255,0.08)"
      },
      boxShadow: {
        glow: "0 0 40px rgba(92,242,255,0.35)",
        card: "0 20px 60px rgba(0,0,0,0.6)"
      },
      borderRadius: {
        xl3: "1.5rem"
      }
    }
  },
  plugins: []
};

export default config;
