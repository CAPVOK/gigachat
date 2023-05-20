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
        active: '#374151',
      },
    },
  },
  plugins: [],
}
