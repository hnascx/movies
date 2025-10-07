import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

export function MoviesCards() {
  return (
    <section className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              The Hunger Games: The Ballad of Songbirds & Snakes
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row gap-6">
            <Image
              src="https://www.themoviedb.org/t/p/w220_and_h330_face//mBaXZ95R2OxueZhvQbcEWy2DqyO.jpg"
              className="rounded-md"
              alt="Movie Card"
              width={150}
              height={220}
            />
            <div className="flex flex-col items-start justify-between">
              <Label className="text-md">Sinopse</Label>
              <CardDescription className="line-clamp-7 -mt-5">
                64 years before he becomes the tyrannical president of Panem,
                Coriolanus Snow sees a chance for a change in fortunes when he
                mentors Lucy Gray Baird, the female tribute from District 12.
              </CardDescription>
              <div className="w-full flex relative">
                <Button
                  variant="link"
                  className="p-0 h-4 text-sm absolute left-19.5 md:left-21.5 bottom-0"
                >
                  Ver mais
                  <ChevronRight className="size-4 -ml-1 mt-0.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
