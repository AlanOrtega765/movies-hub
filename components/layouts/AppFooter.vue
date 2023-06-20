<script setup>
const date = ref(new Date());
const links = ref([
  {
    name: 'Inicio',
    route: '/',
  },
  {
    name: 'Peliculas',
    route: '/movies',
  },
  {
    name: 'Series',
    route: '/series',
  },
  {
    name: 'Actores',
    route: '/people',
  },
]);

const getActualYear = () => {
  const year = date.value.getFullYear();
  return year;
};
</script>

<template>
  <div class="pt-14 desktop:pt-20 pb-5 px-4 tablet:px-20 bg-dark-jet-black shadow-2xl">
    <div>
      <ul class="flex flex-col gap-y-4">
        <li class="text-center" v-for="(link, index) in links" :key="index">
          <NuxtLink
            class="text-base laptop:text-md desktop:text-xl text-center font-bold uppercase tracking-widest laptop:text-just-white/80 hover:text-just-white"
            :to="link.route"
            >{{ link.name }}</NuxtLink
          >
        </li>
      </ul>
    </div>
    <div class="flex flex-col items-center mt-14 desktop:mt-20">
      <img
        class="w-3/5 tablet:w-2/5 desktop:w-1/4 mx-auto"
        src="~assets/images/the_movie_db_large_logo.svg"
      />
      <p class="text-sm mt-4 text-center laptop:text-base desktop:text-md desktop:w-3/5">
        Los datos e información relacionados con películas, series de televisión
        y otros contenidos audiovisuales utilizados en esta aplicación han sido
        obtenidos a través de la base de datos de
        <span class="font-bold">The Movie Database (TMDb) </span>
        <a
          class="font-bold border-b"
          href="https://www.themoviedb.org"
          target="_blank"
          >www.themoviedb.org.</a
        >
      </p>
    </div>

    <div class="flex justify-center items-center mt-10 desktop:mt-20">
      <img class="w-14 h-14 tablet:w-20 tablet:h-20" src="/favicon.png" />
      <div class="text-sm text-center laptop:text-base desktop:text-md">
        <span class="font-bold">© {{ getActualYear() }}</span>
        Todos los derechos reservados.
      </div>
    </div>
  </div>
</template>
