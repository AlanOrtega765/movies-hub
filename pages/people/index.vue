<script setup lang="ts">
import useSlug from '~/composables/useSlug';

const config = useRuntimeConfig();
const currentPage = ref(1);
const people: any = ref([]);
const morePeople: any = ref([]);
const loading = ref(true);
const pending = ref(false);

const visibilityChanged = (isVisible: boolean) => {
  if (isVisible) {
    if (currentPage.value > 1) nextPage();
  }
};

const getPeopleResults = async (page: number) => {
  const response = (await $fetch(
    `${config.public.apiBaseUrl}/person/popular?api_key=${config.public.apiKey}&language=es-MX&page=${page}`
  )) as { results: any };

  pending.value = false;
  return response.results;
};

const getPeople = async () => {
  const { data } = await useAsyncData(
    'people',
    () => getPeopleResults(currentPage.value),
    {
      transform: (data) => {
        return data.map((person: any) => ({
          id: person.id,
          name: person.name,
          profile_path: person.profile_path,
        }));
      },
    }
  );

  morePeople.value = data.value;
  morePeople.value.forEach((person: any) => {
    people.value.push(person);
  });
};

const nextPage = () => {
  pending.value = true;
  currentPage.value++;

  getPeople();
};

const { data } = await useAsyncData(
  'people',
  () => getPeopleResults(currentPage.value),
  {
    transform: (data) => {
      return data.map((person: any) => ({
        id: person.id,
        name: person.name,
        profile_path: person.profile_path,
      }));
    },
  }
);

people.value = data.value;

onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <div
    v-if="loading"
    class="absolute top-0 left-0 z-20 flex items-center justify-center bg-jet-black w-full h-full"
  >
    <img
      class="w-[150px] h-[150px] laptop:w-[200px] laptop:h-[200px] animate-scale"
      src="/favicon.png"
    />
  </div>
  <div v-else class="mt-28 px-4 desktop:w-2/3 mx-auto">
    <section>
      <div class="grid grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-5 gap-4">
        <div v-for="person in people" :key="person.id" class="w-full mx-auto">
          <NuxtLink
            class="block w-fit mx-auto"
            :to="`/people/${person.id}-${useSlug(person.name)}`"
          >
            <picture>
              <source
                media="(max-width: 640px)"
                :srcset="
                  config.public.apiImageUrl + '/w300' + person.profile_path
                "
              />
              <img
                v-if="person.profile_path"
                class="w-[130px] h-[200px] desktop:w-[180px] desktop:h-[250px] mx-auto rounded-lg object-fill laptop:brightness-75 laptop:hover:brightness-100"
                :src="config.public.apiImageUrl + '/w500' + person.profile_path"
                :alt="person.name"
              />
              <div
                v-else
                class="flex items-center justify-center w-[130px] h-[200px] desktop:w-[180px] desktop:h-[250px] mx-auto rounded-lg bg-gray laptop:brightness-75 laptop:hover:brightness-100"
              >
                <font-awesome-icon size="4x" icon="image" />
              </div>
            </picture>
          </NuxtLink>
          <div
            class="bg-dark-jet-black mt-2 px-4 py-1 rounded-full shadow-dark shadow-md max-w-fit mx-auto"
          >
            <h2
              class="whitespace-nowrap overflow-hidden text-ellipsis text-center text-sm laptop:text-base"
            >
              {{ person.name }}
            </h2>
          </div>
        </div>
      </div>
      <button
        v-if="!pending"
        class="bg-slate-gray w-full py-4 font-bold uppercase rounded-md my-10"
        @click="nextPage"
        v-observe-visibility="visibilityChanged"
      >
        Ver Más
      </button>
      <div v-else class="flex justify-center py-14">
        <font-awesome-icon class="animate-spin" size="2x" icon="circle-notch" />
      </div>
    </section>
  </div>
</template>
