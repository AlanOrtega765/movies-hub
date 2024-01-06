import type { Media, APIResponse } from '~/types';

export default defineEventHandler(async () => {
  const { apiBase, apiKey } = useRuntimeConfig();

  try {
    let popularMedia = [];
    const movies = await $fetch<APIResponse>('/movie/popular', {
      baseURL: apiBase,
      params: { api_key: apiKey, language: 'es-MX' },
    });
    const series = await $fetch<APIResponse>('/tv/popular', {
      baseURL: apiBase,
      params: { api_key: apiKey, language: 'es-MX' },
    });

    const movieDetail = await $fetch<Media>(`movie/${movies.results[0].id}`, {
      baseURL: apiBase,
      params: {
        api_key: apiKey,
        language: 'es-MX',
        append_to_response: 'videos,credits,images',
      },
    });

    const serieDetail = await $fetch<Media>(`tv/${series.results[0].id}`, {
      baseURL: apiBase,
      params: {
        api_key: apiKey,
        language: 'es-MX',
        append_to_response: 'videos,credits,images',
      },
    });

    popularMedia.push(movieDetail, serieDetail);

    return popularMedia as Media[];
  } catch (error) {
    console.log(error);
  }
});
