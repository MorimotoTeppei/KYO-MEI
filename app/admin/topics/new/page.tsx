"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewTopicPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "物理",
    endTime: "",
    tags: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/admin/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || undefined,
          subject: formData.subject,
          endTime: formData.endTime ? new Date(formData.endTime).toISOString() : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // デフォルト7日後
          tags: formData.tags
            ? formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
            : [],
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "お題の作成に失敗しました")
      }

      const topic = await response.json()
      router.push(`/admin/topics`)
    } catch (error) {
      console.error("Error creating topic:", error)
      alert(error instanceof Error ? error.message : "お題の作成に失敗しました")
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* ヘッダー */}
      <div className="mb-8">
        <Link href="/admin/topics">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            お題一覧に戻る
          </Button>
        </Link>
        <h1 className="text-4xl font-black text-gray-900 mb-2">新しいお題を作成</h1>
        <p className="text-gray-600">ユーザーに出題する新しいお題を作成します</p>
      </div>

      {/* フォーム */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>お題情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* タイトル */}
            <div>
              <Label htmlFor="title" className="text-base font-bold">
                お題タイトル <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="例: 重力がなくなった世界で、物理学者が最初に言いそうなこと"
                required
                className="mt-2"
                maxLength={200}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.title.length}/200文字
              </p>
            </div>

            {/* 説明 */}
            <div>
              <Label htmlFor="description" className="text-base font-bold">
                説明（オプション）
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="お題の詳細説明や補足情報があれば入力してください"
                className="mt-2"
                rows={4}
                maxLength={1000}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.description.length}/1000文字
              </p>
            </div>

            {/* 科目 */}
            <div>
              <Label htmlFor="subject" className="text-base font-bold">
                科目 <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => setFormData({ ...formData, subject: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="物理">物理</SelectItem>
                  <SelectItem value="化学">化学</SelectItem>
                  <SelectItem value="生物">生物</SelectItem>
                  <SelectItem value="地学">地学</SelectItem>
                  <SelectItem value="数学">数学</SelectItem>
                  <SelectItem value="情報">情報</SelectItem>
                  <SelectItem value="歴史">歴史</SelectItem>
                  <SelectItem value="地理">地理</SelectItem>
                  <SelectItem value="その他">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 終了日時 */}
            <div>
              <Label htmlFor="endTime" className="text-base font-bold">
                終了日時（オプション）
              </Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                設定しない場合は7日後に自動設定されます
              </p>
            </div>

            {/* タグ */}
            <div>
              <Label htmlFor="tags" className="text-base font-bold">
                タグ（オプション）
              </Label>
              <Input
                id="tags"
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="例: SF, 宇宙, 重力"
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                カンマ区切りで複数のタグを入力できます
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 送信ボタン */}
        <div className="mt-6 flex items-center gap-4">
          <Button
            type="submit"
            disabled={isSubmitting || !formData.title.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              "作成中..."
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                お題を作成
              </>
            )}
          </Button>
          <Link href="/admin/topics">
            <Button type="button" variant="outline">
              キャンセル
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
