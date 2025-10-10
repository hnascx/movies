"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMoviesContext } from "@/lib/context/movies-context"
import { useDelayedLoading } from "@/lib/hooks"
import type { MovieCategory } from "@/services/strapi"
import { FilterByCategoryLoading } from "./loading"

const CATEGORIES: { value: MovieCategory; label: string }[] = [
  { value: "now_playing", label: "Em Exibição" },
  { value: "popular", label: "Populares" },
  { value: "top_rated", label: "Mais Votados" },
  { value: "upcoming", label: "Em Breve" },
]

export function FilterByCategory() {
  const isLoading = useDelayedLoading(2000)
  const { category, setCategory } = useMoviesContext()

  if (isLoading) {
    return <FilterByCategoryLoading />
  }

  const handleValueChange = (value: string) => {
    if (value === "all") {
      setCategory(undefined)
    } else {
      setCategory(value as MovieCategory)
    }
  }

  return (
    <Select value={category || "all"} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Filtrar por categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categorias</SelectLabel>
          <SelectItem value="all">Todas</SelectItem>
          {CATEGORIES.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
