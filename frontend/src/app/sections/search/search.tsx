"use client"

import { Input } from "@/components/ui/input"
import { useMoviesContext } from "@/lib/context/movies-context"
import { useDelayedLoading } from "@/lib/hooks"
import { useEffect, useState } from "react"
import { SearchLoading } from "./loading"

export function Search() {
  const isLoading = useDelayedLoading(2000)
  const { searchQuery, setSearchQuery } = useMoviesContext()
  const [inputValue, setInputValue] = useState(searchQuery)

  // Debounce para evitar muitas requisições
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue)
    }, 500)

    return () => clearTimeout(timer)
  }, [inputValue, setSearchQuery])

  if (isLoading) {
    return <SearchLoading />
  }

  return (
    <Input
      placeholder="Pesquisar filme pelo nome"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="w-full"
    />
  )
}
