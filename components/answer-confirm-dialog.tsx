"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface AnswerConfirmDialogProps {
  isOpen: boolean
  onConfirm: () => void
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
            onClick={onConfirm}
            className="bg-gradient-to-r from-[#F4C300] to-[#FFD700] hover:from-[#FFD700] hover:to-[#F4C300] text-black font-bold"
          >
            投稿する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
