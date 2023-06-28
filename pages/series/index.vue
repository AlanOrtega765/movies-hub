<script setup lang="ts">
import useSlug from '~/composables/useSlug';

interface Series {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  vote_average: string;
}

const config = useRuntimeConfig();
const series: any = ref([]);
const moreSeries: any = ref([]);
const currentPage = ref(1);
const currentList = ref(1);
const loading = ref(true);
const pending = ref(false);

const visibilityChanged = (isVisible: boolean) => {
  if (isVisible) {
    if (currentPage.value > 1) nextPage();
  }
};

const getSerieList = async (serie_list: string, page: number) => {
  const response = (await $fetch(
    `${config.public.apiBaseUrl}/tv/${serie_list}?api_key=${config.public.apiKey}&language=es-MX&page=${page}`
  )) as { results: Series[] };

  if (!response || !response.results) {
    throw new Error('Respuesta inválida');
  }

  pending.value = false;
  return response.results;
};

const getSerieOfGenre = async (list_id: number, page: number) => {
  const response = (await $fetch(
    `${config.public.apiBaseUrl}/discover/tv?api_key=${config.public.apiKey}&sort_by=popularity.desc&with_genres=${list_id}&language=es-MX&page=${page}`
  )) as { results: Series[] };

  if (!response || !response.results) {
    throw new Error('Respuesta inválida');
  }

  pending.value = false;
  return response.results;
};

const { data: popularSeries } = await useAsyncData(
  'popularSeries',
  () => getSerieList('popular', 1),
  {
    transform: (popularSeries) => {
      return popularSeries.map((serie) => ({
        id: serie.id,
        title: serie.name,
        overview: serie.overview,
        backdrop_path: serie.backdrop_path,
        vote_average: serie.vote_average,
      }));
    },
  }
);

const { data: serieGenres } = await useFetch('/api/serie-genres');

const getSerieGenre = async (list_id: number) => {
  if (list_id === 1) {
    if (currentList.value !== list_id) {
      currentPage.value = 1;
      currentList.value = list_id;
      series.value = [];
    }

    const { data } = await useAsyncData(
      'popular',
      () => getSerieList('popular', currentPage.value),
      {
        transform: (data) => {
          return data.map((serie) => ({
            id: serie.id,
            title: serie.name,
            backdrop_path: serie.backdrop_path,
            vote_average: serie.vote_average,
          }));
        },
      }
    );

    if (series.value.length > 0) {
      moreSeries.value = data.value;
      moreSeries.value.forEach((element: any) => {
        series.value.push(element);
      });
      return;
    }
    return (series.value = data.value);
  }

  if (list_id === 2) {
    if (currentList.value !== list_id) {
      currentPage.value = 1;
      currentList.value = list_id;
      series.value = [];
    }

    const { data } = await useAsyncData(
      'topRated',
      () => getSerieList('top_rated', currentPage.value),
      {
        transform: (data) => {
          return data.map((serie) => ({
            id: serie.id,
            title: serie.name,
            backdrop_path: serie.backdrop_path,
            vote_average: serie.vote_average,
          }));
        },
      }
    );

    if (series.value.length > 0) {
      moreSeries.value = data.value;
      moreSeries.value.forEach((element: any) => {
        series.value.push(element);
      });
      return;
    }
    return (series.value = data.value);
  }

  if (list_id === 3) {
    if (currentList.value !== list_id) {
      currentPage.value = 1;
      currentList.value = list_id;
      series.value = [];
    }

    const { data } = await useAsyncData(
      'airingToday',
      () => getSerieList('airing_today', currentPage.value),
      {
        transform: (data) => {
          return data.map((serie) => ({
            id: serie.id,
            title: serie.name,
            backdrop_path: serie.backdrop_path,
            vote_average: serie.vote_average,
          }));
        },
      }
    );

    if (series.value.length > 0) {
      moreSeries.value = data.value;
      moreSeries.value.forEach((element: any) => {
        series.value.push(element);
      });
      return;
    }
    return (series.value = data.value);
  }

  if (list_id === 4) {
    if (currentList.value !== list_id) {
      currentPage.value = 1;
      currentList.value = list_id;
      series.value = [];
    }

    const { data } = await useAsyncData(
      'onTheAir',
      () => getSerieList('on_the_air', currentPage.value),
      {
        transform: (data) => {
          return data.map((serie) => ({
            id: serie.id,
            title: serie.name,
            backdrop_path: serie.backdrop_path,
            vote_average: serie.vote_average,
          }));
        },
      }
    );

    if (series.value.length > 0) {
      moreSeries.value = data.value;
      moreSeries.value.forEach((element: any) => {
        series.value.push(element);
      });
      return;
    }
    return (series.value = data.value);
  }

  if (currentList.value !== list_id) {
    currentPage.value = 1;
    currentList.value = list_id;
    series.value = [];
  }

  const { data } = await useAsyncData(
    'serieGenre',
    () => getSerieOfGenre(list_id, currentPage.value),
    {
      transform: (data) => {
        return data.map((serie) => ({
          id: serie.id,
          title: serie.name,
          backdrop_path: serie.backdrop_path,
          vote_average: serie.vote_average,
        }));
      },
    }
  );

  if (series.value.length > 0) {
    moreSeries.value = data.value;
    moreSeries.value.forEach((element: any) => {
      series.value.push(element);
    });
    return;
  }
  return (series.value = data.value);
};

const nextPage = () => {
  pending.value = true;
  currentPage.value++;

  getSerieGenre(currentList.value);
};

getSerieGenre(1);

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
    <SwipersLargeImageSeriesSwiper
      :swiper-slides="popularSeries?.slice(0, 10).reverse()"
    />
    <div class="px-4">
      <div class="my-5 laptop:my-10">
        <SwipersGenreMoviesSwiper
          :swiper-slides="serieGenres"
          @get-movie-genre="getSerieGenre"
        />
      </div>
      <div
        class="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-5 gap-4"
      >
        <div
          class="bg-dark-jet-black shadow-dark shadow-md rounded-lg group overflow-hidden"
          v-for="serie in series"
          :key="serie.id"
        >
          <NuxtLink
            :to="`/series/${serie.id}-${useSlug(serie.title)}`"
            class="block overflow-hidden"
          >
            <picture class="relative">
              <source
                media="(max-width: 640px)"
                :srcset="
                  config.public.apiImageUrl + '/w500' + serie.backdrop_path
                "
                :alt="serie.title"
              />
              <img
                v-if="serie.backdrop_path"
                class="w-full h-[200px] rounded-t-lg object-cover group-hover:scale-110"
                :src="config.public.apiImageUrl + '/w780' + serie.backdrop_path"
                :alt="serie.title"
              />
              <div
                v-else
                class="flex items-center justify-center bg-gray w-full h-[200px] rounded-t-lg group-hover:scale-110"
              >
                <font-awesome-icon size="4x" icon="image" />
              </div>
              <div
                class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-dark-jet-black via-transparent to-transparent"
              ></div>
            </picture>
          </NuxtLink>
          <div class="py-4 px-3">
            <h2
              class="font-bold whitespace-nowrap text-ellipsis overflow-hidden"
            >
              {{ serie.title }}
            </h2>
            <div class="flex gap-x-2 mt-2">
              <v-rating
                :model-value="(serie.vote_average / 2).toFixed(1)"
                size="small"
                half-increments
                empty-icon="far fa-star"
                full-icon="fas fa-star"
                half-icon="far fa-star-half-stroke"
                density="compact"
                :readonly="true"
              ></v-rating>
              <p class="text-md">{{ (serie.vote_average / 2).toFixed(1) }}</p>
            </div>
          </div>
        </div>
      </div>
      <button
      v-if="!pending"
        class="bg-slate-gray w-full py-4 font-bold uppercase rounded-md my-10"
        @click="nextPage"
        v-observe-visibility="visibilityChanged"
      >
        Ver Más
      </button>
      <div v-else class="flex justify-center py-14">
        <font-awesome-icon class="animate-spin" size="2x" icon="circle-notch" />
      </div>
    </div>
  </div>
</template>
