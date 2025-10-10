export interface Movie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  popularity: number
  vote_average: number
  vote_count: number
  adult: boolean
  video: boolean
  featured?: boolean
  genre_ids: number[]
  original_language: string
}

export interface Genre {
  id: number
  name: string
}

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export const getImageUrl = (path: string, size: string = "w500") => {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}
