/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'pulse': {
          '0%': {
            boxShadow: '0 0 0 0 hsla(0,0%,100%,.43)'
          },
          '50%': {
            opacity: 1
          },
          '70%': {
            boxShadow: '0 0 0 0.492rem hsla(0,0%,100%,0)'
          },
          '100%': {
            boxShadow: '0 0 0 0 hsla(0,0%,100%,0)'
          }
        },
        'skeleton-loading': {
          '0%': {
            backgroundColor: 'hsl(200, 15%, 85%)',
          },
          '100%': {
            backgroundColor: 'hsl(200, 20%, 90%)'
          }
        }
      },
      animation: {
        'pulse': 'pulse 2s linear infinite',
        'skeleton-loading': 'skeleton-loading 0.7s linear infinite alternate'
      }
    },
  },
  plugins: [],
}
