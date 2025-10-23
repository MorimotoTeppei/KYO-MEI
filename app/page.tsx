import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import HomeContent from "./home-content"

export default async function HomePage() {
  const session = await auth()

  // 未認証の場合、サインインページにリダイレクト
  if (!session) {
    redirect("/auth/signin")
  }

  // 初回ログイン判定: nameが設定されていない場合はオンボーディングへ
  if (!session.user?.name) {
    redirect("/onboarding/profile")
  }

  return <HomeContent />
}
