/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'ama': 'auto minmax(0,1250px) auto',
      },
      gridTemplateRows: {
        'a1a': 'auto 1fr auto',
      }
    },
  },
  plugins: [],
}
