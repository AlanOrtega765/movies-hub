<script setup lang="ts">
defineProps<{
  posterPath: string;
}>();

const { apiImgUrl } = useRuntimeConfig().public;
</script>

<template>
  <nuxt-img
    class="h-[500px] min-w-[300px] rounded-lg object-cover shadow-md shadow-black"
    :src="`${apiImgUrl}/w600_and_h900_bestv2${posterPath}`"
  />
</template>
