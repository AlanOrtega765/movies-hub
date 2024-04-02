<script setup lang="ts">
const props = defineProps<{
  id: number
  posterPath: string | null
  title?: string
  name?: string
  voteAverage: number
  type: string
}>()

// const { apiImgUrl } = useRuntimeConfig().public
const { formatToSlug } = useUtils()

const mediaType = computed(() => {
  return props.type === 'movie' ? 'movies' : 'series'
})
</script>

<template>
  <div>
    <div
      class="w-full px-2 py-2 bg-zinc-800 lg:hover:scale-105 transition-transform rounded-lg"
    >
      <NuxtLink
        class="relative"
        :to="`/${mediaType}/${id}-${formatToSlug(title || name)}`"
      >
        <NuxtImg
          v-if="posterPath"
          class="w-full rounded-lg object-fill aspect-[10/15] max-h-[330px] lg:max-h-[350px] xl:max-h-[350px] 2xl:max-h-[500px]"
          :src="`/w600_and_h900_bestv2${posterPath}`"
          :loading="'lazy'"
          :quality="10"
          :format="'webp'"
        />
        <div v-else class="flex justify-center p-2 aspect-[10/15]">
          <Icon class="text-gray" name="iconoir:file-not-found" size="40" />
        </div>
      </NuxtLink>
    </div>
    <div class="mt-4 text-sm lg:base">
      <h1 class="xl:text-lg">{{ title || name }}</h1>
      <Rating :vote-average="voteAverage" />
    </div>
  </div>
</template>
