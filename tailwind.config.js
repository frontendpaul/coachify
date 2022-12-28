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
          700: '#193434',
          800: '#132020',
          900: '#171C1C',
          1000: '#0C0D0D',
        },
        'coachify-cyan': {
          100: '#CCFFFF',
          300: '#43D5D4',
          500: '#1AFFFD',
        },
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};
