<script setup lang="ts">
const route = useRoute();
const movieId = ref(route.params.id);

const { data: movie } = await useFetch(`/api/movie/${movieId.value}`);

const tabs = ref([
  { id: 1, text: 'Resumen' },
  { id: 2, text: 'Videos' },
  { id: 3, text: 'Imágenes' },
]);
const selected = ref(1);
const selectTab = (index: number) => {
  selected.value = index;
};

console.log(movie.value?.videos);
</script>

<template>
  <div v-if="movie">
    <MediaBanner :media="movie" />
    <div class="py-10">
      <section>
        <ul class="flex justify-center">
          <li v-for="tab in tabs" :key="tab.id">
            <button
              class="uppercase text-xl text-gray px-6 py-3 transition-colors duration-300"
              :class="
                selected === tab.id
                  ? 'border-b-2 text-white border-white'
                  : 'border-transparent'
              "
              @click="selectTab(tab.id)"
            >
              {{ tab.text }}
            </button>
          </li>
        </ul>
      </section>
      <section v-show="selected === 1" class="mt-10 px-20">
        <div class="flex items-center gap-x-12">
          <MediaDetailCard :poster-path="movie.poster_path" />
          <MediaInfo :media="movie" />
        </div>
        <SwipersMediaCast v-if="movie.credits" :cast="movie.credits?.cast" />
      </section>
      <section v-show="selected === 2" class="px-20 mt-10">
        <div class="grid grid-cols-3 gap-x-4">
          <div v-for="video in movie.videos?.results" :key="video.id">
            <youtube-player
              :src="`https://www.youtube.com/embed?v=${video.key}`"
              height="300"
              width="100%"
            />
          </div>
        </div>
      </section>
      <section v-show="selected === 3" class="px-20">3</section>

      <SwipersMediaRecommendations
        v-if="movie.recommendations.results.length"
        :list="movie.recommendations.results"
      />
    </div>
  </div>
</template>
