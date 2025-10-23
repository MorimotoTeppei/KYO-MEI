# メール認証プロバイダーのセットアップ

このアプリではメール認証（パスワードレス認証）を使用します。
ユーザーはメールアドレスを入力し、送信されたマジックリンクをクリックしてログインします。

---

## メール送信プロバイダーの選択

以下のいずれかのサービスを推奨します：

### オプション1: Resend（推奨）

**メリット:**
- 開発者向けに最適化されたAPI
- 無料枠: 月3,000通まで
- シンプルな設定
- Next.jsとの相性が良い

**デメリット:**
- 比較的新しいサービス

**公式サイト:** https://resend.com

---

### オプション2: SendGrid

**メリット:**
- 安定した大手サービス
- 無料枠: 月100通まで（少なめ）
- 豊富なドキュメント

**デメリット:**
- 無料枠が少ない
- 設定がやや複雑

**公式サイト:** https://sendgrid.com

---

## Resendのセットアップ手順（推奨）

### 1. Resendアカウントの作成

1. https://resend.com にアクセス
2. Sign upをクリック
3. メールアドレスとパスワードを入力して登録

### 2. APIキーの取得

1. ダッシュボードにログイン
2. 左メニューから「API Keys」を選択
3. 「Create API Key」をクリック
4. 名前を入力（例: `kyomei-production`）
5. 権限は「Sending access」を選択
6. 「Add」をクリック
7. 生成されたAPIキーをコピー（一度しか表示されません！）

### 3. ドメイン認証（本番環境のみ）

開発環境では不要ですが、本番環境では独自ドメインの認証が必要です。

1. 左メニューから「Domains」を選択
2. 「Add Domain」をクリック
3. 使用するドメイン（例: `yourdomain.com`）を入力
4. DNS設定に以下のレコードを追加:
   - TXT レコード
   - CNAME レコード（複数）
5. 「Verify DNS records」をクリックして認証

**開発環境では `onboarding@resend.dev` から送信されます。**

### 4. 環境変数の設定

`.env.local` ファイルに以下を設定:

```env
EMAIL_SERVER_USER="resend"
EMAIL_SERVER_PASSWORD="re_xxxxxxxxxxxxxxxxxx"  # 取得したAPIキー
EMAIL_SERVER_HOST="smtp.resend.com"
EMAIL_SERVER_PORT="465"
EMAIL_FROM="noreply@yourdomain.com"  # 開発時は onboarding@resend.dev でもOK
```

---

## SendGridのセットアップ手順

### 1. SendGridアカウントの作成

1. https://sendgrid.com にアクセス
2. 「Start for Free」をクリック
3. 必要情報を入力して登録
4. メール認証を完了

### 2. APIキーの取得

1. ダッシュボードにログイン
2. 左メニューから「Settings」→「API Keys」を選択
3. 「Create API Key」をクリック
4. 名前を入力（例: `kyomei-production`）
5. 権限は「Restricted Access」を選択
   - 「Mail Send」のみ ON にする
6. 「Create & View」をクリック
7. 生成されたAPIキーをコピー

### 3. Sender Identityの設定

1. 左メニューから「Settings」→「Sender Authentication」を選択
2. 「Single Sender Verification」を選択
3. 送信元メールアドレス（例: `noreply@yourdomain.com`）を設定
4. 確認メールが届くので、リンクをクリックして認証

### 4. 環境変数の設定

`.env.local` ファイルに以下を設定:

```env
EMAIL_SERVER_USER="apikey"
EMAIL_SERVER_PASSWORD="SG.xxxxxxxxxxxxxxxxxx"  # 取得したAPIキー
EMAIL_SERVER_HOST="smtp.sendgrid.net"
EMAIL_SERVER_PORT="587"
EMAIL_FROM="noreply@yourdomain.com"  # 認証済みのメールアドレス
```

---

## 開発環境での注意点

### 開発時のメール送信

開発環境でResendを使用する場合:
- `EMAIL_FROM` は `onboarding@resend.dev` を使用可能
- 自分のメールアドレス宛にテスト送信できます

SendGridの場合:
- Single Sender Verificationで認証したアドレスのみ使用可能

### メールが届かない場合

1. **スパムフォルダを確認**
2. **APIキーが正しいか確認**
3. **送信元アドレスが認証済みか確認**
4. **Resend/SendGridのダッシュボードでログを確認**

---

## 本番環境での設定

### 必須事項

1. **独自ドメインの認証**
   - SPF, DKIM, DMARC の設定
   - Resend/SendGridのドキュメントに従う

2. **送信制限の確認**
   - Resend無料枠: 月3,000通
   - SendGrid無料枠: 月100通
   - 必要に応じて有料プランへ

3. **環境変数の設定（Vercel）**
   - Vercelダッシュボードで環境変数を設定
   - `EMAIL_FROM` は認証済みドメインのアドレスを使用

---

## トラブルシューティング

### エラー: "Invalid API key"
- APIキーが正しくコピーされているか確認
- APIキーの権限を確認

### メールが届かない
- スパムフォルダを確認
- 送信元アドレスが認証済みか確認
- プロバイダーのダッシュボードでエラーログを確認

### エラー: "Sender not verified"
- Single Sender Verification（SendGrid）を完了
- ドメイン認証（Resend本番環境）を完了

---

## 次のステップ

環境変数の設定が完了したら、NextAuth.jsの設定（ステップ5）に進みます。

**推奨: まずはResendの無料アカウントを作成し、APIキーを取得してください。**
