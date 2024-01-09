<script setup lang="ts">
defineProps<{
  id: number;
  profilePath: string | null;
  character: string;
  originalName: string;
}>();

const { apiImgUrl } = useRuntimeConfig().public;
const { formatToSlug } = useUtils();
</script>

<template>
  <div class="w-full">
    <div
      class="px-2 py-2 bg-zinc-800 hover:scale-105 transition-transform rounded-lg"
    >
      <NuxtLink class="relative overflow-hidden" :to="`/person/${id}-${formatToSlug(originalName)}`">
        <nuxt-img
          v-if="profilePath"
          class="w-full h-full rounded-lg object-fill aspect-[10/15]"
          :src="`${apiImgUrl}/w300_and_h450_bestv2${profilePath}`"
          :loading="'lazy'"
        />
        <div v-else class="block bg-zinc-800 aspect-[10/15]">
          <div class="flex justify-center h-full p-2">
            <Icon class="text-gray" name="ion:person-outline" size="40"/>
          </div>
        </div>
      </NuxtLink>
    </div>
    <div class="mt-4">
      <h1>{{ character }}</h1>
      <h2 class="text-gray">{{ originalName }}</h2>
    </div>
  </div>
</template>
