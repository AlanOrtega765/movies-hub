<script setup lang="ts">
import useSlug from '~/composables/useSlug';

const config = useRuntimeConfig();
const open = ref(false);

const links = ref([
  { name: 'Inicio', route: '/' },
  { name: 'Peliculas', route: '/movies' },
  { name: 'Series', route: '/series' },
  { name: 'Personas', route: '/people' },
]);

const openSearch = ref(false);
const inputText = ref('');
const searchResults: any = ref([]);

const getSearchMulti = async () => {
  const text = inputText.value.toLowerCase();
  const response: any = await $fetch(
    `${config.public.apiBaseUrl}/search/multi?api_key=${config.public.apiKey}&query=${text}&language=es-MX&page=1`
  );

  return response.results;
};

const closeOrOpenSearchInput = () => {
  openSearch.value = !openSearch.value;
  inputText.value = '';
  searchResults.value = [];
};

const search = async () => {
  const { data } = await useAsyncData('search', () => getSearchMulti(), {
    transform: (data) => {
      return data.map((item: any) => ({
        id: item.id,
        title: item.title || item.name,
        image: item.poster_path || item.profile_path,
        media_type: item.media_type
      }));
    },
  });

  if (!data.value) {
    return (searchResults.value = 'No se encontraron resultados.');
  }

  searchResults.value = data.value;
  console.log(searchResults.value)
};

const setMediaType = (media_type: string) => {
  if (media_type === 'movie') return '/movies';
  if (media_type === 'tv') return '/series';
  return '/people';
};
</script>

<template>
  <header
    class="fixed top-0 left-0 flex z-30 items-center h-16 px-4 w-full bg-jet-black/80 backdrop-blur-md shadow-xl"
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
      <div
        class="flex items-center h-16 border-b border-slate-gray laptop:hidden"
      >
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
            @click="open = false"
            class="block text-md laptop:text-base py-1 px-3 rounded text-gray hover:text-just-white font-bold"
            :to="link.route"
            exact-active-class="bg-slate-gray/30 !text-just-white"
            >{{ link.name }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
    <div class="ml-auto rounded-full">
      <font-awesome-icon
        @click="closeOrOpenSearchInput"
        class="laptop:px-3 cursor-pointer"
        size="lg"
        icon="search"
      />
      <div
        class="absolute top-16 left-0 w-full h-16 px-4 bg-jet-black/90 py-2"
        :class="openSearch ? 'block' : 'hidden'"
      >
        <input
          class="block focus:outline-none placeholder:text-just-white/50 h-full w-full laptop:w-3/5 px-10 mx-auto bg-jet-black/100 rounded-full"
          placeholder="Buscar..."
          v-model="inputText"
          type="text"
          @keyup="search"
        />
        <div
          v-if="searchResults.length > 0"
          class="absolute top-16 left-0 laptop:left-1/2 laptop:-translate-x-1/2 bg-jet-black/100 w-full laptop:w-3/5 py-4 px-10 max-h-[500px] overflow-y-auto rounded-b-xl shadow-dark shadow-lg"
        >
          <ul class="flex flex-col py-2">
            <li
              class="border-b border-just-white/10 last-of-type:border-none py-4 hover:bg-dark-jet-black/50"
              v-for="result in searchResults"
              :key="result.id"
              @click="closeOrOpenSearchInput"
            >
              <NuxtLink
                class="flex gap-x-2 laptop:gap-x-4 items-center"
                :to="`${setMediaType(result.media_type)}/${
                  result.id
                }-${useSlug(result.title)}`"
              >
                <img
                  class="w-[50px] h-[70px] laptop:w-[80px] laptop:h-[100px] object-fill rounded-md shadow-dark shadow-md"
                  v-if="result.image"
                  :src="config.public.apiImageUrl + '/w185' + result.image"
                />
                <div
                  v-else
                  class="bg-gray w-[50px] h-[70px] laptop:w-[80px] laptop:h-[100px] rounded-md flex items-center justify-center"
                >
                  <font-awesome-icon size="lg" icon="image" />
                </div>
                <div>
                  <h2 class="text-sm laptop:text-base">{{ result.title }}</h2>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
