// ランダムな匿名名を生成するためのユーティリティ

const adjectives = [
  "賢い",
  "面白い",
  "元気な",
  "優しい",
  "勇敢な",
  "静かな",
  "明るい",
  "素早い",
  "冷静な",
  "陽気な",
  "謎の",
  "伝説の",
  "幻の",
  "無敵の",
  "最強の",
  "究極の",
  "天才",
  "カリスマ",
  "エリート",
  "マスター",
]

const nouns = [
  "パンダ",
  "コアラ",
  "ペンギン",
  "フクロウ",
  "リス",
  "ハムスター",
  "ウサギ",
  "キツネ",
  "タヌキ",
  "カワウソ",
  "アザラシ",
  "イルカ",
  "シロクマ",
  "ライオン",
  "トラ",
  "ドラゴン",
  "ユニコーン",
  "フェニックス",
  "忍者",
  "侍",
]

/**
 * ランダムな匿名名を生成する
 * 例: "賢いパンダ", "伝説の忍者"
 */
export function generateAnonymousName(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${adjective}${noun}`
}
