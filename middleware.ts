import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Edge Runtimeでは認証チェックを行わず、ページレベルで認証チェックを実施
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
