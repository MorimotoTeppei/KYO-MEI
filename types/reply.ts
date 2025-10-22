export interface Reply {
  id: number
  answerId: number
  content: string
  author: {
    id: number
    name: string
    avatar?: string
  }
  createdAt: string
}
