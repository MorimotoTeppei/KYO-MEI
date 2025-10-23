"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Topic } from "@/types/topic"
import { Answer } from "@/types/answer"
import { TopicDetailCard } from "@/components/topic-detail-card"
import { TopicTags } from "@/components/topic-tags"
import { PinnedAnswers } from "@/components/pinned-answers"
import { AnswerRanking } from "@/components/answer-ranking"
import { RelatedTopics } from "@/components/related-topics"
import { AnswerSortToggle, SortType } from "@/components/answer-sort-toggle"
import { AnswerCard } from "@/components/answer-card"
import { AnswerCardSkeleton } from "@/components/answer-card-skeleton"
import { FixedCommentBar } from "@/components/fixed-comment-bar"
import { ToastNotification } from "@/components/toast-notification"
import { HeartConfirmDialog } from "@/components/heart-confirm-dialog"
import { RemainingHeartsDisplay } from "@/components/remaining-hearts-display"
import { MyAnswersSection } from "@/components/my-answers-section"
import { AnswerConfirmDialog } from "@/components/answer-confirm-dialog"

// cuid文字列をnumberに変換するヘルパー関数
function hashStringToNumber(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

interface TopicDetailClientProps {
  topic: Topic
  topicId: string // 実際のDB ID (cuid)
  initialAnswers: Answer[]
  currentUserId: string | null
  relatedTopics: Topic[]
  initialRemainingHearts: number
}

export function TopicDetailClient({ topic, topicId, initialAnswers, currentUserId, relatedTopics, initialRemainingHearts }: TopicDetailClientProps) {
  const router = useRouter()
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers)

  // State
  const [sortType, setSortType] = useState<SortType>("likes")
  const [displayCount, setDisplayCount] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [newAnswerId, setNewAnswerId] = useState<number | null>(null)

  // ハート機能の状態
  const [remainingHearts, setRemainingHearts] = useState(initialRemainingHearts)

  // 初期のいいね済み回答を設定
  const [likedAnswers, setLikedAnswers] = useState<Set<number>>(() => {
    const initialLiked = new Set<number>()
    initialAnswers.forEach((answer) => {
      if (answer.isLiked) {
        initialLiked.add(answer.id)
      }
    })
    return initialLiked
  })
  const [showHeartDialog, setShowHeartDialog] = useState(false)
  const [pendingHeartAction, setPendingHeartAction] = useState<{
    answerId: number
    isAdding: boolean
    answer: Answer
  } | null>(null)

  // 投稿回数の状態
  const [remainingPosts, setRemainingPosts] = useState(3)

  // 回答確認ダイアログの状態
  const [showAnswerDialog, setShowAnswerDialog] = useState(false)
  const [pendingAnswer, setPendingAnswer] = useState<string>("")

  // 回答へのスクロール用ref
  const answerRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const observerTarget = useRef<HTMLDivElement>(null)

  // 返信処理
  const handleReplySubmit = (answerId: number, content: string) => {
    const newReply = {
      id: Date.now(),
      answerId,
      content,
      author: {
        id: Date.now(), // 一時的なID
        name: "あなた",
        avatar: "",
      },
      createdAt: "たった今",
    }

    setAnswers((prev) =>
      prev.map((answer) => {
        if (answer.id === answerId) {
          return {
            ...answer,
            replies: [...(answer.replies || []), newReply],
            replyCount: answer.replyCount + 1,
          }
        }
        return answer
      })
    )
  }

  // ソート済み回答
  const sortedAnswers = useMemo(() => {
    return [...answers].sort((a, b) => {
      if (sortType === "likes") {
        return b.likeCount - a.likeCount
      } else {
        return b.id - a.id
      }
    })
  }, [answers, sortType])

  // 表示する回答
  const displayedAnswers = useMemo(() => {
    return sortedAnswers.slice(0, displayCount)
  }, [sortedAnswers, displayCount])

  // 無限スクロール
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && displayCount < sortedAnswers.length) {
          setIsLoading(true)
          setTimeout(() => {
            setDisplayCount((prev) => Math.min(prev + 5, sortedAnswers.length))
            setIsLoading(false)
          }, 500)
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [isLoading, displayCount, sortedAnswers.length])

  // ハート処理
  const handleLikeToggle = (answerId: number, isAdding: boolean): boolean => {
    const answer = answers.find((a) => a.id === answerId)
    if (!answer) return false

    if (isAdding && remainingHearts === 0) {
      return false
    }

    setPendingHeartAction({ answerId, isAdding, answer })
    setShowHeartDialog(true)
    return false
  }

  const handleHeartConfirm = async () => {
    if (!pendingHeartAction) return

    const { answerId, isAdding } = pendingHeartAction

    try {
      // 楽観的UI更新
      if (isAdding) {
        setRemainingHearts((prev) => prev - 1)
        setLikedAnswers((prev) => new Set(prev).add(answerId))
      } else {
        setRemainingHearts((prev) => prev + 1)
        setLikedAnswers((prev) => {
          const newSet = new Set(prev)
          newSet.delete(answerId)
          return newSet
        })
      }

      setAnswers((prev) =>
        prev.map((a) => (a.id === answerId ? { ...a, isLiked: isAdding, likeCount: a.likeCount + (isAdding ? 1 : -1) } : a))
      )

      // APIリクエストを送信
      const answer = answers.find((a) => a.id === answerId)
      if (!answer || !answer.dbId) {
        console.error("Answer dbId not found")
        return
      }

      const response = await fetch(`/api/answers/${answer.dbId}/likes`, {
        method: isAdding ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        // エラーの場合はUIを元に戻す
        if (isAdding) {
          setRemainingHearts((prev) => prev + 1)
          setLikedAnswers((prev) => {
            const newSet = new Set(prev)
            newSet.delete(answerId)
            return newSet
          })
        } else {
          setRemainingHearts((prev) => prev - 1)
          setLikedAnswers((prev) => new Set(prev).add(answerId))
        }
        setAnswers((prev) =>
          prev.map((a) => (a.id === answerId ? { ...a, isLiked: !isAdding, likeCount: a.likeCount + (isAdding ? -1 : 1) } : a))
        )

        const errorData = await response.json()
        alert(errorData.error || "いいねの処理に失敗しました")
      }
    } catch (error) {
      console.error("Like toggle error:", error)
      alert("いいねの処理に失敗しました")
    } finally {
      setShowHeartDialog(false)
      setPendingHeartAction(null)
    }
  }

  const handleHeartCancel = () => {
    setShowHeartDialog(false)
    setPendingHeartAction(null)
  }

  // 回答投稿
  const handleSubmitAnswer = (content: string) => {
    if (remainingPosts === 0) {
      return
    }

    setPendingAnswer(content)
    setShowAnswerDialog(true)
  }

  const handleAnswerConfirm = async (anonymousName: string) => {
    try {
      // APIに回答を投稿
      const response = await fetch(`/api/topics/${topicId}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: pendingAnswer,
        }),
      })

      if (!response.ok) {
        throw new Error("回答の投稿に失敗しました")
      }

      const newAnswer = await response.json()

      // 楽観的UI更新
      const formattedAnswer: Answer = {
        id: hashStringToNumber(newAnswer.id),
        dbId: newAnswer.id, // データベースの実際のID
        topicId: topic.id,
        author: {
          id: hashStringToNumber(currentUserId || ""),
          name: newAnswer.authorName,
          avatar: "",
        },
        content: newAnswer.content,
        likeCount: 0,
        replyCount: 0,
        createdAt: "たった今",
        isBestAnswer: false,
        isLiked: false,
      }

      setAnswers((prev) => [formattedAnswer, ...prev])
      setNewAnswerId(formattedAnswer.id)
      setShowToast(true)
      setRemainingPosts((prev) => prev - 1)
      setSortType("newest")
      setDisplayCount(5)

      setShowAnswerDialog(false)
      setPendingAnswer("")

      setTimeout(() => {
        scrollToAnswer(formattedAnswer.id)
      }, 100)

      // ページをリフレッシュして最新データを取得
      router.refresh()
    } catch (error) {
      console.error("Answer submission error:", error)
      alert("回答の投稿に失敗しました")
    }
  }

  const handleAnswerCancel = () => {
    setShowAnswerDialog(false)
    setPendingAnswer("")
  }

  const scrollToAnswer = (answerId: number) => {
    const element = answerRefs.current[answerId]
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      element.classList.add("ring-4", "ring-yellow-400")
      setTimeout(() => {
        element.classList.remove("ring-4", "ring-yellow-400")
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* メインコンテンツエリア */}
          <div className="flex-1 lg:w-2/3">
            <TopicDetailCard topic={topic} />

            <div className="mt-6">
              <TopicTags tags={topic.tags || []} subject={topic.subject} />
            </div>

            <div className="mt-6">
              <RemainingHeartsDisplay remainingHearts={remainingHearts} />
            </div>

            {answers.length > 0 && (
              <div className="mt-6">
                <PinnedAnswers answers={answers} onAnswerClick={scrollToAnswer} />
              </div>
            )}

            {currentUserId && (
              <div className="mt-6">
                <MyAnswersSection
                  myAnswers={answers}
                  onLikeToggle={handleLikeToggle}
                  remainingHearts={remainingHearts}
                  currentUserId={currentUserId}
                  onReplySubmit={handleReplySubmit}
                />
              </div>
            )}

            <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
              <AnswerSortToggle currentSort={sortType} onSortChange={setSortType} answerCount={answers.length} />

              <div className="space-y-4">
                {displayedAnswers.map((answer, index) => (
                  <AnswerCard
                    key={answer.id}
                    answer={answer}
                    rank={sortType === "likes" ? index + 1 : undefined}
                    onLikeToggle={handleLikeToggle}
                    remainingHearts={remainingHearts}
                    currentUserId={currentUserId || undefined}
                    onReplySubmit={handleReplySubmit}
                    ref={(el) => {
                      answerRefs.current[answer.id] = el
                    }}
                  />
                ))}

                {isLoading && Array.from({ length: 3 }).map((_, i) => <AnswerCardSkeleton key={`skeleton-${i}`} />)}

                {displayCount < sortedAnswers.length && <div ref={observerTarget} className="h-10" />}
              </div>

              {answers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg font-bold text-gray-600">まだ回答がありません</p>
                  <p className="text-sm text-gray-500 mt-2">最初の回答者になりましょう!</p>
                </div>
              )}

              {answers.length > 0 && displayCount >= sortedAnswers.length && (
                <div className="text-center py-6 text-sm text-gray-500 font-bold">すべての回答を表示しました</div>
              )}
            </div>
          </div>

          {/* サイドバー */}
          <aside className="w-full lg:w-1/3 space-y-6">
            {answers.length > 0 && <AnswerRanking answers={answers} />}
            <RelatedTopics
              currentTopicId={topic.id}
              currentTags={topic.tags}
              currentAuthorId={topic.author?.id}
              allTopics={relatedTopics}
            />
          </aside>
        </div>
      </div>

      {showToast && <ToastNotification message="回答を投稿しました!" onClose={() => setShowToast(false)} />}

      {pendingHeartAction && (
        <HeartConfirmDialog
          isOpen={showHeartDialog}
          onConfirm={handleHeartConfirm}
          onCancel={handleHeartCancel}
          isRemoving={!pendingHeartAction.isAdding}
          remainingHearts={remainingHearts}
          answerAuthor={pendingHeartAction.answer.author.name}
          answerPreview={pendingHeartAction.answer.content}
        />
      )}

      <AnswerConfirmDialog
        isOpen={showAnswerDialog}
        onConfirm={handleAnswerConfirm}
        onCancel={handleAnswerCancel}
        answerPreview={pendingAnswer}
        remainingPosts={remainingPosts - 1}
      />

      <FixedCommentBar onSubmit={handleSubmitAnswer} isLoggedIn={!!currentUserId} remainingPosts={remainingPosts} />
    </div>
  )
}
