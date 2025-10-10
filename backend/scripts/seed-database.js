/**
 * Script alternativo para popular o banco de dados via HTTP
 * Use este se o script TypeScript não funcionar
 */

const fs = require("fs")
const path = require("path")

const STRAPI_URL = "http://localhost:1337"
const API_TOKEN = "seu-token-aqui"

function readJSON(filePath) {
  const fullPath = path.join(__dirname, "../../frontend/src/data", filePath)
  const content = fs.readFileSync(fullPath, "utf-8")
  return JSON.parse(content)
}

async function request(endpoint, method = "GET", body = null) {
  const headers = {
    "Content-Type": "application/json",
  }

  if (API_TOKEN) {
    headers["Authorization"] = `Bearer ${API_TOKEN}`
  }

  const options = {
    method,
    headers,
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(`${STRAPI_URL}/api${endpoint}`, options)

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Request failed: ${error}`)
  }

  return response.json()
}

async function importData() {
  console.log("🚀 Iniciando importação de dados...\n")

  try {
    console.log("📚 Importando gêneros...")
    const genres = readJSON("genres.json")
    const genreMap = new Map() // TMDB ID -> Strapi ID

    for (const genre of genres) {
      try {
        const result = await request("/genres", "POST", {
          data: {
            tmdb_id: genre.id,
            name: genre.name,
          },
        })
        genreMap.set(genre.id, result.data.id)
        console.log(`  ✅ Gênero importado: ${genre.name}`)
      } catch (error) {
        console.log(
          `⚠️ Erro ao importar gênero ${genre.name}: ${error.message}`
        )
      }
    }

    console.log(`\n✨ ${genres.length} gêneros processados!\n`)

    const movieFiles = [
      { file: "popular.json", category: "popular" },
      { file: "now-playing.json", category: "now_playing" },
      { file: "top-rated.json", category: "top_rated" },
      { file: "upcoming.json", category: "upcoming" },
    ]

    let totalMovies = 0

    for (const { file, category } of movieFiles) {
      console.log(`🎬 Importando filmes de ${file}...`)
      const movies = readJSON(file)

      for (const movie of movies) {
        try {
          const genreIds = movie.genre_ids
            .map((id) => genreMap.get(id))
            .filter((id) => id !== undefined)

          await request("/movies", "POST", {
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
              genres: genreIds,
            },
          })

          console.log(`  ✅ Filme importado: ${movie.title}`)
          totalMovies++
        } catch (error) {
          console.log(`  ⚠️  Erro ao importar ${movie.title}: ${error.message}`)
        }
      }

      console.log(`\n✨ Filmes de ${category} processados!\n`)
    }

    console.log(
      `\n🎉 Importação concluída! Total de filmes importados: ${totalMovies}`
    )
  } catch (error) {
    console.error("❌ Erro durante a importação:", error)
    process.exit(1)
  }
}

importData()
