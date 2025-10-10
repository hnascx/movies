"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { GENRE_COLORS, GENRE_NAMES } from "@/data/genres"
import { useDelayedLoading } from "@/lib/hooks"
import { getImageUrl, type Movie } from "@/types/movie"
import { ChevronRight, Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface MovieDialogProps {
  movie: Movie
}

export function MovieDialog({ movie }: MovieDialogProps) {
  const posterUrl = getImageUrl(movie.poster_path, "w500")
  const [imageLoaded, setImageLoaded] = useState(false)
  const showSkeleton = useDelayedLoading(2000)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="p-0 h-4 text-sm absolute left-4.5 md:left-6.5 bottom-0"
        >
          Ver mais detalhes
          <ChevronRight className="size-4 -ml-1 mt-0.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row m-4 gap-6">
          <div className="mx-auto">
            <div className="h-[330px] w-[220px] relative shrink-0">
              {showSkeleton || !imageLoaded ? (
                <Skeleton className="w-full h-full rounded-md" />
              ) : null}
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  className={`rounded-md object-cover ${
                    showSkeleton || !imageLoaded ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-300`}
                  alt={movie.title}
                  fill
                  onLoad={() => setImageLoaded(true)}
                />
              ) : !showSkeleton ? (
                <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    Sem imagem
                  </span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex flex-col gap-1 md:gap-2">
              <Label className="text-md font-semibold">Avaliação</Label>
              <div className="flex items-center gap-1">
                <Label>
                  {movie.vote_average.toFixed(1)}/10
                  <span className="text-xs text-muted-foreground ml-1">
                    ({movie.vote_count} avaliações)
                  </span>
                </Label>
                <Star className="size-5" fill="#f9c503" stroke="#f9c503" />
              </div>
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <Label className="text-md font-semibold">Lançamento</Label>
              <Label>{formatDate(movie.release_date)}</Label>
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <Label className="text-md font-semibold">Classificação</Label>
              <Badge
                className={`text-xs font-semibold ${
                  movie.adult
                    ? "bg-red-600 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {movie.adult ? "+18" : "Livre"}
              </Badge>
            </div>
            {movie.genre_ids && movie.genre_ids.length > 0 && (
              <div className="flex flex-col gap-1 md:gap-2">
                <Label className="text-md font-semibold">Gênero(s)</Label>
                <div className="flex flex-row gap-2 flex-wrap">
                  {movie.genre_ids.map((genreId) => (
                    <Badge
                      key={genreId}
                      className={`text-xs font-semibold ${
                        GENRE_COLORS[genreId] || "bg-gray-600"
                      } text-white`}
                    >
                      {GENRE_NAMES[genreId] || "Desconhecido"}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mx-4 mb-4 gap-4">
          <DialogTitle className="text-2xl font-bold">
            {movie.title}
          </DialogTitle>
          <DialogDescription className="text-md">
            {movie.overview}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  )
}
