<script setup lang="ts">
defineProps<{
  swiperSlides: any;
}>();

const config = useRuntimeConfig();
</script>

<template>
  <Swiper
    class="h-[80vh] desktop:h-[90vh]"
    :modules="[SwiperAutoplay, SwiperPagination]"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
    :pagination="{
      type: 'bullets',
      clickable: true,
    }"
    :loop="true"
  >
    <SwiperSlide v-for="slide in swiperSlides" :key="slide.id">
      <picture>
        <source
          media="(max-width: 640px)"
          :srcset="config.public.apiImageUrl + '/w1280' + slide.backdrop_path"
        />
        <img
          class="w-full h-full object-cover object-center"
          :src="config.public.apiImageUrl + '/original' + slide.backdrop_path"
          :alt="slide.title"
        />
      </picture>
      <div
        class="absolute top-0 left-0 flex flex-col justify-end bg-gradient-to-t from-jet-black to-transparent h-full w-full text-just-white px-4 pb-16"
      >
        <h1 class="text-md tablet:text-lg laptop:text-xl font-bold italic">
          {{ slide.title }}
        </h1>
        <p class="text-sm tablet:text-md mt-1 tablet:w-4/5 laptop:hidden font-light">
          {{ slide.overview.slice(0, 150).trim() + '...' }}
        </p>
        <p class="text-lg w-4/5 desktop:w-3/5 hidden laptop:flex font-light leading-6">
          {{
            slide.overview.length > 200
              ? slide.overview.slice(0, 200).trim() + '...'
              : slide.overview
          }}
        </p>
        <NuxtLink
          class="w-fit py-2 px-4 uppercase rounded text-sm font-bold mt-4 bg-slate-gray"
          :to="`/${slide.media_type === 'movie' ? 'movies' : 'series'}/${
            slide.id
          }-asdasdsa`"
          >Ver Más</NuxtLink
        >
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style>
.swiper-pagination-bullet {
  background-color: #fff;
  padding: 4px;
}
</style>
