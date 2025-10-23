"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, ArrowRight } from "lucide-react"
import { useSettings } from "@/hooks/useSettings"

export default function OnboardingProfilePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { settings, updateSettings } = useSettings()
  const [name, setName] = useState(settings.profile.name)
  const [avatar, setAvatar] = useState(settings.profile.avatar)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // すでにプロフィールが設定されている場合はホームにリダイレクト
  useEffect(() => {
    if (status === "authenticated" && session?.user?.name) {
      router.replace("/")
    }
  }, [status, session, router])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      alert("名前を入力してください")
      return
    }

    setIsSubmitting(true)

    // プロフィール情報をローカルストレージに保存
    updateSettings({
      profile: {
        ...settings.profile,
        name: name.trim(),
        avatar: avatar,
      },
    })

    // APIにユーザー情報を送信
    try {
      const response = await fetch("/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          image: avatar,
        }),
      })

      if (!response.ok) {
        throw new Error("プロフィールの保存に失敗しました")
      }

      // セッションを更新するため、ページをリロードせずに次の画面へ
      // NextAuth.jsのセッションは次回のauth()呼び出し時に自動更新される
      router.push("/onboarding/guide")
    } catch (error) {
      console.error("Error saving profile:", error)
      alert("プロフィールの保存に失敗しました")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            ステップ 1/2
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">
            プロフィール設定
          </h1>
          <p className="text-lg text-gray-700">
            あなたの名前とアイコンを設定しましょう
          </p>
        </div>

        {/* プロフィールフォーム */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* アバター */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-4xl font-bold">
                    {name ? name[0].toUpperCase() : "?"}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
                >
                  <Camera className="w-5 h-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-600">
                カメラアイコンをクリックして画像を選択
              </p>
            </div>

            {/* 名前入力 */}
            <div>
              <Label htmlFor="name" className="text-base font-bold text-gray-900 mb-2 block">
                名前 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例: 宇宙探検家"
                className="text-lg"
                required
                maxLength={50}
              />
              <p className="text-xs text-gray-500 mt-1">
                他のユーザーに表示される名前です
              </p>
            </div>
          </div>

          {/* 次へボタン */}
          <Button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-6 text-lg disabled:opacity-50"
          >
            {isSubmitting ? (
              "保存中..."
            ) : (
              <>
                次へ
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* ヘルプテキスト */}
        <p className="text-center text-sm text-gray-600 mt-6">
          プロフィールはいつでも設定画面から変更できます
        </p>
      </div>
    </div>
  )
}
