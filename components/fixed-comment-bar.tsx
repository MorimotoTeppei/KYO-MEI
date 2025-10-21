"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send, LogIn } from "lucide-react"

interface FixedCommentBarProps {
  onSubmit: (content: string) => void
  isLoggedIn?: boolean
  remainingPosts?: number
}

export function FixedCommentBar({ onSubmit, isLoggedIn = true, remainingPosts = 3 }: FixedCommentBarProps) {
  const [content, setContent] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // テキストエリアの自動拡張
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [content])

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim())
      setContent("")
      setIsFocused(false)
      if (textareaRef.current) {
        textareaRef.current.blur()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd+Enter or Ctrl+Enter で送信
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
            <p className="text-gray-700 font-bold">回答するにはログインが必要です</p>
            <Button className="bg-gradient-to-r from-[#F4C300] to-[#FFD700] hover:from-[#FFD700] hover:to-[#F4C300] text-black font-bold">
              <LogIn className="w-4 h-4 mr-2" />
              ログインして回答する
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // 投稿回数が0の場合
  if (remainingPosts === 0) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
            <p className="text-red-700 font-black text-center">
              ❌ 投稿回数を使い切りました（3回まで）<br />
              <span className="text-sm font-bold">他のお題で回答してみましょう！</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 py-4 md:px-8">
        <div
          className={`flex items-end gap-3 p-4 rounded-xl border-2 transition-all ${
            isFocused
              ? "border-yellow-400 bg-yellow-50 shadow-md"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          {/* テキストエリア */}
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="回答を投稿する... (Cmd/Ctrl + Enter で送信)"
              className="w-full resize-none outline-none bg-transparent font-medium text-gray-900 placeholder:text-gray-400"
              rows={1}
              style={{ minHeight: "40px", maxHeight: "120px" }}
            />

            {/* 文字数カウントと投稿回数 */}
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-gray-500">💡 Cmd/Ctrl + Enter で送信</span>
              <div className="flex items-center gap-3">
                <span className={`font-bold ${remainingPosts === 1 ? "text-orange-600 animate-pulse" : "text-gray-700"}`}>
                  残り投稿回数: {remainingPosts}/3
                </span>
                {content.length > 0 && (
                  <span className={content.length > 500 ? "text-red-500 font-bold" : "text-gray-500"}>
                    {content.length} / 500文字
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 送信ボタン */}
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || content.length > 500}
            className="bg-gradient-to-r from-[#F4C300] to-[#FFD700] hover:from-[#FFD700] hover:to-[#F4C300] text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed h-10 px-6"
          >
            <Send className="w-4 h-4 mr-2" />
            投稿
          </Button>
        </div>

        {/* フォーカス時のヒント */}
        {isFocused && (
          <div className="mt-2 text-xs text-gray-500 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <p>💡 ヒント: 面白い回答を心がけましょう！</p>
          </div>
        )}
      </div>
    </div>
  )
}
