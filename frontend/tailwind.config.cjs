/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1600px',
      '4xl': '1920px',
      '5xl': '2560px'
    },
    extend: {
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      },
    },
  },
  plugins: [],
  darkMode: "media"
}
