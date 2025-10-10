export interface GenreAttributes {
  tmdb_id: number
  name: string
  movies?: any // Relation to movies
}

export interface Genre {
  id: number
  attributes: GenreAttributes
}

export interface GenreInput {
  tmdb_id: number
  name: string
}
