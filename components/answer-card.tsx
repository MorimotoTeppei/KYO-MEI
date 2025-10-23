"use client"

import { useState, forwardRef, useEffect } from "react"
import Link from "next/link"
import { Answer } from "@/types/answer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Trophy } from "lucide-react"
import { ReplyList } from "@/components/reply-list"
import { ReplyInput } from "@/components/reply-input"

interface AnswerCardProps {
  answer: Answer
  rank?: number
  onLikeToggle?: (answerId: number, isAdding: boolean) => boolean // 成功したかどうかを返す
  remainingHearts?: number
  currentUserId?: string | number // 現在のユーザーID
  onReplySubmit?: (answerId: number, content: string) => void // 返信送信ハンドラー
}

export const AnswerCard = forwardRef<HTMLDivElement, AnswerCardProps>(
  ({ answer, rank, onLikeToggle, remainingHearts, currentUserId, onReplySubmit }, ref) => {
    const [isLiked, setIsLiked] = useState(answer.isLiked || false)
    const [likeCount, setLikeCount] = useState(answer.likeCount)
    const [showReplies, setShowReplies] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    // 自分の投稿かどうか（文字列比較と数値比較の両方に対応）
    const isOwnAnswer = currentUserId !== undefined && currentUserId !== null && String(answer.author.id) === String(currentUserId)

    // 親から渡されたanswerが更新された時に同期
    useState(() => {
      setIsLiked(answer.isLiked || false)
      setLikeCount(answer.likeCount)
    })

    const handleLike = () => {
      // 自分の投稿にはハートを押せない
      if (isOwnAnswer) return

      const isAdding = !isLiked

      if (onLikeToggle) {
        onLikeToggle(answer.id, isAdding)
      }
    }

    const handleReplySubmit = (content: string) => {
      if (onReplySubmit) {
        onReplySubmit(answer.id, content)
      }
    }

    // answerの変更を監視してアニメーション
    useEffect(() => {
      if (answer.isLiked !== isLiked || answer.likeCount !== likeCount) {
        setIsAnimating(true)
        setIsLiked(answer.isLiked || false)
        setLikeCount(answer.likeCount)

        setTimeout(() => {
          setIsAnimating(false)
        }, 500)
      }
    }, [answer.isLiked, answer.likeCount])

    // ランクバッジの取得
    const getRankBadge = () => {
      if (!rank || rank > 3) return null

      const badges = {
        1: { emoji: "🥇", text: "1位", className: "bg-gradient-to-r from-yellow-400 to-yellow-500" },
        2: { emoji: "🥈", text: "2位", className: "bg-gradient-to-r from-gray-300 to-gray-400" },
        3: { emoji: "🥉", text: "3位", className: "bg-gradient-to-r from-orange-300 to-orange-400" },
      }

      const badge = badges[rank as 1 | 2 | 3]
      if (!badge) return null

      return (
        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white font-black text-sm ${badge.className}`}>
          <Trophy className="w-4 h-4" />
          <span>{badge.text}</span>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className="bg-white rounded-xl border-2 border-gray-200 hover:border-yellow-400 transition-all duration-300 overflow-hidden"
      >
        <div className="p-6">
          {/* ヘッダー */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link href={`/user/${answer.author.id}`}>
                <Avatar className="w-10 h-10 cursor-pointer hover:ring-2 ring-yellow-400 transition-all">
                  <AvatarImage src={answer.author.avatar} alt={answer.author.name} />
                  <AvatarFallback className="font-bold bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                    {answer.author.name[0]}
                  </AvatarFallback>
                </Avatar>
              </Link>

              <div>
                <Link href={`/user/${answer.author.id}`}>
                  <p className="text-sm font-bold text-gray-900 hover:text-gray-700 cursor-pointer">
                    {answer.author.name}
                  </p>
                </Link>
                <p className="text-xs text-gray-500">{answer.createdAt}</p>
              </div>
            </div>

            {/* ランクバッジ */}
            {getRankBadge()}
          </div>

          {/* ベストアンサーバッジ */}
          {answer.isBestAnswer && (
            <div className="mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full text-white font-black text-sm">
                ✨ ベストアンサー
              </div>
            </div>
          )}

          {/* 回答本文 */}
          <p className="text-base md:text-lg text-gray-900 font-medium leading-relaxed mb-4">{answer.content}</p>

          {/* アクションボタン */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            {/* いいねボタン */}
            <Button
              onClick={handleLike}
              variant="ghost"
              size="sm"
              disabled={isOwnAnswer || (!isLiked && remainingHearts === 0)}
              className={`flex items-center gap-2 font-bold transition-all hover:scale-105 ${
                isLiked ? "text-red-500" : "text-gray-600"
              } ${isOwnAnswer || (!isLiked && remainingHearts === 0) ? "opacity-50 cursor-not-allowed" : ""}`}
              title={isOwnAnswer ? "自分の投稿にはハートを押せません" : undefined}
            >
              <Heart
                className={`w-5 h-5 transition-all duration-300 ${isLiked ? "fill-current scale-110" : ""} ${
                  isAnimating ? "animate-bounce" : ""
                }`}
              />
              <span
                className={`transition-all duration-300 ${isAnimating ? "scale-125 font-black text-red-500" : ""}`}
              >
                {likeCount}
              </span>
            </Button>

            {/* 返信ボタン */}
            <Button
              onClick={() => setShowReplies(!showReplies)}
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 font-bold transition-all ${
                showReplies ? "text-yellow-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <MessageCircle className={`w-5 h-5 ${showReplies ? "fill-current" : ""}`} />
              <span>{answer.replyCount} 件のコメント</span>
            </Button>
          </div>

          {/* 返信エリア（折りたたみ） */}
          {showReplies && (
            <div className="mt-4 space-y-4">
              {/* 返信リスト */}
              {answer.replies && answer.replies.length > 0 && (
                <div className="pl-6 border-l-2 border-gray-200">
                  <ReplyList replies={answer.replies} />
                </div>
              )}

              {/* 返信入力 */}
              <div>
                <ReplyInput onSubmit={handleReplySubmit} placeholder="コメントを追加..." autoFocus={showReplies} />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

AnswerCard.displayName = "AnswerCard"
