<script setup lang="ts">
import type { Video } from '~/types';

defineProps<{
  videos: Video[];
}>();

const emits = defineEmits<{
  (e: 'selectVideo', key: string): void;
}>();
</script>

<template>
  <h5 class="text-gray">{{ videos.length }} Videos</h5>
  <div class="grid grid-cols-4 gap-6 mt-4">
    <div v-for="video in videos" :key="video.id">
      <button
        class="relative group hover:scale-105 transition-transform w-full aspect-video"
        @click="emits('selectVideo', video.key)"
      >
        <nuxt-img
          class="w-full h-full"
          :src="`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`"
        />
        <Icon
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-100 transition-opacity"
          name="ph:play-fill"
          size="40"
        />
      </button>
    </div>
  </div>
</template>
