"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Lightbulb, Target, Zap, Star, TrendingUp } from "lucide-react"

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ホームに戻る
            </Button>
          </Link>
          <h1 className="text-4xl font-black text-gray-900 mb-4">回答のコツ</h1>
          <p className="text-lg text-gray-700">面白い回答を作るためのヒント集</p>
        </div>

        {/* イントロ */}
        <section className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200 p-8 mb-6">
          <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-7 h-7 text-yellow-500" />
            大喜利で大切なこと
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            大喜利で評価される回答には、いくつかの共通点があります。
            以下のコツを参考に、あなたらしい面白い回答を作ってみましょう！
          </p>
        </section>

        {/* コツ1: 意外性を狙う */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-purple-500" />
            コツ1: 意外性を狙う
          </h2>
          <p className="text-gray-700 mb-4">
            誰もが予想できる回答ではなく、意外な展開や発想の転換がある回答が高評価を得やすいです。
          </p>

          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-sm font-bold text-green-900 mb-2">✅ 良い例</p>
              <p className="text-sm text-gray-700">
                お題：「重力がなくなった世界で、物理学者が最初に言いそうなこと」<br />
                回答：「これで私も天井に頭をぶつけずに済む...!」
              </p>
              <p className="text-xs text-gray-600 mt-2">
                → 物理的な現象ではなく、個人的な悩みに焦点を当てた意外性
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-sm font-bold text-red-900 mb-2">❌ イマイチな例</p>
              <p className="text-sm text-gray-700">
                回答：「重力がなくなった」
              </p>
              <p className="text-xs text-gray-600 mt-2">
                → お題をそのまま繰り返しているだけで、新しい視点がない
              </p>
            </div>
          </div>
        </section>

        {/* コツ2: 具体的に表現する */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-500" />
            コツ2: 具体的に表現する
          </h2>
          <p className="text-gray-700 mb-4">
            抽象的な表現よりも、具体的でイメージしやすい回答の方が面白みが伝わります。
          </p>

          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-sm font-bold text-green-900 mb-2">✅ 良い例</p>
              <p className="text-sm text-gray-700">
                「重力加速度g=0...つまり、私の体重も0kg！ダイエット成功！」
              </p>
              <p className="text-xs text-gray-600 mt-2">
                → 数値や具体的な状況を使って、イメージしやすい
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-sm font-bold text-red-900 mb-2">❌ イマイチな例</p>
              <p className="text-sm text-gray-700">
                「これは大変だ」
              </p>
              <p className="text-xs text-gray-600 mt-2">
                → 抽象的で、何が面白いのか伝わりにくい
              </p>
            </div>
          </div>
        </section>

        {/* コツ3: キャラクターの視点に立つ */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            コツ3: キャラクターの視点に立つ
          </h2>
          <p className="text-gray-700 mb-4">
            お題のキャラクター（物理学者、数学者など）になりきって、その人らしい反応を想像しましょう。
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="font-black text-gray-900 mb-2">物理学者なら...</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 物理法則に言及する</li>
                <li>• 専門用語を使う</li>
                <li>• 実験的な思考をする</li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="font-black text-gray-900 mb-2">数学者なら...</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 数式で表現する</li>
                <li>• 論理的に考える</li>
                <li>• 証明しようとする</li>
              </ul>
            </div>
          </div>
        </section>

        {/* コツ4: タイミングと文字数 */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            コツ4: タイミングと文字数
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-black text-gray-900 mb-2">📏 適切な文字数</h3>
              <p className="text-gray-700 mb-2">
                長すぎると読まれにくく、短すぎると面白さが伝わりません。<br />
                <span className="font-bold text-blue-600">50〜150文字程度</span>が読みやすくておすすめです。
              </p>
            </div>

            <div>
              <h3 className="font-black text-gray-900 mb-2">⏰ 投稿タイミング</h3>
              <p className="text-gray-700">
                お題の開催初期に投稿すると、多くの人の目に触れやすくなります。<br />
                ただし、<span className="font-bold text-red-600">投稿は3回まで</span>なので、慎重に！
              </p>
            </div>
          </div>
        </section>

        {/* コツ5: 他の回答から学ぶ */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📚</span>
            コツ5: 他の回答から学ぶ
          </h2>
          <p className="text-gray-700 mb-4">
            高評価を得ている回答を読んで、どこが面白いのか分析してみましょう。
          </p>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <p className="text-sm font-bold text-blue-900 mb-2">💡 分析のポイント</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ どんな意外性があるか？</li>
              <li>✓ どんな視点から見ているか？</li>
              <li>✓ どんな言葉選びをしているか？</li>
              <li>✓ 構成やテンポはどうか？</li>
            </ul>
          </div>
        </section>

        {/* まとめ */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-8 mb-6">
          <h2 className="text-2xl font-black text-gray-900 mb-4">最後に...</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            大喜利に「正解」はありません。あなたの個性やセンスを活かして、
            楽しみながら回答を作ることが一番大切です。
          </p>
          <p className="text-gray-700 font-bold">
            失敗を恐れず、たくさん挑戦してみましょう！ 🎉
          </p>
        </section>

        {/* CTA */}
        <div className="text-center mt-8 space-y-4">
          <Link href="/">
            <Button className="bg-gradient-to-r from-[#F4C300] to-[#FFD700] hover:from-[#FFD700] hover:to-[#F4C300] text-black font-bold px-8 py-6 text-lg">
              お題に挑戦する
            </Button>
          </Link>
          <div>
            <Link href="/guide">
              <Button variant="outline" className="border-2 border-gray-300 font-bold">
                使い方ガイドを見る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
