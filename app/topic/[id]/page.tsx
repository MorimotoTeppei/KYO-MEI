import { notFound } from "next/navigation"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { Topic } from "@/types/topic"
import { Answer } from "@/types/answer"
import { TopicDetailClient } from "./topic-detail-client"

interface PageProps {
  params: {
    id: string
  }
}

// cuid文字列をnumberに変換するヘルパー関数
function hashStringToNumber(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// お題データを取得（元のauthorIdも返す）
async function getTopic(id: string): Promise<{ topic: Topic; originalAuthorId?: string } | null> {
  try {
    const topic = await prisma.topic.findUnique({
      where: { id },
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
        _count: {
          select: {
            answers: true,
            likes: true,
          },
        },
      },
    })

    if (!topic) {
      return null
    }

    // 閲覧数をインクリメント
    await prisma.topic.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })

    // 時間差を計算
    const now = new Date()
    const endTime = new Date(topic.endTime)
    const diffMs = endTime.getTime() - now.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    let timeLeft = ""
    if (diffMs > 0) {
      if (diffHours > 0) {
        timeLeft = `残り${diffHours}時間${diffMinutes > 0 ? diffMinutes + "分" : ""}`
      } else if (diffMinutes > 0) {
        timeLeft = `残り${diffMinutes}分`
      } else {
        timeLeft = "まもなく終了"
      }
    }

    // Topic型に変換 (idをnumberに変換 - cuidのhashを使用)
    const formattedTopic: Topic = {
      id: hashStringToNumber(topic.id),
      dbId: topic.id, // データベースの実際のID
      number: topic.number,
      subject: topic.subject,
      title: topic.title,
      description: topic.description || undefined,
      status: topic.status === "ACTIVE" ? "active" : "closed",
      answerCount: topic._count.answers,
      viewCount: topic.viewCount + 1,
      likeCount: topic._count.likes,
      timeLeft: topic.status === "ACTIVE" ? timeLeft : undefined,
      createdAt: getRelativeTime(topic.createdAt),
      author: topic.author
        ? {
            id: hashStringToNumber(topic.author.id),
            name: topic.author.name || "匿名",
            avatar: topic.author.image || "",
            topicCount: 0, // 必要に応じて別途取得
          }
        : undefined,
      tags: topic.topicTags.map((tt) => tt.tag.name),
    }

    return {
      topic: formattedTopic,
      originalAuthorId: topic.author?.id,
    }
  } catch (error) {
    console.error("Get topic error:", error)
    return null
  }
}

// 回答データを取得
async function getAnswers(topicId: string, userId?: string): Promise<Answer[]> {
  try {
    const answers = await prisma.answer.findMany({
      where: {
        topicId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
        likes: userId
          ? {
              where: {
                userId: userId,
              },
            }
          : false,
      },
      orderBy: {
        likeCount: "desc",
      },
    })

    // Answer型に変換
    const formattedAnswers: Answer[] = answers.map((answer) => ({
      id: hashStringToNumber(answer.id),
      dbId: answer.id, // データベースの実際のID
      topicId: hashStringToNumber(topicId),
      author: {
        id: hashStringToNumber(answer.author?.id || "unknown"),
        name: answer.authorName,
        avatar: answer.author?.image || "",
      },
      content: answer.content,
      likeCount: answer.likeCount,
      replyCount: 0, // 必要に応じて実装
      createdAt: getRelativeTime(answer.createdAt),
      isBestAnswer: false, // 必要に応じて実装
      isLiked: userId && Array.isArray(answer.likes) ? answer.likes.length > 0 : false,
      replies: [], // 必要に応じて実装
    }))

    return formattedAnswers
  } catch (error) {
    console.error("Get answers error:", error)
    return []
  }
}

// 関連するお題を取得
async function getRelatedTopics(currentTopicId: string, tags: string[], authorId?: string): Promise<Topic[]> {
  try {
    const relatedTopics = await prisma.topic.findMany({
      where: {
        id: {
          not: currentTopicId,
        },
        OR: [
          {
            topicTags: {
              some: {
                tag: {
                  name: {
                    in: tags,
                  },
                },
              },
            },
          },
          authorId
            ? {
                authorId: authorId,
              }
            : {},
        ],
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
        _count: {
          select: {
            answers: true,
            likes: true,
          },
        },
      },
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    })

    return relatedTopics.map((topic) => ({
      id: hashStringToNumber(topic.id),
      dbId: topic.id, // データベースの実際のID
      number: topic.number,
      subject: topic.subject,
      title: topic.title,
      description: topic.description || undefined,
      status: topic.status === "ACTIVE" ? "active" : "closed",
      answerCount: topic._count.answers,
      viewCount: topic.viewCount,
      likeCount: topic._count.likes,
      createdAt: getRelativeTime(topic.createdAt),
      author: topic.author
        ? {
            id: hashStringToNumber(topic.author.id),
            name: topic.author.name || "匿名",
            avatar: topic.author.image || "",
            topicCount: 0,
          }
        : undefined,
      tags: topic.topicTags.map((tt) => tt.tag.name),
    }))
  } catch (error) {
    console.error("Get related topics error:", error)
    return []
  }
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

export default async function TopicDetailPage({ params }: PageProps) {
  const session = await auth()

  // お題データを取得
  const result = await getTopic(params.id)

  if (!result) {
    notFound()
  }

  const { topic, originalAuthorId } = result

  // 回答データを取得
  const answers = await getAnswers(params.id, session?.user?.id)

  // 関連するお題を取得
  const relatedTopics = await getRelatedTopics(params.id, topic.tags || [], originalAuthorId)

  // 残りのハート数を計算（このトピックで使用したハート数を取得）
  let remainingHearts = 3
  if (session?.user?.id) {
    try {
      const likesInTopic = await prisma.like.count({
        where: {
          userId: session.user.id,
          topicId: params.id,
        },
      })
      remainingHearts = 3 - likesInTopic
    } catch (error) {
      console.error("Get likes count error:", error)
    }
  }

  return (
    <TopicDetailClient
      topic={topic}
      topicId={params.id}
      initialAnswers={answers}
      currentUserId={session?.user?.id || null}
      relatedTopics={relatedTopics}
      initialRemainingHearts={remainingHearts}
    />
  )
}
