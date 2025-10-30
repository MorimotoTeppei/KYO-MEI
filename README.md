# 共鳴（Kyo-Mei）

<div align="center">

**学びを笑いに変える、大喜利型学習プラットフォーム**

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel)

</div>

---

## 📖 目次

- [なぜこのアプリを作ったのか](#-なぜこのアプリを作ったのか)
- [アプリの特徴](#-アプリの特徴)
- [デモ](#-デモ)
- [技術スタック](#-技術スタック)
- [アーキテクチャ](#-アーキテクチャ)
- [データベース設計](#-データベース設計)
- [主な機能](#-主な機能)
- [使い方](#-使い方)
- [セットアップ](#-セットアップ)
- [技術的な工夫](#-技術的な工夫)

---

## 🚀 デプロイURL

kyo-mei.vercel.app

---

## 💡 なぜこのアプリを作ったのか

### 学習アプリへの想い

もともと「勉強を面白くしたい」という思いから、学習アプリの開発を志しました。最初はUnityで"他のゲームと張り合えるほど面白い"学習ゲームを作ろうと考えていました。ユーザーが勉強していることを意識せず、気づいたら成績が上がっている──そんな理想を描いていたのです。

しかし、試行錯誤を重ねる中で気づいたことがあります。**受験は「正しい勉強法を知っているか」の勝負だということ**。もし正しい勉強法をアプリで自動化できれば、人は受験に縛られず本当にやりたいことに集中できる。そう考え、効率的な学習システム「so-hatsu」の開発に取り組みました。

### 「お笑い的な要素」が持つ学習効果

ある時ふと気づきました。**「勉強が面白い」と感じるのは、ゲーム要素だけではない。「お笑い的な要素」にも知的な面白さがあるのではないか**。

振り返ると、好きな科目や嫌いな科目は「得意・不得意」だけで決まっていませんでした。
- 高校時代、物理が嫌いでした。先生が嫌いだったからです
- しかし浪人時代、面白い先生に出会って物理が好きになりました
- その先生の話が面白く、**もっと理解したいと思えたから授業を真剣に聞くようになった**のです

また、あるエンジニア志望の後輩がこう話してくれました：

> 「エンジニアにしかわからないボケを言うYouTuberがいて、長期インターンで開発を学ぶうちに、そのボケが少しずつ理解できるようになってきた。でも、まだ全部はわからない。**いつか全部わかるようになりたい**」

この言葉に大きなヒントがありました。**人は知識そのものよりも、"理解できるようになりたい人"への憧れで学ぶことがある**のだと。

### 共鳴のコンセプト

- 誰かの投稿したボケが理解できない。悔しい
- でも理解できた瞬間に、**笑いとともに少し成長を感じる**
- そんな体験こそ、勉強の原点ではないか

**クスッと笑えて、ちょっと賢くなる。**

勉強の合間や通学時間、休み時間──常に気を張っている受験生の小さな好奇心を刺激し、肩の力を抜けるアプリ。それが「響明（Kyo-Mei）」です。

---

## ✨ アプリの特徴

### 📚 大喜利形式で学ぶ
教科に関する面白い「お題」に対して、ユーザーが匿名で回答。知的なユーモアを通じて学習意欲を刺激します。

### 🎭 完全匿名の回答システム
回答は自動生成される匿名名（例: "浮遊する哲学者", "思索する化学者"）で投稿されるため、気軽に参加できます。

### ❤️ 1トピック3ハートまで
各トピックにつき最大3つまでハートを押せる制限により、本当に面白いと思った回答だけを選ぶ楽しさがあります。

### 🔐 パスワードレス認証
メールアドレスだけでログイン可能。パスワード管理の煩わしさがありません。

### 🏆 ランキング機能
いいね数順で回答が表示され、人気の回答を一目で確認できます。

---

## 🎬 デモ

### ホーム画面
開催中のお題一覧を表示。トレンド、新着、終了間近などのバッジで分類されています。

### お題詳細画面
- お題の詳細情報
- 回答一覧（いいね順/新着順で切り替え可能）
- 残りハート数の表示
- 自分の回答セクション
- 関連お題の表示

### 回答投稿
匿名名で回答を投稿。1つのお題に対して気軽に参加できます。

### 管理画面
管理者はお題の作成・編集・削除が可能です。

---

## 🛠 技術スタック

### **フロントエンド**
| 技術 | 用途 | バージョン |
|-----|------|-----------|
| **Next.js** | フレームワーク（App Router） | 14.2.16 |
| **TypeScript** | 型安全な開発 | 5.x |
| **Tailwind CSS** | スタイリング | 4.1.9 |
| **Radix UI** | アクセシブルなUIコンポーネント | 最新 |
| **React Hook Form** | フォーム管理 | 最新 |
| **Zod** | バリデーション | 最新 |

### **バックエンド**
| 技術 | 用途 | バージョン |
|-----|------|-----------|
| **Supabase** | PostgreSQLデータベースホスティング | - |
| **Prisma** | ORM（データベース操作） | 6.17.1 |
| **NextAuth.js** | 認証（メールマジックリンク） | v5 |
| **Resend** | メール配信サービス | 最新 |

### **インフラ・デプロイ**
| 技術 | 用途 |
|-----|------|
| **Vercel** | ホスティング・CI/CD |
| **Vercel Analytics** | アクセス解析 |
| **GitHub** | バージョン管理 |

---

## 🏗 アーキテクチャ

```
┌─────────────────────────────────────────────────────────┐
│                     ユーザー                              │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js 14 (App Router)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   SSR/SSG    │  │  API Routes  │  │ Middleware   │  │
│  │  Components  │  │   (Backend)  │  │   (Auth)     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└───────────┬─────────────────┬───────────────────────────┘
            │                 │
            │                 ▼
            │     ┌───────────────────────┐
            │     │   NextAuth.js v5      │
            │     │  (Email Provider)     │
            │     └───────────┬───────────┘
            │                 │
            ▼                 ▼
┌───────────────────┐  ┌─────────────────┐
│  Supabase         │  │    Resend       │
│  (PostgreSQL)     │  │ (Email Service) │
│                   │  │                 │
│  ┌─────────────┐ │  └─────────────────┘
│  │   Prisma    │ │
│  │   Client    │ │
│  └─────────────┘ │
└───────────────────┘
```

### データフロー

1. **ユーザーアクセス** → Vercelがリクエストを受信
2. **認証チェック** → Middleware（NextAuth.js）が認証状態を確認
3. **ページレンダリング** → Server ComponentsでSupabaseからデータ取得
4. **APIリクエスト** → Client Componentsから API Routesへリクエスト
5. **データ操作** → PrismaでSupabaseにCRUD操作
6. **メール送信** → Resendでマジックリンクをメール配信

---

## 🗄 データベース設計

### ER図の概要

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│    Users    │      │   Topics    │      │   Answers   │
├─────────────┤      ├─────────────┤      ├─────────────┤
│ id (PK)     │─────<│ authorId    │      │ id (PK)     │
│ email       │      │ title       │─────<│ topicId     │
│ name        │      │ subject     │      │ content     │
│ image       │      │ status      │      │ authorName  │
│ isAdmin     │      │ endTime     │      │ authorId    │
│ createdAt   │      │ ...         │      │ likeCount   │
└─────────────┘      └─────────────┘      │ ...         │
                                           └─────────────┘
                             │                    │
                             │                    │
                             ▼                    ▼
                     ┌─────────────┐      ┌─────────────┐
                     │  TopicTags  │      │    Likes    │
                     ├─────────────┤      ├─────────────┤
                     │ topicId (PK)│      │ userId (PK) │
                     │ tagId (PK)  │      │ answerId(PK)│
                     └─────────────┘      │ topicId     │
                             │             └─────────────┘
                             ▼
                     ┌─────────────┐
                     │    Tags     │
                     ├─────────────┤
                     │ id (PK)     │
                     │ name (UQ)   │
                     │ usageCount  │
                     └─────────────┘
```

### 主要テーブル

#### **Users（ユーザー）**
| カラム | 型 | 説明 |
|--------|------|------|
| id | String (cuid) | ユーザーID |
| email | String (unique) | メールアドレス |
| name | String? | 表示名 |
| image | String? | プロフィール画像URL |
| isAdmin | Boolean | 管理者フラグ |

#### **Topics（お題）**
| カラム | 型 | 説明 |
|--------|------|------|
| id | String (cuid) | お題ID |
| number | Int (unique) | お題番号 |
| title | String | タイトル |
| subject | String | 科目（物理、化学、生物など） |
| status | Enum | ステータス（ACTIVE/CLOSED） |
| endTime | DateTime | 終了日時 |
| authorId | String | 作成者ID |
| viewCount | Int | 閲覧数 |

#### **Answers（回答）**
| カラム | 型 | 説明 |
|--------|------|------|
| id | String (cuid) | 回答ID |
| content | String | 回答内容 |
| authorName | String | 匿名名 |
| authorId | String | 投稿者ID |
| topicId | String | お題ID |
| likeCount | Int | いいね数 |

#### **Likes（いいね）**
| カラム | 型 | 説明 |
|--------|------|------|
| userId | String | ユーザーID |
| answerId | String | 回答ID |
| topicId | String | お題ID（制限チェック用） |

**制約**: `@@unique([userId, answerId])` + 1トピック3つまでの制限をAPI層で実装

#### **Tags（タグ）**
| カラム | 型 | 説明 |
|--------|------|------|
| id | String (cuid) | タグID |
| name | String (unique) | タグ名 |
| usageCount | Int | 使用回数 |

詳細は [`/docs/ER_DIAGRAM.md`](./docs/ER_DIAGRAM.md) を参照してください。

---

## 🎯 主な機能

### 1. お題投稿・管理（管理者のみ）

管理者はログイン後、管理画面から以下の操作が可能です：

- **お題作成**: タイトル、説明、科目、終了日時、タグを設定
- **お題編集**: 既存のお題を更新
- **お題削除**: 不要なお題を削除
- **お題一覧**: すべてのお題を確認・管理

```typescript
// app/api/admin/topics/route.ts
export async function POST(request: NextRequest) {
  const session = await auth()

  // 管理者チェック
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "管理者権限が必要です" }, { status: 403 })
  }

  // お題作成処理...
}
```

### 2. 匿名回答システム

ユーザーは自動生成される匿名名で回答を投稿できます：

```typescript
// lib/anonymous-names.ts
export function generateAnonymousName(): string {
  const adjectives = ["浮遊する", "思索する", "静寂の", ...]
  const nouns = ["哲学者", "化学者", "物理学者", ...]

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]

  return `${adj}${noun}` // 例: "浮遊する哲学者"
}
```

**特徴**:
- ユーザーは本名を明かさずに参加可能
- 毎回異なる匿名名が生成される
- 学問的な雰囲気を持つ名前が生成される

### 3. いいね機能（1トピック3ハートまで）

各トピックにつき最大3つまでハートを押せる制限を実装：

```typescript
// app/api/answers/[id]/likes/route.ts
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()

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

  // いいね処理...
}
```

**UI上の工夫**:
- 残りハート数をリアルタイムで表示
- 自分の投稿にはハートを押せない制御
- 既にいいねした回答は赤色のハートで表示
- ハートを押す際に確認ダイアログを表示

### 4. メール認証（パスワードレス）

NextAuth.js v5 + Resendで実装されたマジックリンク認証：

```typescript
// lib/auth.ts
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id
        session.user.isAdmin = user.isAdmin
      }
      return session
    },
  },
})
```

**フロー**:
1. ユーザーがメールアドレスを入力
2. Resendがマジックリンク付きメールを送信
3. ユーザーがリンクをクリックしてログイン完了
4. セッションがサーバー側で管理される

### 5. リアルタイムフィルタリング・検索

- **カテゴリーフィルター**: すべて/トレンド/新着/終了間近
- **タグフィルター**: 複数タグでAND検索
- **キーワード検索**: タイトル・科目・作者名・タグで検索

すべてクライアント側で高速に処理されます。

### 6. 無限スクロール

Intersection Observer APIを使用した効率的なローディング：

```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isLoading && displayCount < filteredTopics.length) {
        setIsLoading(true)
        setTimeout(() => {
          setDisplayCount((prev) => prev + 6)
          setIsLoading(false)
        }, 500)
      }
    },
    { threshold: 0.1 }
  )

  if (observerTarget.current) {
    observer.observe(observerTarget.current)
  }

  return () => observer.disconnect()
}, [isLoading, displayCount, filteredTopics.length])
```

---

## 📱 使い方

### 一般ユーザー

1. **ホーム画面で気になるお題を探す**
   - 「開催中」セクションで最新のお題をチェック
   - タグや検索機能でお題を絞り込み

2. **お題の詳細を見る**
   - お題をクリックして詳細ページへ
   - 他のユーザーの回答を閲覧

3. **ログインして回答を投稿**
   - メールアドレスでログイン（パスワード不要）
   - 匿名名で回答を投稿

4. **気に入った回答にハートを押す**
   - 1つのお題につき最大3つまで
   - 自分の投稿にはハート不可

### 管理者

1. **管理画面にアクセス**
   - `/admin/topics` にアクセス

2. **お題を作成**
   - タイトル、説明、科目、終了日時、タグを入力
   - 「お題を作成」ボタンで投稿

3. **お題を管理**
   - 一覧から編集・削除が可能

---

## 🚀 セットアップ

### 必要な環境

- **Node.js** 18以上
- **pnpm**（推奨）または npm
- **Supabaseアカウント**
- **Resendアカウント**

### 1. リポジトリのクローン

```bash
git clone https://github.com/yourusername/kyo-mei.git
cd kyo-mei
```

### 2. 依存関係のインストール

```bash
pnpm install
```

### 3. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成:

```bash
cp .env.example .env.local
```

以下の環境変数を設定してください:

```env
# Database (Supabase)
DATABASE_URL="postgresql://user:password@host:port/database?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:port/database"

# NextAuth.js
NEXTAUTH_SECRET="ランダムな文字列（openssl rand -base64 32で生成）"
NEXTAUTH_URL="http://localhost:3000"

# Email Provider (Resend)
EMAIL_SERVER_USER="resend"
EMAIL_SERVER_PASSWORD="your-resend-api-key"
EMAIL_SERVER_HOST="smtp.resend.com"
EMAIL_SERVER_PORT="465"
EMAIL_FROM="onboarding@resend.dev"

# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

**重要**: パスワードに特殊文字（`/`, `?` など）が含まれる場合はURLエンコードしてください。

### 4. データベースのマイグレーション

```bash
pnpm prisma migrate dev
```

### 5. Prisma Clientの生成

```bash
pnpm prisma generate
```

### 6. 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 7. 管理者アカウントの作成

1. 通常通りメールアドレスでログイン
2. Prisma Studioを起動: `pnpm prisma studio`
3. `Users` テーブルで自分のユーザーの `isAdmin` を `true` に変更
4. `/admin/topics` にアクセスして管理画面を確認

---

## 🎨 技術的な工夫

### 1. Server Components と Client Components の分離

Next.js 14 App Routerの特性を活かし、適切にコンポーネントを分離：

```typescript
// app/topic/[id]/page.tsx (Server Component)
export default async function TopicDetailPage({ params }: PageProps) {
  const session = await auth()
  const result = await getTopic(params.id)
  const answers = await getAnswers(params.id, session?.user?.id)

  return (
    <TopicDetailClient
      topic={result.topic}
      initialAnswers={answers}
      currentUserId={session?.user?.id}
    />
  )
}
```

```typescript
// app/topic/[id]/topic-detail-client.tsx (Client Component)
"use client"

export function TopicDetailClient({ topic, initialAnswers, currentUserId }) {
  const [answers, setAnswers] = useState(initialAnswers)
  // インタラクティブな機能を実装...
}
```

**メリット**:
- 初回レンダリングが高速
- SEO対策
- データフェッチングをサーバー側で完結

### 2. 楽観的UI更新

いいね機能で楽観的UI更新を実装し、UXを向上：

```typescript
const handleHeartConfirm = async () => {
  // 楽観的UI更新（即座に表示を変更）
  setRemainingHearts((prev) => prev - 1)
  setAnswers((prev) =>
    prev.map((a) => (a.id === answerId ? { ...a, isLiked: true, likeCount: a.likeCount + 1 } : a))
  )

  // APIリクエスト
  const response = await fetch(`/api/answers/${answer.dbId}/likes`, {
    method: "POST",
  })

  if (!response.ok) {
    // エラー時はロールバック
    setRemainingHearts((prev) => prev + 1)
    setAnswers((prev) =>
      prev.map((a) => (a.id === answerId ? { ...a, isLiked: false, likeCount: a.likeCount - 1 } : a))
    )
  }
}
```

### 3. 型安全なAPI設計

ZodとPrismaを組み合わせた型安全な実装：

```typescript
// app/api/admin/topics/route.ts
const createTopicSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  subject: z.string().min(1),
  endTime: z.string().datetime(),
  tags: z.array(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validatedData = createTopicSchema.parse(body) // 型チェック

  const topic = await prisma.topic.create({
    data: validatedData,
  })

  return NextResponse.json(topic)
}
```

### 4. ID管理の工夫

PrismaのcuidとUIで使用するnumber型IDの両方を管理：

```typescript
// types/topic.ts
export interface Topic {
  id: number              // UIで使用
  dbId?: string           // データベースの実際のID (cuid)
  number: number          // お題番号
  title: string
  // ...
}
```

これにより、データベースの実際のIDを隠蔽しつつ、UI側で扱いやすいIDを提供。

### 5. Middlewareによる認証制御

```typescript
// middleware.ts
export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth")
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin")

  if (isAdminPage && !req.auth?.user?.isAdmin) {
    return Response.redirect(new URL("/", req.url))
  }

  if (isAuthPage && isLoggedIn) {
    return Response.redirect(new URL("/", req.url))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
```


---

## 📚 ドキュメント

- [データベース設計（ER図）](./docs/ER_DIAGRAM.md)
- [メール認証セットアップ](./docs/EMAIL_PROVIDER_SETUP.md)
- [バックエンド実装詳細](./docs/BACKEND_IMPLEMENTATION.md)
- [ホームページ仕様](./docs/HOME_PAGE_SPEC.md)
- [お題詳細ページ仕様](./docs/DETAIL_PAGE_SPEC.md)

