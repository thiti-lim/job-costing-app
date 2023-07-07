/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'login-background':
          "url('/assets/backgrounds/accountant-background.jpeg')",
      },
      fontFamily: {
        PermanentMarker: ['Permanent Marker', 'cursive'],
      },
    },
  },
  plugins: [],
};
