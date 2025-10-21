"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Hash, TrendingUp } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface TopUser {
  id: number
  name: string
  avatar?: string
  answerCount: number
  likeCount: number
}

interface TopTag {
  name: string
  count: number
  trend: "up" | "stable" | "down"
}

// サンプルランキングデータ
const topUsers: TopUser[] = [
  { id: 1, name: "お笑い次郎", answerCount: 156, likeCount: 2341 },
  { id: 2, name: "コメディ花子", answerCount: 134, likeCount: 1987 },
  { id: 3, name: "ユーモアマスター", answerCount: 128, likeCount: 1756 },
  { id: 4, name: "笑いの達人", answerCount: 112, likeCount: 1543 },
  { id: 5, name: "科学太郎", answerCount: 98, likeCount: 1234 },
]

const topTags: TopTag[] = [
  { name: "物理", count: 42, trend: "up" },
  { name: "AI", count: 38, trend: "up" },
  { name: "情報", count: 35, trend: "stable" },
  { name: "宇宙", count: 28, trend: "up" },
  { name: "SF", count: 24, trend: "stable" },
]

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "text-yellow-600"
    case 2:
      return "text-gray-500"
    case 3:
      return "text-amber-700"
    default:
      return "text-gray-400"
  }
}

const getRankIcon = (rank: number) => {
  if (rank <= 3) {
    return <Trophy className={`w-4 h-4 ${getRankColor(rank)}`} />
  }
  return <span className="text-xs font-bold text-gray-400">#{rank}</span>
}

const getTrendIcon = (trend: TopTag["trend"]) => {
  if (trend === "up") {
    return <TrendingUp className="w-3 h-3 text-green-500" />
  }
  return null
}

export function RankingWidget() {
  return (
    <div className="space-y-6">
      {/* トップ大喜利師ランキング */}
      <div className="bg-white rounded-lg p-4 border">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-[#F4C300]" />
          <h4 className="text-sm font-black text-gray-900">週間トップ大喜利師</h4>
        </div>

        <div className="space-y-3">
          {topUsers.map((user, index) => {
            const rank = index + 1
            return (
              <div
                key={user.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-center w-6">
                  {getRankIcon(rank)}
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs">{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>回答 {user.answerCount}</span>
                    <span>•</span>
                    <span>❤️ {user.likeCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* バズってるタグ */}
      <div className="bg-white rounded-lg p-4 border">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-5 h-5 text-purple-500" />
          <h4 className="text-sm font-black text-gray-900">バズってるタグ</h4>
        </div>

        <div className="space-y-2">
          {topTags.map((tag, index) => (
            <div
              key={tag.name}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 w-4">#{index + 1}</span>
                <Badge variant="outline" className="font-bold">
                  #{tag.name}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-600">{tag.count}件</span>
                {getTrendIcon(tag.trend)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
