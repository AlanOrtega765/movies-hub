export const useSwiperHelpers = () => {
  const slidePrev = (swiper: any) => {
    swiper.$el.swiper.slidePrev();
  };

  const slideNext = (swiper: any) => {
    swiper.$el.swiper.slideNext();
  };

  const breakpointsMediaList = () => {
    return {
      320: {
        slidesPerView: 2,
        centeredSlides: false,
        slidesPerGroupAuto: true,
        cssMode: true,
        loop: false,
      },
      640: {
        slidesPerView: 3,
        centeredSlides: false,
        slidesPerGroupAuto: true,
        cssMode: true,
        loop: false,
      },
      1024: {
        slidesPerView: 4.5,
        slidesPerGroup: 4,
        centeredSlides: true,
        loop: true,
      },
      1280: {
        slidesPerView: 5.5,
        slidesPerGroup: 4,
        centeredSlides: true,
        loop: true,
      },
      1536: {
        slidesPerView: 6.5,
        slidesPerGroup: 4,
        centeredSlides: true,
        loop: true,
      },
      2560: {
        slidesPerView: 7.5,
        slidesPerGroup: 4,
        centeredSlides: true,
        loop: true,
      },
    };
  };

  const breakpointsMedia = () => {
    return {
      320: {
        slidesPerView: 2,
        slidesPerGroupAuto: true,
        cssMode: true,
      },
      640: {
        slidesPerView: 3,
        slidesPerGroupAuto: true,
        cssMode: true,
      },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      1280: {
        slidesPerView: 6,
        slidesPerGroup: 6,
      },
      1536: {
        slidesPerView: 7,
        slidesPerGroup: 7,
      },
      2560: {
        slidesPerView: 8,
        slidesPerGroup: 8,
      },
    };
  };

  return { slidePrev, slideNext, breakpointsMediaList, breakpointsMedia };
};
