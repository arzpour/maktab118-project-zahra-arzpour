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
        background: "var(--background)",
        foreground: "var(--foreground)",
        BackgroundColor: "#091622",
        orange: "#E89402",
      },
      maxWidth: {
        1400: "1400px",
        1770: "1770px",
        1800: "1800px",
        1500: "1500px",
      },
      fontSize: {
        22: "22px",
      },
    },
  },
  plugins: [],
} satisfies Config;
