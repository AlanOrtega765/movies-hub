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

useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
  loading.value = false;
  if (isIntersecting) {
    loading.value = true;
    actualPage.value++;
    getMediaList();
  }
});

const queryByCategory = async (query: string) => {
  const { data } = await useFetch(`/api/${query}`, {
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

  if (selected.value === 0) queryByCategory('trending/movie');

  if (selected.value === 1) queryByCategory('category/movie/popular');

  if (selected.value === 2) queryByCategory('category/movie/top_rated');

  if (selected.value === 3) queryByCategory('category/movie/now_playing');

  queryByCategory(`category/by-genre/movie/${selected.value}`);
};

const scrollToTop = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
};

getMediaList();

</script>

<template>
  <div>
    <MediaBanner :media="data[0]" />
    <section class="grid grid-cols-12 gap-x-4 px-20 my-14">
      <div class="col-span-2">
        <MediaGenres
          :media-type="'movie'"
          :category-list="categoryList"
          @category-selected="categorySelected"
        />
      </div>
      <div class="grid grid-cols-5 gap-x-4 gap-y-10 col-span-10 px-4">
        <MediaCard
          v-for="movie in movies"
          :id="movie.id"
          :key="movie.id"
          :title="movie.title"
          :name="movie.name"
          :poster-path="movie.poster_path"
          :vote-average="movie.vote_average"
          :mediaType="'movies'"
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
    <button class="fixed bottom-6 right-5 rounded-full border-4 opacity-30 hover:opacity-100 transition-opacity" @click="scrollToTop">
      <Icon name="tabler:chevron-up" size="50"/>
    </button>
  </div>
</template>
