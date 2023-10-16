/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: {
          lightest: "#c97dff",
          light: "#b559f7",
          default: "#B147FE",
        },
      },
    },
  },
  plugins: [],
};
