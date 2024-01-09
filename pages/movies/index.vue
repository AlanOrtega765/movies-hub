<script setup lang="ts">
definePageMeta({
  scrollToTop: true,
});

const { data }: any = await useFetch('/api/popular-movie-and-serie');

const categoryList = ref([
  'Tendencias',
  'Populares',
  'Más valoradas',
  'En cartelera',
]);

const movies: any = ref([]);
const target = ref(null);
const selected = ref(0);
const actualPage = ref(0);
const loading = ref(false);

const categorySelected = (index: number) => {
  movies.value = [];
  actualPage.value = 0;
  selected.value = index;
};

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  loading.value = false;
  if (isIntersecting) {
    loading.value = true;
    actualPage.value++;
    getMediaList();
  }
});

const queryByCategory = async (query: any) => {
  const { data } = await useFetch(query, {
    params: {
      page: actualPage.value,
    },
  });

  if (data.value) {
    return movies.value.push(...data.value);
  }
};

const getMediaList = async () => {
  if (actualPage.value === 0) actualPage.value = 1;

  if (selected.value === 0) queryByCategory('/api/trending/movie');

  if (selected.value === 1) queryByCategory('/api/category/movie/popular');

  if (selected.value === 2) queryByCategory('/api/category/movie/top_rated');

  if (selected.value === 3) queryByCategory('/api/category/movie/now_playing');

  queryByCategory(`/api/category/by-genre/movie/${selected.value}`);
};

const scrollToTop = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
};

getMediaList();
</script>

<template>
  <div>
    <MediaBanner :media="data[0]" />
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-x-4 px-4 2xl:px-20 my-10 lg:my-14">
      <div class="lg:col-span-3 xl:col-span-3 2xl:col-span-2">
        <MediaGenres
          :media-type="'movie'"
          :category-list="categoryList"
          @category-selected="categorySelected"
        />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-10 lg:col-span-9 xl:col-span-9 2xl:col-span-10 mt-10 lg:mt-0 xl:px-10">
        <MediaCard
          v-for="movie in movies"
          :id="movie.id"
          :key="movie.id"
          :title="movie.title"
          :name="movie.name"
          :poster-path="movie.poster_path"
          :vote-average="movie.vote_average"
          :type="'movie'"
        />
        <div
          ref="target"
          class="flex justify-center items-center col-span-full h-12"
        >
          <Icon
            v-if="loading"
            class="animate-spin"
            name="mingcute:loading-fill"
            size="48"
          />
        </div>
      </div>
    </section>
    <button
      class="fixed bottom-24 right-5 lg:bottom-6 lg:right-5 rounded-full border-4 opacity-30 hover:opacity-100 transition-opacity"
      @click="scrollToTop"
    >
      <Icon name="tabler:chevron-up" size="50" />
    </button>
  </div>
</template>
