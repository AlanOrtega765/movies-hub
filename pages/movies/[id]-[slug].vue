<script setup lang="ts">
import VueYoutube from 'vue3-youtube';

const config = useRuntimeConfig();
const route = useRoute();
const { id } = route.params;

interface Movie {
  title: string;
  backdrop_path: string;
  poster_path: string;
  tagline: string;
  videos: {
    results: string[];
  };
}

const getMovie = async () => {
  const response: Movie = await $fetch(
    `${config.public.apiBaseUrl}/movie/${id}?api_key=${config.public.apiKey}&append_to_response=videos&language=es-MX`
  );

  const video: any = response.videos.results.filter((video: any | null) => {
    if (video.type === 'Trailer') return video;
    if (video.type === 'Teaser') return video;
  });

  const newResponse = {
    ...response,
    trailer: video[0],
  };

  return newResponse;
};
const { data: movie } = await useLazyAsyncData('movie', () => getMovie());
</script>

<template>
  <div>
    <div class="relative h-[80vh] desktop:h-[90vh]">
      <picture v-if="!movie?.trailer.key">
        <source
          media="(max-width: 640px)"
          :srcset="config.public.apiImageUrl + '/w1280' + movie?.backdrop_path"
        />
        <img
          class="h-full w-full object-cover rounded-b-4xl"
          :src="config.public.apiImageUrl + '/original' + movie?.backdrop_path"
          :alt="movie?.title"
        />
        <div
          class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-jet-black to-transparent"
        ></div>
      </picture>
      <ClientOnly v-else>
        <VueYoutube
          :src="'https://www.youtube.com/watch?v=' + movie?.trailer.key"
        />
      </ClientOnly>
    </div>
    <section class="px-4">
      <!-- <div>
        <picture>
          <source media="(max-width: 640px)" :srcset="config.public.apiImageUrl + '/w300' + movie?.poster_path" />
          <img
          class="w-[200px] rounded-lg"
            :src="config.public.apiImageUrl + '/w300' + movie?.poster_path"
            :alt="movie?.title"
          />
        </picture>
        <h1 class="font-bold">{{ movie?.title }}</h1>
        <span>{{ movie?.tagline }}</span>
      </div> -->
    </section>
  </div>
</template>
