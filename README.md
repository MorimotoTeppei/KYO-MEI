# 響明（kyo-mei）

匿名で質問を投稿し、回答を得られる大喜利形式のQ&Aプラットフォーム

## 概要

響明（kyo-mei）は、教科に関する面白い「お題」を投稿し、他のユーザーが匿名で回答できるWebアプリケーションです。ユーザーはログインして自分の名前でお題を投稿できますが、回答は自動生成された匿名名（例: "浮遊する哲学者"）で投稿されます。

### 主な機能

- **お題投稿**: ログインユーザーとして面白い質問を投稿
- **匿名回答**: 自動生成された匿名名で回答を投稿
- **いいね機能**: 1つのお題につき最大3つまでいいね可能
- **タグ機能**: お題に最大3つのタグを付与
- **フィルタリング**: カテゴリー、タグ、キーワードで検索
- **ランキング**: いいね数順で回答をソート表示
- **メール認証**: パスワードレスのメール認証でログイン

---

## 技術スタック

### フロントエンド
- **Framework**: [Next.js 14.2.16](https://nextjs.org/) (App Router)
- **Language**: TypeScript 5
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS 4.1.9](https://tailwindcss.com/)
- **Font**: Noto Sans JP
- **Form**: React Hook Form + Zod
- **Analytics**: Vercel Analytics

### バックエンド
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM**: [Prisma 6.17.1](https://www.prisma.io/)
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/)
- **Email Provider**: [Resend](https://resend.com/)
- **Validation**: Zod

### インフラ
- **Hosting**: [Vercel](https://vercel.com/)
- **Database Hosting**: Supabase
- **Email Service**: Resend

---

## データベース設計

### エンティティ（10テーブル）

1. **Users** - ユーザーアカウント
2. **Accounts** - OAuth連携情報
3. **Sessions** - セッション管理
4. **VerificationToken** - メール認証トークン
5. **Topics** - お題（大喜利トピック）
6. **Answers** - 回答（匿名名で投稿）
7. **Likes** - いいね/ハート（1トピック3つまで制限）
8. **Tags** - タグ
9. **TopicTags** - トピック-タグ中間テーブル
10. **Follows** - フォロー関係

詳細は [`/docs/ER_DIAGRAM.md`](./docs/ER_DIAGRAM.md) を参照してください。

---

## セットアップ

### 必要な環境

- Node.js 18以上
- pnpm（推奨）または npm
- Supabaseアカウント
- Resendアカウント

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
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth.js
NEXTAUTH_SECRET="ランダムな文字列"
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

**重要:** パスワードに特殊文字（`/`, `?` など）が含まれる場合はURLエンコードしてください。

### 4. データベースのマイグレーション

```bash
pnpm prisma migrate dev
```

これにより、Supabaseに全テーブルが自動作成されます。

### 5. Prisma Clientの生成

```bash
pnpm prisma generate
```

### 6. 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

---

## 環境変数の詳細

### データベース設定

| 変数名 | 説明 | 取得方法 |
|--------|------|----------|
| `DATABASE_URL` | Supabase接続URL（Connection Pooling） | Supabase Dashboard → Settings → Database → Connection string (Session mode) |
| `DIRECT_URL` | Supabase直接接続URL（マイグレーション用） | Supabase Dashboard → Settings → Database → Connection string (Direct connection) |

### NextAuth.js設定

| 変数名 | 説明 | 取得方法 |
|--------|------|----------|
| `NEXTAUTH_SECRET` | セッション暗号化キー | `openssl rand -base64 32` で生成 |
| `NEXTAUTH_URL` | アプリのベースURL | 本番環境では `https://yourdomain.com` |

### メール認証設定（Resend）

| 変数名 | 説明 | 取得方法 |
|--------|------|----------|
| `EMAIL_SERVER_USER` | `resend` 固定 | - |
| `EMAIL_SERVER_PASSWORD` | Resend APIキー | [Resend Dashboard](https://resend.com/api-keys) |
| `EMAIL_SERVER_HOST` | `smtp.resend.com` 固定 | - |
| `EMAIL_SERVER_PORT` | `465` 固定 | - |
| `EMAIL_FROM` | 送信元メールアドレス | 開発: `onboarding@resend.dev`<br>本番: 認証済みドメインのアドレス |

詳細は [`/docs/EMAIL_PROVIDER_SETUP.md`](./docs/EMAIL_PROVIDER_SETUP.md) を参照してください。

---

## 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# 本番ビルド
pnpm build

# 本番サーバー起動
pnpm start

# Lint実行
pnpm lint

# Prisma Studio起動（データベースGUI）
pnpm prisma:studio

# マイグレーション実行
pnpm prisma:migrate

# Prisma Client生成
pnpm prisma:generate

# データベースにスキーマを直接反映
pnpm prisma:push
```

---

## APIエンドポイント

### Topics（お題）

| Method | Endpoint | 説明 | 認証 |
|--------|----------|------|------|
| GET | `/api/topics` | 一覧取得 | 不要 |
| POST | `/api/topics` | 作成 | 必要 |
| GET | `/api/topics/[id]` | 詳細取得 | 不要 |
| PATCH | `/api/topics/[id]` | 更新 | 必要（作成者のみ） |
| DELETE | `/api/topics/[id]` | 削除 | 必要（作成者のみ） |

### Answers（回答）

| Method | Endpoint | 説明 | 認証 |
|--------|----------|------|------|
| POST | `/api/topics/[id]/answers` | 回答投稿（匿名） | 必要 |
| GET | `/api/topics/[id]/answers` | 回答一覧取得 | 不要 |

### Likes（いいね）

| Method | Endpoint | 説明 | 認証 |
|--------|----------|------|------|
| POST | `/api/answers/[id]/likes` | いいね追加 | 必要 |
| DELETE | `/api/answers/[id]/likes` | いいね削除 | 必要 |
| GET | `/api/answers/[id]/likes` | いいね状態確認 | 不要 |

### Users（ユーザー）

| Method | Endpoint | 説明 | 認証 |
|--------|----------|------|------|
| GET | `/api/users/me` | ユーザー情報取得 | 必要 |
| PATCH | `/api/users/me` | ユーザー情報更新 | 必要 |

---

## デプロイ（Vercel）

### 1. Vercelプロジェクトの作成

```bash
# Vercel CLIのインストール
pnpm add -g vercel

# デプロイ
vercel
```

### 2. 環境変数の設定

Vercel Dashboardで以下の環境変数を設定:

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`（本番URLに変更）
- `EMAIL_SERVER_USER`
- `EMAIL_SERVER_PASSWORD`
- `EMAIL_SERVER_HOST`
- `EMAIL_SERVER_PORT`
- `EMAIL_FROM`（認証済みドメインのアドレス）

### 3. ビルド設定

Vercelは自動的に以下のコマンドを実行します:

- Build Command: `pnpm build`
- Output Directory: `.next`
- Install Command: `pnpm install`

`postinstall` スクリプトで `prisma generate` が自動実行されます。

### 4. デプロイ実行

```bash
vercel --prod
```

---

## プロジェクト構成

```
kyo-mei/
├── app/                      # Next.js App Router
│   ├── api/                  # APIエンドポイント
│   │   ├── auth/             # NextAuth.js
│   │   ├── topics/           # Topics API
│   │   ├── answers/          # Answers API
│   │   └── users/            # Users API
│   ├── auth/                 # 認証ページ
│   ├── providers/            # Reactプロバイダー
│   └── topic/[id]/           # トピック詳細ページ
├── components/               # Reactコンポーネント
├── lib/                      # ユーティリティ
│   ├── auth.ts               # NextAuth.js設定
│   ├── prisma.ts             # Prismaクライアント
│   └── anonymous-names.ts    # 匿名名生成
├── prisma/                   # Prismaスキーマ
│   ├── schema.prisma         # データベーススキーマ
│   └── migrations/           # マイグレーション履歴
├── types/                    # TypeScript型定義
├── docs/                     # ドキュメント
│   ├── ER_DIAGRAM.md         # データベース設計
│   ├── EMAIL_PROVIDER_SETUP.md
│   └── BACKEND_IMPLEMENTATION.md
├── .env.local                # 環境変数（gitignore）
├── .env.example              # 環境変数テンプレート
├── middleware.ts             # Next.js middleware
└── README.md                 # このファイル
```

---

## 主な機能の実装詳細

### 匿名回答システム

回答投稿時に自動的に匿名名を生成します:

```typescript
// lib/anonymous-names.ts
export function generateAnonymousName(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${adjective}${noun}` // 例: "浮遊する哲学者"
}
```

### いいね制限（1トピック3つまで）

APIレベルで制限を実装:

```typescript
// 既にこのトピックでいくついいねしているか確認
const likesInTopic = await prisma.like.count({
  where: {
    userId: session.user.id,
    topicId: answer.topicId,
  },
})

if (likesInTopic >= 3) {
  return NextResponse.json({ error: "最大3つまで" }, { status: 400 })
}
```

### メール認証（パスワードレス）

NextAuth.js + Resendでマジックリンク送信:

```typescript
// lib/auth.ts
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: process.env.EMAIL_FROM,
    }),
  ],
  // ...
})
```

---

## トラブルシューティング

### データベース接続エラー

**エラー:** `P1013: The provided database string is invalid`

**解決策:** パスワードに特殊文字が含まれている場合、URLエンコードしてください:
- `/` → `%2F`
- `?` → `%3F`

### メールが届かない

**確認事項:**
1. ResendのAPIキーが正しいか
2. `EMAIL_FROM` が認証済みアドレスか（本番環境）
3. スパムフォルダを確認
4. Resend Dashboardでログを確認

### Prisma Clientが見つからない

```bash
pnpm prisma generate
```

を実行してください。

---

## ライセンス

MIT License

---

## 開発者

このプロジェクトは学習目的で作成されました。

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Supabase Documentation](https://supabase.com/docs)
- [Resend Documentation](https://resend.com/docs)
