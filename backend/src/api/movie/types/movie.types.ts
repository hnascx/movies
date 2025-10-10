export type MovieCategory = "now_playing" | "popular" | "top_rated" | "upcoming"

export interface MovieAttributes {
  tmdb_id: number
  title: string
  original_title: string
  original_language: string
  overview: string
  poster_path?: string
  backdrop_path?: string
  release_date: string // ISO date string
  popularity: number
  vote_average: number
  vote_count: number
  adult: boolean
  video: boolean
  featured: boolean
  category?: MovieCategory
  genres?: any // Relation to genres
}

export interface Movie {
  id: number
  attributes: MovieAttributes
}

export interface MovieInput {
  tmdb_id: number
  title: string
  original_title: string
  original_language: string
  overview: string
  poster_path?: string
  backdrop_path?: string
  release_date: string
  popularity?: number
  vote_average?: number
  vote_count?: number
  adult?: boolean
  video?: boolean
  featured?: boolean
  category?: MovieCategory
  genre_ids?: number[]
}
