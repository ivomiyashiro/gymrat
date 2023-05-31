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
        }
      },
      animation: {
        'pulse': 'pulse 2s linear infinite'
      }
    },
  },
  plugins: [],
}
