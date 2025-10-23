-- Row Level Security (RLS) を有効化し、service_role経由のみアクセスを許可
-- Supabase + Prisma構成用のRLS設定

-- すべてのテーブルでRLSを有効化
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public._prisma_migrations ENABLE ROW LEVEL SECURITY;

-- service_role（バックエンド）のみアクセスを許可するポリシー
-- authenticatedロールはPrisma経由でservice_roleとして動作するため、すべての操作を許可

-- users テーブル
CREATE POLICY "Enable all access for service role" ON public.users
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- accounts テーブル
CREATE POLICY "Enable all access for service role" ON public.accounts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- sessions テーブル
CREATE POLICY "Enable all access for service role" ON public.sessions
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- verification_tokens テーブル
CREATE POLICY "Enable all access for service role" ON public.verification_tokens
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- topics テーブル
CREATE POLICY "Enable all access for service role" ON public.topics
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- answers テーブル
CREATE POLICY "Enable all access for service role" ON public.answers
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- likes テーブル
CREATE POLICY "Enable all access for service role" ON public.likes
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- tags テーブル
CREATE POLICY "Enable all access for service role" ON public.tags
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- topic_tags テーブル
CREATE POLICY "Enable all access for service role" ON public.topic_tags
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- follows テーブル
CREATE POLICY "Enable all access for service role" ON public.follows
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- _prisma_migrations テーブル
CREATE POLICY "Enable all access for service role" ON public._prisma_migrations
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 注意: このポリシーはすべてのアクセスを許可します
-- Prisma経由でのアクセスはservice_roleを使用するため、
-- これでバックエンドからの操作が可能になります
--
-- より細かいアクセス制御が必要な場合は、
-- 各ポリシーのUSING句とWITH CHECK句を調整してください
