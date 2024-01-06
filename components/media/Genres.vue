<script setup lang="ts">
const props = defineProps<{
  mediaType: string;
  categoryList: string[];
}>();

const emits = defineEmits<{
  (e: 'categorySelected', index: number): void;
}>();

const selected = ref(0);

const { data: genres } = await useFetch(`/api/genres/${props.mediaType}`);

const categorySelected = (index: number, genreId: number | null) => {
  scrollToTop();
  selected.value = index;
  if (genreId) {
    return emits('categorySelected', genreId);
  }
  emits('categorySelected', selected.value);
};

const scrollToTop = () => window.scrollTo(0, 0);
</script>

<template>
  <div
    class="shadow-lg shadow-just-black bg-just-black/50 rounded-xl py-4 px-6"
  >
    <h1 class="font-semibol text-3xl">Categorías</h1>
    <div class="h-[1px] w-full bg-white/20 my-4"></div>
    <ul class="flex flex-col gap-y-1">
      <li v-for="(category, index) in categoryList" :key="category">
        <button
          class="text-lg text-gray hover:text-white"
          :class="selected === index ? 'text-white' : ''"
          @click="categorySelected(index, null)"
        >
          {{ category }}
        </button>
      </li>

      <div class="h-[1px] w-full bg-white/20 my-4"></div>

      <li v-for="(genre, index) in genres" :key="genre.id">
        <button
          class="text-lg text-gray hover:text-white"
          :class="selected === index + 4 ? 'text-white' : ''"
          @click="categorySelected(index + 4, genre.id)"
        >
          {{ genre.name }}
        </button>
      </li>
    </ul>
  </div>
</template>
