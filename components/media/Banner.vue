<script setup lang="ts">
defineProps<{
  media: any;
}>();

const { apiImgUrl } = useRuntimeConfig().public;
const { formatRuntime } = useUtils();

</script>

<template>
  <section class="relative h-[70vh]">
    <nuxt-img
      class="w-[70%] h-full object-cover ml-auto"
      :src="`${apiImgUrl}/w1920_and_h800_multi_faces${media.backdrop_path}`"
    />
    <div
      class="absolute top-0 left-0 w-[70%] h-full flex flex-col gap-y-4 justify-center px-20 bg-gradient-to-r from-just-black via-just-black to-transparent"
    >
      <h1 class="text-5xl">{{ media.title || media.name }}</h1>
      <div class="flex items-center text-gray">
        <Rating :vote-average="media.vote_average" />
        <Icon name="ph:dot" />
        <span>{{ media.vote_count }} Reseñas</span>
        <Icon name="ph:dot" />
        <span>{{ media.release_date.slice(0,4) || media.first_air_date.slice(0,4) }}</span>
        <Icon name="ph:dot" />
        <span>{{
          formatRuntime(media.runtime) || media.seasons?.length + ' Temporadas'
        }}</span>
      </div>
      <p class="text-silver">{{ media.overview }}</p>
    </div>
  </section>
</template>
