<script setup lang="ts">
const route = useRoute();
const links = ref([
  { id: 1, route: '/', icon: 'ant-design:home-outlined' },
  { id: 2, route: '/movies', icon: 'material-symbols:movie-outline' },
  { id: 3, route: '/series', icon: 'eva:tv-outline' },
  { id: 4, route: '/search', icon: 'iconamoon:search' },
]);
</script>

<template>
  <div class="flex">
    <header
      class="fixed bottom-0 w-full lg:relative lg:w-fit z-30 bg-just-black border-t-[1px] lg:border-t-0 border-gray/40 lg:border-r-[1px]"
    >
      <nav class="relative lg:h-screen min-h-[80px] lg:min-w-[80px]">
        <ul
          class="relative lg:fixed top-6 lg:top-0 lg:left-6 flex lg:flex-col justify-evenly h-full"
        >
          <li v-for="link in links" :key="link.id">
            <NuxtLink
              :to="link.route"
              exact-active-class="text-amber drop-shadow-amber"
            >
              <Icon :name="link.icon" size="32" />
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <div class="overflow-hidden w-full pb-[80px] lg:pb-0">
      <main>
        <slot />
      </main>
      <footer v-if="route.path === '/'" class="flex flex-col gap-y-4 px-4 py-10 lg:p-10 bg-black">
        <NuxtLink to="/" class="flex items-center w-fit gap-x-2">
          <img src="/img/logo.png" width="50" height="45" />
          <span class="font-montserrat-alternates font-bold text-lg"
            >Movies Hub</span
          >
        </NuxtLink>
        <div class="flex items-center gap-x-2 text-sm text-white/50 mt-2">
          <span>Desarrollado con</span>
          <NuxtLink href="https://nuxt.com/" target="_blank">
            <IconsNuxt class="w-20 h-auto" />
          </NuxtLink>
        </div>
        <div class="flex items-center gap-x-2 text-sm text-white/50">
          <span>Datos distribuidos por</span>
          <NuxtLink href="https://www.themoviedb.org/" target="_blank">
            <img src="/img/tmdb.svg" width="100" />
          </NuxtLink>
        </div>
        <h5 class="text-white/50 text-sm">Este proyecto utiliza la API de TMDB, pero no está avalado ni certificado por TMDB.</h5>
      </footer>
    </div>
  </div>
</template>
