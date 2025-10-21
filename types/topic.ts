export interface Topic {
  id: number
  number: number
  title: string
  subject: string
  timeLeft?: string // 開催中のみ
  answerCount: number
  viewCount?: number // 閲覧数
  likeCount?: number // いいね数
  author?: {
    name: string
    avatar?: string
  }
  tags?: string[] // タグ（最大3個）
  status: "active" | "closed" // 開催状態
  createdAt?: string // 投稿日時
  bestAnswer?: {
    id: number
    content: string
    author: string
    likeCount: number
  } // ベスト回答（プレビュー用）
  badge?: "trending" | "new" | "ending-soon" // バッジ種類
}
