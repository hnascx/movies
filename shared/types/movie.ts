import { Genre } from './genre';

export type MovieCategory = 'now-playing' | 'popular' | 'top-rated' | 'upcoming';

export interface Movie {
  id: number;
  tmdb_id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids?: number[];
  genres?: Genre[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  categories?: MovieCategory[];
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface MovieInput {
  tmdb_id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  categories?: MovieCategory[];
  featured?: boolean;
}

export interface MovieFilters {
  category?: MovieCategory;
  featured?: boolean;
  genre?: number;
  search?: string;
}

export interface MoviesResponse {
  data: Movie[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

