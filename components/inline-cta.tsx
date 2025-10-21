import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"

type CTAType = "beginner-guide"

interface InlineCTAProps {
  type: CTAType
}

export function InlineCTA({ type }: InlineCTAProps) {
  if (type === "beginner-guide") {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 border-2 border-blue-200">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-2 text-center">初めての方へ</h3>
        <p className="text-sm text-gray-700 mb-6 text-center">
          大喜利の楽しみ方や、高評価な回答のコツをご紹介します。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/guide">
            <Button variant="outline" className="border-blue-500 text-blue-700 hover:bg-blue-50 font-bold px-6 py-3 rounded-full">
              使い方を見る
            </Button>
          </Link>
          <Link href="/tips">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-6 py-3 rounded-full shadow-lg">
              回答のコツを学ぶ
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return null
}
