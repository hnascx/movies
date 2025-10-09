"use client"

import { Input } from "@/components/ui/input"
import { Suspense, use } from "react"
import { SearchLoading } from "./loading"
import { delay } from "@/lib/utils"

function SearchInput() {
  use(delay(2000))

  return <Input placeholder="Pesquisar filme pelo nome" />
}

export function Search() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchInput />
    </Suspense>
  )
}
