import type { Media, APIResponse } from '~/types';

export default defineEventHandler(async (event) => {
  const { apiBase, apiKey } = useRuntimeConfig();
  const { page, query } = getQuery(event);

  try {
    const response = await $fetch<APIResponse>(`/search/multi`, {
      baseURL: apiBase,
      params: {
        api_key: apiKey,
        query,
        language: 'es-MX',
        page,
      },
    });

    return response.results as Media[];
  } catch (error) {
    console.log(error);
  }
});
