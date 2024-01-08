<script setup lang="ts">
import type { Media } from '~/types';

const search = ref('');
const searchResult = ref<Media[]>([]);
const actualPage = ref(1);
const loading = ref(false);
const allResultsLoading = ref(true);
const notResultsExisting = ref(false);
const target = ref(null);

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting && searchResult.value.length !== 0) {
    loading.value = true;
    actualPage.value++;
    throttledSearch();
  }
});

watch(search, (newSearch, oldSearch) => {
  notResultsExisting.value = false;
  loading.value = false;
  searchResult.value = [];
  actualPage.value = 1;
  throttledSearch();
});

const searchMedia = async () => {
  allResultsLoading.value = true;
  if (search.value) {
    loading.value = true;
    const { data } = await useFetch(`/api/search`, {
      params: {
        query: search.value,
        page: actualPage.value,
      },
    });

    if (data.value?.length === 0) {
      allResultsLoading.value = false;
      notResultsExisting.value = true;
      return;
    }

    loading.value = false;

    if (data.value) {
      return searchResult.value.push(
        ...data.value.filter((media) => media.media_type !== 'person')
      );
    }
  }
};

const throttledSearch = useDebounceFn(searchMedia, 500);
</script>

<template>
  <div class="flex flex-col py-4">
    <div class="px-10">
      <div
        class="flex items-center bg-just-black text-3xl gap-x-4 rounded-full px-10"
      >
        <Icon class="text-gray" name="iconamoon:search" size="32" />
        <input
          class="w-full py-6 outline-none bg-transparent placeholder:text-gray"
          type="text"
          placeholder="Buscar..."
          v-model="search"
        />
      </div>
    </div>
    <div v-if="notResultsExisting" class="px-20 mt-10">
      <h1 class="text-2xl">No se han encontrado resultados.</h1>
    </div>
    <div class="grid grid-cols-6 gap-10 px-20 mt-10">
      <div v-for="media in searchResult" :key="media.id">
        <MediaCard
          :poster-path="media.poster_path"
          :id="media.id"
          :type="media.media_type"
          :name="media.name"
          :title="media.title"
          :vote-average="media.vote_average"
        />
      </div>
      <div
        v-if="allResultsLoading"
        ref="target"
        class="flex justify-center items-center col-span-full h-12"
      >
        <Icon
          v-if="loading"
          class="animate-spin"
          name="mingcute:loading-fill"
          size="48"
        />
      </div>
    </div>
  </div>
</template>
