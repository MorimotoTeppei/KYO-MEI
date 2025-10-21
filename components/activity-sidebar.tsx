"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Activity, MessageCircle, TrendingUp, Users } from "lucide-react"
import { RankingWidget } from "./ranking-widget"

interface RecentActivity {
  id: number
  type: "answer" | "topic" | "like"
  userName: string
  userAvatar?: string
  topicTitle: string
  timestamp: string
}

// サンプルアクティビティデータ
const generateSampleActivities = (): RecentActivity[] => {
  const activities: RecentActivity[] = [
    {
      id: 1,
      type: "answer",
      userName: "お笑い次郎",
      topicTitle: "重力がなくなった世界で、物理学者が最初に言いそうなこと",
      timestamp: "1分前",
    },
    {
      id: 2,
      type: "like",
      userName: "コメディ花子",
      topicTitle: "AIが人間の感情を理解できるようになった時、最初に言いそうなこと",
      timestamp: "3分前",
    },
    {
      id: 3,
      type: "topic",
      userName: "科学太郎",
      topicTitle: "ブラックホールの中に入った科学者が見たもの",
      timestamp: "5分前",
    },
    {
      id: 4,
      type: "answer",
      userName: "ユーモアマスター",
      topicTitle: "タイムマシンを発明した科学者が、最初に過去に戻って確認したいこと",
      timestamp: "7分前",
    },
    {
      id: 5,
      type: "answer",
      userName: "笑いの達人",
      topicTitle: "光の速度を超えた瞬間、宇宙飛行士が見たもの",
      timestamp: "12分前",
    },
  ]
  return activities
}

const getActivityIcon = (type: RecentActivity["type"]) => {
  switch (type) {
    case "answer":
      return <MessageCircle className="w-4 h-4 text-blue-500" />
    case "topic":
      return <TrendingUp className="w-4 h-4 text-green-500" />
    case "like":
      return <Activity className="w-4 h-4 text-red-500" />
  }
}

const getActivityText = (activity: RecentActivity) => {
  switch (activity.type) {
    case "answer":
      return "が回答しました"
    case "topic":
      return "がお題を投稿しました"
    case "like":
      return "がいいねしました"
  }
}

export function ActivitySidebar() {
  const [activities, setActivities] = useState<RecentActivity[]>([])
  const [onlineUsers, setOnlineUsers] = useState(0)

  useEffect(() => {
    // 初期データ読み込み
    setActivities(generateSampleActivities())
    setOnlineUsers(Math.floor(Math.random() * 50) + 20)

    // リアルタイム更新シミュレーション（5秒ごと）
    const interval = setInterval(() => {
      setOnlineUsers(Math.floor(Math.random() * 50) + 20)
      // 新しいアクティビティを追加（実際のアプリではWebSocketやPollingを使用）
      // ここでは簡略化のためランダムに更新
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-80 bg-white border-l h-screen sticky top-0 hidden xl:block">
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-[#F4C300]" />
            <h3 className="text-lg font-black text-gray-900">リアルタイム活動</h3>
          </div>

          {/* オンラインユーザー数 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Users className="w-5 h-5 text-green-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-600">オンライン</p>
                <p className="text-lg font-black text-green-600">{onlineUsers}人</p>
              </div>
            </div>
          </div>
        </div>

        {/* アクティビティフィード */}
        <div className="mb-6">
          <h4 className="text-sm font-black text-gray-700 mb-3">最近の活動</h4>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Avatar className="w-7 h-7 mt-0.5">
                      <AvatarImage src={activity.userAvatar} alt={activity.userName} />
                      <AvatarFallback className="text-xs">{activity.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        {getActivityIcon(activity.type)}
                        <span className="text-xs font-bold text-gray-900 truncate">{activity.userName}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{getActivityText(activity)}</p>
                      <p className="text-xs text-gray-700 font-medium line-clamp-2 leading-relaxed">
                        「{activity.topicTitle}」
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Badge variant="outline" className="text-xs text-gray-500 border-gray-300">
                      {activity.timestamp}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator className="my-6" />

        {/* ランキングウィジェット */}
        <RankingWidget />
      </div>
    </div>
  )
}
