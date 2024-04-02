<script setup lang="ts">
import type { Image } from '~/types';

defineProps<{
  posters: Image[];
}>();

const emits = defineEmits<{
  (e: 'selectPoster', filePath: string): void;
}>();

const { apiImgUrl } = useRuntimeConfig().public;
</script>

<template>
  <div>
    <h5 class="text-2xl xl:text-3xl">
      Posters
      <span class="text-gray text-base">{{ posters.length }} Imágenes</span>
    </h5>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
      <button
        class="lg:hover:scale-105 transition-transform aspect-[10/15]"
        v-for="(poster, index) in posters"
        :key="index"
        @click="emits('selectPoster', poster.file_path)"
      >
        <NuxtImg
          class="w-full h-full"
          :src="`${apiImgUrl}/w400${poster.file_path}`"
          :loading="'lazy'"
          :quality="80"
          :format="'webp'"
        />
      </button>
    </div>
  </div>
</template>
