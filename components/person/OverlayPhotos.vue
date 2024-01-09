<script setup lang="ts">
defineProps<{
  profilePath: string | null;
}>();

const emits = defineEmits<{
  (e: 'closeOverlay'): void;
}>();

const { apiImgUrl } = useRuntimeConfig().public;
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 bg-black/80"
  >
    <div class="w-auto h-[90%]">
      <nuxt-img
        class="w-full h-full object-fill"
        :src="`${apiImgUrl}/original${profilePath}`"
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
  </div>
</template>
