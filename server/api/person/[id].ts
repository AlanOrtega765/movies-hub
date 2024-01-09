import type { Person } from '~/types';

export default defineEventHandler(async (event) => {
  const { apiBase, apiKey } = useRuntimeConfig();
  const { id }: any = event.context.params;

  try {
    const response = await $fetch<Person>(`/person/${id}`, {
      baseURL: apiBase,
      params: {
        api_key: apiKey,
        language: 'es-ES',
        include_image_language: 'es',
        append_to_response: 'combined_credits,images,external_ids'
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
});
