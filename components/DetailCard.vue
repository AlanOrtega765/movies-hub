<script setup lang="ts">
defineProps<{
  filePath: string;
}>();

const { apiImgUrl } = useRuntimeConfig().public;
</script>

<template>
  <nuxt-img
    v-if="filePath"
    class="h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-lg object-cover shadow-md shadow-black mx-auto lg:mx-0"
    :src="`${apiImgUrl}/w600_and_h900_bestv2${filePath}`"
    :loading="'lazy'"
  />
  <div
    v-else
    class="flex justify-center p-2 aspect-[10/15] bg-zinc-800 h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-lg pt-10"
  >
    <Icon class="text-gray" name="iconoir:file-not-found" size="50" />
  </div>
</template>
