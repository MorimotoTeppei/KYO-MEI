import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import prisma from "@/lib/prisma"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

// 動的レンダリングを強制
export const dynamic = 'force-dynamic'

export default async function TopicsManagementPage() {
  // すべてのお題を取得
  const topics = await prisma.topic.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          answers: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div>
      {/* ヘッダー */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">お題管理</h1>
          <p className="text-gray-600">お題の作成・編集・削除ができます</p>
        </div>
        <Link href="/admin/topics/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            新しいお題を作成
          </Button>
        </Link>
      </div>

      {/* お題一覧 */}
      <Card>
        <CardHeader>
          <CardTitle>お題一覧 ({topics.length}件)</CardTitle>
        </CardHeader>
        <CardContent>
          {topics.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>まだお題がありません</p>
              <Link href="/admin/topics/new">
                <Button className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  最初のお題を作成
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* ステータスバッジ */}
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded ${
                            topic.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {topic.status === "ACTIVE" ? "開催中" : "終了"}
                        </span>
                        <span className="text-xs text-gray-500">
                          #{topic.id}
                        </span>
                      </div>

                      {/* お題タイトル */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {topic.title}
                      </h3>

                      {/* メタ情報 */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📚 {topic.subject}</span>
                        <span>💬 {topic._count.answers}件の回答</span>
                        <span>
                          作成日:{" "}
                          {format(new Date(topic.createdAt), "yyyy/MM/dd HH:mm", {
                            locale: ja,
                          })}
                        </span>
                        {topic.endTime && (
                          <span>
                            終了日:{" "}
                            {format(new Date(topic.endTime), "yyyy/MM/dd HH:mm", {
                              locale: ja,
                            })}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* アクションボタン */}
                    <div className="flex items-center gap-2">
                      <Link href={`/topic/${topic.id}`} target="_blank">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/topics/${topic.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <form
                        action={async () => {
                          "use server"
                          await prisma.topic.delete({
                            where: { id: topic.id },
                          })
                        }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
