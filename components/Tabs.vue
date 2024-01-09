<script setup lang="ts">
interface Tab {
  id: number;
  text: string;
}

defineProps<{
  tabSelected: number;
  tabs: Tab[];
}>();

const emits = defineEmits<{
  (e: 'selectTab', id: number): void;
}>();
</script>

<template>
  <ul class="flex justify-center">
    <li v-for="tab in tabs" :key="tab.id">
      <button
        class="uppercase text-lg lg:text-xl text-gray px-2 lg:px-6 py-3 transition-colors duration-300"
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
