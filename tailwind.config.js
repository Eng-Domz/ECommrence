import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    colors: {
      "specialBlue" : "#8792FF"
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin()
  ],
}