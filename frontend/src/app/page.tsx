"use client"

import { MoviesProvider } from "@/lib/context/movies-context"
import { FilterByCategory } from "./sections/filters/filter-by-category"
import { FilterByFeatured } from "./sections/filters/filter-by-featured"
import { MoviesCards } from "./sections/movies-cards"
import { Search } from "./sections/search"

export default function Home() {
  return (
    <MoviesProvider>
      <section className="flex flex-col items-center justify-center mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 my-8 md:my-10">
        <div className="flex flex-col gap-3 md:grid md:grid-cols-[1fr_auto_auto] md:gap-0 w-full">
          <Search />
          <div className="flex flex-row gap-3 w-full md:ml-3">
            <FilterByFeatured />
            <FilterByCategory />
          </div>
        </div>
        <MoviesCards />
      </section>
    </MoviesProvider>
  )
}
