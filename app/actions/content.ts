// app/actions/add-content.ts
"use server"

import { ContentType } from "@/lib/generated/prisma/enums"
import { prisma } from "@/prisma/src"
import { auth } from "@/utils/auth"

type CreateContentInput = {
  link: string
  type: ContentType
  title: string
  description: string
  userId: string
}

export async function addContent(data: CreateContentInput) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const contents = await prisma.content.create({
    data: {
      title: data.title,
      description: data.description,
      link: data.link,
      type: data.type,
      userId: session.user.id,
    },
  })

  return {
    msg: "Content added successfully",
    contents,
  }
}

export async function getContentsByUserId(userId: string) {
  const contents = await prisma.content.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return contents
} 

export async function deleteContentById(contentId: string) {
  const deletedContent = await prisma.content.delete({
    where: {
      id: contentId,
    },
  })
  return deletedContent
}

export async function updateContentById(contentId: string, data: Partial<CreateContentInput>) {
  const updatedContent = await prisma.content.update({
    where: {
      id: contentId,
    },
    data: {
      ...data,
    },
  })
  return updatedContent
}

export async function getIndividualContentById(contentId: string) {
  const content = await prisma.content.findUnique({
    where: {
      id: contentId,
    },
  })
  return content
}

export async function deleteAllContentsByUserId(userId: string) {
  const deletedContents = await prisma.content.deleteMany({
    where: {
      userId: userId,
    },
  })
  return deletedContents
}

// export async function shareIndividualContent(contentId: string) {
//   const content = await prisma.content.findUnique({
//     where: {
//       id: contentId,
//     },
//   })
//   if (!content) {
//     throw new Error("Content not found")
//   }
//   // Logic to share content (e.g., generate a shareable link)
//   const shareableLink = `https://yourbrain.in/content/${content.id}`
//   return {
//     ...content,
//     shareableLink,
//   }
// }

export async function createIndividualShareLinkHashContent(contentId: string) {
  const individualHashRecord = await prisma.individualLinkHash.create({
    data: {
      contentId: contentId,
    },
  })
  return individualHashRecord
}

export async function deleteIndividualShareLinkHashContentById(contentId: string) {
  const deletedContent = await prisma.individualLinkHash.delete({
    where: {
      contentId: contentId,
    },
  })
  return deletedContent
}

export async function createAllShareLinkHashContent(userId: string) {
  const allHashRecord = await prisma.entireBrainLinkHash.create({
    data: {
      userId: userId,
    },
  })
  return allHashRecord
}

export async function deleteAllShareLinkHashContentById(userId: string) {
  const deletedContent = await prisma.entireBrainLinkHash.delete({
    where: {
      userId: userId,
    },
  })
  return deletedContent
}