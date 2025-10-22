"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useRef, useEffect, useMemo } from "react"
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

// モックデータ（Topic型に準拠）
const mockTopics: Topic[] = [
  {
    id: 1,
    number: 42,
    subject: "物理",
    title: "重力がなくなった世界で、物理学者が最初に言いそうなこと",
    description: "ある日突然、地球から重力が消えてしまいました。その瞬間、物理学者たちが思わず口にしそうな一言とは？",
    status: "active",
    answerCount: 23,
    viewCount: 1234,
    likeCount: 89,
    timeLeft: "残り2時間30分",
    createdAt: "2時間前",
    author: {
      id: 1,
      name: "科学太郎",
      avatar: "",
      topicCount: 15,
    },
    tags: ["科学", "物理学", "日常"],
    badge: "trending",
  },
  {
    id: 2,
    number: 41,
    subject: "歴史",
    title: "織田信長がスマホを持っていたら、最初に検索しそうなワード",
    description: "戦国時代の覇者、織田信長が現代のスマートフォンを手にしたら...",
    status: "closed",
    answerCount: 45,
    viewCount: 2345,
    likeCount: 156,
    createdAt: "1日前",
    author: {
      id: 7,
      name: "歴史マニア",
      avatar: "",
      topicCount: 23,
    },
    tags: ["歴史", "戦国時代", "面白い"],
    badge: "trending",
  },
  {
    id: 3,
    number: 40,
    subject: "数学",
    title: "数学者が恋愛で使いそうな口説き文句",
    description: "数式と定理を愛する数学者が、恋愛の場面で披露する独特な口説き方とは？",
    status: "active",
    answerCount: 34,
    viewCount: 987,
    likeCount: 67,
    timeLeft: "残り5時間",
    createdAt: "3時間前",
    author: {
      id: 1,
      name: "科学太郎",
      avatar: "",
      topicCount: 15,
    },
    tags: ["数学", "恋愛", "面白い"],
  },
]

const mockAnswers: Answer[] = [
  {
    id: 1,
    topicId: 1,
    author: {
      id: 2,
      name: "浮遊する哲学者",
      avatar: "",
    },
    content: "「これは...重大な発見だ」",
    likeCount: 127,
    replyCount: 2,
    createdAt: "1時間前",
    isBestAnswer: false,
    isLiked: false,
    replies: [
      {
        id: 1001,
        answerId: 1,
        content: "確かに重大ですね！",
        author: {
          id: 10,
          name: "コメント太郎",
          avatar: "",
        },
        createdAt: "30分前",
      },
      {
        id: 1002,
        answerId: 1,
        content: "笑いました😂",
        author: {
          id: 11,
          name: "笑顔の花子",
          avatar: "",
        },
        createdAt: "15分前",
      },
    ],
  },
  {
    id: 2,
    topicId: 1,
    author: {
      id: 3,
      name: "無重力の詩人",
      avatar: "",
    },
    content: "「やっと肩の荷が下りた」",
    likeCount: 89,
    replyCount: 3,
    createdAt: "2時間前",
    isBestAnswer: false,
    isLiked: true,
  },
  {
    id: 3,
    topicId: 1,
    author: {
      id: 4,
      name: "宙に浮く数学者",
      avatar: "",
    },
    content: "「重力加速度g=0...つまり、私の体重も0kg！ダイエット成功！」",
    likeCount: 156,
    replyCount: 8,
    createdAt: "3時間前",
    isBestAnswer: false,
    isLiked: false,
  },
  {
    id: 4,
    topicId: 1,
    author: {
      id: 5,
      name: "漂流する天文学者",
      avatar: "",
    },
    content: "「地球が私を必要としなくなった」",
    likeCount: 203,
    replyCount: 12,
    createdAt: "4時間前",
    isBestAnswer: true,
    isLiked: false,
  },
  {
    id: 5,
    topicId: 1,
    author: {
      id: 6,
      name: "空中の化学者",
      avatar: "",
    },
    content: "「落下実験の結果が...出ない」",
    likeCount: 67,
    replyCount: 2,
    createdAt: "5時間前",
    isBestAnswer: false,
    isLiked: false,
  },
  {
    id: 6,
    topicId: 1,
    author: {
      id: 7,
      name: "重力を忘れた生物学者",
      avatar: "",
    },
    content: "「進化論が...書き直しだ」",
    likeCount: 45,
    replyCount: 1,
    createdAt: "6時間前",
    isBestAnswer: false,
    isLiked: false,
  },
  {
    id: 7,
    topicId: 1,
    author: {
      id: 8,
      name: "浮遊する工学者",
      avatar: "",
    },
    content: "「橋の設計、全部やり直しだ...」",
    likeCount: 78,
    replyCount: 4,
    createdAt: "7時間前",
    isBestAnswer: false,
    isLiked: false,
  },
  {
    id: 8,
    topicId: 1,
    author: {
      id: 9,
      name: "宇宙に浮かぶ地質学者",
      avatar: "",
    },
    content: "「地球が平らになった気がする」",
    likeCount: 34,
    replyCount: 2,
    createdAt: "8時間前",
    isBestAnswer: false,
    isLiked: false,
  },
  {
    id: 9,
    topicId: 1,
    author: {
      id: 10,
      name: "無重力の心理学者",
      avatar: "",
    },
    content: "「これで心の重荷も軽くなる...わけないか」",
    likeCount: 92,
    replyCount: 6,
    createdAt: "9時間前",
    isBestAnswer: false,
    isLiked: false,
  },
  {
    id: 10,
    topicId: 1,
    author: {
      id: 11,
      name: "漂う統計学者",
      avatar: "",
    },
    content: "「有意差検定の結果...重力は有意に0です」",
    likeCount: 56,
    replyCount: 3,
    createdAt: "10時間前",
    isBestAnswer: false,
    isLiked: false,
  },
]

// 現在のユーザーID（実際はログインユーザーから取得）
const CURRENT_USER_ID = 999

export default function TopicDetailPage() {
  const params = useParams()
  const router = useRouter()
  const topicId = Number(params.id)

  const topic = mockTopics.find((t) => t.id === topicId)
  const [answers, setAnswers] = useState<Answer[]>(mockAnswers.filter((a) => a.topicId === topicId))

  // State
  const [sortType, setSortType] = useState<SortType>("likes")
  const [displayCount, setDisplayCount] = useState(5) // 初期表示件数
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [newAnswerId, setNewAnswerId] = useState<number | null>(null)

  // ハート機能の状態
  const [remainingHearts, setRemainingHearts] = useState(3)
  const [likedAnswers, setLikedAnswers] = useState<Set<number>>(new Set())
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
    // 新しい返信を作成
    const newReply = {
      id: Date.now(), // 仮のID生成
      answerId,
      content,
      author: {
        id: CURRENT_USER_ID,
        name: "あなた",
        avatar: "",
      },
      createdAt: "たった今",
    }

    // 回答の返信リストと返信数を更新
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
        // 新着順（idが大きいほど新しいと仮定）
        return b.id - a.id
      }
    })
  }, [answers, sortType])

  // 表示する回答（無限スクロール用）
  const displayedAnswers = useMemo(() => {
    return sortedAnswers.slice(0, displayCount)
  }, [sortedAnswers, displayCount])

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-2xl font-black text-gray-900 mb-4">お題が見つかりません</p>
          <button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-[#F4C300] to-[#FFD700] text-black font-bold px-6 py-3 rounded-xl hover:from-[#FFD700] hover:to-[#F4C300] transition-all"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    )
  }

  // 無限スクロール（Intersection Observer）
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && displayCount < sortedAnswers.length) {
          setIsLoading(true)
          // 遅延して次のアイテムを読み込む（実際のAPIコール風に）
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

    // ハートがない場合は追加できない
    if (isAdding && remainingHearts === 0) {
      return false
    }

    // 確認ダイアログを表示
    setPendingHeartAction({ answerId, isAdding, answer })
    setShowHeartDialog(true)
    return false // ダイアログで確認するまで待つ
  }

  // ハート確認
  const handleHeartConfirm = () => {
    if (!pendingHeartAction) return

    const { answerId, isAdding } = pendingHeartAction

    // ハート数を更新
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

    // 回答のisLikedを更新
    setAnswers((prev) =>
      prev.map((a) => (a.id === answerId ? { ...a, isLiked: isAdding, likeCount: a.likeCount + (isAdding ? 1 : -1) } : a))
    )

    // ダイアログを閉じる
    setShowHeartDialog(false)
    setPendingHeartAction(null)
  }

  // ハートキャンセル
  const handleHeartCancel = () => {
    setShowHeartDialog(false)
    setPendingHeartAction(null)
  }

  // 回答投稿ハンドラー（確認ダイアログを表示）
  const handleSubmitAnswer = (content: string) => {
    // 投稿回数チェック
    if (remainingPosts === 0) {
      return
    }

    // 確認ダイアログを表示
    setPendingAnswer(content)
    setShowAnswerDialog(true)
  }

  // 回答投稿確認
  const handleAnswerConfirm = (anonymousName: string) => {
    // 新しい回答を作成
    const newAnswer: Answer = {
      id: Math.max(...answers.map((a) => a.id), 0) + 1,
      topicId: topicId,
      author: {
        id: CURRENT_USER_ID,
        name: anonymousName,
        avatar: "",
      },
      content: pendingAnswer,
      likeCount: 0,
      replyCount: 0,
      createdAt: "たった今",
      isBestAnswer: false,
      isLiked: false,
    }

    // 楽観的UI更新
    setAnswers((prev) => [newAnswer, ...prev])
    setNewAnswerId(newAnswer.id)
    setShowToast(true)

    // 投稿回数を減らす
    setRemainingPosts((prev) => prev - 1)

    // 新着順に切り替えて、新しい回答を表示
    setSortType("newest")
    setDisplayCount(5)

    // ダイアログを閉じる
    setShowAnswerDialog(false)
    setPendingAnswer("")

    // 少し遅延してからスクロール
    setTimeout(() => {
      scrollToAnswer(newAnswer.id)
    }, 100)
  }

  // 回答投稿キャンセル
  const handleAnswerCancel = () => {
    setShowAnswerDialog(false)
    setPendingAnswer("")
  }

  // 回答へのスムーズスクロール
  const scrollToAnswer = (answerId: number) => {
    const element = answerRefs.current[answerId]
    if (element) {
      const headerOffset = 100 // ヘッダー分のオフセット
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // スクロール後にハイライトアニメーション
      element.classList.add("ring-4", "ring-yellow-400")
      setTimeout(() => {
        element.classList.remove("ring-4", "ring-yellow-400")
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-8">
        {/* 2カラムレイアウト */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* メインコンテンツエリア */}
          <div className="flex-1 lg:w-2/3">
            {/* お題カード（大型） */}
            <TopicDetailCard topic={topic} />

            {/* タグ一覧 */}
            <div className="mt-6">
              <TopicTags tags={topic.tags || []} subject={topic.subject} />
            </div>

            {/* 残りハート数表示 */}
            <div className="mt-6">
              <RemainingHeartsDisplay remainingHearts={remainingHearts} />
            </div>

            {/* ピン留め回答 */}
            {answers.length > 0 && (
              <div className="mt-6">
                <PinnedAnswers answers={answers} onAnswerClick={scrollToAnswer} />
              </div>
            )}

            {/* あなたの回答セクション */}
            <div className="mt-6">
              <MyAnswersSection
                myAnswers={answers}
                onLikeToggle={handleLikeToggle}
                remainingHearts={remainingHearts}
                currentUserId={CURRENT_USER_ID}
                onReplySubmit={handleReplySubmit}
              />
            </div>

            {/* 回答一覧セクション */}
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
              {/* ソート機能 */}
              <AnswerSortToggle currentSort={sortType} onSortChange={setSortType} answerCount={answers.length} />

              {/* 回答リスト */}
              <div className="space-y-4">
                {displayedAnswers.map((answer, index) => (
                  <AnswerCard
                    key={answer.id}
                    answer={answer}
                    rank={sortType === "likes" ? index + 1 : undefined}
                    onLikeToggle={handleLikeToggle}
                    remainingHearts={remainingHearts}
                    currentUserId={CURRENT_USER_ID}
                    onReplySubmit={handleReplySubmit}
                    ref={(el) => {
                      answerRefs.current[answer.id] = el
                    }}
                  />
                ))}

                {/* ローディングスケルトン */}
                {isLoading &&
                  Array.from({ length: 3 }).map((_, i) => <AnswerCardSkeleton key={`skeleton-${i}`} />)}

                {/* Intersection Observerのターゲット */}
                {displayCount < sortedAnswers.length && <div ref={observerTarget} className="h-10" />}
              </div>

              {/* 空の状態 */}
              {answers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg font-bold text-gray-600">まだ回答がありません</p>
                  <p className="text-sm text-gray-500 mt-2">最初の回答者になりましょう！</p>
                </div>
              )}

              {/* 全件表示済み */}
              {answers.length > 0 && displayCount >= sortedAnswers.length && (
                <div className="text-center py-6 text-sm text-gray-500 font-bold">すべての回答を表示しました</div>
              )}
            </div>
          </div>

          {/* サイドバー（デスクトップのみ） */}
          <aside className="w-full lg:w-1/3 space-y-6">
            {/* 回答者ランキング */}
            {answers.length > 0 && <AnswerRanking answers={answers} />}

            {/* 関連お題 */}
            <RelatedTopics
              currentTopicId={topic.id}
              currentTags={topic.tags}
              currentAuthorId={topic.author?.id}
              allTopics={mockTopics}
            />
          </aside>
        </div>
      </div>

      {/* Toast通知 */}
      {showToast && (
        <ToastNotification message="回答を投稿しました！" onClose={() => setShowToast(false)} />
      )}

      {/* ハート確認ダイアログ */}
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

      {/* 回答確認ダイアログ */}
      <AnswerConfirmDialog
        isOpen={showAnswerDialog}
        onConfirm={handleAnswerConfirm}
        onCancel={handleAnswerCancel}
        answerPreview={pendingAnswer}
        remainingPosts={remainingPosts - 1}
      />

      {/* 固定コメント投稿バー */}
      <FixedCommentBar onSubmit={handleSubmitAnswer} isLoggedIn={true} remainingPosts={remainingPosts} />
    </div>
  )
}
