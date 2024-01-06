import type { Media, APIResponse } from '~/types';

export default defineEventHandler(async (event) => {
  const { apiBase, apiKey } = useRuntimeConfig();
  const { type }: any = event.context.params;
  const { page } = getQuery(event);

  try {
    const response = await $fetch<APIResponse>(`/trending/${type}/day`, {
      baseURL: apiBase,
      params: {
        api_key: apiKey,
        language: 'es-MX',
        page,
      },
    });

    return response.results as Media[];
  } catch (error) {
    console.log(error);
  }
});
