import { Skeleton } from "@/components/ui/skeleton"

export function MoviesCardsLoading() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6 md:mt-8 max-w-7xl flex-wrap">
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton
          key={index}
          className="w-[388px] h-[354px] md:w-[394.5px] md:h-[354px] rounded-xl"
        />
      ))}
    </div>
  )
}
