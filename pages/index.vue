<script setup lang="ts">
interface Trending {
  id: number;
  title: string;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  media_type: string;
}
interface PopularMedia {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  vote_average: number;
}

const config = useRuntimeConfig();
const PROVIDERS: Record<string, number> = {
  netflix: 8,
  hbo_max: 384,
  amazon_prime_video: 119,
  crunchyroll: 283,
  star_plus: 619,
};
const loading = ref(true);

const getTrendings = async () => {
  const response = (await $fetch(
    `${config.public.apiBaseUrl}/trending/all/week?api_key=${config.public.apiKey}&language=es-MX&page=1`
  )) as { results: Trending[] };

  if (!response || !response.results) {
    throw new Error('Respuesta inválida');
  }

  const responseFilter = response.results.filter(
    (trending) => trending.media_type !== 'person'
  );

  return responseFilter;
};

const getPopularMedia = async (media_type: string) => {
  const response = (await $fetch(
    `${config.public.apiBaseUrl}/discover/${media_type}?api_key=${config.public.apiKey}&sort_by=popularity.desc&language=es-MX&page=1`
  )) as { results: PopularMedia[] };

  if (!response || !response.results) {
    throw new Error('Respuesta inválida');
  }

  return response.results;
};

const getPopularMediaOnStreaming = async (
  media_type: string,
  provider_id: number
) => {
  const response = (await $fetch(
    `${config.public.apiBaseUrl}/discover/${media_type}?api_key=${config.public.apiKey}&sort_by=popularity.desc&with_watch_providers=${provider_id}&watch_region=CL&language=es-MX&page=1`
  )) as { results: PopularMedia[] };

  if (!response || !response.results) {
    throw new Error('Respuesta inválida');
  }

  return response.results;
};

const { data: trendings } = await useAsyncData(
  'trendings',
  () => getTrendings(),
  {
    transform: (trendings) => {
      return trendings.map((trending) => ({
        id: trending.id,
        title: trending.title || trending.name,
        overview: trending.overview,
        poster_path: trending.poster_path,
        backdrop_path: trending.backdrop_path,
        vote_average: trending.vote_average / 2,
        media_type: trending.media_type,
      }));
    },
  }
);

const { data: popularMovies } = await useLazyAsyncData(
  'popularMovies',
  () => getPopularMedia('movie'),
  {
    transform: (movies) => {
      return movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average / 2,
      }));
    },
  }
);

const { data: popularSeries } = await useLazyAsyncData(
  'popularSeries',
  () => getPopularMedia('tv'),
  {
    transform: (series) => {
      return series.map((serie) => ({
        id: serie.id,
        title: serie.name,
        poster_path: serie.poster_path,
        vote_average: serie.vote_average / 2,
      }));
    },
  }
);

const { data: moviesNetflix } = await useLazyAsyncData(
  'moviesNetflix',
  () => getPopularMediaOnStreaming('movie', PROVIDERS.netflix),
  {
    transform: (results) => {
      return results.map((result) => ({
        id: result.id,
        title: result.title,
        poster_path: result.poster_path,
        vote_average: result.vote_average / 2,
      }));
    },
  }
);

const { data: seriesNetflix } = await useLazyAsyncData(
  'seriesNetflix',
  () => getPopularMediaOnStreaming('tv', PROVIDERS.netflix),
  {
    transform: (results) => {
      return results.map((result) => ({
        id: result.id,
        title: result.name,
        poster_path: result.poster_path,
        vote_average: result.vote_average / 2,
      }));
    },
  }
);

const { data: moviesHboMax } = await useLazyAsyncData(
  'moviesHboMax',
  () => getPopularMediaOnStreaming('movie', PROVIDERS.hbo_max),
  {
    transform: (results) => {
      return results.map((result) => ({
        id: result.id,
        title: result.title,
        poster_path: result.poster_path,
        vote_average: result.vote_average / 2,
      }));
    },
  }
);

const { data: seriesHboMax } = await useLazyAsyncData(
  'seriesHboMax',
  () => getPopularMediaOnStreaming('tv', PROVIDERS.hbo_max),
  {
    transform: (results) => {
      return results.map((result) => ({
        id: result.id,
        title: result.name,
        poster_path: result.poster_path,
        vote_average: result.vote_average / 2,
      }));
    },
  }
);

const { data: moviesAmazonPrimeVideo } = await useLazyAsyncData(
  'moviesAmazonPrimeVideo',
  () => getPopularMediaOnStreaming('movie', PROVIDERS.amazon_prime_video),
  {
    transform: (results) => {
      return results.map((result) => ({
        id: result.id,
        title: result.title,
        poster_path: result.poster_path,
        vote_average: result.vote_average / 2,
      }));
    },
  }
);

const { data: seriesAmazonPrimeVideo } = await useLazyAsyncData(
  'seriesAmazonPrimeVideo',
  () => getPopularMediaOnStreaming('tv', PROVIDERS.amazon_prime_video),
  {
    transform: (results) => {
      return results.map((result) => ({
        id: result.id,
        title: result.name,
        poster_path: result.poster_path,
        vote_average: result.vote_average / 2,
      }));
    },
  }
);

const { data: moviesStarPlus } = await useLazyAsyncData(
  'moviesStarPlus',
  () => getPopularMediaOnStreaming('movie', PROVIDERS.star_plus),
  {
    transform: (results) => {
      return results.map((result) => ({
        id: result.id,
        title: result.title,
        poster_path: result.poster_path,
        vote_average: result.vote_average / 2,
      }));
    },
  }
);

const { data: seriesStarPlus } = await useLazyAsyncData(
  'seriesStarPlus',
  () => getPopularMediaOnStreaming('tv', PROVIDERS.star_plus),
  {
    transform: (results) => {
      return results.map((result) => ({
        id: result.id,
        title: result.name,
        poster_path: result.poster_path,
        vote_average: result.vote_average / 2,
      }));
    },
  }
);

const { data: seriesCrunchyroll } = await useLazyAsyncData(
  'seriesCrunchyroll',
  () => getPopularMediaOnStreaming('tv', PROVIDERS.crunchyroll),
  {
    transform: (results) => {
      return results.map((result) => ({
        id: result.id,
        title: result.name,
        poster_path: result.poster_path,
        vote_average: result.vote_average / 2,
      }));
    },
  }
);

onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <div
    v-if="loading"
    class="absolute top-0 left-0 z-40 flex items-center justify-center bg-jet-black w-full h-full"
  >
    <img
      class="w-[150px] h-[150px] laptop:w-[200px] laptop:h-[200px] animate-scale"
      src="/favicon.png"
    />
  </div>
  <div v-else>
    <SwipersLargeImageTrendingsSwiper
      :swiper-slides="trendings?.slice(0, 10)"
    />

    <div class="flex flex-col gap-y-10 laptop:gap-y-16 px-2 mt-10 mb-16">
      <section>
        <h2 class="font-bold laptop:text-md desktop:text-lg">
          Tendencias
          <span class="opacity-50 text-x-sm uppercase ml-2"
            >Peliculas y Series</span
          >
        </h2>

        <div class="swiper-container">
          <SwipersCardTrendingsSwiper :swiper-slides="trendings" />
        </div>
      </section>
      <section>
        <h2 class="font-bold laptop:text-md desktop:text-lg">
          Populares
          <span class="opacity-50 text-x-sm uppercase ml-2">Peliculas</span>
        </h2>

        <div class="swiper-container">
          <SwipersCardMoviesSwiper :swiper-slides="popularMovies" />
        </div>
      </section>
      <section>
        <h2 class="font-bold laptop:text-md desktop:text-lg">
          Populares
          <span class="opacity-50 text-x-sm uppercase ml-2">Series</span>
        </h2>

        <div class="swiper-container">
          <SwipersCardSeriesSwiper :swiper-slides="popularSeries" />
        </div>
      </section>
      <section>
        <h2 class="font-bold laptop:text-md desktop:text-lg">
          Netflix
          <span class="opacity-50 text-x-sm uppercase ml-2"
            >Peliculas Populares</span
          >
        </h2>

        <div class="swiper-container">
          <SwipersCardMoviesSwiper :swiper-slides="moviesNetflix" />
        </div>
      </section>
      <section>
        <h2 class="font-bold laptop:text-md desktop:text-lg">
          Netflix
          <span class="opacity-50 text-x-sm uppercase ml-2"
            >Series Populares</span
          >
        </h2>

        <div class="swiper-container">
          <SwipersCardSeriesSwiper :swiper-slides="seriesNetflix" />
        </div>
      </section>
      <section>
        <h2 class="font-bold laptop:text-md desktop:text-lg">
          HBO Max
          <span class="opacity-50 text-x-sm uppercase ml-2"
            >Peliculas Populares</span
          >
        </h2>

        <div class="swiper-container">
          <SwipersCardMoviesSwiper :swiper-slides="moviesHboMax" />
        </div>
      </section>
      <section>
        <h2 class="font-bold laptop:text-md desktop:text-lg">
          HBO Max
          <span class="opacity-50 text-x-sm uppercase ml-2"
            >Series Populares</span
          >
        </h2>

        <div class="swiper-container">
          <SwipersCardSeriesSwiper :swiper-slides="seriesHboMax" />
        </div>
      </section>
      <section>
        <h2 class="font-bold laptop:text-md desktop:text-lg">
          Amazon Prime Video
          <span class="opacity-50 text-x-sm uppercase ml-2"
            >Peliculas Populares</span
          >
        </h2>

        <div class="swiper-container">
          <SwipersCardMoviesSwiper :swiper-slides="moviesAmazonPrimeVideo" />
        </div>
      </section>
      <section>
        <h2 class="font-bold laptop:text-md desktop:text-lg">
          Amazon Prime Video
          <span class="opacity-50 text-x-sm uppercase ml-2"
            >Series Populares</span
          >
        </h2>

        <div class="swiper-container">
          <SwipersCardSeriesSwiper :swiper-slides="seriesAmazonPrimeVideo" />
        </div>
      </section>
      <section>
        <h2 class="font-bold laptop:text-md desktop:text-lg">
          Star Plus
          <span class="opacity-50 text-x-sm uppercase ml-2"
            >Peliculas Populares</span
          >
        </h2>

        <div class="swiper-container">
          <SwipersCardMoviesSwiper :swiper-slides="moviesStarPlus" />
        </div>
      </section>
      <section>
        <h2 class="font-bold laptop:text-md desktop:text-lg">
          Star Plus
          <span class="opacity-50 text-x-sm uppercase ml-2"
            >Series Populares</span
          >
        </h2>

        <div class="swiper-container">
          <SwipersCardSeriesSwiper :swiper-slides="seriesStarPlus" />
        </div>
      </section>
      <section>
        <h2 class="font-bold laptop:text-md desktop:text-lg">
          Crunchyroll
          <span class="opacity-50 text-x-sm uppercase ml-2"
            >Series Populares</span
          >
        </h2>

        <div class="swiper-container">
          <SwipersCardSeriesSwiper :swiper-slides="seriesCrunchyroll" />
        </div>
      </section>
    </div>
  </div>
</template>
