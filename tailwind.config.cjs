/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#064E3B",
        accent: "#F59E0B",
        denim: "#1F2937"
      }
    }
  },
  plugins: []
};
