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
import { Suspense, use } from "react"
import { FilterByCategoryLoading } from "./loading"
import { delay } from "@/lib/utils"

function FilterByCategorySelect() {
  use(delay(2000))

  return (
    <Select>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Filtrar por categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categorias</SelectLabel>
          <SelectItem value="drama">Drama</SelectItem>
          <SelectItem value="action">Ação</SelectItem>
          <SelectItem value="comedy">Comédia</SelectItem>
          <SelectItem value="horror">Terror</SelectItem>
          <SelectItem value="fantasy">Fantasia</SelectItem>
          <SelectItem value="adventure">Aventura</SelectItem>
          <SelectItem value="animation">Animação</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function FilterByCategory() {
  return (
    <Suspense fallback={<FilterByCategoryLoading />}>
      <FilterByCategorySelect />
    </Suspense>
  )
}
