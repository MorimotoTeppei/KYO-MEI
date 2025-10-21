"use client"

import { Reply } from "@/types/reply"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface ReplyListProps {
  replies: Reply[]
}

export function ReplyList({ replies }: ReplyListProps) {
  if (replies.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-gray-500">まだコメントがありません</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {replies.map((reply) => (
        <div key={reply.id} className="flex gap-3">
          {/* アバター */}
          <Link href={`/user/${reply.author.id}`}>
            <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 ring-yellow-400 transition-all">
              <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
              <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-green-400 to-blue-400 text-white">
                {reply.author.name[0]}
              </AvatarFallback>
            </Avatar>
          </Link>

          {/* コメント内容 */}
          <div className="flex-1 bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Link href={`/user/${reply.author.id}`}>
                <span className="text-sm font-bold text-gray-900 hover:text-gray-700 cursor-pointer">
                  {reply.author.name}
                </span>
              </Link>
              <span className="text-xs text-gray-500">{reply.createdAt}</span>
            </div>
            <p className="text-sm text-gray-800">{reply.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
