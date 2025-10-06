import type { Metadata } from "next"
import "./styles/globals.css"

export const metadata: Metadata = {
  title: "Movies App",
  description: "Tenha acesso aos melhores filmes direto no seu navegador",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
