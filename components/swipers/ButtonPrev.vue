<script setup lang="ts">
const emits = defineEmits<{
  (e: 'slidePrev'): void;
}>();

const slidePrev = () => emits('slidePrev');
</script>

<template>
  <button
    class="absolute top-0 left-0 w-[60px] h-full z-10 hover:bg-just-black/50 transition-colors"
    @click="slidePrev"
  >
    <Icon name="tabler:chevron-left" size="40" />
  </button>
</template>
