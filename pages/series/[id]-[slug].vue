<script setup lang="ts">
const route = useRoute();
const serieId = ref(route.params.id);

const { data: serie } = await useFetch(`/api/tv/${serieId.value}`);

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
  <div v-if="serie">
    <MediaBanner :media="serie" />
    <div class="py-10">
      <section>
        <Tabs
          :tab-selected="tabSelected"
          @select-tab="(id: number) => tabSelected = id"
          :tabs="tabs"
        />
      </section>
      <section v-show="tabSelected === 1" class="mt-10 mx-auto">
        <div class="flex items-center gap-x-12 max-w-7xl mx-auto">
          <DetailCard :file-path="serie.poster_path" />
          <MediaInfo :media="serie" />
        </div>
        <SwipersMediaCast v-if="serie.credits" :cast="serie.credits?.cast" />
      </section>
      <section v-show="tabSelected === 2" class="px-20 mt-10">
        <MediaVideos
          v-if="serie.videos"
          :videos="serie.videos?.results"
          @select-video="(key: string) => videoKey = key"
        />
      </section>
      <section
        v-show="tabSelected === 3"
        class="px-20 mt-10 flex flex-col gap-y-10"
      >
        <MediaBackdrops
          v-if="serie.images?.backdrops"
          :backdrops="serie.images?.backdrops"
          @select-backdrop="(filePath: string) => backdropPath = filePath"
        />
        <MediaPosters
          v-if="serie.images?.posters"
          :posters="serie.images?.posters"
          @select-poster="(filePath: string) => posterPath = filePath"
        />
      </section>

      <SwipersMediaRecommendations
        v-if="serie.recommendations.results.length"
        :list="serie.recommendations.results"
        :media-type="'series'"
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
