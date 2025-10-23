"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function HeaderNavigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // 認証画面と管理者画面ではヘッダーを非表示
  if (pathname?.startsWith("/auth") || pathname?.startsWith("/admin") || pathname?.startsWith("/onboarding")) {
    return null
  }

  const tabs = [
    { id: "大喜利", label: "大喜利", href: "/" },
    { id: "設定", label: "設定", href: "/settings" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        {/* 左側：アプリ名 */}
        <Link href="/" className="font-black text-xl md:text-2xl text-black tracking-tight">
          KYO-MEI
        </Link>

        <nav className="hidden md:flex gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`px-4 lg:px-6 py-2 rounded-xl font-black text-sm lg:text-base transition-all ${
                pathname === tab.href
                  ? "bg-black text-white"
                  : "bg-white text-black border-2 border-black hover:bg-black hover:text-white"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="メニュー"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`block h-1 bg-black rounded transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span className={`block h-1 bg-black rounded transition-all ${isMenuOpen ? "opacity-0" : ""}`} />
            <span
              className={`block h-1 bg-black rounded transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden border-t-2 border-black bg-white">
          <div className="flex flex-col p-4 gap-2">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-6 py-3 rounded-xl font-black text-base transition-all text-center ${
                  pathname === tab.href
                    ? "bg-black text-white"
                    : "bg-white text-black border-2 border-black hover:bg-black hover:text-white"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
