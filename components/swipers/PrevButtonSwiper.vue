<script setup lang="ts">
const buttonRef = ref(null);

const emit = defineEmits(['onSlidePrev']);

const onSlidePrev = () => emit('onSlidePrev');

defineExpose({ buttonRef });
</script>

<template>
  <div
    ref="buttonRef"
    @click="onSlidePrev"
    class="absolute z-10 top-0 left-0 hidden laptop:group-hover:flex laptop:hover:text-lg items-center justify-center cursor-pointer bg-gradient-to-r from-jet-black to-transparent w-[40px] h-full"
  >
    <font-awesome-icon icon="chevron-left" />
  </div>
</template>
