"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Hash } from "lucide-react"

interface TopicTagsProps {
  tags: string[]
  subject: string
}

export function TopicTags({ tags, subject }: TopicTagsProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-4">
        <Hash className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-black text-gray-900">タグ</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* 科目タグ（メインカラー） */}
        <Link href={`/?subject=${encodeURIComponent(subject)}`}>
          <Badge className="bg-gradient-to-r from-[#F4C300] to-[#FFD700] hover:from-[#FFD700] hover:to-[#F4C300] text-black font-bold text-sm px-4 py-2 cursor-pointer transition-all hover:scale-105">
            #{subject}
          </Badge>
        </Link>

        {/* その他のタグ */}
        {tags.map((tag, index) => (
          <Link key={index} href={`/?tag=${encodeURIComponent(tag)}`}>
            <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm px-4 py-2 cursor-pointer transition-all hover:scale-105">
              #{tag}
            </Badge>
          </Link>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-3">タグをクリックして類似のお題を探す</p>
    </div>
  )
}
