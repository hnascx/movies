import Image from "next/image"
import { ThemeToggle } from "../../ui/theme-toggle"

const logoURL =
  "https://cdn.prod.website-files.com/62fa7875079132bbd2cc1051/6812319f3b7b558d263e47a8_bolha.svg"

export function Header() {
  return (
    <header className="sticky z-50 w-full border-b-1 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <span className="text-2xl font-bold">
            <div className="relative w-[100px] h-[38px] sm:w-[138px] sm:h-[52px]">
              <Image
                src={logoURL}
                alt="Bolha"
                fill
                className="object-contain invert dark:invert-0"
                sizes="(max-width: 640px) 100px, 138px"
                priority
              />
            </div>
          </span>

          <nav className="flex items-center gap-6">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
