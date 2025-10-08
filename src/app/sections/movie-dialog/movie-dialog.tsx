import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ChevronRight, Star } from "lucide-react"
import Image from "next/image"

export function MovieDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="p-0 h-4 text-sm absolute left-4.5 md:left-6.5 bottom-0"
        >
          Ver mais detalhes
          <ChevronRight className="size-4 -ml-1 mt-0.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row m-4 gap-6">
          <div className="mx-auto">
            <div className="h-[330px] w-[220px] relative shrink-0">
              <Image
                src="https://www.themoviedb.org/t/p/w220_and_h330_face//mBaXZ95R2OxueZhvQbcEWy2DqyO.jpg"
                className="rounded-md object-cover"
                alt="Movie Card"
                fill
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex flex-col gap-1 md:gap-2">
              <Label className="text-md font-semibold">IMDb</Label>
              <Label>
                8.0/10
                <span className="text-xs text-muted-foreground">
                  (200 avaliações)
                </span>
                <Star className="size-5" fill="#f9c503" stroke="#f9c503" />
              </Label>
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <Label className="text-md font-semibold">Lançamento</Label>
              <Label>27 de novembro de 2025</Label>
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <Label className="text-md font-semibold">Classificação</Label>
              <Badge className="text-xs font-semibold bg-green-600 text-white">
                Livre
              </Badge>
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <Label className="text-md font-semibold">Gênero(s)</Label>
              <div className="flex flex-row gap-2 flex-wrap">
                <Badge className="text-xs font-semibold bg-purple-600 text-white">
                  Ação
                </Badge>
                <Badge className="text-xs font-semibold bg-yellow-600 text-white">
                  Aventura
                </Badge>
                <Badge className="text-xs font-semibold bg-blue-600 text-white">
                  Drama
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mx-4 mb-4 gap-4">
          <DialogTitle className="text-2xl font-bold">
            The Hunger Games: The Ballad of Songbirds & Snakes
          </DialogTitle>
          <DialogDescription className="text-md">
            64 years before he becomes the tyrannical president of Panem,
            Coriolanus Snow sees a chance for a change in fortunes when he
            mentors Lucy Gray Baird, the female tribute from District 12.
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  )
}
