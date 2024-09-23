/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: 'Inter',
        ebGaramond: 'EB Garamond'
      },
      colors: {
        claro: '#F5F1E6',
        marron: {
          50: '#9F7760',
          100: '#89614A',
          200: '#574D4B'
        },
        verde: {
          50: '#839F98',
          100: '#90A6A0',
          200: '#627570'
        },
        gris: {
          50: '#9C9C9C',
          100: '#838282'
        }

      },
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' }),  // default: 'standard'
],
}

