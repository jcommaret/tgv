/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light': '#FFFFFF',
        'dark': '#000000',
      },
      fontFamily: {
        'roboto': ['Roboto', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}