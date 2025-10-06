import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function FilterByCategory() {
  return (
    <Select>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Filtrar por categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categorias</SelectLabel>
          <SelectItem value="drama">Drama</SelectItem>
          <SelectItem value="action">Ação</SelectItem>
          <SelectItem value="comedy">Comédia</SelectItem>
          <SelectItem value="horror">Terror</SelectItem>
          <SelectItem value="fantasy">Fantasia</SelectItem>
          <SelectItem value="adventure">Aventura</SelectItem>
          <SelectItem value="animation">Animação</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
