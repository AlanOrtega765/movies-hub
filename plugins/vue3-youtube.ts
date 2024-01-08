import YouTube from 'vue3-youtube';

export default defineNuxtPlugin((NuxtApp) => {
  NuxtApp.vueApp.component('youtube-player', YouTube);
});
