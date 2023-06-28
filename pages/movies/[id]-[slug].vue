<script setup lang="ts">
import VueYoutube from 'vue3-youtube';
import useFormatRuntime from '~/composables/useFormatRuntime';
import useFormatDate from '~/composables/useFormatDate';
import useFormatToCurrency from '~/composables/useFormatToCurrency';
import useSlug from '~/composables/useSlug';

interface Movie {
  title: string;
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
  release_date: string;
  original_title: string;
  belongs_to_collection: {
    id: number;
    name: string;
    backdrop_path: string;
  };
  budget: number;
  popularity: number;
  revenue: number;
  runtime: number;
  status: string;
  overview: string;
  original_language: string;
  recommendations: {
    results: string[];
  };
}

interface Language {
  name: string;
  iso_639_1: string;
}

interface MovieCollection {
  overview: string;
  parts: {
    part: {
      id: number;
      title: string;
      backdrop_path: string;
      vote_average: number;
    };
  };
}

const config = useRuntimeConfig();
const route = useRoute();
const { id } = route.params;
const genres: any = {
  12: 'bg-[#B8860B]',
  14: 'bg-[#006400]',
  16: 'bg-[#3B7BA9]',
  18: 'bg-[#6B238E]',
  27: 'bg-[#8B0000]',
  28: 'bg-[#E74C3C]',
  35: 'bg-[#FFA500]',
  36: 'bg-[#8B4513]',
  37: 'bg-[#8B4513]',
  53: 'bg-[#800000]',
  80: 'bg-[#3F3F46]',
  99: 'bg-[#6C757D]',
  878: 'bg-[#2C3E50]',
  9648: 'bg-[#4B0082]',
  10402: 'bg-[#CDBE91]',
  10749: 'bg-[#FFB6C1]',
  10751: 'bg-[#F08080]',
  10752: 'bg-[#008080]',
  10770: 'bg-[#FFE066]',
};
const onVideo = ref(false);
const loading = ref(true);

const getMovie = async () => {
  const response: Movie = await $fetch(
    `${config.public.apiBaseUrl}/movie/${id}?api_key=${config.public.apiKey}&append_to_response=videos,credits,recommendations,collection&language=es-MX`
  );

  const video: any = response.videos.results.filter((video: any | null) => {
    if (video.type === 'Trailer') return video;
  });

  const cast: any = response.credits.cast.slice(0, 10);
  const vote_average = response.vote_average / 2;

  const newResponse = {
    ...response,
    trailer: video[0],
    cast,
    vote_average,
  };

  return newResponse;
};
const getOriginalLanguage = (movie_language: string | undefined) => {
  const language: any = languages.value?.filter(
    (language: Language) => language.iso_639_1 === movie_language
  );
  return language[0].name;
};
const getCollection = async (collection_id: number | any) => {
  if (collection_id) {
    const response: MovieCollection = await $fetch(
      `${config.public.apiBaseUrl}/collection/${collection_id}?api_key=${config.public.apiKey}&language=es-MX`
    );

    return response;
  }
  return;
};

const { data: movie } = await useAsyncData('movie', () => getMovie());
const { data: languages } = await useFetch('/api/languages');

const { data: collection } = await useAsyncData('collections', () =>
  getCollection(movie.value?.belongs_to_collection.id)
);

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
          :srcset="config.public.apiImageUrl + '/w1280' + movie?.backdrop_path"
        />
        <img
          v-if="movie?.title"
          class="h-full w-full object-cover rounded-b-4xl"
          :src="config.public.apiImageUrl + '/original' + movie?.backdrop_path"
          :alt="movie?.title"
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
              :srcset="config.public.apiImageUrl + '/w300' + movie?.poster_path"
            />
            <img
              v-if="movie?.poster_path"
              class="w-[150px] h-[220px] laptop:w-[200px] laptop:h-[300px] desktop:w-[250px] desktop:h-[350px] rounded-lg object-fill shadow-dark shadow-lg"
              :src="config.public.apiImageUrl + '/w500' + movie?.poster_path"
              :alt="movie?.title"
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
                movie?.vote_average.toFixed(1)
              }}</span>
            </div>
            <div
              v-if="movie?.trailer"
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
                  <div class="absolute top-0 left-0 flex items-center justify-center w-full h-[90%]">
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
                        'https://www.youtube.com/watch?v=' + movie?.trailer.key
                      "
                    >
                    </VueYoutube>
                  </div>
                </div>
              </Teleport>
            </div>
          </picture>
          <div class="flex flex-col items-center text-center">
            <h1 class="font-bold mt-4 text-md laptop:text-xl">
              {{ movie?.title }}
              <span class="text-gray font-medium"
                >({{ movie?.release_date.slice(0, 4) }})</span
              >
            </h1>
            <span v-if="movie?.tagline" class="italic">{{
              movie?.tagline
            }}</span>
            <div
              class="flex flex-wrap justify-center text-sm gap-2 mt-4 w-[300px]"
            >
              <div
                class="rounded-full px-2 font-bold laptop:text-base"
                :class="genres[genre.id]"
                v-for="genre in movie?.genres"
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
              {{ movie?.overview ? movie?.overview : 'No disponible.' }}
            </p>
          </div>
          <div class="grid grid-cols-2 gap-x-4 mt-4">
            <div>
              <h2 class="font-bold laptop:text-lg">Título Original</h2>
              <span class="font-light laptop:text-md">{{
                movie?.original_title ? movie?.original_title : 'No disponible.'
              }}</span>
            </div>
            <div>
              <h2 class="font-bold laptop:text-lg">Lenguaje Original</h2>
              <span class="font-light laptop:text-md">{{
                getOriginalLanguage(movie?.original_language)
              }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-x-4">
            <div>
              <h2 class="font-bold laptop:text-lg">Duración</h2>
              <span class="font-light laptop:text-md">{{
                movie?.runtime
                  ? useFormatRuntime(movie?.runtime)
                  : 'No disponible.'
              }}</span>
            </div>
            <div>
              <h2 class="font-bold laptop:text-lg">Fecha Lanzamiento</h2>
              <span class="font-light laptop:text-md">{{
                movie?.release_date
                  ? useFormatDate(movie?.release_date)
                  : 'No disponible.'
              }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-x-4">
            <div>
              <h2 class="font-bold laptop:text-lg">Presupuesto</h2>
              <span class="font-light laptop:text-md">{{
                movie?.budget
                  ? useFormatToCurrency(movie?.budget)
                  : 'No disponible.'
              }}</span>
            </div>
            <div>
              <h2 class="font-bold laptop:text-lg">Ganancias</h2>
              <span class="font-light laptop:text-md">{{
                movie?.revenue
                  ? useFormatToCurrency(movie?.revenue)
                  : 'No disponible.'
              }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-x-4">
            <div>
              <h2 class="font-bold laptop:text-lg">Estado</h2>
              <span class="font-light laptop:text-md">{{
                movie?.status
                  ? movie?.status === 'Released'
                    ? 'Estrenada'
                    : 'Próximamente'
                  : 'No disponible.'
              }}</span>
            </div>
            <div>
              <h2 class="font-bold laptop:text-lg">Popularidad</h2>
              <span class="font-light laptop:text-md">{{
                movie?.popularity ? movie?.popularity : 'No disponible.'
              }}</span>
            </div>
          </div>
        </div>
      </section>
      <div class="h-[1px] w-full bg-just-white/25 my-8 rounded-full"></div>
      <section>
        <div class="flex items-center gap-x-4">
          <h2 class="font-bold laptop:text-lg">Actores Principales</h2>
          <NuxtLink v-if="movie?.cast.length > 0" to="/people">
            <font-awesome-icon size="lg" icon="circle-info" />
          </NuxtLink>
        </div>
        <div v-if="movie?.cast.length > 0" class="swiper-container">
          <SwipersCardPersonSwiper class="mt-2" :swiper-slides="movie?.cast" />
        </div>
        <span v-else>No disponible.</span>
      </section>
      <div class="h-[1px] w-full bg-just-white/25 my-8 rounded-full"></div>
      <section>
        <h2 class="font-bold laptop:text-lg">Colección</h2>
        <div>
          <div v-if="movie?.belongs_to_collection" class="block mt-2">
            <picture class="relative">
              <source
                media="(max-width: 640px)"
                :srcset="
                  config.public.apiImageUrl +
                  '/w500' +
                  movie.belongs_to_collection.backdrop_path
                "
              />
              <img
                v-if="movie.belongs_to_collection.backdrop_path"
                class="w-full h-[180px] laptop:h-[300px] rounded-lg shadow-md object-cover"
                :src="
                  config.public.apiImageUrl +
                  '/w1280' +
                  movie?.belongs_to_collection.backdrop_path
                "
                :alt="movie.title"
              />
              <div
                v-else
                class="flex justify-center items-center bg-gray w-full h-[180px] laptop:h-[300px] rounded-lg shadow-md"
              >
                <font-awesome-icon size="5x" icon="image" />
              </div>
              <div
                class="absolute top-0 left-0 bg-jet-black/50 laptop:hover:bg-jet-black/20 transition-all duration-500 w-full h-full flex justify-center items-center font-bold text-md laptop:text-xl italic text-center"
              >
                {{ movie.belongs_to_collection.name }}
              </div>
            </picture>
            <div>
              <div>
                <h2 class="font-bold laptop:text-lg mt-8">Resumen</h2>
                <p class="font-light">{{ collection?.overview }}</p>
              </div>
              <div class="grid grid-cols-2 gap-4 mt-8">
                <div
                  class="bg-dark-jet-black rounded-lg shadow-dark shadow-md group overflow-hidden"
                  v-for="movie in collection?.parts"
                  :key="movie.id"
                >
                  <NuxtLink
                    :to="`/movies/${movie.id}-${useSlug(movie.title)}`"
                    class="block overflow-hidden"
                  >
                    <picture class="relative">
                      <source media="(max-width: 640px)" srcset="" />
                      <img
                        v-if="movie.backdrop_path"
                        class="w-full h-[100px] rounded-t-lg object-cover group-hover:scale-110"
                        :src="
                          config.public.apiImageUrl +
                          '/w780' +
                          movie.backdrop_path
                        "
                        alt=""
                      />
                      <div
                        v-else
                        class="bg-gray flex items-center justify-center w-full h-[100px] rounded-t-lg group-hover:scale-110"
                      >
                        <font-awesome-icon size="4x" icon="image" />
                      </div>
                      <div
                        class="absolute top-0 right-0 z-20 text-sm laptop:text-md bg-jet-black/80 rounded-bl-md rounded-tr-md px-2 py-1"
                      >
                        <font-awesome-icon icon="star" />
                        <span class="ml-1 font-bold">{{
                          movie.vote_average.toFixed(1)
                        }}</span>
                      </div>
                    </picture>
                  </NuxtLink>
                  <div class="p-4">
                    <h2 class="text-center font-bold text-x-sm">
                      {{ movie.title }}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span v-else>No disponible.</span>
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
        <div
          v-if="movie?.recommendations.results.length! > 0"
          class="swiper-container"
        >
          <SwipersCardMoviesRecommendationsSwiper
            class="mt-2"
            :swiper-slides="movie?.recommendations.results"
          />
        </div>
        <span v-else>No disponible.</span>
      </section>
    </div>
  </div>
</template>
