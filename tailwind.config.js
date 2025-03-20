/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, #9CA3AF, #E5E7EB, #4B5563)', // Adjust colors
      },
    },
  },
  plugins: [],
};
