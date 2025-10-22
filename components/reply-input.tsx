"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface ReplyInputProps {
  onSubmit: (content: string) => void
  placeholder?: string
  autoFocus?: boolean
}

export function ReplyInput({ onSubmit, placeholder = "コメントを入力...", autoFocus = false }: ReplyInputProps) {
  const [content, setContent] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // テキストエリアの自動拡張
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 80)}px`
    }
  }, [content])

  // オートフォーカス
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [autoFocus])

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim())
      setContent("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd+Enter or Ctrl+Enter で送信
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex items-end gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-yellow-400 focus-within:bg-yellow-50 transition-all">
      {/* テキストエリア */}
      <div className="flex-1">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full resize-none outline-none bg-transparent font-medium text-gray-900 placeholder:text-gray-400 text-sm"
          rows={1}
          style={{ minHeight: "32px", maxHeight: "80px" }}
        />
        {content.length > 0 && (
          <div className="mt-1 text-xs text-gray-500">
            {content.length > 200 ? (
              <span className="text-red-500 font-bold">{content.length} / 200文字（超過）</span>
            ) : (
              <span>{content.length} / 200文字</span>
            )}
          </div>
        )}
      </div>

      {/* 送信ボタン */}
      <Button
        onClick={handleSubmit}
        disabled={!content.trim() || content.length > 200}
        size="sm"
        className="bg-gradient-to-r from-[#F4C300] to-[#FFD700] hover:from-[#FFD700] hover:to-[#F4C300] text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed h-8 px-4"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  )
}
