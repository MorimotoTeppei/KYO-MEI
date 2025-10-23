"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageCircle, Heart, Trophy, Users, Sparkles } from "lucide-react"

export default function OnboardingGuidePage() {
  const router = useRouter()
  const [isStarting, setIsStarting] = useState(false)

  const handleStart = () => {
    setIsStarting(true)
    // アニメーション画面に遷移
    router.push("/onboarding/welcome")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            ステップ 2/2
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">使い方ガイド</h1>
          <p className="text-lg text-gray-700">KYO-MEIの楽しみ方を学びましょう！</p>
        </div>

        {/* セクション1: KYO-MEIとは */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">🎯</span>
            KYO-MEIとは？
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            KYO-MEIは、お題に対して面白い回答を投稿し合う大喜利コミュニティです。
            運営が出題するお題に対して、あなたの創造力とユーモアで回答してみましょう！
          </p>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <p className="text-sm font-bold text-gray-800">
              💡 ポイント: 面白さ、独創性、センスが評価されます！
            </p>
          </div>
        </section>

        {/* セクション2: 基本的な流れ */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">📝</span>
            基本的な流れ
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-black">
                1
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-2">お題を選ぶ</h3>
                <p className="text-gray-700">
                  ホーム画面から気になるお題をクリック。開催中のお題には「残り時間」が表示されています。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-black">
                2
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-2">回答を投稿する</h3>
                <p className="text-gray-700 mb-2">
                  画面下部の入力欄から回答を投稿。1つのお題に対して<span className="font-bold text-red-600">最大3回まで</span>投稿できます。
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded p-3 text-sm text-gray-600">
                  💡 投稿前に確認画面が表示されるので、よく確認してから投稿しましょう！
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-black">
                3
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-2">他の回答にハートを送る</h3>
                <p className="text-gray-700 mb-2">
                  面白いと思った回答には❤️ハートを送りましょう。各ユーザーは<span className="font-bold text-red-600">1つのお題につき3つまで</span>ハートを送れます。
                </p>
                <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">
                  ⚠️ 自分の投稿にはハートを送れません
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-black">
                4
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-2">ランキングを見る</h3>
                <p className="text-gray-700">
                  ハート数でランキングが決まります。1位〜3位には特別なバッジが付きます！
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* セクション3: 機能紹介 */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">✨</span>
            主な機能
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-red-500" />
                <h3 className="font-black text-gray-900">ハート機能</h3>
              </div>
              <p className="text-sm text-gray-700">
                お題ごとに3つまで。吟味して送りましょう！
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <h3 className="font-black text-gray-900">コメント機能</h3>
              </div>
              <p className="text-sm text-gray-700">
                回答に対してコメントを残せます。
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h3 className="font-black text-gray-900">ランキング</h3>
              </div>
              <p className="text-sm text-gray-700">
                ハート数で自動的にランキングが決まります。
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-500" />
                <h3 className="font-black text-gray-900">マイページ</h3>
              </div>
              <p className="text-sm text-gray-700">
                自分の投稿を一覧で確認できます。
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button
            onClick={handleStart}
            disabled={isStarting}
            className="bg-gradient-to-r from-[#F4C300] to-[#FFD700] hover:from-[#FFD700] hover:to-[#F4C300] text-black font-bold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            {isStarting ? (
              "始まる..."
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                さっそく始める
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
