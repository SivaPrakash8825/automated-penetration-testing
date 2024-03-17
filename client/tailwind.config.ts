import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        sm: "-2px -1px 17px -7px rgba(0,0,0,0.75),-2px -1px 17px -7px rgba(0,0,0,0.75), -2px -1px 17px -7px rgba(0,0,0,0.75);",
      },
      backgroundColor: {
        trans: "rgb(255, 255, 255,0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
