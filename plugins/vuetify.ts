import { createVuetify } from 'vuetify';
import { fa } from 'vuetify/iconsets/fa-svg';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    icons: {
      defaultSet: 'fa',
      sets: { fa },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
