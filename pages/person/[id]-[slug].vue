<script setup lang="ts">
const route = useRoute();
const personId = ref(route.params.id);

const { data: person } = await useFetch(`/api/person/${personId.value}`);

const tabSelected = ref(1);
const profilePath = ref<string | null>(null);
const tabs = ref([
  { id: 1, text: 'Conocido/a por' },
  { id: 2, text: 'Imágenes' },
]);
</script>

<template>
  <div v-if="person">
    <div class="py-10 2xl:max-w-screen-2xl mx-auto px-4 lg:px-10">
      <div class="flex flex-col lg:flex-row gap-x-4 xl:gap-x-12">
        <DetailCard :file-path="person.profile_path" />
        <PersonInfo :person="person" />
      </div>
      <section class="mt-10">
        <Tabs
          :tab-selected="tabSelected"
          @select-tab="(id: number) => tabSelected = id"
          :tabs="tabs"
        />
      </section>

      <section
        v-show="tabSelected === 1"
        class="mt-10"
      >
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          <div v-for="media in person.combined_credits?.cast" :key="media.id">
            <MediaCard
              :id="media.id"
              :poster-path="media.poster_path"
              :title="media.title"
              :name="media.name"
              :vote-average="media.vote_average"
              :type="media.media_type"
            />
          </div>
        </div>
      </section>

      <section
        v-show="tabSelected === 2"
        class="mt-10 flex flex-col gap-y-10"
      >
        <PersonPhotos
          v-if="person.images?.profiles"
          :photos="person.images?.profiles"
          @select-photo="(filePath: string) => profilePath = filePath"
        />
      </section>
    </div>
    <Teleport to="body">
      <PersonOverlayPhotos
        v-if="profilePath"
        @close-overlay="profilePath = null"
        :profile-path="profilePath"
      />
    </Teleport>
  </div>
</template>
