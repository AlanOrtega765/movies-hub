<script setup lang="ts">
const links = ref([
  { id: 1, route: '/', icon: 'ant-design:home-outlined' },
  { id: 2, route: '/movies', icon: 'material-symbols:movie-outline' },
  { id: 3, route: '/series', icon: 'eva:tv-outline' },
  { id: 4, route: '/search', icon: 'iconamoon:search' },
]);
</script>

<template>
  <div class="flex">
    <header
      class="fixed bottom-0 w-full lg:relative lg:w-fit z-30 bg-just-black border-t-[1px] lg:border-t-0 border-gray/40 lg:border-r-[1px]"
    >
      <nav class="relative lg:h-screen min-h-[80px] lg:min-w-[80px]">
        <ul
          class="relative lg:fixed top-6 lg:top-0 lg:left-6 flex lg:flex-col justify-evenly h-full"
        >
          <li v-for="link in links" :key="link.id">
            <NuxtLink
              :to="link.route"
              exact-active-class="text-amber drop-shadow-amber"
            >
              <Icon :name="link.icon" size="32" />
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <div class="bg-jet-black overflow-hidden w-full pb-[80px]">
      <main>
        <slot />
      </main>
      <footer></footer>
    </div>
  </div>
</template>
