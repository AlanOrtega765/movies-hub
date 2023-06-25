<script setup lang="ts">
defineProps<{
  swiperSlides: any;
}>();

const emit = defineEmits<{
  getMovieGenre: [id: number];
}>();

const selected = ref(0);

const onSelectGenre = (genre_id: number) => {
  emit('getMovieGenre', genre_id);
};
</script>

<template>
  <Swiper
    :modules="[SwiperFreeMode]"
    :free-mode="true"
    slides-per-view="auto"
    :grab-cursor="true"
    :space-between="8"
  >
    <SwiperSlide
      class="max-w-fit border-2 border-just-white rounded-full px-3 py-px text-sm laptop:text-base font-semibold"
      :class="selected === index ? 'bg-just-white text-jet-black' : ''"
      v-for="(slide, index) in swiperSlides"
      :key="slide.id"
      @click="onSelectGenre(slide.id), (selected = index)"
    >
      {{ slide.name }}
    </SwiperSlide>
  </Swiper>
</template>
