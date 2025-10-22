"use client"

import { Answer } from "@/types/answer"
import { AnswerCard } from "@/components/answer-card"
import { User } from "lucide-react"

interface MyAnswersSectionProps {
  myAnswers: Answer[]
  onLikeToggle?: (answerId: number, isAdding: boolean) => boolean
  remainingHearts?: number
  currentUserId: number
  onReplySubmit?: (answerId: number, content: string) => void
}

export function MyAnswersSection({ myAnswers, onLikeToggle, remainingHearts, currentUserId, onReplySubmit }: MyAnswersSectionProps) {
  // 現在のユーザーの回答のみをフィルター
  const filteredMyAnswers = myAnswers.filter((answer) => answer.author.id === currentUserId)

  if (filteredMyAnswers.length === 0) {
    return null
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm p-6 border-2 border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-black text-gray-900">あなたの回答</h2>
        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {filteredMyAnswers.length}件
        </span>
      </div>

      <div className="space-y-4">
        {filteredMyAnswers.map((answer) => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            onLikeToggle={onLikeToggle}
            remainingHearts={remainingHearts}
            currentUserId={currentUserId}
            onReplySubmit={onReplySubmit}
          />
        ))}
      </div>
    </div>
  )
}
