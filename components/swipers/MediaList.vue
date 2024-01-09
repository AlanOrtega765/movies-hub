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
  <section class="lg:my-14 mb-10 h-auto px-4 lg:px-0">
    <h1 class="text-lg lg:text-3xl lg:ml-20">{{ title }}</h1>
    <Swiper
      ref="swiperRef"
      class="transition-opacity mt-4"
      :class="swiperInited ? 'opacity-100' : 'opacity-0'"
      :space-between="10"
      :loop="true"
      :breakpoints="{
        320: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          centeredSlides: false,
        },
        640: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          centeredSlides: false,
        },
        1024: {
          slidesPerView: 4.5,
          slidesPerGroup: 4,
          centeredSlides: true,
        },
        1280: {
          slidesPerView: 5.5,
          slidesPerGroup: 4,
          centeredSlides: true,
        },
        1536: {
          slidesPerView: 6.5,
          slidesPerGroup: 4,
          centeredSlides: true,
        },
        2560: {
          slidesPerView: 7.5,
          slidesPerGroup: 4,
          centeredSlides: true,
        },
      }"
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
