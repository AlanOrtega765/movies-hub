<script setup lang="ts">
import type { ExternalIds } from '~/types';

const props = defineProps<{
  links: ExternalIds;
}>();

const imdbType = computed(() => {
  if (props.links?.imdb_id?.startsWith('nm')) return 'name';

  return 'title';
});
</script>

<template>
  <ul class="flex items-center gap-x-4">
    <li v-if="links.twitter_id">
      <NuxtLink
        class="text-gray hover:text-amber transition-colors"
        :href="`https://twitter.com/${links.twitter_id}`"
        target="_blank"
      >
        <Icon name="ri:twitter-x-fill" size="24" />
      </NuxtLink>
    </li>
    <li v-if="links.facebook_id">
      <NuxtLink
        class="text-gray hover:text-amber transition-colors"
        :href="`https://facebook.com/${links.facebook_id}`"
        target="_blank"
      >
        <Icon name="ri:facebook-fill" size="24" />
      </NuxtLink>
    </li>
    <li v-if="links.instagram_id">
      <NuxtLink
        class="text-gray hover:text-amber transition-colors"
        :href="`https://intagram.com/${links.instagram_id}`"
        target="_blank"
      >
        <Icon name="lucide:instagram" size="24" />
      </NuxtLink>
    </li>
    <li v-if="links.imdb_id">
      <NuxtLink
        class="text-gray hover:text-amber transition-colors"
        :href="`https://www.imdb.com/${imdbType}/${links.imdb_id}`"
        target="_blank"
      >
        <Icon name="cib:imdb" size="24" />
      </NuxtLink>
    </li>
    <li v-if="links.github_id">
      <NuxtLink
        class="text-gray hover:text-amber transition-colors"
        :href="`https://github.com/${links.github_id}`"
        target="_blank"
      >
        <Icon name="mdi:github" size="24" />
      </NuxtLink>
    </li>
    <li v-if="links.linkedin_id">
      <NuxtLink
        class="text-gray hover:text-amber transition-colors"
        :href="`https://twitter.com/${links.twitter_id}`"
        target="_blank"
      >
        <Icon name="mdi:linkedin" size="24" />
      </NuxtLink>
    </li>
    <li v-if="links.homepage">
      <NuxtLink
        class="text-gray hover:text-amber transition-colors"
        :href="links.homepage"
        target="_blank"
      >
        <Icon name="tdesign:link" size="24" />
      </NuxtLink>
    </li>
  </ul>
</template>
