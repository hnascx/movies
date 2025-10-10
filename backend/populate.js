const fs = require("fs")
const path = require("path")

const STRAPI_URL = "http://localhost:1337"

function readJSON(filePath) {
  const fullPath = path.join(__dirname, "../frontend/src/data", filePath)
  const content = fs.readFileSync(fullPath, "utf-8")
  return JSON.parse(content)
}

async function request(endpoint, method = "GET", body = null) {
  const headers = {
    "Content-Type": "application/json",
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

async function populate() {
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
        console.log(`  ⚠️  ${genre.name} já existe ou erro: ${error.message}`)
      }
    }

    console.log(`\n✨ ${genres.length} gêneros processados!\n`)

    if (genreMap.size === 0) {
      console.log("📖 Buscando gêneros existentes...")
      const existingGenres = await request("/genres")
      for (const genre of existingGenres.data) {
        genreMap.set(genre.attributes.tmdb_id, genre.id)
      }
      console.log(`  ℹ️  ${genreMap.size} gêneros encontrados\n`)
    }

    const movieFiles = [
      { file: "popular.json", category: "popular" },
      { file: "now-playing.json", category: "now_playing" },
      { file: "top-rated.json", category: "top_rated" },
      { file: "upcoming.json", category: "upcoming" },
    ]

    let totalMovies = 0
    let totalErrors = 0

    for (const { file, category } of movieFiles) {
      console.log(`🎬 Importando filmes de ${file}...`)
      const movies = readJSON(file)
      let imported = 0

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
              poster_path: movie.poster_path || null,
              backdrop_path: movie.backdrop_path || null,
              release_date: movie.release_date,
              popularity: movie.popularity,
              vote_average: movie.vote_average,
              vote_count: movie.vote_count,
              adult: movie.adult,
              video: movie.video,
              featured: movie.featured || false,
              category: category,
              genres: genreIds,
              publishedAt: new Date().toISOString(),
            },
          })

          imported++
          totalMovies++

          if (imported % 10 === 0) {
            console.log(`  📊 ${imported}/${movies.length} filmes...`)
          }
        } catch (error) {
          if (!error.message.includes("already exists")) {
            totalErrors++
          }
        }
      }

      console.log(`  ✅ ${imported} filmes importados de ${category}`)
      console.log(`  ⏭️  ${movies.length - imported} já existiam ou com erro\n`)
    }

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log(`🎉 Importação concluída!`)
    console.log(`   ✅ Total de filmes importados: ${totalMovies}`)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    console.log("🌐 Acesse o painel admin: http://localhost:1337/admin")
    console.log(
      "🔗 Teste a API: http://localhost:1337/api/movies?populate=genres\n"
    )
  } catch (error) {
    console.error("❌ Erro durante a importação:", error)
    process.exit(1)
  }
}

async function checkStrapi() {
  try {
    await fetch(`${STRAPI_URL}/_health`)
    return true
  } catch (error) {
    return false
  }
}

;(async () => {
  console.log("\n🔍 Verificando se o Strapi está rodando...\n")

  const isRunning = await checkStrapi()

  if (!isRunning) {
    console.error("❌ Strapi não está rodando!")
    console.log("\n💡 Primeiro inicie o Strapi:")
    console.log("   cd backend")
    console.log("   npm run dev\n")
    process.exit(1)
  }

  console.log("✅ Strapi está rodando!\n")
  await populate()
})()
