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
        'xs': '360px',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        unfold: {
          "0%": { maxHeight: "0" },
          "100%": { maxHeight: "300px" },
        },
        slideLeft: {
          "0%": {
            transform: "translateX(100%)",
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
        "spin-slow": "spin 10s linear infinite",
        unfold: "test .4s ease-in-out forwards",
        slideLeft: "slideLeft .3s ease-in-out forwards",
      },
      colors: {
        primary: {
          50: "hsl(var(--color-primary-50) / <alpha-value>)",
          100: "hsl(var(--color-primary-100) / <alpha-value>)",
          200: "hsl(var(--color-primary-200) / <alpha-value>)",
          300: "hsl(var(--color-primary-300) / <alpha-value>)",
          400: "hsl(var(--color-primary-400) / <alpha-value>)",
          450: "hsl(var(--color-primary-450) / <alpha-value>)",
          500: "hsl(var(--color-primary-500) / <alpha-value>)",
          600: "hsl(var(--color-primary-600) / <alpha-value>)",
          700: "hsl(var(--color-primary-700) / <alpha-value>)",
          800: "hsl(var(--color-primary-800) / <alpha-value>)",
          900: "hsl(var(--color-primary-900) / <alpha-value>)",
          950: "hsl(var(--color-primary-950) / <alpha-value>)",
        },
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
        borders: "var(--color-borders)",
        outline: "hsl(var(--color-outline)",
        placeholder: "var(--color-placeholder)",
        danger: {
          200: "hsl(var(--color-danger-200) / <alpha-value>)",
          300: "hsl(var(--color-danger-300) / <alpha-value>)",
          400: "hsl(var(--color-danger-400) / <alpha-value>)",
        },
        success: {
          300: "hsl(var(--color-success-300) / <alpha-value>)",
          400: "hsl(var(--color-success-400) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
