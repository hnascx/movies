"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useDelayedLoading, useMovies } from "@/lib/hooks"
import { getImageUrl } from "@/types/movie"
import Image from "next/image"
import { MovieDialog } from "../movie-dialog"
import { MoviesCardsLoading } from "./loading"

export function MoviesCards() {
  const initialLoading = useDelayedLoading(2000)
  const { movies, loading, error } = useMovies({ pageSize: 20 })

  if (initialLoading || loading) {
    return <MoviesCardsLoading />
  }

  if (error) {
    return (
      <section className="mt-6 md:mt-8 text-center p-8">
        <p className="text-red-500 font-semibold">{error}</p>
        <p className="text-sm text-muted-foreground mt-2">
          Certifique-se que o Strapi está rodando em http://localhost:1337
        </p>
      </section>
    )
  }

  if (movies.length === 0) {
    return (
      <section className="mt-6 md:mt-8 text-center p-8">
        <p className="text-muted-foreground">Nenhum filme encontrado</p>
        <p className="text-sm text-muted-foreground mt-2">
          Execute o script de população: cd backend && node populate.js
        </p>
      </section>
    )
  }

  return (
    <section className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {movies.map((movie) => {
        const posterUrl = getImageUrl(movie.poster_path, "w500")

        return (
          <Card key={movie.id}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold line-clamp-2">
                {movie.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row gap-6">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  className="rounded-md"
                  alt={movie.title}
                  width={150}
                  height={220}
                />
              ) : (
                <div className="w-[150px] h-[220px] bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground text-center px-2">
                    Sem imagem
                  </span>
                </div>
              )}
              <div className="flex flex-col items-start justify-between">
                <Label className="text-md">Sinopse</Label>
                <CardDescription className="line-clamp-7 -mt-5">
                  {movie.overview}
                </CardDescription>
                <div className="w-full flex relative">
                  <MovieDialog movie={movie} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}
