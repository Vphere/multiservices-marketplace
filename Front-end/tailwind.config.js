/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        gov: {
          navy: "#0f172a",
          slate: "#1e293b",
          blue: "#1e40af",
          light: "#f8fafc",
        },
      },
    },
  },
  plugins: [],
};
