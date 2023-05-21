/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#0f172a',
        noActive: '#1e293b',
        start: '#c026d3',
        end: '#ec4899',
        active: '#475569',
        hover: '#334155',
      },
    },
  },
  plugins: [],
}
