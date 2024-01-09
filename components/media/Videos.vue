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
  <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2 xl:gap-6 mt-4">
    <button
      v-for="video in videos"
      :key="video.id"
      class="relative group lg:hover:scale-105 transition-transform w-full aspect-video"
      @click="emits('selectVideo', video.key)"
    >
      <nuxt-img
        class="w-full h-full"
        :src="`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`"
        :loading="'lazy'"
      />
      <Icon
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-100 transition-opacity"
        name="ph:play-fill"
        size="40"
      />
    </button>
  </div>
</template>
