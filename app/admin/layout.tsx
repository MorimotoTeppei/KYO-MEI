import { ReactNode } from "react"
import Link from "next/link"
import { requireAdmin } from "@/lib/admin"
import { Button } from "@/components/ui/button"
import { Home, FileText, Users, Settings, LogOut } from "lucide-react"
import { signOut } from "@/lib/auth"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // 管理者権限チェック
  await requireAdmin()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* サイドバー */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-black mb-2">KYO-MEI</h1>
          <p className="text-sm text-gray-400">管理画面</p>
        </div>

        <nav className="px-4 space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              <Home className="w-4 h-4 mr-3" />
              ダッシュボード
            </Button>
          </Link>
          <Link href="/admin/topics">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              <FileText className="w-4 h-4 mr-3" />
              お題管理
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              <Users className="w-4 h-4 mr-3" />
              ユーザー管理
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              <Settings className="w-4 h-4 mr-3" />
              設定
            </Button>
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800 mb-2">
              <Home className="w-4 h-4 mr-3" />
              サイトを表示
            </Button>
          </Link>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <Button variant="ghost" className="w-full justify-start text-red-400 hover:bg-gray-800 hover:text-red-300">
              <LogOut className="w-4 h-4 mr-3" />
              ログアウト
            </Button>
          </form>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
