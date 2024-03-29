import type { Media } from '~/types';

export default defineEventHandler(async (event) => {
  const { apiBase, apiKey } = useRuntimeConfig();
  const { type, id }: any = event.context.params;

  try {
    const response = await $fetch<Media>(`/${type}/${id}`, {
      baseURL: apiBase,
      params: {
        api_key: apiKey,
        language: 'es-ES',
        include_image_language: 'es',
        append_to_response: 'credits,videos,images,external_ids,recommendations'
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
});
