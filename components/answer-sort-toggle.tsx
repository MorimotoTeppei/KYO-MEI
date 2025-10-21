"use client"

import { ArrowUpDown, ThumbsUp, Clock } from "lucide-react"

export type SortType = "likes" | "newest"

interface AnswerSortToggleProps {
  currentSort: SortType
  onSortChange: (sort: SortType) => void
  answerCount: number
}

export function AnswerSortToggle({ currentSort, onSortChange, answerCount }: AnswerSortToggleProps) {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl md:text-2xl font-black text-gray-900">
          回答一覧
          <span className="text-lg font-bold text-gray-500 ml-2">({answerCount}件)</span>
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onSortChange("likes")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
            currentSort === "likes"
              ? "bg-gradient-to-r from-[#F4C300] to-[#FFD700] text-black shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="hidden sm:inline">いいね順</span>
        </button>

        <button
          onClick={() => onSortChange("newest")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
            currentSort === "newest"
              ? "bg-gradient-to-r from-[#F4C300] to-[#FFD700] text-black shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span className="hidden sm:inline">新着順</span>
        </button>
      </div>
    </div>
  )
}
