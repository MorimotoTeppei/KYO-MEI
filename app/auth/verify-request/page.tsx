export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border-4 border-black rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">📧</div>
        <h1 className="text-2xl font-black text-black mb-4">メールを確認してください</h1>
        <p className="text-black font-bold mb-6">ログインリンクを送信しました。</p>
        <p className="text-sm text-gray-600 font-bold">メール内のリンクをクリックしてログインしてください。</p>
      </div>
    </div>
  )
}
