"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  User,
  Trophy,
  Camera,
  Check,
  Eye,
  EyeOff
} from "lucide-react"
import { useSettings } from "@/hooks/useSettings"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { AchievementRecord } from "@/types/settings"

// サンプル戦績データ
const SAMPLE_ACHIEVEMENTS: AchievementRecord[] = [
  {
    id: 1,
    topicId: 42,
    topicTitle: "重力がなくなった世界で、物理学者が最初に言いそうなこと",
    rank: 3,
    totalAnswers: 127,
    percentile: 2.4,
    likeCount: 89,
    createdAt: "2日前",
    isVisible: true,
  },
  {
    id: 2,
    topicId: 39,
    topicTitle: "光の速度を超えた瞬間、宇宙飛行士が見たもの",
    rank: 1,
    totalAnswers: 456,
    percentile: 0.2,
    likeCount: 289,
    createdAt: "5日前",
    isVisible: true,
  },
  {
    id: 3,
    topicId: 41,
    topicTitle: "タイムマシンを発明した科学者が、最初に過去に戻って確認したいこと",
    rank: 45,
    totalAnswers: 89,
    percentile: 50.6,
    likeCount: 12,
    createdAt: "1週間前",
    isVisible: false,
  },
  {
    id: 4,
    topicId: 40,
    topicTitle: "AIが人間の感情を理解できるようになった時、最初に言いそうなこと",
    rank: 8,
    totalAnswers: 203,
    percentile: 3.9,
    likeCount: 56,
    createdAt: "10日前",
    isVisible: true,
  },
]

export default function SettingsPage() {
  const { settings, updateSettings, isLoaded } = useSettings()
  const [mounted, setMounted] = useState(false)
  const [savedNotification, setSavedNotification] = useState(false)
  const [achievements, setAchievements] = useState<AchievementRecord[]>(SAMPLE_ACHIEVEMENTS)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSave = () => {
    setSavedNotification(true)
    setTimeout(() => setSavedNotification(false), 2000)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateSettings({
          profile: {
            ...settings.profile,
            avatar: reader.result as string,
          },
        })
        handleSave()
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleAchievementVisibility = (id: number) => {
    setAchievements(prev =>
      prev.map(achievement =>
        achievement.id === id
          ? { ...achievement, isVisible: !achievement.isVisible }
          : achievement
      )
    )
  }

  const getFilteredAchievements = () => {
    const visibility = settings.profile.achievementVisibility
    if (visibility === "none") return []
    if (visibility === "top10") {
      return achievements.filter(a => a.percentile <= 10 && a.isVisible)
    }
    return achievements.filter(a => a.isVisible)
  }

  if (!mounted || !isLoaded) {
    return null
  }

  const filteredAchievements = getFilteredAchievements()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ホームに戻る
            </Button>
          </Link>
          <h1 className="text-4xl font-black text-gray-900 mb-2">プロフィール設定</h1>
          <p className="text-gray-700">あなたのプロフィールと戦績を管理</p>
        </div>

        {/* 保存通知 */}
        {savedNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4 duration-300 z-50">
            <Check className="w-5 h-5" />
            <span className="font-bold">設定を保存しました</span>
          </div>
        )}

        {/* プロフィール基本情報 */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-blue-500" />
            <h2 className="text-2xl font-black text-gray-900">基本情報</h2>
          </div>

          <div className="space-y-6">
            {/* アバター */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={settings.profile.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl font-bold">
                    {settings.profile.name ? settings.profile.name[0].toUpperCase() : "?"}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm font-bold text-gray-700">プロフィール画像</Label>
                <p className="text-sm text-gray-600 mt-1">
                  画像をクリックして変更できます
                </p>
              </div>
            </div>

            {/* 名前 */}
            <div>
              <Label htmlFor="name" className="text-base font-bold text-gray-900 mb-2 block">
                名前
              </Label>
              <Input
                id="name"
                type="text"
                value={settings.profile.name}
                onChange={(e) => {
                  updateSettings({
                    profile: {
                      ...settings.profile,
                      name: e.target.value,
                    },
                  })
                }}
                onBlur={handleSave}
                placeholder="あなたの名前"
                className="max-w-md"
              />
            </div>

            {/* メールアドレス */}
            <div>
              <Label htmlFor="email" className="text-base font-bold text-gray-900 mb-2 block">
                メールアドレス
              </Label>
              <Input
                id="email"
                type="email"
                value={settings.profile.email}
                onChange={(e) => {
                  updateSettings({
                    profile: {
                      ...settings.profile,
                      email: e.target.value,
                    },
                  })
                }}
                onBlur={handleSave}
                placeholder="example@email.com"
                className="max-w-md"
              />
            </div>
          </div>
        </section>

        {/* 戦績表示設定 */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h2 className="text-2xl font-black text-gray-900">戦績設定</h2>
          </div>

          <div className="space-y-6">
            {/* 戦績表示設定 */}
            <div>
              <Label htmlFor="achievement-visibility" className="text-base font-bold text-gray-900 mb-3 block">
                戦績の表示設定
              </Label>
              <Select
                value={settings.profile.achievementVisibility}
                onValueChange={(value: "all" | "top10" | "none") => {
                  updateSettings({
                    profile: {
                      ...settings.profile,
                      achievementVisibility: value,
                    },
                  })
                  handleSave()
                }}
              >
                <SelectTrigger id="achievement-visibility" className="w-full md:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて表示</SelectItem>
                  <SelectItem value="top10">上位10%のみ表示</SelectItem>
                  <SelectItem value="none">表示しない</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600 mt-2">
                プロフィールに表示する戦績の範囲を選択できます
              </p>
            </div>

            {/* 戦績一覧 */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3">あなたの戦績</h3>
              <p className="text-sm text-gray-600 mb-4">
                各投稿の表示/非表示を個別に設定できます
                {filteredAchievements.length > 0 && ` (現在${filteredAchievements.length}件表示中)`}
              </p>

              {achievements.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Trophy className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>まだ戦績がありません</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {achievements.map((achievement) => {
                    const isTop10 = achievement.percentile <= 10
                    const badgeColor = achievement.rank === 1 ? "bg-yellow-400" : isTop10 ? "bg-blue-400" : "bg-gray-400"

                    return (
                      <div
                        key={achievement.id}
                        className="border-2 border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`${badgeColor} text-white text-xs font-bold px-2 py-1 rounded`}>
                                {achievement.rank}位
                              </span>
                              {isTop10 && (
                                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
                                  上位{achievement.percentile.toFixed(1)}%
                                </span>
                              )}
                            </div>
                            <Link
                              href={`/topic/${achievement.topicId}`}
                              className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                            >
                              {achievement.topicTitle}
                            </Link>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                              <span>💛 {achievement.likeCount}</span>
                              <span>📊 {achievement.totalAnswers}件中</span>
                              <span>{achievement.createdAt}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleAchievementVisibility(achievement.id)}
                            className="shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title={achievement.isVisible ? "非表示にする" : "表示する"}
                          >
                            {achievement.isVisible ? (
                              <Eye className="w-5 h-5 text-blue-600" />
                            ) : (
                              <EyeOff className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
