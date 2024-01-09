<script setup lang="ts">
const mediaList = ref([
  { title: 'Películas Populares', mediaType: 'movie', mediaList: 'popular' },
  { title: 'Próximas Películas', mediaType: 'movie', mediaList: 'upcoming' },
  {
    title: 'Películas más valoradas',
    mediaType: 'movie',
    mediaList: 'top_rated',
  },
  { title: 'Series Populares', mediaType: 'tv', mediaList: 'popular' },
  {
    title: 'Series en transmisión',
    mediaType: 'tv',
    mediaList: 'airing_today',
  },
  { title: 'Series más valoradas', mediaType: 'tv', mediaList: 'top_rated' },
]);
</script>

<template>
  <div>
    <SwipersBanners />
    <div class="pt-10">
      <SwipersMediaList
        v-for="media in mediaList"
        :key="media.title"
        :title="media.title"
        :media-type="media.mediaType"
        :media-list="media.mediaList"
      />
    </div>
  </div>
</template>
