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
    if (value === "all") {
      setFeatured(undefined)
    } else if (value === "featured") {
      setFeatured(true)
    }
  }

  const getCurrentValue = () => {
    if (featured === true) return "featured"
    return "all"
  }

  return (
    <Select value={getCurrentValue()} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full md:w-[145px]">
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
