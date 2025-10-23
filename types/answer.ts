import type { Reply } from "./reply"

export interface Answer {
  id: number
  dbId?: string // データベースの実際のID (cuid)
  topicId: number
  content: string
  author: {
    id: number
    name: string
    avatar?: string
  }
  likeCount: number
  replyCount: number
  createdAt: string
  isBestAnswer: boolean
  isLiked?: boolean // ユーザーがいいねしたか
  replies?: Reply[] // 返信一覧
}
