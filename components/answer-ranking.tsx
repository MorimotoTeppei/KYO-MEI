"use client"

import Link from "next/link"
import { Answer } from "@/types/answer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Heart } from "lucide-react"

interface AnswerRankingProps {
  answers: Answer[]
}

export function AnswerRanking({ answers }: AnswerRankingProps) {
  // いいね数でソートして上位5名を取得（重複ユーザーを除外）
  const uniqueAuthors = new Map<number, { answer: Answer; totalLikes: number }>()

  answers.forEach((answer) => {
    const existingAuthor = uniqueAuthors.get(answer.author.id)
    if (existingAuthor) {
      existingAuthor.totalLikes += answer.likeCount
    } else {
      uniqueAuthors.set(answer.author.id, {
        answer,
        totalLikes: answer.likeCount,
      })
    }
  })

  const topAuthors = Array.from(uniqueAuthors.values())
    .sort((a, b) => b.totalLikes - a.totalLikes)
    .slice(0, 5)

  if (topAuthors.length === 0) return null

  // 順位に応じたアイコン
  const getRankIcon = (index: number) => {
    if (index === 0) return "🥇"
    if (index === 1) return "🥈"
    if (index === 2) return "🥉"
    return `${index + 1}`
  }

  // 順位に応じた背景色
  const getRankBgColor = (index: number) => {
    if (index === 0) return "bg-gradient-to-r from-yellow-100 to-yellow-200"
    if (index === 1) return "bg-gradient-to-r from-gray-100 to-gray-200"
    if (index === 2) return "bg-gradient-to-r from-orange-100 to-orange-200"
    return "bg-gray-50"
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-yellow-600" />
        <h2 className="text-lg font-black text-gray-900">回答者ランキング</h2>
      </div>

      <p className="text-xs text-gray-500 mb-4">このお題のいいね数トップ5</p>

      <div className="space-y-2">
        {topAuthors.map(({ answer, totalLikes }, index) => (
          <Link key={answer.author.id} href={`/user/${answer.author.id}`}>
            <div
              className={`${getRankBgColor(index)} p-3 rounded-lg hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]`}
            >
              <div className="flex items-center gap-3">
                {/* 順位 */}
                <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                  {index < 3 ? (
                    <span className="text-2xl">{getRankIcon(index)}</span>
                  ) : (
                    <span className="text-lg font-black text-gray-600">{index + 1}</span>
                  )}
                </div>

                {/* アバター */}
                <Avatar className="w-10 h-10">
                  <AvatarImage src={answer.author.avatar} alt={answer.author.name} />
                  <AvatarFallback className="text-sm font-bold bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                    {answer.author.name[0]}
                  </AvatarFallback>
                </Avatar>

                {/* 名前といいね数 */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{answer.author.name}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Heart className="w-3 h-3 text-red-500 fill-current" />
                    <span className="font-bold">{totalLikes}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
