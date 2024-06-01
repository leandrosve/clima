import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "460px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        popup: {
          "0%": {
            transform: "translateY(10%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn .5s ease-in-out forwards",
        popup: "popup .2s ease-in-out forwards",
      },
      colors: {
        content: {
          100: "hsl(var(--color-content-100) / <alpha-value>)",
          200: "hsl(var(--color-content-200) / <alpha-value>)",
          300: "hsl(var(--color-content-300) / <alpha-value>)",
          400: "hsl(var(--color-content-400) / <alpha-value>)",
        },
        base: {
          100: "hsl(var(--color-base-100) / <alpha-value>)",
          200: "hsl(var(--color-base-200) / <alpha-value>)",
          300: "hsl(var(--color-base-300) / <alpha-value>)",
        },
        borders: "hsla(var(--color-borders))",
        outline: "hsl(var(--color-outline)",
      },
    },
  },
  plugins: [],
};
export default config;
