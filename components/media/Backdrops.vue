<script setup lang="ts">
import type { Image } from '~/types';

defineProps<{
  backdrops: Image[];
}>();

const emits = defineEmits<{
  (e: 'selectBackdrop', filePath: string): void;
}>();

const { apiImgUrl } = useRuntimeConfig().public;
</script>

<template>
  <div>
    <h5 class="text-2xl xl:text-3xl">
      Backdrops
      <span class="text-gray text-base">{{ backdrops.length }} Imágenes</span>
    </h5>
    <div
      class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-6 mt-4"
    >
      <button
        class="lg:hover:scale-105 transition-transform aspect-video"
        v-for="(backdrop, index) in backdrops"
        :key="index"
        @click="emits('selectBackdrop', backdrop.file_path)"
      >
        <nuxt-img
          v-if="backdrop.file_path"
          class="w-full h-full"
          :src="`${apiImgUrl}/w400${backdrop.file_path}`"
          :loading="'lazy'"
        />
      </button>
    </div>
  </div>
</template>
