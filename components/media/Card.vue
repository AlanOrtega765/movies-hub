<script setup lang="ts">
defineProps<{
  id: number;
  posterPath: string | null;
  title?: string;
  name?: string;
  voteAverage: number;
  mediaType: string;
}>();

const { apiImgUrl } = useRuntimeConfig().public;
</script>

<template>
  <div>
    <div
      class="w-full px-2 py-2 bg-zinc-800 hover:scale-105 transition-transform rounded-lg"
    >
      <NuxtLink class="relative" :to="`/${mediaType}/${id}`">
        <nuxt-img
          v-if="posterPath"
          class="w-full rounded-lg object-cover aspect-[10/15]"
          :src="`${apiImgUrl}/w600_and_h900_bestv2${posterPath}`"
        />
        <div v-else class="flex justify-center p-2 aspect-[10/15]">
          <Icon class="text-gray" name="iconoir:file-not-found" size="40"/>
        </div>
      </NuxtLink>
    </div>
    <div class="mt-4">
      <h1 class="text-lg">{{ title || name }}</h1>
      <Rating :vote-average="voteAverage" />
    </div>
  </div>
</template>
