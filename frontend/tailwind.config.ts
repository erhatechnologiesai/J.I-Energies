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
        navy: {
          50: "#F0F4FA",
          100: "#DCE5F2",
          200: "#BDCDE5",
          700: "#0F3D7A",
          800: "#0B2D5B",
          900: "#061A35",
          950: "#041124",
          DEFAULT: "#0B2D5B",
        },
        solar: {
          300: "#FFE082",
          400: "#FFCA28",
          500: "#FFC107",
          600: "#FFA000",
          700: "#FF8F00",
          DEFAULT: "#FFC107",
        },
        energy: {
          50: "#EDFAF1",
          100: "#D3F4DF",
          500: "#22A559",
          600: "#1B8748",
          700: "#156A38",
          DEFAULT: "#22A559",
        },
        surface: {
          light: "#F5F7FA",
          subtle: "#EAEDF2",
          border: "#D9DEE7",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "-apple-system", "sans-serif"],
        body: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
