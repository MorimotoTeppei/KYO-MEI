import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Heart, TrendingUp } from "lucide-react"
import prisma from "@/lib/prisma"

export default async function AdminDashboard() {
  // 統計情報を取得
  const [topicsCount, usersCount, answersCount, likesCount] = await Promise.all([
    prisma.topic.count(),
    prisma.user.count(),
    prisma.answer.count(),
    prisma.like.count(),
  ])

  const stats = [
    {
      title: "お題総数",
      value: topicsCount,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "ユーザー総数",
      value: usersCount,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "回答総数",
      value: answersCount,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "ハート総数",
      value: likesCount,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">ダッシュボード</h1>
        <p className="text-gray-600">KYO-MEI管理画面へようこそ</p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-gray-900">
                  {stat.value.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 最近のアクティビティ */}
      <Card>
        <CardHeader>
          <CardTitle>クイックアクション</CardTitle>
          <CardDescription>よく使う操作</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/topics/new"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FileText className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-bold text-gray-900">新しいお題を作成</h3>
              <p className="text-sm text-gray-600">新しいお題を投稿する</p>
            </a>
            <a
              href="/admin/topics"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-bold text-gray-900">お題を管理</h3>
              <p className="text-sm text-gray-600">既存のお題を編集・削除</p>
            </a>
            <a
              href="/admin/users"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
            >
              <Users className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-bold text-gray-900">ユーザー管理</h3>
              <p className="text-sm text-gray-600">ユーザー情報を確認</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
