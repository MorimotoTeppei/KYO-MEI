import Link from "next/link"

// サンプルデータ
const activeTopics = [
  {
    id: 1,
    number: 42,
    title: "重力がなくなった世界で、物理学者が最初に言いそうなこと",
    subject: "物理",
    timeLeft: "残り 2時間30分",
    answerCount: 127,
  },
  {
    id: 2,
    number: 41,
    title: "タイムマシンを発明した科学者が、最初に過去に戻って確認したいこと",
    subject: "歴史",
    timeLeft: "残り 5時間15分",
    answerCount: 89,
  },
  {
    id: 3,
    number: 40,
    title: "AIが人間の感情を理解できるようになった時、最初に言いそうなこと",
    subject: "情報",
    timeLeft: "残り 1時間45分",
    answerCount: 203,
  },
]

const closedTopics = [
  {
    id: 4,
    number: 39,
    title: "光の速度を超えた瞬間、宇宙飛行士が見たもの",
    subject: "物理",
    answerCount: 456,
  },
  {
    id: 5,
    number: 38,
    title: "量子コンピュータが意識を持った時、最初に計算したいこと",
    subject: "情報",
    answerCount: 312,
  },
  {
    id: 6,
    number: 37,
    title: "ビッグバンの瞬間を目撃した天文学者の第一声",
    subject: "物理",
    answerCount: 278,
  },
]

export default function OgiriPage() {
  return (
    <div className="min-h-screen bg-white pb-8">
      {/* 開催中のお題セクション */}
      <section className="pt-8 px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-black text-black mb-2">開催中</h2>
          <div className="h-2 w-20 bg-[#F4C300] rounded-full" />
        </div>

        <div className="space-y-4">
          {activeTopics.map((topic) => (
            <Link key={topic.id} href={`/topic/${topic.id}`} className="block">
              <div className="bg-[#F4C300] rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer p-8 relative">
                <div className="flex items-start justify-between mb-8">
                  <span className="text-base font-black text-black">#{String(topic.number).padStart(3, "0")}</span>
                  <span className="text-base font-black text-black">#{topic.subject}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-black leading-relaxed text-center px-4">
                  {topic.title}
                </h3>

                {/* 開催中の情報を下部に小さく表示 */}
                <div className="mt-8 flex items-center justify-center gap-4 text-sm font-bold text-black/70">
                  <span>{topic.timeLeft}</span>
                  <span>•</span>
                  <span>回答数: {topic.answerCount}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 終了したお題セクション */}
      <section className="pt-12 px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-black text-gray-400 mb-2">終了</h2>
          <div className="h-2 w-20 bg-gray-300 rounded-full" />
        </div>

        <div className="space-y-4">
          {closedTopics.map((topic) => (
            <Link key={topic.id} href={`/topic/${topic.id}`} className="block">
              <div className="bg-[#F4C300]/30 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer p-8 relative">
                <div className="flex items-start justify-between mb-8">
                  <span className="text-base font-black text-gray-600">#{String(topic.number).padStart(3, "0")}</span>
                  <span className="text-base font-black text-gray-600">#{topic.subject}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-gray-700 leading-relaxed text-center px-4">
                  {topic.title}
                </h3>

                {/* 終了の情報を下部に小さく表示 */}
                <div className="mt-8 flex items-center justify-center gap-4 text-sm font-bold text-gray-600">
                  <span>回答数: {topic.answerCount}</span>
                  <span>•</span>
                  <span>終了</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
