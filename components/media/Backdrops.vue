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
    <h5 class="text-3xl">
      Backdrops
      <span class="text-gray text-base">{{ backdrops.length }} Imágenes</span>
      <div class="grid grid-cols-4 gap-6 mt-4">
        <button
          class="hover:scale-105 transition-transform aspect-video"
          v-for="(backdrop, index) in backdrops"
          :key="index"
          @click="emits('selectBackdrop', backdrop.file_path)"
        >
          <nuxt-img
            class="w-full h-full"
            :src="`${apiImgUrl}/w400${backdrop.file_path}`"
            :loading="'lazy'"
          />
        </button>
      </div>
    </h5>
  </div>
</template>
