<script setup lang="ts">
import { useSwiperBreakpoints } from '@/composables/useSwiperBreakpoints';
import useSlug from '~/composables/useSlug';

defineProps<{
  swiperSlides: any;
}>();

const config = useRuntimeConfig();
const swiperRef = ref();

const onSlidePrev = () => swiperRef.value.$el.swiper.slidePrev();
const onSlideNext = () => swiperRef.value.$el.swiper.slideNext();
</script>

<template>
  <Swiper
    ref="swiperRef"
    class="h-full group"
    :modules="[SwiperFreeMode]"
    :breakpoints="useSwiperBreakpoints"
    :free-mode="true"
    :space-between="8"
  >
    <SwiperSlide v-for="slide in swiperSlides" :key="slide.id">
      <NuxtLink :to="`/series/${slide.id}-${useSlug(slide.title)}`">
        <img
          v-if="slide.poster_path"
          class="swiper-image"
          :src="config.public.apiImageUrl + '/w300' + slide.poster_path"
          :alt="slide.title"
        />
        <SwipersCardImageNotFoundSwiper v-else />
        <div
          class="absolute top-0 right-0 z-20 text-x-sm laptop:text-sm bg-jet-black/80 rounded-bl-md px-2 py-1"
        >
          <font-awesome-icon icon="star" />
          <span class="ml-1 font-bold">{{
            slide.vote_average.toFixed(1)
          }}</span>
        </div>
      </NuxtLink>
    </SwiperSlide>
    <SwipersPrevButtonSwiper @on-slide-prev="onSlidePrev" />
    <SwipersNextButtonSwiper @on-slide-next="onSlideNext" />
  </Swiper>
</template>
