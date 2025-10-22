"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const errorMessages: Record<string, string> = {
    Configuration: "サーバーの設定に問題があります。",
    AccessDenied: "アクセスが拒否されました。",
    Verification: "認証リンクの有効期限が切れているか、既に使用されています。",
    Default: "認証中にエラーが発生しました。",
  }

  const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border-4 border-black rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-black text-black mb-4">エラーが発生しました</h1>
        <p className="text-black font-bold mb-6">{errorMessage}</p>
        <Link
          href="/auth/signin"
          className="inline-block bg-[#F4C300] text-black font-black px-6 py-3 rounded-xl border-4 border-black hover:bg-[#e0b300] transition-colors"
        >
          ログインページに戻る
        </Link>
      </div>
    </div>
  )
}
