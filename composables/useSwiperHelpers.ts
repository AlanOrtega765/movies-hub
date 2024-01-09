export const useSwiperHelpers = () => {
  const slidePrev = (swiper: any) => {
    swiper.$el.swiper.slidePrev();
  };

  const slideNext = (swiper: any) => {
    swiper.$el.swiper.slideNext();
  };

  const breakpoints = () => {
    
  }

  return { slidePrev, slideNext };
};
