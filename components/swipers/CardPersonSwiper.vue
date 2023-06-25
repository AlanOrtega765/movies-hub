<script setup lang="ts">
import { useOtherSwiperBreakpoints } from '@/composables/useSwiperBreakpoints';
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
    :breakpoints="useOtherSwiperBreakpoints"
    :free-mode="true"
    :space-between="8"
  >
    <SwiperSlide v-for="slide in swiperSlides" :key="slide.id">
      <NuxtLink :to="`/people/${slide.id}-${useSlug(slide.name)}`">
        <img
          v-if="slide.profile_path"
          class="swiper-image"
          :src="config.public.apiImageUrl + '/w300' + slide.profile_path"
          :alt="slide.name"
        />
        <SwipersCardImageNotFoundSwiper v-else />
      </NuxtLink>
    </SwiperSlide>
    <SwipersPrevButtonSwiper @on-slide-prev="onSlidePrev" />
    <SwipersNextButtonSwiper @on-slide-next="onSlideNext" />
  </Swiper>
</template>
