import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

/**
 * 管理者権限をチェックし、管理者でない場合はホームにリダイレクト
 */
export async function requireAdmin() {
  const session = await auth()

  // 未認証の場合
  if (!session?.user) {
    redirect("/auth/signin")
  }

  // データベースから直接isAdminフラグを確認
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      isAdmin: true,
    },
  })

  // 管理者でない場合
  if (!user?.isAdmin) {
    console.log(`User ${session.user.id} is not admin, redirecting to home`)
    redirect("/")
  }

  return session
}

/**
 * 現在のユーザーが管理者かどうかを確認
 */
export async function isAdmin() {
  const session = await auth()

  if (!session?.user?.id) {
    return false
  }

  // データベースから直接isAdminフラグを確認
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      isAdmin: true,
    },
  })

  return user?.isAdmin === true
}
