/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-text": "#AAAAAA",
        crimson: 'crimson'
      },
      screens:{
        'mobile': '360px'
      }
    },
  },
  plugins: [],
}
