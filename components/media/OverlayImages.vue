<script setup lang="ts">
defineProps<{
  backdropPath: string | null;
  posterPath: string | null;
}>();

const emits = defineEmits<{
  (e: 'closePosterOverlay'): void;
  (e: 'closeBackdropOverlay'): void;
}>();

const { apiImgUrl } = useRuntimeConfig().public;
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 bg-black/80"
  >
    <div class="w-full lg:w-auto lg:h-[60%] xl:h-[80%] 2xl:h-[80%]" v-if="backdropPath">
      <nuxt-img
        class="w-full h-full object-fill"
        :src="`${apiImgUrl}/original${backdropPath}`"
      />
      <button
        class="absolute top-4 right-4 p-4 group"
        @click="emits('closeBackdropOverlay')"
      >
        <Icon
          class="text-gray group-hover:text-just-white transition-colors"
          name="iconamoon:close-bold"
          size="32"
        />
      </button>
    </div>
    <div v-if="posterPath" class="w-full h-auto md:w-auto md:h-[80%] lg:h-[90%]">
      <nuxt-img
        class="w-full h-full object-fill"
        :src="`${apiImgUrl}/original${posterPath}`"
      />
      <button
        class="absolute top-2 right-2 p-4 group"
        @click="emits('closePosterOverlay')"
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
