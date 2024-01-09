<script setup lang="ts">
defineProps<{
  media: any;
}>();

const { apiImgUrl } = useRuntimeConfig().public;
const { formatRuntime, formatDate } = useUtils();
</script>

<template>
  <section class="relative h-[50vh] lg:h-[70vh]">
    <nuxt-img
      class="lg:w-[70%] h-[70%] lg:h-full object-cover w-full lg:ml-auto"
      :src="`${apiImgUrl}/w1920_and_h800_multi_faces${media.backdrop_path}`"
    />
    <div
      class="absolute bottom-0 lg:top-0 left-0 lg:w-[70%] w-full lg:h-full flex flex-col lg:gap-y-4 lg:justify-center justify-end pb-14 lg:pb-0 px-4 lg:px-10 xl:px-20 h-[70%] bg-gradient-to-t lg:bg-gradient-to-r from-just-black via-just-black to-transparent"
    >
      <h1 class="text-2xl md:text-3xl lg:text-5xl max-w-full min-h-fit overflow-hidden lg:overflow-visible whitespace-nowrap text-ellipsis">{{ media.title || media.name }}</h1>
      <div
        class="flex flex-col lg:flex-row text-sm md:text-base 2xl:text-lg gap-y-2 lg:items-center text-gray"
      >
        <Rating :vote-average="media.vote_average" />
        <div class="hidden lg:block">
          <Icon name="ph:dot" />
        </div>
        <div class="flex lg:gap-x-0 items-center gap-y-1 flex-wrap">
          <span>{{ media.vote_count }} Reseñas</span>
          <Icon name="ph:dot" />
          <span>{{
            formatDate(media.release_date) || formatDate(media.first_air_date)
          }}</span>
          <Icon name="ph:dot" />
          <span>{{
            formatRuntime(media.runtime) ||
            media.seasons?.length + ' Temporadas'
          }}</span>
        </div>
      </div>
      <p class="text-silver hidden lg:block 2xl:text-lg">{{ media.overview }}</p>
    </div>
  </section>
</template>
