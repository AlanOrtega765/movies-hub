<script setup lang="ts">
const props = defineProps<{
  title: string;
  mediaList: string;
  mediaType: string;
}>();

const { slideNext, slidePrev } = useSwiperHelpers();

const { data: list } = await useFetch(
  `/api/category/${props.mediaType}/${props.mediaList}`,
  {
    params: {
      page: 1,
    },
  }
);

const swiperRef = ref();
const swiperInited = ref(false);

const onSwiperInit = () => (swiperInited.value = true);
</script>

<template>
  <section class="my-14 h-[550px]">
    <h1 class="text-3xl ml-20">{{ title }}</h1>
    <Swiper
      ref="swiperRef"
      class="transition-opacity mt-4"
      :class="swiperInited ? 'opacity-100' : 'opacity-0'"
      :slides-per-view="6.5"
      :slides-per-group="4"
      :space-between="10"
      :centered-slides="true"
      :loop="true"
      @init="onSwiperInit"
    >
      <SwiperSlide class="py-4" v-for="media in list" :key="media.id">
        <MediaCard
          :id="media.id"
          :posterPath="media.poster_path"
          :title="media.title"
          :name="media.name"
          :vote-average="media.vote_average"
          :type="mediaType"
        />
      </SwiperSlide>
      <SwipersButtonPrev @slide-prev="slidePrev(swiperRef)" />
      <SwipersButtonNext @slide-next="slideNext(swiperRef)" />
    </Swiper>
  </section>
</template>
