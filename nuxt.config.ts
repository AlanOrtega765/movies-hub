// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiBase: process.env.NUXT_API_BASE,
    apiKey: process.env.NUXT_API_KEY,
    public: {
      apiImgUrl: process.env.NUXT_API_IMG_URL,
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
  routeRules: {
    '/': { prerender: true },
  },
  swiper: {
    modules: ['free-mode'],
  },
  googleFonts: {
    families: {
      Poppins: [300, 400, 500, 600, 700],
      'Montserrat Alternates': [700],
    },
  },
});
