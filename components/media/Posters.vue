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
    <h5 class="text-3xl">
      Posters
      <span class="text-gray text-base">{{ posters.length }} Imágenes</span>
      <div class="grid grid-cols-5 gap-6 mt-4">
        <button
          class="hover:scale-105 transition-transform aspect-[10/14]"
          v-for="(poster, index) in posters"
          :key="index"
          @click="emits('selectPoster', poster.file_path)"
        >
          <nuxt-img
            class="w-full h-full"
            :src="`${apiImgUrl}/w400${poster.file_path}`"
          />
        </button>
      </div>
    </h5>
  </div>
</template>
