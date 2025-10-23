import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

// ユーザー更新のバリデーションスキーマ
const updateUserSchema = z.object({
  name: z.string().min(1, "名前は必須です").max(50, "名前は50文字以内で入力してください").optional(),
  image: z.string().url("有効なURLを入力してください").optional(),
})

/**
 * GET /api/users/me
 * 現在のユーザー情報を取得
 */
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        _count: {
          select: {
            topics: true,
            answers: true,
            likes: true,
            following: true,
            followers: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 })
    }

    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      stats: {
        topicsCount: user._count.topics,
        answersCount: user._count.answers,
        likesCount: user._count.likes,
        followingCount: user._count.following,
        followersCount: user._count.followers,
      },
    }

    return NextResponse.json(formattedUser)
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "ユーザー情報の取得に失敗しました" }, { status: 500 })
  }
}

/**
 * PATCH /api/users/me
 * 現在のユーザー情報を更新
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updateUserSchema.parse(body)

    const updatedData: any = {}

    if (validatedData.name !== undefined) updatedData.name = validatedData.name
    if (validatedData.image !== undefined) updatedData.image = validatedData.image

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: updatedData,
    })

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "入力データが不正です", details: error.errors }, { status: 400 })
    }

    console.error("Update user error:", error)
    return NextResponse.json({ error: "ユーザー情報の更新に失敗しました" }, { status: 500 })
  }
}
