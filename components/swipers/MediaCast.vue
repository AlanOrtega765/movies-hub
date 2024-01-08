<script setup lang="ts">
import type { Person } from '~/types';

defineProps<{
  cast: Person[];
}>();

const { slideNext, slidePrev } = useSwiperHelpers();

const swiperRef = ref();
const swiperInited = ref(false);

const onSwiperInit = () => (swiperInited.value = true);
</script>

<template>
  <section class="mt-14 px-20">
    <h1 class="text-3xl">Reparto</h1>
    <Swiper
      ref="swiperRef"
      class="transition-opacity mt-4"
      :class="swiperInited ? 'opacity-100' : 'opacity-0'"
      :slides-per-view="7"
      :slides-per-group="7"
      :space-between="10"
      @init="onSwiperInit"
    >
      <SwiperSlide class="py-4" v-for="person in cast" :key="person.id">
        <MediaPerson
          :id="person.id"
          :character="person.character"
          :original-name="person.original_name"
          :profile-path="person.profile_path"
        />
      </SwiperSlide>
      <SwipersButtonPrev @slide-prev="slidePrev(swiperRef)" />
      <SwipersButtonNext @slide-next="slideNext(swiperRef)" />
    </Swiper>
  </section>
</template>
