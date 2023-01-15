/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'coachify-teal': {
          200: '#9EFAD9',
          700: '#193434',
          800: '#132020',
          900: '#122121',
          1000: '#0C0D0D',
        },
        'coachify-cyan': {
          200: '#9EFAFA',
          500: '#1AFFFD',
          600: '#30E8E7',
          700: '#43D5D4',
        },
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};
