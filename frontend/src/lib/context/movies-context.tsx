"use client"

import React, { createContext, ReactNode, useContext, useState } from "react"
import type { MovieCategory } from "@/services/strapi"

interface MoviesContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  category: MovieCategory | undefined
  setCategory: (category: MovieCategory | undefined) => void
  featured: boolean | undefined
  setFeatured: (featured: boolean | undefined) => void
  clearFilters: () => void
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined)

interface MoviesProviderProps {
  children: ReactNode
}

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState<MovieCategory | undefined>(undefined)
  const [featured, setFeatured] = useState<boolean | undefined>(undefined)

  const clearFilters = () => {
    setSearchQuery("")
    setCategory(undefined)
    setFeatured(undefined)
  }

  return (
    <MoviesContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        category,
        setCategory,
        featured,
        setFeatured,
        clearFilters,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}

export function useMoviesContext() {
  const context = useContext(MoviesContext)
  if (context === undefined) {
    throw new Error("useMoviesContext must be used within a MoviesProvider")
  }
  return context
}
