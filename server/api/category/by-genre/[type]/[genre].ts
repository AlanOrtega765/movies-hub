import type { Media, APIResponse } from '~/types';

export default defineEventHandler(async (event) => {
  const { apiBase, apiKey } = useRuntimeConfig();
  const { type, genre }: any = event.context.params;
  const { page } = getQuery(event);

  try {
    const response = await $fetch<APIResponse>(`/discover/${type}`, {
      baseURL: apiBase,
      params: {
        api_key: apiKey,
        language: 'es-MX',
        include_image_language: 'es',
        with_genres: genre,
        page
      },
    });

    return response.results as Media[];
  } catch (error) {
    console.log(error);
  }
});
