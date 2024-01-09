<script setup lang="ts">
import type { Media } from '~/types';

const props = defineProps<{
  media: Media;
}>();

const { formatDate, formatRuntime, formatToCurrency, languageByISO } =
  useUtils();

const { data: languages } = await useFetch('/api/languages');

const directors = computed(() =>
  props.media.credits?.crew.filter((person) => person.job === 'Director')
);

const externalIds = computed(() => ({
  ...props.media.external_ids,
  homepage: props.media.homepage,
}));

const production = computed(() => {
  return props.media.production_companies
    ?.map((production) => production.name)
    .join(', ');
});
</script>

<template>
  <article class="flex flex-col gap-y-6 mt-10 lg:mt-0">
    <h1 class="text-3xl">
      {{ media.title || media.name }}
    </h1>
    <p class="text-silver">{{ media.overview }}</p>
    <ul
      class="grid grid-cols-[max-content_1fr] md:grid-cols-[max-content_1fr_max-content_1fr] gap-3 text-sm text-silver"
    >
      <template v-if="media.release_date">
        <div class="text-gray">Lanzamiento</div>
        <div>{{ formatDate(media.release_date) }}</div>
      </template>
      <template v-if="media.runtime">
        <div class="text-gray">Duración</div>
        <div>{{ formatRuntime(media.runtime) }}</div>
      </template>
      <template v-if="directors?.length">
        <div class="text-gray">Director</div>
        <div class="flex flex-wrap gap-1 h-fit">
          <NuxtLink
            class="bg-gray/10 px-2 py-1 rounded text-xs hover:bg-gray/20"
            v-for="director in directors"
            to="#"
            >{{ director.name }}</NuxtLink
          >
        </div>
      </template>
      <template v-if="media.budget">
        <div class="text-gray">Presupuesto</div>
        <div>{{ formatToCurrency(media.budget) }}</div>
      </template>
      <template v-if="media.revenue">
        <div class="text-gray">Ingresos</div>
        <div>{{ formatToCurrency(media.revenue) }}</div>
      </template>
      <template v-if="media.genres?.length">
        <div class="text-gray">Genero</div>
        <div class="flex flex-wrap gap-1 h-fit">
          <NuxtLink
            class="bg-gray/10 px-2 py-1 rounded text-xs hover:bg-gray/20"
            v-for="genre in media.genres"
            to="#"
            >{{ genre.name }}</NuxtLink
          >
        </div>
      </template>
      <template v-if="media.status">
        <div class="text-gray">Estado</div>
        <div>{{ media.status }}</div>
      </template>
      <template v-if="media.original_language">
        <div class="text-gray">Lenguaje</div>
        <div>
          {{ languageByISO(media.original_language, languages) }}
        </div>
      </template>
      <template v-if="production?.length">
        <div class="text-gray">Production</div>
        <div>{{ production }}</div>
      </template>
    </ul>
    <ExternalLinks :links="externalIds" />
  </article>
</template>
