import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(
  fas.faBars,
  fas.faXmark,
  fas.faCircleNotch,
  fas.faImage,
  fas.faChevronRight,
  fas.faChevronLeft,
  fas.faStar,
  fas.faCircleInfo,
  fas.faStar,
  far.faStar,
  far.faStarHalfStroke,
  far.faCirclePlay,
);

config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});
