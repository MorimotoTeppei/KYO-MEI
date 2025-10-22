import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

// トピック作成のバリデーションスキーマ
const createTopicSchema = z.object({
  title: z.string().min(1, "タイトルは必須です").max(200, "タイトルは200文字以内で入力してください"),
  description: z.string().optional(),
  subject: z.string().min(1, "教科は必須です"),
  endTime: z.string().datetime("有効な日時を入力してください"),
  tags: z.array(z.string()).max(3, "タグは最大3つまでです").optional(),
})

/**
 * GET /api/topics
 * トピック一覧を取得
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") as "ACTIVE" | "CLOSED" | null
    const subject = searchParams.get("subject")
    const tag = searchParams.get("tag")
    const limit = parseInt(searchParams.get("limit") || "20")
    const offset = parseInt(searchParams.get("offset") || "0")

    // フィルタ条件を構築
    const where: any = {}

    if (status) {
      where.status = status
    }

    if (subject) {
      where.subject = subject
    }

    if (tag) {
      where.topicTags = {
        some: {
          tag: {
            name: tag,
          },
        },
      }
    }

    const topics = await prisma.topic.findMany({
      where,
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
        _count: {
          select: {
            answers: true,
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: offset,
    })

    // レスポンス形式を整形
    const formattedTopics = topics.map((topic) => ({
      id: topic.id,
      number: topic.number,
      title: topic.title,
      description: topic.description,
      subject: topic.subject,
      status: topic.status,
      startTime: topic.startTime,
      endTime: topic.endTime,
      viewCount: topic.viewCount,
      answerCount: topic._count.answers,
      likeCount: topic._count.likes,
      author: topic.author,
      tags: topic.topicTags.map((tt) => tt.tag.name),
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt,
    }))

    return NextResponse.json(formattedTopics)
  } catch (error) {
    console.error("Get topics error:", error)
    return NextResponse.json({ error: "トピックの取得に失敗しました" }, { status: 500 })
  }
}

/**
 * POST /api/topics
 * 新しいトピックを作成（要認証）
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createTopicSchema.parse(body)

    // トランザクションでトピックとタグを作成
    const topic = await prisma.$transaction(async (tx) => {
      // トピックを作成
      const newTopic = await tx.topic.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          subject: validatedData.subject,
          endTime: new Date(validatedData.endTime),
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

      // タグを処理
      if (validatedData.tags && validatedData.tags.length > 0) {
        for (const tagName of validatedData.tags) {
          // タグを取得または作成
          const tag = await tx.tag.upsert({
            where: { name: tagName },
            update: {
              usageCount: {
                increment: 1,
              },
            },
            create: {
              name: tagName,
              usageCount: 1,
            },
          })

          // トピックとタグを関連付け
          await tx.topicTag.create({
            data: {
              topicId: newTopic.id,
              tagId: tag.id,
            },
          })
        }
      }

      return newTopic
    })

    return NextResponse.json(topic, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "入力データが不正です", details: error.errors }, { status: 400 })
    }

    console.error("Create topic error:", error)
    return NextResponse.json({ error: "トピックの作成に失敗しました" }, { status: 500 })
  }
}
