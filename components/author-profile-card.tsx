"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, FileText } from "lucide-react"

interface Author {
  id: number
  name: string
  avatar?: string
  topicCount?: number
}

interface AuthorProfileCardProps {
  author: Author
}

export function AuthorProfileCard({ author }: AuthorProfileCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-black text-gray-900">運営チーム</h2>
      </div>

      {/* プロフィール */}
      <div className="flex flex-col items-center text-center">
        <Avatar className="w-20 h-20 mb-3 ring-4 ring-yellow-400">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="text-2xl font-black bg-gradient-to-br from-yellow-400 to-orange-400 text-white">
            {author.name[0]}
          </AvatarFallback>
        </Avatar>

        <h3 className="text-xl font-black text-gray-900 mb-2">{author.name}</h3>

        {/* 統計情報 */}
        {author.topicCount !== undefined && (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <FileText className="w-4 h-4" />
            <span className="font-bold">{author.topicCount} 個のお題を投稿</span>
          </div>
        )}
      </div>
    </div>
  )
}
