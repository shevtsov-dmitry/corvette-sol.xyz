/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-main-dark-gray": "#2E2E2E",
        "custom-nav-bar-btn-bg": "#73242E",
        "custom-nav-bar-btn-text": "##FFFF00",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
