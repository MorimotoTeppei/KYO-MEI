# バックエンド実装ガイド

## プロジェクト概要
このアプリは匿名で質問を投稿し、回答を得られるQ&Aプラットフォームです。

## 技術スタック

### フロントエンド
- **Framework**: Next.js 14.2.16 (App Router)
- **UI**: React 18, Tailwind CSS 4.1.9, Radix UI
- **Form管理**: React Hook Form + Zod
- **デプロイ**: Vercel

### バックエンド
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **認証**: NextAuth.js
- **コンテナ化**: Docker Compose
- **デプロイ**: Vercel

---

## 実装ステップ

### ステップ1: ER図の設計と作成
データベースのスキーマ設計を行い、ER図を作成します。

**必要なエンティティ（例）:**
- Users（ユーザー）
- Topics（質問トピック）
- Answers（回答）
- Categories（カテゴリー）

**実装内容:**
- `/docs/ER_DIAGRAM.md` にER図を記述
- テーブル間のリレーションシップを定義
- 各テーブルのカラムとデータ型を明確化

---

### ステップ2: Prismaのセットアップ
ORMとしてPrismaをプロジェクトに導入します。

**実装内容:**
- Prismaのインストール
- `prisma/schema.prisma` の作成
- Supabase接続情報の環境変数設定
- Prisma Clientの生成

**コマンド例:**
```bash
pnpm add prisma @prisma/client
pnpm prisma init
```

---

### ステップ3: Prisma Schemaの定義
ER図に基づいてPrisma Schemaを記述します。

**実装内容:**
- `prisma/schema.prisma` にモデルを定義
- リレーションの設定
- インデックスとユニーク制約の追加

---

### ステップ4: Docker Composeファイルの作成
ローカル開発環境を統一するためのDocker設定を行います。

**実装内容:**
- `docker-compose.yml` の作成
- PostgreSQL コンテナの設定（Supabaseのローカル開発用）
- 環境変数の管理（`.env.local`）
- 開発用のボリューム設定

**サービス構成:**
- PostgreSQL
- Supabase Local (optional)
- Next.js開発サーバー

---

### ステップ5: NextAuth.jsのセットアップ
認証機能を実装します。

**実装内容:**
- NextAuth.jsのインストール
- `/app/api/auth/[...nextauth]/route.ts` の作成
- 認証プロバイダーの設定（Google, GitHub等）
- セッション管理の設定
- Prisma Adapterの統合

**コマンド例:**
```bash
pnpm add next-auth @next-auth/prisma-adapter
```

---

### ステップ6: データベースマイグレーション
Prismaを使用してデータベースにスキーマを適用します。

**実装内容:**
- 初回マイグレーションの実行
- Supabaseへの接続確認
- シードデータの作成（optional）

**コマンド例:**
```bash
pnpm prisma migrate dev --name init
pnpm prisma generate
```

---

### ステップ7: APIエンドポイントの作成
バックエンドのREST APIを実装します。

**実装内容:**
- `/app/api/topics/route.ts` - トピック一覧・作成
- `/app/api/topics/[id]/route.ts` - トピック詳細・更新・削除
- `/app/api/answers/route.ts` - 回答作成
- `/app/api/users/route.ts` - ユーザー情報

**各エンドポイントの機能:**
- CRUD操作
- バリデーション（Zod）
- 認証チェック
- エラーハンドリング

---

### ステップ8: Supabaseの本番設定
Vercelデプロイに向けてSupabaseの設定を行います。

**実装内容:**
- Supabaseプロジェクトの環境変数取得
- `.env.example` の作成
- Vercel環境変数の設定準備
- データベースURLの設定

**必要な環境変数:**
```
DATABASE_URL=
DIRECT_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

---

### ステップ9: README.mdの作成
プロジェクト全体のドキュメントを作成します。

**実装内容:**
- プロジェクト概要
- 技術スタック
- セットアップ手順
- 環境変数の説明
- 開発コマンド
- デプロイ手順
- ライセンス情報

---

### ステップ10: Vercelへのデプロイ設定
本番環境へのデプロイを行います。

**実装内容:**
- Vercelプロジェクトの作成
- 環境変数の設定
- ビルド設定の確認
- Prismaマイグレーションの実行設定
- デプロイの実行

**注意点:**
- `postinstall` スクリプトに `prisma generate` を追加
- Vercel環境変数にSupabase接続情報を設定

---

## 現在の状況
- ✅ Supabaseプロジェクト作成済み
- ⬜ ER図設計
- ⬜ Prismaセットアップ
- ⬜ Docker Compose作成
- ⬜ NextAuth.js設定
- ⬜ API実装
- ⬜ README作成
- ⬜ デプロイ

---

## 次のアクション
「ステップ1を実装してください」のように指示を出してください。
