import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
  async scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
};
