/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // This centers the container
        padding: '1rem', // This adds padding similar to Bootstrap
        screens: {
          sm: '540px',  // Bootstrap sm
          md: '720px',  // Bootstrap md
          lg: '960px',  // Bootstrap lg
          xl: '1140px', // Bootstrap xl
          '2xl': '1320px', // Bootstrap xxl
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}
