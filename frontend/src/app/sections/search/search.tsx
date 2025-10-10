"use client"

import { Input } from "@/components/ui/input"
import { useDelayedLoading } from "@/lib/hooks"
import { SearchLoading } from "./loading"

export function Search() {
  const isLoading = useDelayedLoading(2000)

  if (isLoading) {
    return <SearchLoading />
  }

  return <Input placeholder="Pesquisar filme pelo nome" />
}
