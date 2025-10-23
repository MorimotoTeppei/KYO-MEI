import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

/**
 * GET /api/rankings
 * ランキングデータを取得
 */
export async function GET() {
  try {
    // トップユーザーランキング（週間）
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    // 回答数といいね数でランキング
    const topUsers = await prisma.user.findMany({
      where: {
        answers: {
          some: {
            createdAt: {
              gte: oneWeekAgo,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        answers: {
          where: {
            createdAt: {
              gte: oneWeekAgo,
            },
          },
          select: {
            id: true,
            likeCount: true,
          },
        },
      },
      take: 10,
    })

    const formattedTopUsers = topUsers
      .map((user) => ({
        id: user.id,
        name: user.name || "匿名",
        avatar: user.image,
        answerCount: user.answers.length,
        likeCount: user.answers.reduce((sum, answer) => sum + answer.likeCount, 0),
      }))
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 5)

    // トップタグランキング
    const topTags = await prisma.tag.findMany({
      orderBy: {
        usageCount: "desc",
      },
      take: 5,
      select: {
        name: true,
        usageCount: true,
      },
    })

    // タグのトレンド計算（簡易版: 使用回数が多いほどup）
    const formattedTopTags = topTags.map((tag, index) => ({
      name: tag.name,
      count: tag.usageCount,
      trend: index < 2 ? ("up" as const) : ("stable" as const),
    }))

    return NextResponse.json({
      topUsers: formattedTopUsers,
      topTags: formattedTopTags,
    })
  } catch (error) {
    console.error("Get rankings error:", error)
    return NextResponse.json({ error: "ランキングの取得に失敗しました" }, { status: 500 })
  }
}
