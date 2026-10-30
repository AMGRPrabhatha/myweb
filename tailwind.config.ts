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
        warm: {
          50: "#FAF9F6",
          100: "#F7F5F0",
          200: "#EFECE4",
          300: "#E5E0D5",
          400: "#D6CFC1",
          500: "#B8ADA0",
        },
        ink: {
          DEFAULT: "#151B25",
          900: "#0F141C",
          800: "#151B25",
          700: "#222B3A",
          600: "#364357",
          500: "#55647A",
          400: "#7A8A9E",
          300: "#A9B6C6",
          200: "#D3DBE4",
        },
        cobalt: {
          50: "#EEF3FF",
          100: "#DCE5FF",
          200: "#BDCFFF",
          300: "#8EACFF",
          400: "#5A81FF",
          DEFAULT: "#2F5BFF",
          600: "#1A42F5",
          700: "#1331D4",
          800: "#1228AA",
          900: "#142686",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(21, 27, 37, 0.05), 0 20px 40px -15px rgba(21, 27, 37, 0.07)",
        card: "0 4px 20px -2px rgba(21, 27, 37, 0.06)",
        float: "0 20px 40px -10px rgba(47, 91, 255, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
