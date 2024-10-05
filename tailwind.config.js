/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mf: "990px",
        mm: "910px",
      },
    },
  },
  plugins: [],
};
