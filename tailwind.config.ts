import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clicky: {
          navy: "#344D78",
          "navy-dark": "#233554",
          "navy-light": "#456396",
          yellow: "#F6D84A",
          "yellow-hover": "#E5C737",
          "yellow-pale": "#FEF9E2",
          orange: "#E9A15A",
          "orange-hover": "#D88F47",
          "orange-light": "#FBE6D3",
          sky: "#8FC8F2",
          "sky-light": "#CBE6FA",
          "sky-dark": "#6FAFD9",
          mint: "#A9DCCB",
          "mint-light": "#D8F3EB",
          "mint-dark": "#7EBFAB",
          pale: "#EDF4FF",
          bg: "#F5F7FC",
          text: "#25344D",
          muted: "#6B7890",
          border: "#DCE6F5",
        },
      },
      fontFamily: {
        sans: ["Nunito", "Quicksand", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        card: "0 10px 30px -5px rgba(52, 77, 120, 0.08), 0 4px 10px -2px rgba(52, 77, 120, 0.04)",
        "card-hover": "0 20px 40px -8px rgba(52, 77, 120, 0.16), 0 8px 16px -3px rgba(52, 77, 120, 0.08)",
        fun: "0 8px 0px 0px rgba(52, 77, 120, 0.15)",
        "fun-orange": "0 6px 0px 0px #C77B34",
        "fun-yellow": "0 6px 0px 0px #D5B627",
        "fun-sky": "0 6px 0px 0px #5F9CC4",
        "fun-mint": "0 6px 0px 0px #6DA794",
      },
    },
  },
  plugins: [],
};
export default config;
