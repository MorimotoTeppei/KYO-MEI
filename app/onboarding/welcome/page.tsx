"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Zap, Star, Rocket } from "lucide-react"

export default function OnboardingWelcomePage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  useEffect(() => {
    // アニメーションシーケンス
    const timers = [
      setTimeout(() => setStep(1), 500),   // アイコン表示
      setTimeout(() => setStep(2), 1500),  // メッセージ1
      setTimeout(() => setStep(3), 2500),  // メッセージ2
      setTimeout(() => setStep(4), 3500),  // メッセージ3
      setTimeout(() => {
        // ホーム画面に遷移
        router.push("/")
      }, 5000),
    ]

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 overflow-hidden relative">
      {/* 背景アニメーション - 輝く星 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <Star className="w-4 h-4 text-white/30" />
          </div>
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center">
        {/* ステップ1: アイコン登場 */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            step >= 1
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-50 translate-y-10"
          }`}
        >
          <div className="relative inline-block">
            {/* 回転する光の輪 */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
              <Sparkles className="w-32 h-32 text-yellow-300 opacity-50" />
            </div>
            {/* メインアイコン */}
            <div className="relative bg-white rounded-full p-8 shadow-2xl">
              <Rocket className="w-16 h-16 text-purple-600 animate-bounce" />
            </div>
          </div>
        </div>

        {/* ステップ2: メッセージ1 */}
        <div
          className={`mb-4 transition-all duration-1000 ${
            step >= 2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg flex items-center justify-center gap-3">
            <Zap className="w-12 h-12 text-yellow-300 animate-pulse" />
            準備完了！
            <Zap className="w-12 h-12 text-yellow-300 animate-pulse" />
          </h1>
        </div>

        {/* ステップ3: メッセージ2 */}
        <div
          className={`mb-4 transition-all duration-1000 ${
            step >= 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            さあ、大喜利の世界へ
          </p>
        </div>

        {/* ステップ4: メッセージ3 */}
        <div
          className={`transition-all duration-1000 ${
            step >= 4
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-xl md:text-2xl font-bold text-white/90 drop-shadow-lg flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            創造力を解き放とう
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </p>
        </div>

        {/* ローディングドット */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>

      {/* 背景グラデーション効果 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  )
}
