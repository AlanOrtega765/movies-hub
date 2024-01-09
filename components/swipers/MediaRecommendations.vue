<script setup lang="ts">
import type { Media } from '~/types';

defineProps<{
  list: Media[];
}>();

const { slideNext, slidePrev, breakpointsMedia } = useSwiperHelpers();

const swiperRef = ref();
const swiperInited = ref(false);

const onSwiperInit = () => (swiperInited.value = true);
</script>

<template>
  <section class="mt-4 lg:mt-14">
    <h1 class="text-2xl lg:text-3xl">Recomendaciones</h1>
    <Swiper
      ref="swiperRef"
      class="transition-opacity mt-4"
      :class="swiperInited ? 'opacity-100' : 'opacity-0'"
      :space-between="10"
      :breakpoints="breakpointsMedia()"
      @init="onSwiperInit"
    >
      <SwiperSlide class="py-4" v-for="media in list" :key="media.id">
        <MediaCard
          :id="media.id"
          :poster-path="media.poster_path"
          :title="media.title"
          :name="media.name"
          :vote-average="media.vote_average"
          :type="media.media_type"
        />
      </SwiperSlide>
      <SwipersButtonPrev
        class="hidden lg:block"
        @slide-prev="slidePrev(swiperRef)"
      />
      <SwipersButtonNext
        class="hidden lg:block"
        @slide-next="slideNext(swiperRef)"
      />
    </Swiper>
  </section>
</template>
