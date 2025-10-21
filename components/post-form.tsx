"use client"

import type React from "react"
import { useRouter } from "next/navigation"

import { useState } from "react"

// モックデータ：開催中のお題
const activeTopics = [
  {
    id: 1,
    number: 42,
    title: "重力がなくなった世界で、物理学者が最初に言いそうなこと",
    subject: "物理",
    remainingTime: "2時間15分",
    answerCount: 127,
  },
  {
    id: 2,
    number: 43,
    title: "光合成ができるようになった人間が最初にやること",
    subject: "生物",
    remainingTime: "5時間42分",
    answerCount: 89,
  },
  {
    id: 3,
    number: 44,
    title: "タイムマシンを発明した科学者の最初の一言",
    subject: "化学",
    remainingTime: "1日3時間",
    answerCount: 203,
  },
]

// ランダムな匿名名前を生成
const generateAnonymousName = () => {
  const adjectives = ["賢い", "面白い", "冷静な", "熱い", "クールな", "ユニークな", "鋭い", "優しい"]
  const nouns = ["パンダ", "ペンギン", "コアラ", "フクロウ", "キツネ", "ウサギ", "リス", "カワウソ"]
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${randomAdj}${randomNoun}`
}

export function PostForm() {
  const router = useRouter()
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null)
  const [isTopicConfirmed, setIsTopicConfirmed] = useState(false)
  const [answer, setAnswer] = useState("")
  const [anonymousName, setAnonymousName] = useState(generateAnonymousName())
  const [isNameConfirmed, setIsNameConfirmed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const selectedTopic = activeTopics.find((topic) => topic.id === selectedTopicId)

  const regenerateName = () => {
    setAnonymousName(generateAnonymousName())
  }

  const resetTopicSelection = () => {
    setIsTopicConfirmed(false)
    setSelectedTopicId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: 実際のAPI呼び出しに置き換える
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] 投稿データ:", {
      topicId: selectedTopicId,
      answer,
      anonymousName,
    })

    setIsSubmitting(false)
    setShowSuccess(true)

    // 2秒後に大喜利ページに戻る
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  if (showSuccess) {
    return (
      <div className="px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-[#F4C300] rounded-full flex items-center justify-center mx-auto">
            <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-black">投稿完了！</h2>
          <p className="text-sm text-gray-600">大喜利ページに戻ります...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8 space-y-6">
      {/* ヘッダー */}
      <div className="text-center">
        <h1 className="text-3xl font-black text-black">新規投稿</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* お題選択セクション */}
        {!isTopicConfirmed ? (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-black">開催中のお題を選択</h2>
            <div className="space-y-3">
              {activeTopics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full text-left rounded-2xl p-4 transition-all ${
                    selectedTopicId === topic.id
                      ? "bg-[#F4C300] border-2 border-black shadow-sm"
                      : "bg-white border-2 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-gray-600">No.{topic.number}</span>
                    <span className="text-xs font-bold text-black bg-white px-2 py-1 rounded-lg">#{topic.subject}</span>
                  </div>
                  <p className="text-sm font-bold text-black mb-3">{topic.title}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">
                      残り時間: <span className="font-bold text-black">{topic.remainingTime}</span>
                    </span>
                    <span className="text-gray-600">
                      回答数: <span className="font-bold text-black">{topic.answerCount}</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {selectedTopicId && (
              <button
                type="button"
                onClick={() => setIsTopicConfirmed(true)}
                className="w-full bg-black text-white font-black text-base py-3 rounded-2xl hover:bg-gray-800 transition-colors shadow-sm"
              >
                このお題で確定
              </button>
            )}
          </div>
        ) : (
          <>
            {!isNameConfirmed ? (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-black">投稿者名（匿名）</h2>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-2xl font-black text-black text-center mb-4">{anonymousName}</p>
                  <p className="text-xs text-gray-500 text-center mb-4">※ 内容を重視するため、匿名で投稿されます</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={regenerateName}
                      className="flex-1 bg-white text-black font-bold text-sm py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      違う名前にする
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsNameConfirmed(true)}
                      className="flex-1 bg-black text-white font-bold text-sm py-3 rounded-xl hover:bg-gray-800 transition-colors"
                    >
                      この名前で確定
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-sm text-gray-600 mb-1">投稿者名（匿名）</p>
                    <p className="text-xl font-black text-black mb-4">{anonymousName}</p>
                    {selectedTopic && (
                      <div className="border-t-2 border-gray-200 pt-4">
                        <p className="text-sm text-gray-600 mb-2">選択したお題</p>
                        <div className="bg-[#F4C300] rounded-xl p-3">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-xs font-bold text-gray-600">No.{selectedTopic.number}</span>
                            <span className="text-xs font-bold text-black bg-white px-2 py-1 rounded-lg">
                              #{selectedTopic.subject}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-black">{selectedTopic.title}</p>
                        </div>
                        <button
                          type="button"
                          onClick={resetTopicSelection}
                          className="mt-3 text-xs text-gray-500 hover:text-black underline"
                        >
                          お題を選び直す
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-black">あなたの回答</h2>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="お題に対する回答を入力してください..."
                    className="w-full min-h-[200px] p-4 rounded-2xl border-2 border-gray-200 focus:border-[#F4C300] focus:outline-none resize-none text-black font-medium"
                    required
                  />
                  <p className="text-xs text-gray-500 text-right">{answer.length} 文字</p>
                </div>

                <button
                  type="submit"
                  disabled={!answer.trim() || isSubmitting}
                  className="w-full bg-black text-white font-black text-lg py-4 rounded-2xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  {isSubmitting ? "投稿中..." : "投稿する"}
                </button>
              </>
            )}
          </>
        )}
      </form>
    </div>
  )
}
