import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function FilterByFeatured() {
  return (
    <Select>
      <SelectTrigger className="w-full md:w-[145px]">
        <SelectValue placeholder="Classificar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Opções</SelectLabel>
          <SelectItem value="featured">Em destaque</SelectItem>
          <SelectItem value="all">Todos os filmes</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
