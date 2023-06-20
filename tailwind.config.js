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
      desktop: '1280px',
      'large-desktop': '1536px',
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
  },
  plugins: [],
};
