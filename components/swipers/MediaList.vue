<script setup lang="ts">
const props = defineProps<{
  title: string;
  mediaList: string;
  mediaType: string;
}>();

const { slideNext, slidePrev, breakpointsMediaList } = useSwiperHelpers();

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
  <section class="lg:my-14 mb-10 h-auto px-4 lg:px-0">
    <h1 class="text-2xl lg:text-3xl lg:ml-20">{{ title }}</h1>
    <Swiper
      ref="swiperRef"
      class="transition-opacity mt-4"
      :class="swiperInited ? 'opacity-100' : 'opacity-0'"
      :space-between="10"
      :breakpoints="breakpointsMediaList()"
      @after-init="onSwiperInit"
    >
      <SwiperSlide class="lg:py-4" v-for="media in list" :key="media.id">
        <MediaCard
          :id="media.id"
          :posterPath="media.poster_path"
          :title="media.title"
          :name="media.name"
          :vote-average="media.vote_average"
          :type="mediaType"
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
