/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          black: "#141619",
          darkBlue: "#2C2E3A",
          navy: "#050A44",
          blue: "#0A21C0",
          gray: "#ffffff",
          green: "#50ff00",
          yellow: "#FFFF00",
        },
      },
      fontFamily: {
        terminal: ["Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};

