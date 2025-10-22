import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { generateAnonymousName } from "@/lib/anonymous-names"
import { z } from "zod"

// 回答作成のバリデーションスキーマ
const createAnswerSchema = z.object({
  content: z.string().min(1, "回答内容は必須です").max(1000, "回答は1000文字以内で入力してください"),
})

/**
 * POST /api/topics/[id]/answers
 * トピックに回答を投稿（要認証）
 * 回答は匿名名で投稿される
 */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 })
    }

    // トピックの存在確認
    const topic = await prisma.topic.findUnique({
      where: { id: params.id },
    })

    if (!topic) {
      return NextResponse.json({ error: "トピックが見つかりません" }, { status: 404 })
    }

    // トピックが終了していないか確認
    if (topic.status === "CLOSED") {
      return NextResponse.json({ error: "このトピックは終了しています" }, { status: 400 })
    }

    if (new Date() > topic.endTime) {
      return NextResponse.json({ error: "このトピックの回答期限が過ぎています" }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = createAnswerSchema.parse(body)

    // 匿名名を生成（ユーザーIDをシードとして一貫性のある名前を生成）
    const anonymousName = generateAnonymousName()

    // 回答を作成
    const answer = await prisma.answer.create({
      data: {
        content: validatedData.content,
        authorName: anonymousName,
        topicId: params.id,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(answer, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "入力データが不正です", details: error.errors }, { status: 400 })
    }

    console.error("Create answer error:", error)
    return NextResponse.json({ error: "回答の投稿に失敗しました" }, { status: 500 })
  }
}

/**
 * GET /api/topics/[id]/answers
 * トピックの回答一覧を取得
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const sortBy = searchParams.get("sortBy") || "likeCount" // likeCount | createdAt
    const order = searchParams.get("order") || "desc" // asc | desc

    const answers = await prisma.answer.findMany({
      where: {
        topicId: params.id,
      },
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy:
        sortBy === "createdAt"
          ? {
              createdAt: order as "asc" | "desc",
            }
          : {
              likeCount: order as "asc" | "desc",
            },
    })

    const formattedAnswers = answers.map((answer) => ({
      id: answer.id,
      content: answer.content,
      authorName: answer.authorName,
      likeCount: answer.likeCount,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }))

    return NextResponse.json(formattedAnswers)
  } catch (error) {
    console.error("Get answers error:", error)
    return NextResponse.json({ error: "回答の取得に失敗しました" }, { status: 500 })
  }
}
