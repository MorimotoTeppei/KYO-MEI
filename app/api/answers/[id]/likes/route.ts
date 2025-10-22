import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

/**
 * POST /api/answers/[id]/likes
 * 回答にいいねを追加（要認証）
 * 1トピックにつき最大3つまでいいね可能
 */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 })
    }

    // 回答の存在確認
    const answer = await prisma.answer.findUnique({
      where: { id: params.id },
      include: {
        topic: true,
      },
    })

    if (!answer) {
      return NextResponse.json({ error: "回答が見つかりません" }, { status: 404 })
    }

    // 既にいいねしているか確認
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_answerId: {
          userId: session.user.id,
          answerId: params.id,
        },
      },
    })

    if (existingLike) {
      return NextResponse.json({ error: "既にいいねしています" }, { status: 400 })
    }

    // このトピックで既にいくついいねしているか確認
    const likesInTopic = await prisma.like.count({
      where: {
        userId: session.user.id,
        topicId: answer.topicId,
      },
    })

    if (likesInTopic >= 3) {
      return NextResponse.json(
        { error: "1つのトピックにつき最大3つまでしかいいねできません" },
        { status: 400 }
      )
    }

    // トランザクションでいいねを追加し、カウントを更新
    const result = await prisma.$transaction(async (tx) => {
      // いいねを作成
      const like = await tx.like.create({
        data: {
          userId: session.user.id,
          answerId: params.id,
          topicId: answer.topicId,
        },
      })

      // 回答のいいね数を更新
      await tx.answer.update({
        where: { id: params.id },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      })

      return like
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error("Create like error:", error)
    return NextResponse.json({ error: "いいねの追加に失敗しました" }, { status: 500 })
  }
}

/**
 * DELETE /api/answers/[id]/likes
 * 回答からいいねを削除（要認証）
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 })
    }

    // いいねの存在確認
    const like = await prisma.like.findUnique({
      where: {
        userId_answerId: {
          userId: session.user.id,
          answerId: params.id,
        },
      },
    })

    if (!like) {
      return NextResponse.json({ error: "いいねが見つかりません" }, { status: 404 })
    }

    // トランザクションでいいねを削除し、カウントを更新
    await prisma.$transaction(async (tx) => {
      // いいねを削除
      await tx.like.delete({
        where: {
          userId_answerId: {
            userId: session.user.id,
            answerId: params.id,
          },
        },
      })

      // 回答のいいね数を更新
      await tx.answer.update({
        where: { id: params.id },
        data: {
          likeCount: {
            decrement: 1,
          },
        },
      })
    })

    return NextResponse.json({ message: "いいねを削除しました" })
  } catch (error) {
    console.error("Delete like error:", error)
    return NextResponse.json({ error: "いいねの削除に失敗しました" }, { status: 500 })
  }
}

/**
 * GET /api/answers/[id]/likes
 * ユーザーが回答にいいねしているか確認
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ isLiked: false, remainingLikes: 3 })
    }

    // 回答の取得
    const answer = await prisma.answer.findUnique({
      where: { id: params.id },
    })

    if (!answer) {
      return NextResponse.json({ error: "回答が見つかりません" }, { status: 404 })
    }

    // いいねしているか確認
    const like = await prisma.like.findUnique({
      where: {
        userId_answerId: {
          userId: session.user.id,
          answerId: params.id,
        },
      },
    })

    // このトピックで使用したいいね数を取得
    const likesInTopic = await prisma.like.count({
      where: {
        userId: session.user.id,
        topicId: answer.topicId,
      },
    })

    return NextResponse.json({
      isLiked: !!like,
      remainingLikes: 3 - likesInTopic,
    })
  } catch (error) {
    console.error("Get like status error:", error)
    return NextResponse.json({ error: "いいね状態の取得に失敗しました" }, { status: 500 })
  }
}
