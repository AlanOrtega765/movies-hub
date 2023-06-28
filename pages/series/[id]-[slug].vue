<script setup lang="ts">
import VueYoutube from 'vue3-youtube';
import useFormatDate from '~/composables/useFormatDate';

interface Serie {
  name: string;
  backdrop_path: string;
  poster_path: string;
  tagline: string;
  videos: {
    results: string[];
  };
  credits: {
    cast: string[];
  };
  genres: {
    genre: {
      id: number;
      name: string;
    };
  };
  vote_average: number;
  first_air_date: string;
  last_air_date: string;
  original_name: string;
  popularity: number;
  status: string;
  overview: string;
  original_language: string;
  recommendations: {
    results: string[];
  };
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: {
    season: {
      name: string;
      overview: string;
      air_date: string;
      episode_count: number;
      poster_path: string;
    };
  };
}

interface Language {
  name: string;
  iso_639_1: string;
}

const config = useRuntimeConfig();
const route = useRoute();
const { id } = route.params;
const genres: any = {
  16: 'bg-[#3B7BA9]',
  18: 'bg-[#6B238E]',
  35: 'bg-[#FFA500]',
  37: 'bg-[#8B4513]',
  80: 'bg-[#3F3F46]',
  99: 'bg-[#6C757D]',
  9648: 'bg-[#4B0082]',
  10751: 'bg-[#F08080]',
  10759: 'bg-[#8B0000]',
  10762: 'bg-[#FDE3A7]',
  10763: 'bg-[#4D4F52]',
  10764: 'bg-[#333333]',
  10765: 'bg-[#800080]',
  10766: 'bg-[#E75480]',
  10767: 'bg-[#87CEEB]',
  10768: 'bg-[#556B2F]',
};
const onVideo = ref(false);
const loading = ref(true);

const getSerie = async () => {
  const response: Serie = await $fetch(
    `${config.public.apiBaseUrl}/tv/${id}?api_key=${config.public.apiKey}&append_to_response=videos,credits,recommendations&language=es-MX`
  );

  const video: any = response.videos.results.filter((video: any | null) => {
    if (video.type === 'Trailer') return video;
  });

  const cast: any = response.credits.cast.slice(0, 10);

  const newResponse = {
    ...response,
    trailer: video[0],
    cast,
  };

  return newResponse;
};
const getOriginalLanguage = (movie_language: string | undefined) => {
  const language: any = languages.value?.filter(
    (language: Language) => language.iso_639_1 === movie_language
  );
  return language[0].name;
};

const { data: serie } = await useAsyncData('tv', () => getSerie());
const { data: languages } = await useFetch('/api/languages');

onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <div
    v-if="loading"
    class="absolute top-0 left-0 z-20 flex items-center justify-center bg-jet-black w-full h-full"
  >
    <img
      class="w-[150px] h-[150px] laptop:w-[200px] laptop:h-[200px] animate-scale"
      src="/favicon.png"
    />
  </div>
  <div v-else>
    <div class="relative h-[40vh] desktop:h-[80vh]">
      <picture>
        <source
          media="(max-width: 640px)"
          :srcset="config.public.apiImageUrl + '/w1280' + serie?.backdrop_path"
        />
        <img
          v-if="serie?.backdrop_path"
          class="h-full w-full object-cover"
          :src="config.public.apiImageUrl + '/original' + serie?.backdrop_path"
          :alt="serie?.name"
        />
        <div
          v-else
          class="bg-gray flex justify-center items-center h-full w-full object-cover"
        >
          <font-awesome-icon size="6x" icon="image" />
        </div>
        <div
          class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-jet-black to-transparent"
        ></div>
      </picture>
    </div>
    <div class="relative -mt-[15vh] mb-10 px-4 laptop:w-[70%] laptop:mx-auto">
      <section>
        <div class="flex flex-col items-center">
          <picture class="relative z-10">
            <source
              media="(max-width: 640px)"
              :srcset="config.public.apiImageUrl + '/w300' + serie?.poster_path"
            />
            <img
              v-if="serie?.poster_path"
              class="w-[150px] h-[220px] laptop:w-[200px] laptop:h-[300px] desktop:w-[250px] desktop:h-[350px] rounded-lg object-fill shadow-dark shadow-lg"
              :src="config.public.apiImageUrl + '/w500' + serie?.poster_path"
              :alt="serie?.name"
            />
            <div
              v-else
              class="w-[150px] h-[200px] laptop:w-[200px] laptop:h-[300px] desktop:w-[250px] desktop:h-[350px] flex justify-center items-center bg-gray rounded-lg shadow-dark shadow-lg"
            >
              <font-awesome-icon size="4x" icon="image" />
            </div>
            <div
              class="absolute top-0 right-0 z-20 text-sm laptop:text-md bg-jet-black/80 rounded-bl-md rounded-tr-md px-2 py-1"
            >
              <font-awesome-icon icon="star" />
              <span class="ml-1 font-bold">{{
                serie?.vote_average.toFixed(1)
              }}</span>
            </div>
            <div
              v-if="serie?.trailer"
              class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20"
            >
              <font-awesome-icon
                @click="onVideo = true"
                class="opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                size="6x"
                :icon="['far', 'circle-play']"
              />
              <Teleport to="body">
                <div
                  v-if="onVideo"
                  class="fixed z-30 top-0 left-0 bg-jet-black/90 w-full h-screen flex justify-between items-center"
                >
                  <font-awesome-icon
                    class="absolute top-5 right-5 laptop:top-10 laptop:right-10 cursor-pointer text-xl"
                    @click="onVideo = false"
                    icon="xmark"
                  />
                  <VueYoutube
                    class="aspect-video w-full laptop:px-4 laptop:w-4/5 laptop:h-[90%] mx-auto"
                    width="100%"
                    height="100%"
                    :src="
                      'https://www.youtube.com/watch?v=' + serie?.trailer.key
                    "
                  >
                  </VueYoutube>
                </div>
              </Teleport>
              <span class="block mt-1 text-center">Ver Tráiler</span>
            </div>
          </picture>
          <div class="flex flex-col items-center text-center">
            <h1 class="font-bold mt-4 text-md laptop:text-xl">
              {{ serie?.name }}
              <span class="text-gray font-medium"
                >({{ serie?.last_air_date.slice(0, 4) }})</span
              >
            </h1>
            <span v-if="serie?.tagline" class="italic">{{
              serie?.tagline
            }}</span>
            <div
              class="flex flex-wrap justify-center text-sm gap-2 mt-4 w-[300px]"
            >
              <div
                class="rounded-full px-2 font-bold laptop:text-base"
                :class="genres[genre.id]"
                v-for="genre in serie?.genres"
                :key="genre.id"
              >
                {{ genre.name === 'Suspense' ? 'Suspenso' : genre.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-y-4 mt-8">
          <div>
            <h2 class="font-bold laptop:text-lg">Sinopsis</h2>
            <p class="font-light laptop:text-md">
              {{ serie?.overview ? serie?.overview : 'No disponible.' }}
            </p>
          </div>
          <div class="grid grid-cols-2 gap-x-4 mt-4">
            <div>
              <h2 class="font-bold laptop:text-lg">Título Original</h2>
              <span class="font-light laptop:text-md">{{
                serie?.original_name ? serie?.original_name : 'No disponible.'
              }}</span>
            </div>
            <div>
              <h2 class="font-bold laptop:text-lg">Lenguaje Original</h2>
              <span class="font-light laptop:text-md">{{
                getOriginalLanguage(serie?.original_language)
              }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-x-4">
            <div>
              <h2 class="font-bold laptop:text-lg">Fecha Lanzamiento</h2>
              <span class="font-light laptop:text-md">{{
                serie?.first_air_date
                  ? useFormatDate(serie?.first_air_date)
                  : 'No disponible.'
              }}</span>
            </div>
            <div>
              <h2 class="font-bold laptop:text-lg">Fecha Última Emisión</h2>
              <span class="font-light laptop:text-md">{{
                serie?.last_air_date
                  ? useFormatDate(serie?.last_air_date)
                  : 'No disponible.'
              }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-x-4">
            <div>
              <h2 class="font-bold laptop:text-lg">Episodios</h2>
              <span>{{
                serie?.number_of_episodes
                  ? serie?.number_of_episodes
                  : 'No disponible.'
              }}</span>
            </div>
            <div>
              <h2 class="font-bold laptop:text-lg">Temporadas</h2>
              <span>{{
                serie?.number_of_seasons
                  ? serie?.number_of_seasons
                  : 'No disponible.'
              }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-x-4">
            <div>
              <h2 class="font-bold laptop:text-lg">Estado</h2>
              <span class="font-light laptop:text-md">{{
                serie?.status
                  ? serie?.status === 'Returning Series'
                    ? 'Reestreno'
                    : serie?.status === 'Ended'
                    ? 'Finalizada'
                    : 'Próximamente'
                  : 'No disponible.'
              }}</span>
            </div>
            <div>
              <h2 class="font-bold laptop:text-lg">Popularidad</h2>
              <span class="font-light laptop:text-md">{{
                serie?.popularity ? serie?.popularity : 'No disponible.'
              }}</span>
            </div>
          </div>
        </div>
      </section>
      <div class="h-[1px] w-full bg-just-white/25 my-8 rounded-full"></div>
      <section>
        <div class="flex items-center gap-x-4">
          <h2 class="font-bold laptop:text-lg">Actores Principales</h2>
          <NuxtLink v-if="serie?.cast.length > 0" to="/people">
            <font-awesome-icon size="lg" icon="circle-info" />
          </NuxtLink>
        </div>
        <div v-if="serie?.cast.length > 0" class="swiper-container">
          <SwipersCardPersonSwiper class="mt-2" :swiper-slides="serie?.cast" />
        </div>
        <span v-else>No disponible.</span>
      </section>
      <div class="h-[1px] w-full bg-just-white/25 my-8 rounded-full"></div>
      <section>
        <h2 class="font-bold laptop:text-lg">Temporadas</h2>
        <div
          class="grid grid-cols-3 tablet:grid-cols-5 desktop:grid-cols-7 large-desktop:grid-cols-8 gap-4 mt-2"
        >
          <div
            class="bg-dark-jet-black rounded-md"
            v-for="season in serie?.seasons"
          >
            <picture>
              <source
                media="(max-width: 640px)"
                :srcset="
                  config.public.apiImageUrl + '/w200' + season.poster_path
                "
              />
              <img
                v-if="season.poster_path"
                class="w-full h-[150px] tablet:h-[180px] laptop:h-[200px] desktop:h-[220px] large-desktop:h-[280px] object-fill rounded-t-md"
                :src="config.public.apiImageUrl + '/w300' + season.poster_path"
                :alt="season.name"
              />
              <div
                v-else
                class="bg-gray w-full h-[150px] tablet:h-[180px] laptop:h-[200px] desktop:h-[220px] large-desktop:h-[280px] flex items-center justify-center rounded-t-md"
              >
                <font-awesome-icon size="4x" icon="image" />
              </div>
            </picture>
            <div class="p-2">
              <h2 class="text-x-sm desktop:text-sm font-bold">
                {{ season.name }}
                <span class="text-gray"
                  >({{ season.air_date.slice(0, 4) }})</span
                >
              </h2>

              <span class="text-x-sm"
                >Episodios: <span>{{ season.episode_count }}</span></span
              >
            </div>
          </div>
        </div>
      </section>
      <div class="h-[1px] w-full bg-just-white/25 my-8 rounded-full"></div>
      <section>
        <div class="flex items-center gap-x-4">
          <h2 class="font-bold laptop:text-lg">Recomendaciones</h2>
          <NuxtLink to="/people">
            <font-awesome-icon size="lg" icon="circle-info" />
          </NuxtLink>
        </div>
        <div class="swiper-container">
          <SwipersCardSeriesRecommendationsSwiper
            v-if="serie?.recommendations"
            class="mt-2"
            :swiper-slides="serie?.recommendations.results"
          />
          <span v-else>No disponible.</span>
        </div>
      </section>
    </div>
  </div>
</template>
