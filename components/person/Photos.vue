<script setup lang="ts">
import type { Image } from '~/types';

defineProps<{
  photos: Image[];
}>();

const emits = defineEmits<{
  (e: 'selectPhoto', filePath: string): void;
}>();

const { apiImgUrl } = useRuntimeConfig().public;
</script>

<template>
  <div>
    <h5 class="text-2xl xl:text-3xl">
      Fotos
      <span class="text-gray text-base">{{ photos.length }} Imágenes</span>
    </h5>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
      <button
        class="hover:scale-105 transition-transform aspect-[10/14]"
        v-for="(photo, index) in photos"
        :key="index"
        @click="emits('selectPhoto', photo.file_path)"
      >
        <nuxt-img
          class="w-full h-full"
          :src="`${apiImgUrl}/w400${photo.file_path}`"
          :loading="'lazy'"
        />
      </button>
    </div>
  </div>
</template>
