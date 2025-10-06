import { FilterByCategory } from "./sections/filters/filter-by-category"
import { FilterByFeatured } from "./sections/filters/filter-by-featured"
import { Search } from "./sections/search"

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-30">
      <div className="flex flex-col gap-3 md:grid md:grid-cols-[1fr_auto_auto] md:gap-0 w-full">
        <Search />
        <div className="flex flex-row gap-3 w-full md:ml-3">
          <FilterByFeatured />
          <FilterByCategory />
        </div>
      </div>
    </section>
  )
}
