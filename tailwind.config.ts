import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Playfair Display"', "serif"],
      },
      screens: {
        nav: "1110px",
        shop: "974px",
        xsm: "400px",
        cart: "440px",
        cart2: "569px",
      },
      height: {
        "100vh": "100vh",
      },
      minHeight: {
        "100vh": "100vh",
      },
      flexGrow: {
        huge: "99999",
      },
      zIndex: {
        huge: "9999",
      },
    },
  },
  plugins: [],
};

export default config;
