"use client"

import { Answer } from "@/types/answer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Pin } from "lucide-react"

interface PinnedAnswersProps {
  answers: Answer[]
  onAnswerClick: (answerId: number) => void
}

export function PinnedAnswers({ answers, onAnswerClick }: PinnedAnswersProps) {
  // いいね数でソートして上位3件を取得
  const topAnswers = [...answers]
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, 3)
    .filter((answer) => answer.likeCount > 0) // いいねが0より大きいもののみ

  if (topAnswers.length === 0) return null

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-4">
        <Pin className="w-5 h-5 text-red-500" />
        <h2 className="text-lg font-black text-gray-900">ピン留め回答（上位3件）</h2>
      </div>

      <div className="space-y-3">
        {topAnswers.map((answer, index) => {
          // 順位に応じた絵文字
          const rankEmoji = index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"

          return (
            <div
              key={answer.id}
              onClick={() => onAnswerClick(answer.id)}
              className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-red-500 cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
            >
              {/* ヘッダー */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{rankEmoji}</span>
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={answer.author.avatar} alt={answer.author.name} />
                    <AvatarFallback className="text-xs">{answer.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-bold text-gray-700">{answer.author.name}</span>
                </div>

                <div className="flex items-center gap-1 text-red-500">
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">{answer.likeCount}</span>
                </div>
              </div>

              {/* 回答内容（省略表示） */}
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{answer.content}</p>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-gray-500 mt-3">クリックして回答へジャンプ</p>
    </div>
  )
}
