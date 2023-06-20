<script setup lang="ts">
const buttonRef = ref(null);

const emit = defineEmits(['onSlideNext']);

const onSlideNext = () => emit('onSlideNext');

defineExpose({ buttonRef });
</script>

<template>
  <div
    @click="onSlideNext"
    class="absolute z-10 top-0 right-0 hidden laptop:group-hover:flex laptop:hover:text-lg items-center justify-center cursor-pointer bg-gradient-to-l from-jet-black to-transparent w-[40px] h-full"
  >
    <font-awesome-icon icon="chevron-right" />
  </div>
</template>
