import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // データベースから直接ユーザー情報を取得
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
      },
    })

    return NextResponse.json({
      session: {
        user: session.user,
      },
      databaseUser: user,
    })
  } catch (error) {
    console.error("Debug error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
