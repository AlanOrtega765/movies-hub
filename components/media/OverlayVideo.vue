<script setup lang="ts">
defineProps<{
  videoKey: string;
}>();

const emits = defineEmits<{
  (e: 'closeOverlay'): void;
}>();
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 bg-black/80"
  >
    <youtube-player
      class="w-[80%] h-[80%]"
      :src="`https://www.youtube.com/embed?v=${videoKey}`"
      height="100%"
      width="100%"
    />
    <button
      class="absolute top-4 right-4 p-4 group"
      @click="emits('closeOverlay')"
    >
      <Icon
        class="text-gray group-hover:text-just-white transition-colors"
        name="iconamoon:close-bold"
        size="32"
      />
    </button>
  </div>
</template>
