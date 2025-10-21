"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

// モックデータ
const mockTopics = [
  {
    id: "1",
    number: "042",
    subject: "物理",
    question: "重力がなくなった世界で、物理学者が最初に言いそうなこと",
    status: "active" as const,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2時間後
    answerCount: 23,
  },
  {
    id: "2",
    number: "041",
    subject: "歴史",
    question: "織田信長がスマホを持っていたら、最初に検索しそうなワード",
    status: "ended" as const,
    endTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1時間前
    answerCount: 45,
  },
]

const mockAnswers = [
  {
    id: "1",
    topicId: "1",
    author: "浮遊する哲学者",
    content: "「これは...重大な発見だ」",
    hearts: 127,
    isLiked: false,
  },
  {
    id: "2",
    topicId: "1",
    author: "無重力の詩人",
    content: "「やっと肩の荷が下りた」",
    hearts: 89,
    isLiked: true,
  },
  {
    id: "3",
    topicId: "1",
    author: "宙に浮く数学者",
    content: "「重力加速度g=0...つまり、私の体重も0kg！ダイエット成功！」",
    hearts: 156,
    isLiked: false,
  },
  {
    id: "4",
    topicId: "1",
    author: "漂流する天文学者",
    content: "「地球が私を必要としなくなった」",
    hearts: 203,
    isLiked: false,
  },
  {
    id: "5",
    topicId: "1",
    author: "空中の化学者",
    content: "「落下実験の結果が...出ない」",
    hearts: 67,
    isLiked: false,
  },
]

export default function TopicDetailPage() {
  const params = useParams()
  const router = useRouter()
  const topicId = params.id as string

  const topic = mockTopics.find((t) => t.id === topicId)
  const [answers, setAnswers] = useState(mockAnswers.filter((a) => a.topicId === topicId))

  const [remainingHearts, setRemainingHearts] = useState(3)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null)
  const [isRemovingHeart, setIsRemovingHeart] = useState(false)

  if (!topic) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-2xl font-black text-black mb-4">お題が見つかりません</p>
          <button
            onClick={() => router.push("/")}
            className="bg-black text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            大喜利ページに戻る
          </button>
        </div>
      </div>
    )
  }

  const getTimeRemaining = () => {
    const now = new Date()
    const diff = topic.endTime.getTime() - now.getTime()

    if (diff <= 0) return "終了"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return `残り ${hours}時間${minutes}分`
    }
    return `残り ${minutes}分`
  }

  const toggleHeart = (answerId: string) => {
    const answer = answers.find((a) => a.id === answerId)
    if (!answer) return

    if (answer.isLiked) {
      setSelectedAnswerId(answerId)
      setIsRemovingHeart(true)
      setShowConfirmDialog(true)
      return
    }

    if (remainingHearts <= 0) {
      return
    }

    setSelectedAnswerId(answerId)
    setIsRemovingHeart(false)
    setShowConfirmDialog(true)
  }

  const confirmHeart = () => {
    if (!selectedAnswerId) return

    if (isRemovingHeart) {
      setAnswers((prev) =>
        prev.map((a) => {
          if (a.id === selectedAnswerId) {
            return {
              ...a,
              isLiked: false,
              hearts: a.hearts - 1,
            }
          }
          return a
        }),
      )
      setRemainingHearts((prev) => prev + 1)
    } else {
      setAnswers((prev) =>
        prev.map((answer) => {
          if (answer.id === selectedAnswerId) {
            return {
              ...answer,
              isLiked: true,
              hearts: answer.hearts + 1,
            }
          }
          return answer
        }),
      )
      setRemainingHearts((prev) => prev - 1)
    }

    setShowConfirmDialog(false)
    setSelectedAnswerId(null)
    setIsRemovingHeart(false)
  }

  const cancelHeart = () => {
    setShowConfirmDialog(false)
    setSelectedAnswerId(null)
    setIsRemovingHeart(false)
  }

  const sortedAnswers = [...answers].sort((a, b) => b.hearts - a.hearts)

  return (
    <div className="min-h-screen bg-white pb-8">
      <div className="bg-[#F4C300] rounded-2xl p-8 md:p-12 mx-4 mt-4 md:mx-8 md:mt-8 shadow-sm relative">
        <div className="flex justify-between items-start mb-6">
          <span className="text-black font-bold text-sm md:text-base">#{topic.number}</span>
          <span className="text-black font-bold text-sm md:text-base">#{topic.subject}</span>
        </div>

        <h1 className="text-black font-black text-2xl md:text-4xl text-center leading-relaxed mb-8">
          {topic.question}
        </h1>

        <div className="flex justify-between items-center text-sm md:text-base">
          <div className="flex gap-4 text-black font-bold">
            <span>{getTimeRemaining()}</span>
            <span>回答数: {topic.answerCount}</span>
          </div>
          <span
            className={`px-3 py-1 rounded-lg font-bold text-xs md:text-sm ${
              topic.status === "active" ? "bg-black text-white" : "bg-gray-400 text-white"
            }`}
          >
            {topic.status === "active" ? "開催中" : "終了"}
          </span>
        </div>
      </div>

      <div className="mt-6 px-4 md:px-8">
        <div className="bg-black text-white rounded-2xl p-4 flex items-center justify-between">
          <span className="font-black text-lg md:text-xl">残りハート</span>
          <div className="flex items-center gap-2">
            {[...Array(3)].map((_, i) => (
              <span key={i} className={`text-2xl md:text-3xl ${i < remainingHearts ? "" : "grayscale opacity-30"}`}>
                ❤️
              </span>
            ))}
            <span className="font-black text-xl md:text-2xl ml-2">{remainingHearts}/3</span>
          </div>
        </div>
      </div>

      <div className="mt-8 px-4 md:px-8">
        <h2 className="text-black font-black text-2xl md:text-3xl mb-6 border-b-4 border-black pb-2">回答一覧</h2>

        <div className="space-y-4">
          {sortedAnswers.map((answer, index) => (
            <div
              key={answer.id}
              className="bg-white border-4 border-black rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {index < 3 && (
                    <div className="inline-block mb-2">
                      <span
                        className={`px-3 py-1 rounded-lg font-black text-sm ${
                          index === 0
                            ? "bg-[#F4C300] text-black"
                            : index === 1
                              ? "bg-gray-300 text-black"
                              : "bg-orange-200 text-black"
                        }`}
                      >
                        {index + 1}位
                      </span>
                    </div>
                  )}

                  <p className="text-black font-bold text-sm md:text-base mb-3">{answer.author}</p>
                  <p className="text-black font-bold text-lg md:text-xl leading-relaxed">{answer.content}</p>
                </div>

                <button
                  onClick={() => toggleHeart(answer.id)}
                  disabled={remainingHearts <= 0 && !answer.isLiked}
                  className={`flex flex-col items-center gap-1 min-w-[60px] group ${
                    remainingHearts <= 0 && !answer.isLiked ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <div
                    className={`text-3xl md:text-4xl transition-transform ${
                      remainingHearts > 0 || answer.isLiked ? "group-hover:scale-110" : ""
                    } ${answer.isLiked ? "" : "grayscale"}`}
                  >
                    ❤️
                  </div>
                  <span className="text-black font-black text-sm md:text-base">{answer.hearts}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedAnswers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-black font-bold text-lg">まだ回答がありません</p>
            <p className="text-gray-600 font-bold text-sm mt-2">最初の回答者になりましょう！</p>
          </div>
        )}
      </div>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full border-4 border-black shadow-lg">
            <h3 className="text-black font-black text-2xl mb-4 text-center">
              {isRemovingHeart ? "ハートを取り消しますか？" : "ハートを送りますか？"}
            </h3>
            <p className="text-black font-bold text-center mb-6">
              {isRemovingHeart ? (
                <>
                  この回答からハートを取り消します。
                  <br />
                  残りハート: {remainingHearts + 1}/3
                </>
              ) : (
                <>
                  この回答にハートを送ります。
                  <br />
                  残りハート: {remainingHearts - 1}/3
                </>
              )}
            </p>
            <div className="flex gap-4">
              <button
                onClick={cancelHeart}
                className="flex-1 bg-white text-black border-4 border-black font-black text-lg py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={confirmHeart}
                className="flex-1 bg-[#F4C300] text-black font-black text-lg py-3 rounded-xl hover:bg-[#e0b300] transition-colors border-4 border-black"
              >
                {isRemovingHeart ? "取り消す" : "送る"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
