"use client"

import { Button } from "@/components/ui/button"
import { Heart, X } from "lucide-react"

interface HeartConfirmDialogProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  isRemoving: boolean
  remainingHearts: number
  answerAuthor: string
  answerPreview: string
}

export function HeartConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  isRemoving,
  remainingHearts,
  answerAuthor,
  answerPreview,
}: HeartConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border-4 border-gray-900 animate-in zoom-in-95 duration-200">
        {/* ヘッダー */}
        <div className="relative p-6 border-b-2 border-gray-200">
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Heart
                className={`w-10 h-10 ${isRemoving ? "text-gray-400" : "text-red-500 fill-current"} animate-pulse`}
              />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900">
                {isRemoving ? "ハートを取り消しますか？" : "ハートを送りますか？"}
              </h3>
              <p className="text-sm text-gray-500 font-bold mt-1">
                {isRemoving ? "本当に取り消してもよろしいですか？" : "1人3つまで！よく吟味して押しましょう"}
              </p>
            </div>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-6">
          {/* 回答プレビュー */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4 border-2 border-gray-200">
            <p className="text-xs font-bold text-gray-500 mb-2">回答者: {answerAuthor}</p>
            <p className="text-sm text-gray-900 font-medium leading-relaxed line-clamp-3">{answerPreview}</p>
          </div>

          {/* 残りハート数 */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border-2 border-red-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-gray-900">残りハート数</span>
              <div className="flex items-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-6 h-6 transition-all ${
                      i < (isRemoving ? remainingHearts + 1 : remainingHearts - 1)
                        ? "text-red-500 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-xl font-black text-gray-900 ml-2">
                  {isRemoving ? remainingHearts + 1 : remainingHearts - 1}/3
                </span>
              </div>
            </div>

            {!isRemoving && remainingHearts === 1 && (
              <p className="text-xs text-red-600 font-bold mt-2 animate-pulse">⚠️ これが最後のハートです！</p>
            )}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="p-6 pt-0 flex gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 h-12 font-black text-base border-2 border-gray-300 hover:bg-gray-100"
          >
            キャンセル
          </Button>
          <Button
            onClick={onConfirm}
            className={`flex-1 h-12 font-black text-base ${
              isRemoving
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
            }`}
          >
            {isRemoving ? "取り消す" : "ハートを送る"}
          </Button>
        </div>
      </div>
    </div>
  )
}
