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
          50: '#ECFFFF',
          100: '#CFFEFE',
          200: '#A5FCFC',
          300: '#67F9F9',
          400: '#22EEEE',
          500: '#06D4D4',
          600: '#08B2B2',
          700: '#0E9090',
          800: '#157575',
          900: '#166363',
          1000: '#193434',
          1100: '#122121',
          1200: '#0A1010',
          1300: '#0C0D0D',
        },
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
    },
    keyframes: {
      slideDown: {
        from: {
          height: '0',
        },
        to: {
          height: 'var(--radix-collapsible-content-height)',
        },
      },
      slideUp: {
        from: {
          height: 'var(--radix-collapsible-content-height)',
        },
        to: {
          height: '0',
        },
      },
    },
    animation: {
      slideDown: 'slideDown 200ms cubic-bezier(0.25, 1, 0.5, 1)',
      slideUp: 'slideUp 200ms cubic-bezier(0.25, 1, 0.5, 1)',
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
