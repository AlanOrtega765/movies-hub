<script setup lang="ts">
const route = useRoute();
const movieId = ref(route.params.id);

const { data: movie } = await useFetch(`/api/movie/${movieId.value}`);

const tabs = ref([
  { id: 1, text: 'Resumen' },
  { id: 2, text: 'Videos' },
  { id: 3, text: 'Imágenes' },
]);
const selected = ref(1);
const selectTab = (index: number) => {
  selected.value = index;
};
</script>

<template>
  <div v-if="movie">
    <MediaBanner :media="movie" />
    <div class="py-10">
      <section>
        <ul class="flex justify-center">
          <li v-for="tab in tabs" :key="tab.id">
            <button
              class="uppercase text-xl text-gray px-6 py-3 transition-colors duration-300"
              :class="
                selected === tab.id
                  ? 'border-b-2 text-white border-white'
                  : 'border-transparent'
              "
              @click="selectTab(tab.id)"
            >
              {{ tab.text }}
            </button>
          </li>
        </ul>
      </section>
      <section
        v-show="selected === 1"
        class="px-20 flex items-center mx-auto gap-x-12 max-w-screen-xl mt-10"
      >
        <MediaDetailCard :poster-path="movie.poster_path" />
        <MediaDetails :media="movie"/>
      </section>
      <section v-show="selected === 2" class="px-20">2</section>
      <section v-show="selected === 3" class="px-20">3</section>
    </div>
  </div>
</template>
