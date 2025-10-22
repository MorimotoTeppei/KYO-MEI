// 戦績の順位情報
export interface AchievementRecord {
  id: number
  topicId: number
  topicTitle: string
  rank: number // 順位
  totalAnswers: number // 総回答数
  percentile: number // 上位何%か（例: 5 = 上位5%）
  likeCount: number
  createdAt: string
  isVisible: boolean // この投稿の戦績を表示するか
}

export interface UserSettings {
  // プロフィール設定
  profile: {
    name: string
    email: string
    avatar?: string // 画像URL or base64
    achievementVisibility: "all" | "top10" | "none" // 全て表示 | 上位10%のみ | 表示しない
  }
}

export const DEFAULT_SETTINGS: UserSettings = {
  profile: {
    name: "",
    email: "",
    avatar: undefined,
    achievementVisibility: "top10",
  },
}
