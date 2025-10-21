"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUp, Plus } from "lucide-react"

export function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  // スクロール位置を監視
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // トップへスクロール
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* スクロールトップボタン */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg bg-white hover:bg-gray-100 text-gray-700 border-2 border-gray-200 transition-all hover:scale-110 animate-in fade-in slide-in-from-bottom-4 duration-300"
          aria-label="ページトップへ戻る"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}

      {/* クイック投稿ボタン */}
      <Link href="/post">
        <Button
          size="icon"
          className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-[#F4C300] to-[#FFD700] hover:from-[#FFD700] hover:to-[#F4C300] text-black transition-all hover:scale-110 animate-pulse"
          aria-label="お題を投稿"
        >
          <Plus className="h-8 w-8 stroke-[3]" />
        </Button>
      </Link>
    </div>
  )
}
