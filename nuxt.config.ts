const isDev = process.env.NODE_ENV === 'production';

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiBase: process.env.NUXT_API_BASE,
    apiKey: process.env.NUXT_API_KEY,
    public: {
      apiImgUrl: process.env.NUXT_API_IMG_URL,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano: isDev
        ? { preset: ['default', { discardComments: { removeAll: true } }] }
        : false,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    '@nuxtjs/google-fonts',
    'nuxt-icon',
    '@nuxt/image',
    '@vueuse/nuxt',
  ],
  images: {
    provider: 'netlify'
  },
  routeRules: {
    '/**': isDev
      ? {
          cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true },
        }
      : {},
  },
  swiper: {
    modules: ['pagination'],
  },
  googleFonts: {
    families: {
      Poppins: [300, 400, 500, 600, 700],
      'Montserrat Alternates': [700],
    },
  },
});
