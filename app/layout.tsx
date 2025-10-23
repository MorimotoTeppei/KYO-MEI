import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { HeaderNavigation } from "@/components/header-navigation"
import { SessionProvider } from "@/app/providers/session-provider"
import "./globals.css"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-noto-sans-jp",
})

export const metadata: Metadata = {
  title: "学習アプリ",
  description: "モバイル向け学習アプリ",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`font-sans ${notoSansJP.variable} ${GeistMono.variable}`}>
        <SessionProvider>
          <HeaderNavigation />
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  )
}
