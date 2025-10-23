import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

// お題作成のバリデーションスキーマ
const createTopicSchema = z.object({
  title: z.string().min(1, "タイトルは必須です").max(200, "タイトルは200文字以内で入力してください"),
  description: z.string().max(1000, "説明は1000文字以内で入力してください").optional(),
  subject: z.string().min(1, "科目は必須です"),
  endTime: z.string().datetime("有効な日時を入力してください"),
  tags: z.array(z.string()).optional(),
})

/**
 * お題を作成（管理者のみ）
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    // 認証チェック
    if (!session?.user) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 })
    }

    // 管理者チェック
    if (!session.user.isAdmin) {
      return NextResponse.json({ error: "管理者権限が必要です" }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = createTopicSchema.parse(body)

    // お題を作成
    const topic = await prisma.topic.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        subject: validatedData.subject,
        status: "ACTIVE",
        endTime: new Date(validatedData.endTime),
        authorId: session.user.id,
      },
    })

    // タグを作成・関連付け
    if (validatedData.tags && validatedData.tags.length > 0) {
      for (const tagName of validatedData.tags) {
        // タグを取得または作成
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        })

        // TopicTagを作成
        await prisma.topicTag.create({
          data: {
            topicId: topic.id,
            tagId: tag.id,
          },
        })
      }
    }

    return NextResponse.json(topic, { status: 201 })
  } catch (error) {
    console.error("Error creating topic:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "入力データが不正です", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "お題の作成に失敗しました" },
      { status: 500 }
    )
  }
}
