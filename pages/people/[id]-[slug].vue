<script setup lang="ts">
import useFormatDate from '~/composables/useFormatDate';
import useSlug from '~/composables/useSlug';

interface Person {
  id: number;
  name: string;
  profile_path: string;
  biography: string;
  birthday: string;
  deathday: string;
  place_of_birth: string;
  popularity: number;
  movie_credits: {
    cast: any;
  };
  tv_credits: {
    cast: any;
  };
}

const config = useRuntimeConfig();
const route = useRoute();
const { id } = route.params;
const loading = ref(true);

const getAge = (birthday: string | any) => {
  const actualDate = new Date();
  const _birthday = new Date(birthday);
  let age = actualDate.getFullYear() - _birthday.getFullYear();
  const month = actualDate.getUTCMonth() - _birthday.getUTCMonth();

  if (
    month < 0 ||
    (month === 0 && actualDate.getDate() < _birthday.getDate())
  ) {
    age--;
  }

  return age;
};

const getPerson = async () => {
  const response: Person = await $fetch(
    `${config.public.apiBaseUrl}/person/${id}?api_key=${config.public.apiKey}&language=es-MX&append_to_response=movie_credits,tv_credits`
  );

  return response;
};

const { data: person } = await useAsyncData('person', () => getPerson());

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
  <div v-else class="mt-28 mb-10">
    <section class="px-4 laptop:w-[70%] laptop:mx-auto">
      <div class="flex flex-col items-center">
        <picture>
          <source
            media="(max-width: 640px)"
            :srcset="config.public.apiImageUrl + '/w300' + person?.profile_path"
          />
          <img
            v-if="person?.profile_path"
            class="w-[150px] h-[220px] laptop:w-[200px] laptop:h-[300px] desktop:w-[250px] desktop:h-[350px] rounded-lg object-fill shadow-dark shadow-lg"
            :src="config.public.apiImageUrl + '/w500' + person?.profile_path"
            :alt="person?.name"
          />
          <div
            v-else
            class="w-[150px] h-[200px] laptop:w-[200px] laptop:h-[300px] desktop:w-[250px] desktop:h-[350px] flex justify-center items-center bg-gray rounded-lg shadow-dark shadow-lg"
          >
            <font-awesome-icon size="4x" icon="image" />
          </div>
        </picture>
        <h1 class="font-bold mt-4 text-md laptop:text-xl">
          {{ person?.name }}
          <span class="text-gray font-medium"
            >{{
              person?.birthday ? `(${getAge(person?.birthday)})` : ''
            }}
            años</span
          >
        </h1>
      </div>
      <div class="mt-8">
        <h2 class="font-bold laptop:text-lg">Biografía</h2>
        <p class="font-light laptop:text-md">
          {{
            person?.biography
              ? person?.biography
              : 'No tenemos una biografía para ' + person?.name + '.'
          }}
        </p>
      </div>
      <div class="flex flex-col gap-y-4 mt-8">
        <div class="grid grid-cols-2 gap-x-4">
          <div>
            <h2 class="font-bold laptop:text-lg">Nacimiento</h2>
            <span class="font-light laptop:text-md">{{
              person?.birthday
                ? useFormatDate(person?.birthday)
                : 'No disponible.'
            }}</span>
          </div>
          <div>
            <h2 class="font-bold laptop:text-lg">Fallecimiento</h2>
            <span class="font-light laptop:text-md">{{
              person?.deathday
                ? useFormatDate(person?.deathday)
                : 'No disponible.'
            }}</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-4">
          <div>
            <h2 class="font-bold laptop:text-lg">Origen</h2>
            <span class="font-light laptop:text-md">{{
              person?.place_of_birth
                ? useFormatDate(person?.place_of_birth)
                : 'No disponible.'
            }}</span>
          </div>
          <div>
            <h2 class="font-bold laptop:text-lg">Popularidad</h2>
            <span class="font-light laptop:text-md">{{
              person?.popularity ? person?.popularity : 'No disponible.'
            }}</span>
          </div>
        </div>
      </div>
      <div class="h-[1px] w-full bg-just-white/25 my-8 rounded-full"></div>
      <div class="mt-8">
        <h2 class="font-bold laptop:text-lg">Actuando en Películas</h2>
        <div
          class="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 large-desktop:grid-cols-5 gap-4 mt-2"
        >
          <div
            class="bg-dark-jet-black shadow-dark shadow-md overflow-hidden rounded-md"
            v-for="movie in person?.movie_credits.cast"
            :key="movie.id"
          >
            <NuxtLink class="block overflow-hidden" :to="`/movies/${movie.id}-${useSlug(movie.title)}`">
              <picture>
                <source
                  media="(max-width: 640px)"
                  :srcset="
                    config.public.apiImageUrl + '/w500' + movie.backdrop_path
                  "
                />
                <img
                  v-if="movie.backdrop_path"
                  class="w-full h-[110px] desktop:h-[150px] object-cover rounded-t-md hover:scale-110 laptop:brightness-75 laptop:hover:brightness-100"
                  :src="
                    config.public.apiImageUrl + '/w500' + movie.backdrop_path
                  "
                  :alt="movie.title"
                />
                <div
                  v-else
                  class="flex items-center justify-center bg-gray w-full h-[110px] hover:scale-110 desktop:h-[150px] rounded-t-md laptop:brightness-75 laptop:hover:brightness-100"
                >
                  <font-awesome-icon size="4x" icon="image" />
                </div>
              </picture>
            </NuxtLink>
            <div class="px-2 py-3">
              <h3 class="text-sm font-bold laptop:text-base text-center">
                {{ movie.title }}
                <span class="text-gray font-medium text-x-sm laptop:text-sm">{{
                  movie.release_date
                    ? `(${movie.release_date.slice(0, 4)})`
                    : ''
                }}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[1px] w-full bg-just-white/25 my-8 rounded-full"></div>
      <div class="mt-8">
        <h2 class="font-bold laptop:text-lg">Actuando en Series</h2>

        <div
          class="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 large-desktop:grid-cols-5 gap-4 mt-2"
        >
          <div
            class="bg-dark-jet-black shadow-dark shadow-md rounded-md overflow-hidden"
            v-for="serie in person?.tv_credits.cast"
            :key="serie.id"
          >
            <NuxtLink class="block overflow-hidden" :to="`/series/${serie.id}-${useSlug(serie.name)}`">
              <picture>
                <source
                  media="(max-width: 640px)"
                  :srcset="
                    config.public.apiImageUrl + '/w300' + serie.backdrop_path
                  "
                />
                <img
                  v-if="serie.backdrop_path"
                  class="w-full h-[110px] desktop:h-[150px] object-cover rounded-t-md laptop:brightness-75 hover:scale-110 laptop:hover:brightness-100"
                  :src="
                    config.public.apiImageUrl + '/w500' + serie.backdrop_path
                  "
                  :alt="serie.name"
                />
                <div
                  v-else
                  class="flex items-center justify-center bg-gray w-full h-[110px] desktop:h-[150px] hover:scale-110 rounded-t-md laptop:brightness-75 laptop:hover:brightness-100"
                >
                  <font-awesome-icon size="4x" icon="image" />
                </div>
              </picture>
            </NuxtLink>
            <div class="px-2 py-3">
              <h3 class="text-sm font-bold laptop:text-base text-center">
                {{ serie.name }}
                <span class="text-gray font-medium text-x-sm laptop:text-sm">{{
                  serie.first_air_date
                    ? `(${serie.first_air_date.slice(0, 4)})`
                    : ''
                }}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
