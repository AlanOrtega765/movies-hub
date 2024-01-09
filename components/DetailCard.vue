<script setup lang="ts">
defineProps<{
  filePath: string;
}>();

const { apiImgUrl } = useRuntimeConfig().public;
</script>

<template>
  <nuxt-img
    class="h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-lg object-cover shadow-md shadow-black mx-auto lg:mx-0"
    :src="`${apiImgUrl}/w600_and_h900_bestv2${filePath}`"
    :loading="'lazy'"
  />
</template>
