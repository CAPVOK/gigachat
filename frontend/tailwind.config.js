/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#1f2937',
        warning: '',
        primary: '#38bdf8',
        active: '#374151',
      },
    },
  },
  plugins: [],
}
