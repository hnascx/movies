export interface Genre {
  id: number;
  tmdb_id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface GenreInput {
  tmdb_id: number;
  name: string;
}

