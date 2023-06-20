import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(
  fas.faBars,
  fas.faXmark,
  fas.faCircleNotch,
  fas.faImage,
  fas.faChevronRight,
  fas.faChevronLeft,
  fas.faStar
);

config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});
