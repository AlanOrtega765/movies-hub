<script setup lang="ts">
defineProps<{
  id: number;
  profilePath: string | null;
  character: string;
  originalName: string;
}>();

const { apiImgUrl } = useRuntimeConfig().public;
</script>

<template>
  <div class="w-full">
    <div
      class="px-2 py-2 bg-zinc-800 hover:scale-105 transition-transform rounded-lg"
    >
      <NuxtLink class="relative" to="#">
        <nuxt-img
          class="w-full h-full rounded-lg object-cover"
          :src="`${apiImgUrl}/w300_and_h450_bestv2${profilePath}`"
        />
      </NuxtLink>
    </div>
    <div class="mt-4">
      <h1>{{ character }}</h1>
      <h2 class="text-gray">{{ originalName }}</h2>
    </div>
  </div>
</template>
