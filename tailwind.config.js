/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'lg': {'max': '3040px'},
      'md': {'max': '1380px'},
      'sm': {'max': '768px'},
      'xs' : {'max': '432px'}
    },
  },
  
  plugins: [],
}