/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      fontFamily: {
        "nav-bar": ["NavBarFont", "sans-serif"],
      },
      colors: {},
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
