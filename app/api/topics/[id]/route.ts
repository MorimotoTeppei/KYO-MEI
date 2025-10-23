import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

// トピック更新のバリデーションスキーマ
const updateTopicSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  subject: z.string().min(1).optional(),
  status: z.enum(["ACTIVE", "CLOSED"]).optional(),
  endTime: z.string().datetime().optional(),
})

/**
 * GET /api/topics/[id]
 * トピック詳細を取得
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const topic = await prisma.topic.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        topicTags: {
          include: {
            tag: true,
          },
        },
        answers: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            _count: {
              select: {
                likes: true,
              },
            },
          },
          orderBy: {
            likeCount: "desc",
          },
        },
        _count: {
          select: {
            answers: true,
            likes: true,
          },
        },
      },
    })

    if (!topic) {
      return NextResponse.json({ error: "トピックが見つかりません" }, { status: 404 })
    }

    // 閲覧数をインクリメント
    await prisma.topic.update({
      where: { id: params.id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })

    // レスポンス形式を整形
    const formattedTopic = {
      id: topic.id,
      number: topic.number,
      title: topic.title,
      description: topic.description,
      subject: topic.subject,
      status: topic.status,
      startTime: topic.startTime,
      endTime: topic.endTime,
      viewCount: topic.viewCount + 1,
      answerCount: topic._count.answers,
      likeCount: topic._count.likes,
      author: topic.author,
      tags: topic.topicTags.map((tt) => tt.tag.name),
      answers: topic.answers.map((answer) => ({
        id: answer.id,
        content: answer.content,
        authorName: answer.authorName,
        likeCount: answer.likeCount,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
      })),
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt,
    }

    return NextResponse.json(formattedTopic)
  } catch (error) {
    console.error("Get topic error:", error)
    return NextResponse.json({ error: "トピックの取得に失敗しました" }, { status: 500 })
  }
}

/**
 * PATCH /api/topics/[id]
 * トピックを更新（作成者のみ）
 */
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updateTopicSchema.parse(body)

    // トピックの所有者確認
    const topic = await prisma.topic.findUnique({
      where: { id: params.id },
    })

    if (!topic) {
      return NextResponse.json({ error: "トピックが見つかりません" }, { status: 404 })
    }

    if (topic.authorId !== session.user.id) {
      return NextResponse.json({ error: "このトピックを編集する権限がありません" }, { status: 403 })
    }

    // トピックを更新
    const updatedData: any = {}

    if (validatedData.title !== undefined) updatedData.title = validatedData.title
    if (validatedData.description !== undefined) updatedData.description = validatedData.description
    if (validatedData.subject !== undefined) updatedData.subject = validatedData.subject
    if (validatedData.status !== undefined) updatedData.status = validatedData.status
    if (validatedData.endTime !== undefined) updatedData.endTime = new Date(validatedData.endTime)

    const updatedTopic = await prisma.topic.update({
      where: { id: params.id },
      data: updatedData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        topicTags: {
          include: {
            tag: true,
          },
        },
      },
    })

    return NextResponse.json(updatedTopic)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "入力データが不正です", details: error.errors }, { status: 400 })
    }

    console.error("Update topic error:", error)
    return NextResponse.json({ error: "トピックの更新に失敗しました" }, { status: 500 })
  }
}

/**
 * DELETE /api/topics/[id]
 * トピックを削除（作成者のみ）
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 })
    }

    // トピックの所有者確認
    const topic = await prisma.topic.findUnique({
      where: { id: params.id },
    })

    if (!topic) {
      return NextResponse.json({ error: "トピックが見つかりません" }, { status: 404 })
    }

    if (topic.authorId !== session.user.id) {
      return NextResponse.json({ error: "このトピックを削除する権限がありません" }, { status: 403 })
    }

    // トピックを削除（CASCADE設定により関連データも削除される）
    await prisma.topic.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "トピックを削除しました" })
  } catch (error) {
    console.error("Delete topic error:", error)
    return NextResponse.json({ error: "トピックの削除に失敗しました" }, { status: 500 })
  }
}
