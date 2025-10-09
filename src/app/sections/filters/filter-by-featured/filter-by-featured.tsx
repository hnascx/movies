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
import { delay } from "@/lib/utils"
import { Suspense, use } from "react"
import { FilterByFeaturedLoading } from "./loading"

function FilterByFeaturedSelect() {
  use(delay(2000))

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

export function FilterByFeatured() {
  return (
    <Suspense fallback={<FilterByFeaturedLoading />}>
      <FilterByFeaturedSelect />
    </Suspense>
  )
}
