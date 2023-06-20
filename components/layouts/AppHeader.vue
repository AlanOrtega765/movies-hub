<script setup>
const open = ref(false);

const links = ref([
  { name: 'Inicio', route: '/' },
  { name: 'Peliculas', route: '/movies' },
  { name: 'Series', route: '/series' },
  { name: 'Actores', route: '/people' },
]);
</script>

<template>
  <header
    class="fixed flex z-10 items-center h-16 px-4 w-full bg-jet-black/80 backdrop-blur-md shadow-xl"
  >
    <div class="laptop:hidden">
      <font-awesome-icon @click="open = true" size="lg" icon="bars" />
    </div>
    <NuxtLink
      to="/"
      class="absolute top-0 left-1/2 -translate-x-1/2 flex items-center laptop:relative laptop:left-0 laptop:translate-x-0"
    >
      <img class="h-16 w-16" src="/favicon.png" />
      <h1 class="text-md font-montserrat-alternates min-w-fit">Movies Hub</h1>
    </NuxtLink>

    <nav
      class="absolute z-20 top-0 left-0 bg-dark-jet-black w-full h-screen transition-transform px-4 laptop:flex laptop:items-center laptop:ml-10 laptop:bg-transparent laptop:z-10 laptop:w-fit laptop:translate-x-0 laptop:h-full laptop:relative"
      :class="open ? '-translate-x-0' : '-translate-x-full'"
    >
      <div class="flex items-center h-16 border-b border-slate-gray laptop:hidden">
        <font-awesome-icon @click="open = false" size="xl" icon="xmark" />
        <NuxtLink
          class="absolute top-0 left-1/2 -translate-x-1/2 flex items-center"
          to="/"
        >
          <img class="h-16 w-16" src="/favicon.png" />
          <h1 class="text-md font-montserrat-alternates min-w-fit">
            Movies Hub
          </h1>
        </NuxtLink>
      </div>
      <ul class="flex flex-col mt-4 laptop:flex-row laptop:mt-0 laptop:gap-x-4">
        <li v-for="(link, index) in links" :key="index">
          <NuxtLink
            class="block text-md laptop:text-base py-2"
            :to="link.route"
            exact-active-class="font-bold"
            >{{ link.name }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </header>
</template>
