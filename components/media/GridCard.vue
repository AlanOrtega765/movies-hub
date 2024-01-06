<script setup lang="ts">
defineProps<{
  id: number;
  posterPath: string;
  title?: string;
  name?: string;
  voteAverage: number;
}>();

const { apiImgUrl } = useRuntimeConfig().public;
</script>

<template>
  <div>
    <div
      class="w-full px-2 py-2 bg-zinc-800 hover:scale-105 transition-transform rounded-lg"
    >
      <NuxtLink class="relative" :to="`/movies/${id}`">
        <nuxt-img
          class="h-full w-full rounded-lg"
          :src="`${apiImgUrl}/w300_and_h450_bestv2${posterPath}`"
        />
      </NuxtLink>
    </div>
    <div class="mt-4">
      <h1 class="text-lg">{{ title || name }}</h1>
      <Rating :vote-average="voteAverage" />
    </div>
  </div>
</template>
