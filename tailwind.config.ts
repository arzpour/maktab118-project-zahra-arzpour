import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        BackgroundColor: "#091622",
        CyanBlueDark: "#0E1B2A",
        BlueD: "#0c1724",
        BlueDark: "#15273b",
        BlueL: "#1a2634",
        orange: "#E89402",
      },
      maxWidth: {
        1300: "1300px",
        1200: "1200px",
        1400: "1400px",
        1770: "1770px",
        1800: "1800px",
        1500: "1500px",
      },
      width: {
        30: "30%",
        18: "18px",
        36: "36rem",
      },
      height: {
        18: "18px",
        12.5: "12.5rem",
      },
      fontSize: {
        22: "22px",
      },
    },
  },
  plugins: [],
} satisfies Config;
