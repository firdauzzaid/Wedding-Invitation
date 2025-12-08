/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    disableTransform: true,
  },
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C5CFF',
        accent: '#00E5FF',
      },
      fontFamily: {
        display: ['Playfair Display', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['ui-monospace', 'SFMono-Regular'],
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [],
};
