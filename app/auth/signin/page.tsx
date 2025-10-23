"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn("resend", {
        email,
        callbackUrl,
        redirect: false,
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border-4 border-black rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">📧</div>
          <h1 className="text-2xl font-black text-black mb-4">メールを確認してください</h1>
          <p className="text-black font-bold mb-2">
            <span className="text-[#F4C300]">{email}</span> 宛に
          </p>
          <p className="text-black font-bold mb-6">ログインリンクを送信しました。</p>
          <p className="text-sm text-gray-600 font-bold">メール内のリンクをクリックしてログインしてください。</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border-4 border-black rounded-2xl p-8">
        <h1 className="text-3xl font-black text-black mb-2 text-center">ログイン</h1>
        <div className="h-2 w-20 bg-[#F4C300] rounded-full mx-auto mb-8" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-black text-black mb-2">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-4 border-black rounded-xl font-bold text-black focus:outline-none focus:ring-4 focus:ring-[#F4C300]"
              placeholder="your@email.com"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#F4C300] text-black font-black text-lg py-3 rounded-xl border-4 border-black hover:bg-[#e0b300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "送信中..." : "ログインリンクを送信"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-bold">
            メールアドレスを入力すると、ログイン用のリンクをお送りします。
          </p>
        </div>
      </div>
    </div>
  )
}
