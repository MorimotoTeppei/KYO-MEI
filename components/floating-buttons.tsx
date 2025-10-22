"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

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
    </div>
  )
}
