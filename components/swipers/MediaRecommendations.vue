<script setup lang="ts">
import type { Media } from '~/types';

defineProps<{
  list: Media[];
}>();

const { slideNext, slidePrev } = useSwiperHelpers();

const swiperRef = ref();
const swiperInited = ref(false);

const onSwiperInit = () => (swiperInited.value = true);
</script>

<template>
  <section class="mt-14">
    <h1 class="text-3xl ml-20">Recomendaciones</h1>
    <div class="px-20">
      <Swiper
        ref="swiperRef"
        class="transition-opacity mt-4"
        :class="swiperInited ? 'opacity-100' : 'opacity-0'"
        :slides-per-view="7"
        :slides-per-group="7"
        :space-between="10"
        :loop="false"
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
        <SwipersButtonPrev @slide-prev="slidePrev(swiperRef)" />
        <SwipersButtonNext @slide-next="slideNext(swiperRef)" />
      </Swiper>
    </div>
  </section>
</template>
