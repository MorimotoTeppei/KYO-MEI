import { Skeleton } from "@/components/ui/skeleton"

export function TopicCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* サムネイル部分 */}
      <Skeleton className="h-32 w-full" />

      {/* カード本体 */}
      <div className="p-5">
        {/* 投稿者情報 */}
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* お題タイトル */}
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-3" />

        {/* タグ表示 */}
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* 下部情報 */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  )
}
