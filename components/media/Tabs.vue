<script setup lang="ts">
defineProps<{
  tabSelected: number;
}>();

const emits = defineEmits<{
  (e: 'selectTab', id: number): void;
}>();

const tabs = ref([
  { id: 1, text: 'Resumen' },
  { id: 2, text: 'Videos' },
  { id: 3, text: 'Imágenes' },
]);
</script>

<template>
  <ul class="flex justify-center">
    <li v-for="tab in tabs" :key="tab.id">
      <button
        class="uppercase text-xl text-gray px-6 py-3 transition-colors duration-300"
        :class="
          tabSelected === tab.id
            ? 'border-b-2 text-white border-white'
            : 'border-transparent'
        "
        @click="emits('selectTab', tab.id)"
      >
        {{ tab.text }}
      </button>
    </li>
  </ul>
</template>
