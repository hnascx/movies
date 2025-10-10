const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
const API_URL = `${STRAPI_URL}/api`

export type MovieCategory = "now_playing" | "popular" | "top_rated" | "upcoming"

export interface StrapiGenre {
  id: number
  attributes: {
    tmdb_id: number
    name: string
  }
}

export interface StrapiMovie {
  id: number
  attributes: {
    tmdb_id: number
    title: string
    original_title: string
    original_language: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    popularity: number
    vote_average: number
    vote_count: number
    adult: boolean
    video: boolean
    featured: boolean
    category: MovieCategory | null
    createdAt: string
    updatedAt: string
    publishedAt: string
    genres?: {
      data: StrapiGenre[]
    }
  }
}

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface GetMoviesParams {
  category?: MovieCategory
  featured?: boolean
  page?: number
  pageSize?: number
  sortBy?: "popularity" | "vote_average" | "release_date"
  sortOrder?: "asc" | "desc"
  search?: string
}

export async function getMovies(
  params?: GetMoviesParams
): Promise<StrapiResponse<StrapiMovie[]>> {
  const query = new URLSearchParams()

  if (params?.category) {
    query.append("filters[category][$eq]", params.category)
  }

  if (params?.featured !== undefined) {
    query.append("filters[featured][$eq]", String(params.featured))
  }

  if (params?.search) {
    query.append("filters[title][$containsi]", params.search)
  }

  if (params?.page) {
    query.append("pagination[page]", String(params.page))
  }

  if (params?.pageSize) {
    query.append("pagination[pageSize]", String(params.pageSize))
  }

  if (params?.sortBy) {
    const order = params.sortOrder || "desc"
    query.append("sort", `${params.sortBy}:${order}`)
  }

  query.append("populate", "genres")

  const url = `${API_URL}/movies?${query.toString()}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`)
  }

  return response.json()
}


export async function getMovie(
  id: number
): Promise<StrapiResponse<StrapiMovie>> {
  const url = `${API_URL}/movies/${id}?populate=genres`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch movie: ${response.statusText}`)
  }

  return response.json()
}


export async function getGenres(): Promise<StrapiResponse<StrapiGenre[]>> {
  const url = `${API_URL}/genres`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch genres: ${response.statusText}`)
  }

  return response.json()
}


export async function getMoviesByGenre(
  genreId: number,
  params?: Omit<GetMoviesParams, "category">
): Promise<StrapiResponse<StrapiMovie[]>> {
  const query = new URLSearchParams()

  query.append("filters[genres][tmdb_id][$eq]", String(genreId))

  if (params?.featured !== undefined) {
    query.append("filters[featured][$eq]", String(params.featured))
  }

  if (params?.search) {
    query.append("filters[title][$containsi]", params.search)
  }

  if (params?.page) {
    query.append("pagination[page]", String(params.page))
  }

  if (params?.pageSize) {
    query.append("pagination[pageSize]", String(params.pageSize))
  }

  if (params?.sortBy) {
    const order = params.sortOrder || "desc"
    query.append("sort", `${params.sortBy}:${order}`)
  }

  query.append("populate", "genres")

  const url = `${API_URL}/movies?${query.toString()}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch movies by genre: ${response.statusText}`)
  }

  return response.json()
}


// Converte formato Strapi para o formato usado no frontend
export function transformStrapiMovie(strapiMovie: StrapiMovie) {
  const { attributes } = strapiMovie

  return {
    id: attributes.tmdb_id,
    adult: attributes.adult,
    backdrop_path: attributes.backdrop_path || "",
    genre_ids: attributes.genres?.data.map((g) => g.attributes.tmdb_id) || [],
    original_language: attributes.original_language,
    original_title: attributes.original_title,
    overview: attributes.overview,
    popularity: attributes.popularity,
    poster_path: attributes.poster_path || "",
    release_date: attributes.release_date,
    title: attributes.title,
    video: attributes.video,
    vote_average: attributes.vote_average,
    vote_count: attributes.vote_count,
    featured: attributes.featured,
  }
}

// Converte array de filmes Strapi para formato do frontend
export function transformStrapiMovies(strapiMovies: StrapiMovie[]) {
  return strapiMovies.map(transformStrapiMovie)
}
