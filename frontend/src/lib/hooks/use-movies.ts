import type { MovieCategory } from "@/services/strapi"
import { getMovies, transformStrapiMovies } from "@/services/strapi"
import type { Movie } from "@/types/movie"
import { useEffect, useState } from "react"

interface UseMoviesParams {
  category?: MovieCategory
  featured?: boolean
  pageSize?: number
}

interface UseMoviesReturn {
  movies: Movie[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useMovies(params?: UseMoviesParams): UseMoviesReturn {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMovies = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔍 Buscando filmes do Strapi...")

      const { data } = await getMovies({
        category: params?.category,
        featured: params?.featured,
        pageSize: params?.pageSize || 20,
        sortBy: "popularity",
        sortOrder: "desc",
      })

      console.log("✅ Filmes recebidos:", data.length)

      const transformedMovies = transformStrapiMovies(data)
      setMovies(transformedMovies)
    } catch (err) {
      console.error("❌ Erro ao buscar filmes:", err)
      console.error("Detalhes do erro:", {
        message: err instanceof Error ? err.message : "Erro desconhecido",
        stack: err instanceof Error ? err.stack : undefined,
      })
      setError(
        "Não foi possível carregar os filmes. Verifique se o backend está rodando."
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [params?.category, params?.featured, params?.pageSize])

  return {
    movies,
    loading,
    error,
    refetch: fetchMovies,
  }
}
