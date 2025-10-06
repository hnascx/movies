import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Layout } from "../components/layout"
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  )
}
