"use client"

import Link from "next/link"
import { Topic } from "@/types/topic"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, MessageCircle, Heart, TrendingUp } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface FeaturedSectionProps {
  topics: Topic[]
}

// subject（科目）に応じた背景色を返す
const getSubjectColor = (subject: string): string => {
  const colors: Record<string, string> = {
    物理: "from-blue-500 via-blue-600 to-blue-700",
    歴史: "from-amber-500 via-amber-600 to-amber-700",
    情報: "from-purple-500 via-purple-600 to-purple-700",
    数学: "from-green-500 via-green-600 to-green-700",
    化学: "from-pink-500 via-pink-600 to-pink-700",
    生物: "from-emerald-500 via-emerald-600 to-emerald-700",
    default: "from-gray-500 via-gray-600 to-gray-700",
  }
  return colors[subject] || colors.default
}

export function FeaturedSection({ topics }: FeaturedSectionProps) {
  if (topics.length === 0) return null

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-8 h-8 text-[#F4C300]" />
          <h2 className="text-3xl font-black text-white">今週の殿堂入り大喜利</h2>
        </div>

        {/* カルーセル */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {topics.map((topic) => {
              const subjectGradient = getSubjectColor(topic.subject)
              return (
                <CarouselItem key={topic.id} className="md:basis-1/2 lg:basis-1/3">
                  <Link href={`/topic/${topic.id}`} className="block group">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                      {/* 大きなサムネイル */}
                      <div className={`relative h-48 bg-gradient-to-br ${subjectGradient} flex flex-col items-center justify-center p-6`}>
                        {/* 統計情報（右上） */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 text-white text-sm font-bold">
                          {topic.viewCount !== undefined && (
                            <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full">
                              <Eye className="w-4 h-4" />
                              <span>{topic.viewCount >= 1000 ? `${(topic.viewCount / 1000).toFixed(1)}k` : topic.viewCount}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full">
                            <MessageCircle className="w-4 h-4" />
                            <span>{topic.answerCount}</span>
                          </div>
                          {topic.likeCount !== undefined && (
                            <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full">
                              <Heart className="w-4 h-4 fill-current" />
                              <span>{topic.likeCount}</span>
                            </div>
                          )}
                        </div>

                        {/* お題番号 */}
                        <div className="text-white/80 text-6xl font-black mb-2">
                          #{String(topic.number).padStart(3, "0")}
                        </div>
                        <div className="text-white/90 text-sm font-bold bg-black/30 px-3 py-1 rounded-full">
                          #{topic.subject}
                        </div>
                      </div>

                      {/* カード本体 */}
                      <div className="p-6">
                        {/* 投稿者情報 */}
                        {topic.author && (
                          <div className="flex items-center gap-2 mb-4">
                            <Avatar className="w-7 h-7">
                              <AvatarImage src={topic.author.avatar} alt={topic.author.name} />
                              <AvatarFallback className="text-xs">{topic.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-bold text-gray-700">{topic.author.name}</span>
                          </div>
                        )}

                        {/* お題タイトル */}
                        <h3 className="text-xl font-black text-gray-900 leading-snug mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors">
                          {topic.title}
                        </h3>

                        {/* ベスト回答プレビュー */}
                        {topic.bestAnswer && (
                          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#F4C300]">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-black text-gray-600">ベスト回答</span>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Heart className="w-3 h-3 fill-current text-red-500" />
                                <span>{topic.bestAnswer.likeCount}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                              {topic.bestAnswer.content}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  )
}
