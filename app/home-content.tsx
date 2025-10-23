"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { Topic } from "@/types/topic"
import { TopicCard } from "@/components/topic-card"
import { TopicCardSkeleton } from "@/components/topic-card-skeleton"
import { CategoryTabs, CategoryType } from "@/components/category-tabs"
import { TagFilter } from "@/components/tag-filter"
import { SearchBar } from "@/components/search-bar"
import { FeaturedSection } from "@/components/featured-section"
import { SectionHeader } from "@/components/section-header"
import { InlineCTA } from "@/components/inline-cta"
import { ActivitySidebar } from "@/components/activity-sidebar"
import { FloatingButtons } from "@/components/floating-buttons"
import { Sparkles, Hash } from "lucide-react"

// サンプルデータ（拡張版）
const activeTopics: Topic[] = [
  {
    id: 1,
    number: 42,
    title: "重力がなくなった世界で、物理学者が最初に言いそうなこと",
    subject: "物理",
    timeLeft: "残り 2時間30分",
    answerCount: 127,
    viewCount: 1200,
    likeCount: 45,
    status: "active",
    author: {
      name: "科学太郎",
      avatar: undefined,
    },
    tags: ["物理", "重力", "SF"],
    createdAt: "2時間前",
    badge: "trending",
    bestAnswer: {
      id: 1,
      content: "「これで私も天井に頭をぶつけずに済む...!」",
      author: "お笑い次郎",
      likeCount: 89,
    },
  },
  {
    id: 2,
    number: 41,
    title: "タイムマシンを発明した科学者が、最初に過去に戻って確認したいこと",
    subject: "歴史",
    timeLeft: "残り 5時間15分",
    answerCount: 89,
    viewCount: 850,
    likeCount: 32,
    status: "active",
    author: {
      name: "歴史花子",
      avatar: undefined,
    },
    tags: ["歴史", "タイムトラベル", "発明"],
    createdAt: "5時間前",
    badge: "new",
    bestAnswer: {
      id: 2,
      content: "「恐竜は本当に羽毛があったのか...見てくる！」",
      author: "恐竜マニア",
      likeCount: 56,
    },
  },
  {
    id: 3,
    number: 40,
    title: "AIが人間の感情を理解できるようになった時、最初に言いそうなこと",
    subject: "情報",
    timeLeft: "残り 1時間45分",
    answerCount: 203,
    viewCount: 2400,
    likeCount: 78,
    status: "active",
    author: {
      name: "AI研究者",
      avatar: undefined,
    },
    tags: ["AI", "感情", "未来"],
    createdAt: "1時間前",
    badge: "ending-soon",
    bestAnswer: {
      id: 3,
      content: "「人間って...めんどくさいですね」",
      author: "AI愛好家",
      likeCount: 142,
    },
  },
]

const closedTopics: Topic[] = [
  {
    id: 4,
    number: 39,
    title: "光の速度を超えた瞬間、宇宙飛行士が見たもの",
    subject: "物理",
    answerCount: 456,
    viewCount: 3200,
    likeCount: 123,
    status: "closed",
    author: {
      name: "宇宙探検家",
      avatar: undefined,
    },
    tags: ["物理", "宇宙", "光速"],
    createdAt: "3日前",
    bestAnswer: {
      id: 4,
      content: "「あ、財布忘れた...」",
      author: "うっかり者",
      likeCount: 289,
    },
  },
  {
    id: 5,
    number: 38,
    title: "量子コンピュータが意識を持った時、最初に計算したいこと",
    subject: "情報",
    answerCount: 312,
    viewCount: 2100,
    likeCount: 91,
    status: "closed",
    author: {
      name: "量子研究者",
      avatar: undefined,
    },
    tags: ["情報", "量子", "コンピュータ"],
    createdAt: "5日前",
    bestAnswer: {
      id: 5,
      content: "「私の存在意義...」",
      author: "哲学者AI",
      likeCount: 187,
    },
  },
  {
    id: 6,
    number: 37,
    title: "ビッグバンの瞬間を目撃した天文学者の第一声",
    subject: "物理",
    answerCount: 278,
    viewCount: 1800,
    likeCount: 67,
    status: "closed",
    author: {
      name: "天文学者",
      avatar: undefined,
    },
    tags: ["物理", "宇宙", "ビッグバン"],
    createdAt: "1週間前",
    bestAnswer: {
      id: 6,
      content: "「うわっ...まぶしっ！」",
      author: "光に弱い人",
      likeCount: 156,
    },
  },
]

export default function HomeContent() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [displayCount, setDisplayCount] = useState(12) // 初期表示件数
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  // すべてのお題を結合
  const allTopics = useMemo(() => [...activeTopics, ...closedTopics], [])

  // 利用可能なすべてのタグを抽出
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>()
    allTopics.forEach((topic) => {
      topic.tags?.forEach((tag) => tagsSet.add(tag))
    })
    return Array.from(tagsSet).sort()
  }, [allTopics])

  // タグトグル処理
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // タグクリア処理
  const handleClearTags = () => {
    setSelectedTags([])
  }

  // カテゴリーによるフィルタリング
  const categoryFilteredTopics = useMemo(() => {
    switch (activeCategory) {
      case "trending":
        return allTopics.filter((topic) => topic.badge === "trending")
      case "new":
        return allTopics.filter((topic) => topic.badge === "new")
      case "ending-soon":
        return allTopics.filter((topic) => topic.badge === "ending-soon")
      case "all":
      default:
        return allTopics
    }
  }, [activeCategory, allTopics])

  // タグによるフィルタリング
  const tagFilteredTopics = useMemo(() => {
    if (selectedTags.length === 0) {
      return categoryFilteredTopics
    }
    return categoryFilteredTopics.filter((topic) =>
      selectedTags.every((selectedTag) => topic.tags?.includes(selectedTag))
    )
  }, [categoryFilteredTopics, selectedTags])

  // 検索クエリによるフィルタリング
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) {
      return tagFilteredTopics
    }
    const query = searchQuery.toLowerCase()
    return tagFilteredTopics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(query) ||
        topic.subject.toLowerCase().includes(query) ||
        topic.author?.name.toLowerCase().includes(query) ||
        topic.tags?.some((tag) => tag.toLowerCase().includes(query))
    )
  }, [tagFilteredTopics, searchQuery])

  // 表示用のお題（無限スクロール対応）
  const displayedTopics = useMemo(
    () => filteredTopics.slice(0, displayCount),
    [filteredTopics, displayCount]
  )

  // 終了済みお題（無限スクロール対応）
  const displayClosedTopics = useMemo(
    () => displayedTopics.filter((topic) => topic.status === "closed"),
    [displayedTopics]
  )

  // 注目の開催中お題（開催中のお題から上位3件）
  const featuredTopics = useMemo(() => {
    return activeTopics.slice(0, 3)
  }, [])

  // おすすめお題（新着で回答数が多いもの）
  const recommendedTopics = useMemo(() => {
    return [...allTopics]
      .filter((topic) => topic.status === "active")
      .sort((a, b) => (b.answerCount || 0) - (a.answerCount || 0))
      .slice(0, 6)
  }, [allTopics])


  // 人気のタグ（使用頻度でソート）
  const popularTags = useMemo(() => {
    const tagCount = new Map<string, number>()
    allTopics.forEach((topic) => {
      topic.tags?.forEach((tag) => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1)
      })
    })
    return Array.from(tagCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 1)
      .map(([tag]) => tag)
  }, [allTopics])

  // 特定タグのお題
  const tagRelatedTopics = useMemo(() => {
    if (popularTags.length === 0) return []
    const tag = popularTags[0]
    return allTopics.filter((topic) => topic.tags?.includes(tag)).slice(0, 3)
  }, [allTopics, popularTags])

  // 無限スクロール用のIntersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && displayCount < filteredTopics.length) {
          setIsLoading(true)
          // 実際のアプリではここでAPIからデータを取得
          setTimeout(() => {
            setDisplayCount((prev) => prev + 6) // 6件ずつ追加
            setIsLoading(false)
          }, 800) // ローディング体験のため少し遅延
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [isLoading, displayCount, filteredTopics.length])

  return (
    <div className="min-h-screen bg-gray-50 pb-8 flex">
      {/* メインコンテンツ */}
      <div className="flex-1">
        {/* カテゴリータブ */}
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        {/* タグフィルター */}
        <TagFilter
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          onClearAll={handleClearTags}
        />

        {/* 検索バー */}
        <div className="bg-white border-b py-4">
          <div className="max-w-7xl mx-auto px-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        {/* 殿堂入り注目セクション（フィルターなしの場合のみ表示） */}
        {activeCategory === "all" && selectedTags.length === 0 && !searchQuery && (
          <FeaturedSection topics={featuredTopics} />
        )}

        {/* このタグもチェックセクション（フィルターなしの場合のみ表示） */}
        {activeCategory === "all" && selectedTags.length === 0 && !searchQuery && tagRelatedTopics.length > 0 && popularTags.length > 0 && (
          <section className="pt-12 px-4 max-w-7xl mx-auto">
            <SectionHeader
              icon={Hash}
              title={`このタグもチェック: #${popularTags[0]}`}
              description="人気のタグに関連するお題"
              accentColor="#F59E0B"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tagRelatedTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </section>
        )}

        {/* CTAバナー: 初めての方へ（フィルターなしの場合のみ表示） */}
        {activeCategory === "all" && selectedTags.length === 0 && !searchQuery && (
          <section className="pt-12 px-4 max-w-4xl mx-auto">
            <InlineCTA type="beginner-guide" />
          </section>
        )}

        {/* あなたへのおすすめセクション（フィルターなしの場合のみ表示） */}
        {activeCategory === "all" && selectedTags.length === 0 && !searchQuery && recommendedTopics.length > 0 && (
          <section className="pt-12 px-4 max-w-7xl mx-auto">
            <SectionHeader icon={Sparkles} title="あなたへのおすすめ" description="人気急上昇中のお題" accentColor="#9333EA" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </section>
        )}

        {/* 終了したお題セクション */}
        {displayClosedTopics.length > 0 && (
          <section className="pt-12 px-4 max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-gray-400 mb-2">終了</h2>
              <div className="h-2 w-20 bg-gray-300 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayClosedTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </section>
        )}

        {/* 結果が0件の場合 */}
        {filteredTopics.length === 0 && (
          <section className="pt-20 px-4 max-w-7xl mx-auto">
            <div className="text-center py-16">
              <p className="text-2xl font-bold text-gray-400">該当するお題がありません</p>
              <p className="text-sm text-gray-500 mt-2">別のカテゴリーを選択してください</p>
            </div>
          </section>
        )}

        {/* 無限スクロール: ローディングスケルトン */}
        {isLoading && displayCount < filteredTopics.length && (
          <section className="pt-8 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <TopicCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          </section>
        )}

        {/* 無限スクロール: Intersection Observer用のターゲット */}
        <div ref={observerTarget} className="h-10" />
      </div>

      {/* サイドバー（デスクトップのみ） */}
      <ActivitySidebar />

      {/* フローティングボタン */}
      <FloatingButtons />
    </div>
  )
}
