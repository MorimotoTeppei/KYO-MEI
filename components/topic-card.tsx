"use client"

import { useState } from "react"
import Link from "next/link"
import { Topic } from "@/types/topic"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Eye, MessageCircle, Heart, Bookmark, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TopicCardProps {
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

export function TopicCard({ topic }: TopicCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const badgeContent = getBadgeContent(topic.badge)
  const isActive = topic.status === "active"
  const subjectColor = getSubjectColor(topic.subject)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLiked(!isLiked)
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsBookmarked(!isBookmarked)
  }

  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <Link href={`/topic/${topic.id}`} className="block group">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden relative">
              {/* サムネイル部分 */}
              <div className={`relative h-32 ${subjectColor} flex items-center justify-center`}>
                {/* バッジ表示（左上） */}
                {badgeContent && (
                  <div className="absolute top-3 left-3">
                    <Badge className={`${badgeContent.className} font-bold text-xs px-3 py-1`}>
                      {badgeContent.text}
                    </Badge>
                  </div>
                )}

                {/* 統計情報（右上） */}
                <div className="absolute top-3 right-3 flex gap-3 text-white text-sm font-bold">
                  {topic.viewCount !== undefined && (
                    <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full">
                      <Eye className="w-4 h-4" />
                      <span>
                        {topic.viewCount >= 1000 ? `${(topic.viewCount / 1000).toFixed(1)}k` : topic.viewCount}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full">
                    <MessageCircle className="w-4 h-4" />
                    <span>{topic.answerCount}</span>
                  </div>
                </div>

                {/* お題番号（中央） */}
                <div className="text-white/90 text-5xl font-black">
                  #{String(topic.number).padStart(3, "0")}
                </div>
              </div>

              {/* カード本体 */}
              <div className="p-5">
                {/* お題タイトル */}
                <h3 className="text-lg font-black text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                  {topic.title}
                </h3>

                {/* タグ表示 */}
                {topic.tags && topic.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {topic.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 下部情報 */}
                <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>回答 {topic.answerCount}件</span>
                    {topic.createdAt && (
                      <>
                        <span>•</span>
                        <span>{topic.createdAt}</span>
                      </>
                    )}
                  </div>

                  {/* いいね数 */}
                  {topic.likeCount !== undefined && (
                    <div className="flex items-center gap-1 text-red-500">
                      <Heart className="w-4 h-4 fill-current" />
                      <span>{topic.likeCount}</span>
                    </div>
                  )}
                </div>

                {/* 開催中の残り時間 */}
                {isActive && topic.timeLeft && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs font-bold text-orange-600">{topic.timeLeft}</span>
                  </div>
                )}
              </div>

              {/* ホバー時のクイックアクションボタン */}
              {isHovered && (
                <div className="absolute bottom-4 right-4 flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <Button
                    size="sm"
                    variant={isLiked ? "default" : "secondary"}
                    className="shadow-lg"
                    onClick={handleLike}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant={isBookmarked ? "default" : "secondary"}
                    className="shadow-lg"
                    onClick={handleBookmark}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                  </Button>
                </div>
              )}
            </div>
          </Link>
        </div>
      </HoverCardTrigger>

      {/* ホバーカード：ベスト回答プレビュー */}
      {topic.bestAnswer && (
        <HoverCardContent className="w-80" side="right" align="start">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-gray-900">ベスト回答</h4>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <ThumbsUp className="w-3 h-3" />
                <span>{topic.bestAnswer.likeCount}</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{topic.bestAnswer.content}</p>
            <div className="flex items-center gap-2 pt-2 border-t">
              <Avatar className="w-5 h-5">
                <AvatarFallback className="text-xs">{topic.bestAnswer.author[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-bold text-gray-600">{topic.bestAnswer.author}</span>
            </div>
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  )
}
