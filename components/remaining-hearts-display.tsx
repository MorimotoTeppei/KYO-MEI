"use client"

import { Heart } from "lucide-react"

interface RemainingHeartsDisplayProps {
  remainingHearts: number
}

export function RemainingHeartsDisplay({ remainingHearts }: RemainingHeartsDisplayProps) {
  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 md:p-6 border-2 border-red-200 shadow-sm sticky top-6 z-10 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base md:text-lg font-black text-gray-900 mb-1">残りハート</h3>
          <p className="text-xs text-gray-600 font-bold">よく吟味して押しましょう！</p>
        </div>

        <div className="flex items-center gap-2">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className={`w-7 h-7 md:w-8 md:h-8 transition-all duration-300 ${
                i < remainingHearts
                  ? "text-red-500 fill-current animate-pulse"
                  : "text-gray-300 opacity-50 grayscale"
              }`}
            />
          ))}
          <span className="text-2xl md:text-3xl font-black text-gray-900 ml-2">{remainingHearts}/3</span>
        </div>
      </div>

      {/* 警告メッセージ */}
      {remainingHearts === 0 && (
        <div className="mt-3 pt-3 border-t-2 border-red-200">
          <p className="text-sm font-bold text-red-600 text-center">
            ❌ ハートを使い切りました。取り消すと再度使えます。
          </p>
        </div>
      )}

      {remainingHearts === 1 && (
        <div className="mt-3 pt-3 border-t-2 border-red-200">
          <p className="text-sm font-bold text-orange-600 text-center animate-pulse">
            ⚠️ 残り1つ！慎重に選びましょう
          </p>
        </div>
      )}
    </div>
  )
}
