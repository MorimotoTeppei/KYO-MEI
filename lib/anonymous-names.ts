// 匿名回答者名をランダム生成するためのリスト

const adjectives = [
  "浮遊する",
  "無重力の",
  "宙に浮く",
  "漂流する",
  "空中の",
  "彷徨う",
  "さまよう",
  "飛行する",
  "舞い上がる",
  "浮かぶ",
  "軽やかな",
  "自由な",
  "解放された",
  "束縛されない",
  "重力に逆らう",
  "天空の",
  "雲の上の",
  "星に願う",
  "月に憧れる",
  "太陽を追う",
]

const nouns = [
  "哲学者",
  "詩人",
  "数学者",
  "天文学者",
  "化学者",
  "物理学者",
  "生物学者",
  "歴史家",
  "地理学者",
  "考古学者",
  "芸術家",
  "音楽家",
  "作家",
  "思想家",
  "研究者",
  "学者",
  "探求者",
  "観察者",
  "実験者",
  "理論家",
  "発明家",
  "創造者",
  "夢想家",
  "冒険者",
  "旅人",
]

/**
 * ランダムな匿名名を生成する
 * 例: "浮遊する哲学者", "無重力の詩人"
 */
export function generateAnonymousName(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${adjective}${noun}`
}

/**
 * シード値から一貫性のある匿名名を生成する
 * 同じシード値であれば同じ名前が生成される
 */
export function generateAnonymousNameFromSeed(seed: string): string {
  // シンプルなハッシュ関数
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // 32bit整数に変換
  }

  const adjectiveIndex = Math.abs(hash) % adjectives.length
  const nounIndex = Math.abs(hash >> 16) % nouns.length

  return `${adjectives[adjectiveIndex]}${nouns[nounIndex]}`
}
