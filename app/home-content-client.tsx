"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { Topic } from "@/types/topic"
import { TopicCard } from "@/components/topic-card"
import { TopicCardSkeleton } from "@/components/topic-card-skeleton"
import { TagFilter } from "@/components/tag-filter"
import { SearchBar } from "@/components/search-bar"
import { FeaturedSection } from "@/components/featured-section"
import { SectionHeader } from "@/components/section-header"
import { InlineCTA } from "@/components/inline-cta"
import { FloatingButtons } from "@/components/floating-buttons"
import { Sparkles, Hash } from "lucide-react"

interface HomeContentClientProps {
  initialActiveTopics: Topic[]
  initialClosedTopics: Topic[]
}

export default function HomeContentClient({ initialActiveTopics, initialClosedTopics }: HomeContentClientProps) {
  const [activeTopics] = useState<Topic[]>(initialActiveTopics)
  const [closedTopics] = useState<Topic[]>(initialClosedTopics)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [displayCount, setDisplayCount] = useState(12)
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  // すべてのお題を結合
  const allTopics = useMemo(() => [...activeTopics, ...closedTopics], [activeTopics, closedTopics])

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

  // タグによるフィルタリング
  const tagFilteredTopics = useMemo(() => {
    if (selectedTags.length === 0) {
      return allTopics
    }
    return allTopics.filter((topic) =>
      selectedTags.every((selectedTag) => topic.tags?.includes(selectedTag))
    )
  }, [allTopics, selectedTags])

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
  const displayedTopics = useMemo(() => filteredTopics.slice(0, displayCount), [filteredTopics, displayCount])

  // 終了済みお題（無限スクロール対応）
  const displayClosedTopics = useMemo(
    () => displayedTopics.filter((topic) => topic.status === "closed"),
    [displayedTopics]
  )

  // 注目の開催中お題（開催中のお題から上位3件）
  const featuredTopics = useMemo(() => {
    return activeTopics.slice(0, 3)
  }, [activeTopics])

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
          setTimeout(() => {
            setDisplayCount((prev) => prev + 6)
            setIsLoading(false)
          }, 800)
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
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* メインコンテンツ */}
      <div className="w-full">
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
        {selectedTags.length === 0 && !searchQuery && (
          <FeaturedSection topics={featuredTopics} />
        )}

        {/* このタグもチェックセクション（フィルターなしの場合のみ表示） */}
        {selectedTags.length === 0 &&
          !searchQuery &&
          tagRelatedTopics.length > 0 &&
          popularTags.length > 0 && (
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
        {selectedTags.length === 0 && !searchQuery && (
          <section className="pt-12 px-4 max-w-4xl mx-auto">
            <InlineCTA type="beginner-guide" />
          </section>
        )}

        {/* あなたへのおすすめセクション（フィルターなしの場合のみ表示） */}
        {selectedTags.length === 0 &&
          !searchQuery &&
          recommendedTopics.length > 0 && (
            <section className="pt-12 px-4 max-w-7xl mx-auto">
              <SectionHeader
                icon={Sparkles}
                title="あなたへのおすすめ"
                description="人気急上昇中のお題"
                accentColor="#9333EA"
              />
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
              <p className="text-sm text-gray-500 mt-2">別のフィルターを試してください</p>
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

      {/* フローティングボタン */}
      <FloatingButtons />
    </div>
  )
}
