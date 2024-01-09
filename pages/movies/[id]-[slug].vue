<script setup lang="ts">
const route = useRoute();
const movieId = ref(route.params.id);

const { data: movie } = await useFetch(`/api/movie/${movieId.value}`);

const tabSelected = ref(1);
const videoKey = ref<string | null>(null);
const backdropPath = ref<string | null>(null);
const posterPath = ref<string | null>(null);
const tabs = ref([
  { id: 1, text: 'Resumen' },
  { id: 2, text: 'Videos' },
  { id: 3, text: 'Imágenes' },
]);
</script>

<template>
  <div v-if="movie">
    <MediaBanner :media="movie" />
    <div class="py-10 2xl:max-w-screen-2xl mx-auto px-4 lg:px-10 xl:px-20">
      <section>
        <Tabs
          :tab-selected="tabSelected"
          @select-tab="(id: number) => tabSelected = id"
          :tabs="tabs"
        />
      </section>
      <section v-show="tabSelected === 1" class="mt-10 mx-auto">
        <div
          class="flex flex-col lg:flex-row items-center lg:items-start xl:items-center gap-x-4 xl:gap-x-12"
        >
          <DetailCard :file-path="movie.poster_path" />
          <MediaInfo :media="movie" />
        </div>
        <SwipersMediaCast v-if="movie.credits" :cast="movie.credits?.cast" />
      </section>
      <section v-show="tabSelected === 2" class="mx-auto mt-10">
        <MediaVideos
          v-if="movie.videos"
          :videos="movie.videos?.results"
          @select-video="(key: string) => videoKey = key"
        />
      </section>
      <section v-show="tabSelected === 3" class="mt-10 flex flex-col gap-y-10">
        <MediaBackdrops
          v-if="movie.images?.backdrops"
          :backdrops="movie.images?.backdrops"
          @select-backdrop="(filePath: string) => backdropPath = filePath"
        />
        <MediaPosters
          v-if="movie.images?.posters"
          :posters="movie.images?.posters"
          @select-poster="(filePath: string) => posterPath = filePath"
        />
      </section>

      <SwipersMediaRecommendations
        v-if="movie.recommendations.results.length"
        :list="movie.recommendations.results"
        :media-type="'movies'"
      />
    </div>
    <Teleport to="body">
      <MediaOverlayVideo
        v-if="videoKey"
        :video-key="videoKey"
        @close-overlay="videoKey = null"
      />

      <MediaOverlayImages
        v-if="backdropPath || posterPath"
        :backdrop-path="backdropPath"
        :poster-path="posterPath"
        @close-backdrop-overlay="backdropPath = null"
        @close-poster-overlay="posterPath = null"
      />
    </Teleport>
  </div>
</template>
