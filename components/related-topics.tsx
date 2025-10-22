"use client"

import Link from "next/link"
import { Topic } from "@/types/topic"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, MessageCircle, Eye } from "lucide-react"

interface RelatedTopicsProps {
  currentTopicId: number
  currentTags?: string[]
  currentAuthorId?: number
  allTopics: Topic[]
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

export function RelatedTopics({ currentTopicId, currentTags, currentAuthorId, allTopics }: RelatedTopicsProps) {
  // 現在のお題を除外
  const otherTopics = allTopics.filter((t) => t.id !== currentTopicId)

  // 同じタグのお題（3件）
  const sameTagTopics = otherTopics
    .filter((t) => t.tags?.some((tag) => currentTags?.includes(tag)))
    .slice(0, 3)

  // 同じ投稿者のお題（2件）
  const sameAuthorTopics = currentAuthorId
    ? otherTopics.filter((t) => t.author?.id === currentAuthorId).slice(0, 2)
    : []

  // トレンドお題（2件）
  const trendingTopics = otherTopics
    .filter((t) => t.badge === "trending")
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 2)

  // 重複を除いて最大7件を表示
  const relatedTopicsSet = new Set<number>()
  const relatedTopics: Topic[] = []

  ;[...sameTagTopics, ...sameAuthorTopics, ...trendingTopics].forEach((topic) => {
    if (!relatedTopicsSet.has(topic.id) && relatedTopics.length < 7) {
      relatedTopicsSet.add(topic.id)
      relatedTopics.push(topic)
    }
  })

  if (relatedTopics.length === 0) return null

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-600" />
        <h2 className="text-lg font-black text-gray-900">関連するお題</h2>
      </div>

      <p className="text-xs text-gray-500 mb-4">あなたにおすすめ</p>

      <div className="space-y-3">
        {relatedTopics.map((topic) => {
          const subjectColor = getSubjectColor(topic.subject)

          return (
            <Link key={topic.id} href={`/topic/${topic.id}`}>
              <div className="group cursor-pointer hover:shadow-md transition-all rounded-lg overflow-hidden border-2 border-gray-100 hover:border-yellow-400">
                {/* サムネイル */}
                <div className={`${subjectColor} h-20 flex items-center justify-center relative`}>
                  <div className="text-white/90 text-3xl font-black">#{String(topic.number).padStart(3, "0")}</div>

                  {/* バッジ */}
                  {topic.badge === "trending" && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-red-500 text-white text-xs font-bold">🔥</Badge>
                    </div>
                  )}
                </div>

                {/* 内容 */}
                <div className="p-3 bg-white">
                  <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-gray-700">
                    {topic.title}
                  </h3>

                  {/* 統計 */}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {topic.viewCount !== undefined && (
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span className="font-bold">
                          {topic.viewCount >= 1000 ? `${(topic.viewCount / 1000).toFixed(1)}k` : topic.viewCount}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span className="font-bold">{topic.answerCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
