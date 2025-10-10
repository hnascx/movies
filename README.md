# 🎬 Movies - Catálogo de Filmes

Aplicação web para busca e visualização de filmes com integração ao TMDB (The Movie Database).

## 📋 Sobre o Projeto

Sistema de catálogo de filmes que permite aos usuários navegar, pesquisar e filtrar filmes por diferentes categorias. A aplicação utiliza Next.js no frontend e Strapi como CMS headless no backend.

## ✨ Funcionalidades

- 🔍 **Busca por nome** - Pesquise filmes pelo título com debounce
- 📁 **Filtro por categoria** - Em Exibição, Populares, Mais Votados, Em Breve
- ⭐ **Filtro por destaque** - Filmes em destaque
- 🎨 **Modo claro/escuro** - Tema adaptável
- 📱 **Design responsivo** - Funciona em desktop e mobile
- 🎥 **Detalhes do filme** - Modal com informações completas
- 🏷️ **Badges de gênero** - Classificação visual por gêneros
- ⭐ **Avaliações** - Nota média e número de votos
- 🖼️ **Imagens TMDB** - Posters de alta qualidade

## 🛠️ Tecnologias

### Frontend

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI

### Backend

- **Strapi** - Headless CMS
- **SQLite** - Banco de dados

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou pnpm instalado

### 1. Clonar o Repositório

```bash
git clone https://github.com/hnascx/movies.git
cd movies
```

### 2. Instalar Dependências

```bash
# Backend
cd backend
pnpm install

# Frontend
cd frontend
pnpm install
```

### 3. Configurar Variáveis de Ambiente

Crie o arquivo `frontend/.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### 4. Popular o Banco de Dados

```bash
cd backend
node populate.js
```

### 5. Iniciar os Servidores

**Terminal 1 - Backend (Strapi):**

```bash
cd backend
pnpm run dev
```

**Terminal 2 - Frontend (Next.js):**

```bash
cd frontend
pnpm dev
```

### 6. Acessar a Aplicação

- **Frontend**: http://localhost:3000
- **Strapi Admin**: http://localhost:1337/admin

## 📂 Estrutura do Projeto

```
movies/
├── backend/           # Strapi CMS
│   ├── src/
│   │   └── api/      # Content Types (Movie, Genre)
│   ├── populate.js   # Script de população
│   └── package.json
│
└── frontend/          # Next.js App
    ├── src/
    │   ├── app/      # Pages e Sections
    │   ├── components/ # Componentes UI
    │   ├── lib/      # Hooks e Context
    │   ├── services/ # API Strapi
    │   └── types/    # TypeScript types
    └── package.json
```

## 🎯 Funcionalidades Detalhadas

### Busca Inteligente

- Busca por título com debounce de 500ms
- Case-insensitive e busca parcial
- Combinável com outros filtros

### Filtros

- **Categoria**: Filmes por categoria TMDB
- **Destaque**: Filmes marcados como featured
- **Combinação**: Todos os filtros funcionam juntos

### Modal de Detalhes

- Poster do filme com skeleton loading
- Avaliação (nota/10)
- Data de lançamento formatada
- Classificação etária (+18/Livre)
- Gêneros com badges coloridos
- Sinopse completa

## 📝 Notas Importantes

- O script `populate.js` importa 63 filmes de exemplo
- As imagens são carregadas diretamente do TMDB
- O banco de dados SQLite é criado automaticamente
- Todos os filtros são opcionais e podem ser combinados

## 🎨 Temas

A aplicação suporta modo claro e escuro, alternável pelo botão no header.
