/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
    },
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1440px',
      'large-desktop': '2560px',
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      'montserrat-alternates': ['Montserrat Alternates', 'sans-serif'],
    },
    fontSize: {
      'x-sm': '12px',
      sm: '14px',
      base: '16px',
      md: '18px',
      lg: '20px',
      xl: '24px',
    },
    colors: {
      transparent: 'transparent',
      'jet-black': '#111113',
      'slate-gray': '#777785',
      'light-gray': '#DBDBDB',
      gray: '#B5B5B5',
      'charcoal-gray': '#333339',
      'just-white': '#FFFFFF',
      'dark-jet-black': '#0C0C0D',
    },
    animation: {
      scale: 'scale 1.5s linear infinite',
    },
    keyframes: {
      scale: {
        '0%': { transform: 'scale(0.5)' },
        '50%': { transform: 'scale(1)' },
        '100%': { transform: 'scale(0.5)' },
      },
    },
  },
  plugins: [],
};
