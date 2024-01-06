<script setup lang="ts">
const emits = defineEmits<{
  (e: 'slideNext'): void;
}>();

const slideNext = () => emits('slideNext');
</script>

<template>
  <button
    class="absolute top-0 right-0 w-[60px] h-full z-10 hover:bg-just-black/50 transition-colors"
    @click="slideNext"
  >
    <Icon name="tabler:chevron-right" size="40" />
  </button>
</template>
