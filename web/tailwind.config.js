/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      clr_dark_gray_bg: "#2E2E2E",
      clr_nav_bar_btn_bg: "#73242E",
      clr_nav_bar_btn_text: "##FFFF00",
    },
    extend: {},
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
