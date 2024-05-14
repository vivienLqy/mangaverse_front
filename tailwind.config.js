/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bgTest: "url('/src/assets/img/background/itadori.webp')",
        bgAccueil: "url('/src/assets/img/background/bgAccueil.png')",
        bgAdmin: "url('/src/assets/img/background/bgAdmin.svg')"
      },
    },
    plugins: [],
  },
};
