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
import { useDelayedLoading } from "@/lib/hooks"
import { FilterByFeaturedLoading } from "./loading"

export function FilterByFeatured() {
  const isLoading = useDelayedLoading(2000)

  if (isLoading) {
    return <FilterByFeaturedLoading />
  }

  return (
    <Select>
      <SelectTrigger className="w-full md:w-[145px]">
        <SelectValue placeholder="Classificar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Opções</SelectLabel>
          <SelectItem value="featured">Em destaque</SelectItem>
          <SelectItem value="all">Todos os filmes</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
