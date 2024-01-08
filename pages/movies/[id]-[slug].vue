<script setup lang="ts">
const route = useRoute();
const movieId = ref(route.params.id);

const { data: movie } = await useFetch(`/api/movie/${movieId.value}`);

const tabSelected = ref(1);
const videoKey = ref<string | null>(null);
const backdropPath = ref<string | null>(null);
const posterPath = ref<string | null>(null);
</script>

<template>
  <div v-if="movie">
    <MediaBanner :media="movie" />
    <div class="py-10">
      <section>
        <MediaTabs
          :tab-selected="tabSelected"
          @select-tab="(id: number) => tabSelected = id"
        />
      </section>
      <section v-show="tabSelected === 1" class="mt-10 mx-auto">
        <div class="flex items-center gap-x-12 max-w-7xl mx-auto">
          <MediaDetailCard :poster-path="movie.poster_path" />
          <MediaInfo :media="movie" />
        </div>
        <SwipersMediaCast v-if="movie.credits" :cast="movie.credits?.cast" />
      </section>
      <section v-show="tabSelected === 2" class="px-20 mt-10">
        <MediaVideos
          v-if="movie.videos"
          :videos="movie.videos?.results"
          @select-video="(key: string) => videoKey = key"
        />
      </section>
      <section
        v-show="tabSelected === 3"
        class="px-20 mt-10 flex flex-col gap-y-10"
      >
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
