import type { Genre, APIResponseGenres } from '~/types';

export default defineEventHandler(async (event) => {
  const { apiBase, apiKey } = useRuntimeConfig();
  const { type }: any = event.context.params;

  try {
    const response = await $fetch<APIResponseGenres>(`/genre/${type}/list`, {
      baseURL: apiBase,
      params: {
        api_key: apiKey,
        language: 'es-MX',
      },
    });

    return response.genres as Genre[];
  } catch (error) {
    console.log(error);
  }
});
