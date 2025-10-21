"use client"

import { Topic } from "@/types/topic"
import { Badge } from "@/components/ui/badge"
import { Eye, MessageCircle, Heart, Clock } from "lucide-react"

interface TopicDetailCardProps {
  topic: Topic
}

// subject（科目）に応じた背景色を返す
const getSubjectColor = (subject: string): string => {
  const colors: Record<string, string> = {
    物理: "bg-gradient-to-br from-blue-400 to-blue-600",
    歴史: "bg-gradient-to-br from-amber-400 to-amber-600",
    情報: "bg-gradient-to-br from-purple-400 to-purple-600",
    数学: "bg-gradient-to-br from-green-400 to-green-600",
    化学: "bg-gradient-to-br from-pink-400 to-pink-600",
    生物: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    default: "bg-gradient-to-br from-gray-400 to-gray-600",
  }
  return colors[subject] || colors.default
}

// バッジの表示内容を取得
const getBadgeContent = (badge?: Topic["badge"]) => {
  switch (badge) {
    case "trending":
      return { text: "🔥 トレンド", className: "bg-red-500 text-white" }
    case "new":
      return { text: "⭐ 新着", className: "bg-blue-500 text-white" }
    case "ending-soon":
      return { text: "⏰ 終了間近", className: "bg-orange-500 text-white" }
    default:
      return null
  }
}

export function TopicDetailCard({ topic }: TopicDetailCardProps) {
  const subjectColor = getSubjectColor(topic.subject)
  const badgeContent = getBadgeContent(topic.badge)
  const isActive = topic.status === "active"

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* サムネイル部分（大型） */}
      <div className={`relative h-64 md:h-80 ${subjectColor} flex flex-col items-center justify-center`}>
        {/* バッジ表示（左上） */}
        {badgeContent && (
          <div className="absolute top-4 left-4">
            <Badge className={`${badgeContent.className} font-bold text-sm px-4 py-2`}>
              {badgeContent.text}
            </Badge>
          </div>
        )}

        {/* ステータス表示（右上） */}
        <div className="absolute top-4 right-4">
          {isActive ? (
            <Badge className="bg-green-500 text-white font-bold text-sm px-4 py-2">開催中</Badge>
          ) : (
            <Badge className="bg-gray-500 text-white font-bold text-sm px-4 py-2">終了</Badge>
          )}
        </div>

        {/* お題番号（中央） */}
        <div className="text-white/90 text-7xl md:text-8xl font-black mb-4">
          #{String(topic.number).padStart(3, "0")}
        </div>

        {/* 科目名 */}
        <div className="text-white/80 text-lg md:text-xl font-bold">{topic.subject}</div>
      </div>

      {/* カード本体 */}
      <div className="p-6 md:p-8">
        {/* お題タイトル */}
        <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-6">{topic.title}</h1>

        {/* お題の詳細説明 */}
        {topic.description && (
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">{topic.description}</p>
        )}

        {/* 統計情報 */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-600">
          {/* 閲覧数 */}
          {topic.viewCount !== undefined && (
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span className="text-sm md:text-base font-bold">
                {topic.viewCount >= 1000 ? `${(topic.viewCount / 1000).toFixed(1)}k` : topic.viewCount} 閲覧
              </span>
            </div>
          )}

          {/* 回答数 */}
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm md:text-base font-bold">{topic.answerCount} 回答</span>
          </div>

          {/* いいね数 */}
          {topic.likeCount !== undefined && (
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <span className="text-sm md:text-base font-bold">{topic.likeCount}</span>
            </div>
          )}

          {/* 投稿日時 */}
          {topic.createdAt && (
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm md:text-base font-bold">{topic.createdAt}</span>
            </div>
          )}
        </div>

        {/* 残り時間（開催中のみ） */}
        {isActive && topic.timeLeft && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm md:text-base font-bold text-orange-600">⏰ 残り時間: {topic.timeLeft}</span>
          </div>
        )}
      </div>
    </div>
  )
}
