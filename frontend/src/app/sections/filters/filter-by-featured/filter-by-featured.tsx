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
import { FilterByFeaturedLoading } from "./loading"

export function FilterByFeatured() {
  const isLoading = useDelayedLoading(2000)
  const { featured, setFeatured } = useMoviesContext()

  if (isLoading) {
    return <FilterByFeaturedLoading />
  }

  const handleValueChange = (value: string) => {
    if (value === "featured") {
      setFeatured(true)
    } else if (value === "all") {
      setFeatured(undefined)
    }
  }

  const currentValue =
    featured === true ? "featured" : featured === undefined ? undefined : "all"

  return (
    <Select value={currentValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full md:w-[150px]">
        <SelectValue placeholder="Classificar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Opções</SelectLabel>
          <SelectItem value="all">Todos os filmes</SelectItem>
          <SelectItem value="featured">Em destaque</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
