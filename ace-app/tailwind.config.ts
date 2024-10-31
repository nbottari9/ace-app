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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#ffd6fe",
        "first-place-gold": "#ffbf00",
        "second-place-silver": "#c0c0c0",
        "third-place-bronze": "#cd7f32",
      },
    },
  },
  plugins: [],
};
export default config;
