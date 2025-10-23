import prisma from "@/lib/prisma"
import { Topic } from "@/types/topic"
import HomeContentClient from "./home-content-client"

// cuid文字列をnumberに変換するヘルパー関数
function hashStringToNumber(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

// 相対時間を計算
function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 1) {
    return "たった今"
  } else if (diffMinutes < 60) {
    return `${diffMinutes}分前`
  } else if (diffHours < 24) {
    return `${diffHours}時間前`
  } else {
    return `${diffDays}日前`
  }
}

// バッジを判定
function getBadge(topic: any): "trending" | "new" | "ending-soon" | undefined {
  const now = new Date()
  const createdAt = new Date(topic.createdAt)
  const endTime = new Date(topic.endTime)
  const diffHours = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60))
  const timeLeftHours = Math.floor((endTime.getTime() - now.getTime()) / (1000 * 60 * 60))

  // 新着: 24時間以内
  if (diffHours < 24) {
    return "new"
  }

  // もうすぐ終了: 3時間以内
  if (topic.status === "ACTIVE" && timeLeftHours < 3 && timeLeftHours > 0) {
    return "ending-soon"
  }

  // トレンド: 回答数といいね数が多い
  if (topic._count.answers > 50 && topic._count.likes > 20) {
    return "trending"
  }

  return undefined
}

// 残り時間を計算
function getTimeLeft(endTime: Date): string | undefined {
  const now = new Date()
  const diffMs = endTime.getTime() - now.getTime()

  if (diffMs <= 0) {
    return undefined
  }

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

  if (diffHours > 0) {
    return `残り ${diffHours}時間${diffMinutes > 0 ? diffMinutes + "分" : ""}`
  } else if (diffMinutes > 0) {
    return `残り ${diffMinutes}分`
  } else {
    return "まもなく終了"
  }
}

// 開催中のお題を取得
async function getActiveTopics(): Promise<Topic[]> {
  try {
    const topics = await prisma.topic.findMany({
      where: {
        status: "ACTIVE",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        topicTags: {
          include: {
            tag: true,
          },
        },
        answers: {
          orderBy: {
            likeCount: "desc",
          },
          take: 1,
          include: {
            author: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            answers: true,
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    })

    return topics.map((topic) => {
      const bestAnswer = topic.answers[0]
      return {
        id: hashStringToNumber(topic.id),
        dbId: topic.id, // データベースの実際のID
        number: topic.number,
        title: topic.title,
        subject: topic.subject,
        timeLeft: getTimeLeft(topic.endTime),
        answerCount: topic._count.answers,
        viewCount: topic.viewCount,
        likeCount: topic._count.likes,
        status: "active" as const,
        author: topic.author
          ? {
              id: hashStringToNumber(topic.author.id),
              name: topic.author.name || "匿名",
              avatar: topic.author.image || undefined,
            }
          : undefined,
        tags: topic.topicTags.map((tt) => tt.tag.name),
        createdAt: getRelativeTime(topic.createdAt),
        badge: getBadge(topic),
        bestAnswer: bestAnswer
          ? {
              id: hashStringToNumber(bestAnswer.id),
              content: bestAnswer.content,
              author: bestAnswer.authorName,
              likeCount: bestAnswer.likeCount,
            }
          : undefined,
        description: topic.description || undefined,
      }
    })
  } catch (error) {
    console.error("Get active topics error:", error)
    return []
  }
}

// 終了したお題を取得
async function getClosedTopics(): Promise<Topic[]> {
  try {
    const topics = await prisma.topic.findMany({
      where: {
        status: "CLOSED",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        topicTags: {
          include: {
            tag: true,
          },
        },
        answers: {
          orderBy: {
            likeCount: "desc",
          },
          take: 1,
        },
        _count: {
          select: {
            answers: true,
            likes: true,
          },
        },
      },
      orderBy: {
        endTime: "desc",
      },
      take: 20,
    })

    return topics.map((topic) => {
      const bestAnswer = topic.answers[0]
      return {
        id: hashStringToNumber(topic.id),
        dbId: topic.id, // データベースの実際のID
        number: topic.number,
        title: topic.title,
        subject: topic.subject,
        answerCount: topic._count.answers,
        viewCount: topic.viewCount,
        likeCount: topic._count.likes,
        status: "closed" as const,
        author: topic.author
          ? {
              id: hashStringToNumber(topic.author.id),
              name: topic.author.name || "匿名",
              avatar: topic.author.image || undefined,
            }
          : undefined,
        tags: topic.topicTags.map((tt) => tt.tag.name),
        createdAt: getRelativeTime(topic.createdAt),
        bestAnswer: bestAnswer
          ? {
              id: hashStringToNumber(bestAnswer.id),
              content: bestAnswer.content,
              author: bestAnswer.authorName,
              likeCount: bestAnswer.likeCount,
            }
          : undefined,
        description: topic.description || undefined,
      }
    })
  } catch (error) {
    console.error("Get closed topics error:", error)
    return []
  }
}

export default async function HomeContent() {
  const [activeTopics, closedTopics] = await Promise.all([getActiveTopics(), getClosedTopics()])

  return <HomeContentClient initialActiveTopics={activeTopics} initialClosedTopics={closedTopics} />
}
