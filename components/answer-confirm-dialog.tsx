"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, User } from "lucide-react"
import { generateAnonymousName } from "@/lib/anonymous-names"

interface AnswerConfirmDialogProps {
  isOpen: boolean
  onConfirm: (anonymousName: string) => void
  onCancel: () => void
  answerPreview: string
  remainingPosts: number
}

export function AnswerConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  answerPreview,
  remainingPosts,
}: AnswerConfirmDialogProps) {
  const [anonymousName, setAnonymousName] = useState("")

  // ダイアログが開かれたときに匿名名を生成
  useEffect(() => {
    if (isOpen) {
      setAnonymousName(generateAnonymousName())
    }
  }, [isOpen])

  // 匿名名を再生成
  const handleRefreshName = () => {
    setAnonymousName(generateAnonymousName())
  }

  // 投稿確定
  const handleConfirm = () => {
    onConfirm(anonymousName)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-yellow-500" />
            回答を投稿しますか？
          </DialogTitle>
          <DialogDescription className="text-base text-gray-700">
            投稿した回答は削除できません。内容をよく確認してください。
          </DialogDescription>
        </DialogHeader>

        {/* 匿名名表示 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600 font-medium">投稿者名（匿名）</p>
                <p className="text-lg font-black text-gray-900">{anonymousName}</p>
              </div>
            </div>
            <Button
              onClick={handleRefreshName}
              variant="outline"
              size="sm"
              className="border-2 border-blue-300 hover:bg-blue-100 font-bold"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              変更
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            この名前で投稿されます。気に入らない場合は変更できます。
          </p>
        </div>

        {/* 回答プレビュー */}
        <div className="my-4">
          <p className="text-sm font-bold text-gray-700 mb-2">投稿内容:</p>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
            <p className="text-gray-900 font-medium leading-relaxed whitespace-pre-wrap">{answerPreview}</p>
          </div>
        </div>

        {/* 投稿回数の警告 */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-gray-700">
            <span className="font-bold text-yellow-700">残り投稿回数: {remainingPosts}/3</span>
            {remainingPosts === 1 && (
              <span className="block mt-1 text-red-600 font-bold animate-pulse">
                ⚠️ これが最後の投稿です！
              </span>
            )}
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            onClick={onCancel}
            variant="outline"
            className="font-bold border-2 border-gray-300 hover:bg-gray-100"
          >
            キャンセル
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-gradient-to-r from-[#F4C300] to-[#FFD700] hover:from-[#FFD700] hover:to-[#F4C300] text-black font-bold"
          >
            投稿する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
