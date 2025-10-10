import { readFileSync } from "fs"
import { join } from "path"

interface GenreData {
  id: number
  name: string
}

interface MovieData {
  id: number
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  featured?: boolean
}

function readJSON<T>(filePath: string): T[] {
  const fullPath = join(__dirname, "../../frontend/src/data", filePath)
  const content = readFileSync(fullPath, "utf-8")
  return JSON.parse(content)
}

async function importData() {
  console.log("🚀 Iniciando importação de dados...\n")

  try {
    console.log("📚 Importando gêneros...")
    const genres = readJSON<GenreData>("genres.json")

    for (const genre of genres) {
      await strapi.entityService.create("api::genre.genre", {
        data: {
          tmdb_id: genre.id,
          name: genre.name,
        },
      })
      console.log(`  ✅ Gênero importado: ${genre.name}`)
    }

    console.log(`\n✨ ${genres.length} gêneros importados com sucesso!\n`)

    const movieFiles = [
      { file: "popular.json", category: "popular" as const },
      { file: "now-playing.json", category: "now_playing" as const },
      { file: "top-rated.json", category: "top_rated" as const },
      { file: "upcoming.json", category: "upcoming" as const },
    ]

    let totalMovies = 0

    for (const { file, category } of movieFiles) {
      console.log(`🎬 Importando filmes de ${file}...`)
      const movies = readJSON<MovieData>(file)

      for (const movie of movies) {
        const genreIds: (string | number)[] = []
        for (const genreId of movie.genre_ids) {
          const genre = await strapi.entityService.findMany(
            "api::genre.genre",
            {
              filters: { tmdb_id: genreId },
            }
          )
          if (genre && genre[0]) {
            genreIds.push(genre[0].id)
          }
        }

        const existingMovie = await strapi.entityService.findMany(
          "api::movie.movie",
          {
            filters: { tmdb_id: movie.id },
          }
        )

        if (existingMovie && existingMovie.length > 0) {
          console.log(`  ⏭️  Filme já existe: ${movie.title}`)
          continue
        }

        await strapi.entityService.create("api::movie.movie", {
          data: {
            tmdb_id: movie.id,
            title: movie.title,
            original_title: movie.original_title,
            original_language: movie.original_language,
            overview: movie.overview,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            release_date: movie.release_date,
            popularity: movie.popularity,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            adult: movie.adult,
            video: movie.video,
            featured: movie.featured || false,
            category: category,
            genres: genreIds as any,
            publishedAt: new Date(),
          },
        } as any)

        console.log(`  ✅ Filme importado: ${movie.title}`)
        totalMovies++
      }

      console.log(`\n✨ ${movies.length} filmes de ${category} processados!\n`)
    }

    console.log(
      `\n🎉 Importação concluída! Total de filmes importados: ${totalMovies}`
    )
  } catch (error) {
    console.error("❌ Erro durante a importação:", error)
    throw error
  }
}

export default async ({ strapi }) => {
  await importData()
}
