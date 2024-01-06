export interface Media {
  adult: number;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
  original_name?: string;
  first_air_date?: string;
  name?: string;
  homepage?: string;
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  images?: {
    backdrops: Image[];
    posters: Image[];
  };
  external_ids?: ExternalIds;
  credits?: {
    cast: Person[];
    crew: Person[];
  };
  videos?: {
    results: Video[];
  };
  genres?: Genre[];
  production_companies?: ProductionCompany[];
  seasons?: Season[];
}

export interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path: string;
  popularity: number;
  cast_id?: number;
  job?: string;
  character?: string;
  credit_id: string;
  order: number;
  also_known_as?: string[];
  birthday?: string;
  place_of_birth?: string;
  homepage?: string;
  biography?: string;
  external_ids?: ExternalIds;
  combined_credits?: {
    cast?: Media[];
    crew?: Media[];
  };
  images?: {
    profiles: Image[];
  };
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Season {
  air_date?: string;
  episode_count?: number;
  id?: number;
  name?: string;
  overview?: string;
  poster_path?: string;
  season_number?: number;
  vote_average?: number;
}

export interface Image {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ExternalIds {
  imdb_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
  linkedin_id?: string;
  github_id?: string;
  email?: string;
  homepage?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface APIResponse {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}

export interface APIResponseGenres {
  genres: Genre[];
}
