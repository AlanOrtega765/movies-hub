<script setup lang="ts">
import type { Person } from '~/types';

const props = defineProps<{
  person: Person;
}>();

const { formatDate } = useUtils();

const { data: languages } = await useFetch('/api/languages');

const externalIds = computed(() => ({
  ...props.person.external_ids,
  homepage: props.person.homepage,
}));
</script>

<template>
  <article class="flex flex-col gap-y-6">
    <h1 class="text-3xl">{{ person.name }}</h1>
    <p v-if="person.biography" class="text-silver whitespace-pre-wrap">{{ person.biography }}</p>
    <ul class="grid lg:grid-cols-[max-content_1fr] gap-3 text-sm text-silver">
      <template v-if="person.known_for_department">
        <div class="text-gray">Rol</div>
        <div>{{ person.known_for_department }}</div>
      </template>
      <template v-if="person.place_of_birth">
        <div class="text-gray">Lugar de nacimiento</div>
        <div>{{ person.place_of_birth }}</div>
      </template>
      <template v-if="person.birthday">
        <div class="text-gray">Fecha nacimiento</div>
        <div>{{ formatDate(person.birthday) }}</div>
      </template>
    </ul>
    <ExternalLinks :links="externalIds" />
  </article>
</template>
