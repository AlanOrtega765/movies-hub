<script setup lang="ts">
const { apiImgUrl } = useRuntimeConfig().public;

const { slideNext, slidePrev } = useSwiperHelpers();
const { formatRuntime, formatDate } = useUtils();

const { data: popularMovieAndSerie } = await useFetch(
  '/api/popular-movie-and-serie'
);

const swiperRef = ref();
</script>

<template>
  <section class="relative h-[70vh]">
    <Swiper class="h-full" ref="swiperRef">
      <SwiperSlide v-for="media in popularMovieAndSerie" :key="media.id">
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
            <span>{{ formatDate(media.release_date) || formatDate(media.first_air_date) }}</span>
            <Icon name="ph:dot" />
            <span>{{
              formatRuntime(media.runtime) ||
              media.seasons?.length + ' Temporadas'
            }}</span>
          </div>
          <p class="text-silver">{{ media.overview }}</p>
        </div>
      </SwiperSlide>
      <SwipersButtonPrev @slide-prev="slidePrev(swiperRef)" />
      <SwipersButtonNext @slide-next="slideNext(swiperRef)" />
    </Swiper>
  </section>
</template>

<style>
.checked {
  color: orange;
}
</style>
