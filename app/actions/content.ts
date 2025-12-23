// app/actions/add-content.ts
"use server"

import { prisma } from "@/prisma/src"
import { auth } from "@/utils/auth"
import { websiteCollection } from "@/utils/detect-hostname"

type CreateContentInput = {
  link: string
  title: string
  description: string
categoryKey: string  
  categoryDisplayName: string 
  userId: string
}

export async function addContent(data: CreateContentInput) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const userId = session.user.id

  const hostname = new URL(data.link)
    .hostname
    .replace(/^www\./, "")
    .toLowerCase();

      const stableCategoryKey = hostname.replace(/\./g, "-");

    const category = await prisma.websiteCategory.upsert({
    where: {
      userId_key: {
        userId,
        key: stableCategoryKey,
      },
    },
    update: {
      displayName: data.categoryDisplayName,
      domains: {
        push: hostname, // ✅ LEARNING happens here
      },
    },
    create: {
      userId,
      key: stableCategoryKey,
      displayName: data.categoryDisplayName,
      domains: [hostname], // ✅ First-time learning
    },
  });

  const contents = await prisma.content.create({
    data: {
      title: data.title,
      description: data.description,
      link: data.link,
      userId: session.user.id,
      websiteCategoryId: category.id,
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
  const findAlreadyExists = await prisma.individualLinkHash.findUnique({
    where: {
      contentId: contentId,
    },
  })
  if (findAlreadyExists) {
    return findAlreadyExists
  }
  
  const individualHashRecord = await prisma.individualLinkHash.create({
    data: {
      contentId: contentId,
    },
  })
  return individualHashRecord
}

export async function createAllBrainShareLinkHashContent(userId: string) {
  const findAlreadyExists = await prisma.entireBrainLinkHash.findUnique({
    where: {
      userId: userId,
    },
  })
  if (findAlreadyExists) {
    return findAlreadyExists
  }
  const allBrainHashRecord = await prisma.entireBrainLinkHash.create({
    data: {
      userId: userId,
    },
  })
  return allBrainHashRecord
}

export async function getIndividualShareLinkHashContent(hashId: string) {
  const hashRecord = await prisma.individualLinkHash.findUnique({
    where: {
      id: hashId,
    },
  })
  return hashRecord
}

export async function deleteIndividualShareLinkHashContentById(contentId: string) {
  const deletedContent = await prisma.individualLinkHash.delete({
    where: {
      contentId: contentId,
    },
  })
  return deletedContent
}

export async function deleteAllShareLinkHashContentById(userId: string) {
  const deletedContent = await prisma.entireBrainLinkHash.delete({
    where: {
      userId: userId,
    },
  })
  return deletedContent
}

export async function getAllBrainShareLinkHashContent(hashId: string) {
  const hashRecord = await prisma.entireBrainLinkHash.findUnique({
    where: {
      id: hashId,
    },
  })
  return hashRecord
}

type CreateProjectInput = {
  title: string
  userId: string
}

export async function createNewProject(data: CreateProjectInput) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }
  const project = await prisma.project.create({
    data: {
      projectsname: data.title,
      userId: session.user.id,
    },
  })  
  return {
    msg: "Project created successfully",
    project,
  }
}

export async function getProjectsByUserId(userId : string) {
  const projects = await prisma.project.findMany({
    where : {
      userId: userId
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  return {
    msg: "User Projects",
    projects
  }
}

export async function getProjectBrainCardsByProjectId(projectId: string) {
  const projectContentCards = await prisma.projectsContent.findMany({
    where : {
      projectId: projectId
    },
    orderBy : {
      createdAt : "asc"
    }
  })

  
  const brainCards = projectContentCards.map(async (brainCard) => {
    const card = await prisma.content.findMany({
      where: {
        id: brainCard.contentId
      }
    }) 
  })
  
} 

export async function getProjectDetailsByProjectId(projectId: string) {
  // const project = await prisma.project.findUnique({
  //   where: {
  //     id : projectId
  //   }
  // })

  // return {
  //   msg : "Project Details",
  //   project
  // }

}

export async function getWebsiteCategoryTypes(userId: string) {
  return prisma.websiteCategory.findMany({
    where: {
      userId,
      contents: { some: {} }, // 🔥 only categories with content
    },
    select: {
      key: true,
      displayName: true,
    },
    orderBy: { displayName: "asc" },
  });
}

export async function getContentsByCategory(
  userId: string,
  categoryKey: string
) {
  return prisma.content.findMany({
    where: {
      userId,
      websiteCategory: {
        key: categoryKey,
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function detectWebsiteCategory(
  userId: string,
  link: string
) {
  const hostname = new URL(link)
    .hostname
    .replace(/^www\./, "")
    .toLowerCase();

  // 1️⃣ global
  const global = websiteCollection.find(site =>
    site.domains.some(
      d => hostname === d || hostname.endsWith(`.${d}`)
    )
  );

  if (global) {
    return {
      key: global.id,
      displayName: global.displayName,
    };
  }

  // 2️⃣ user learned
  const userCategory = await prisma.websiteCategory.findFirst({
    where: {
      userId,
      domains: { has: hostname },
    },
  });

  if (userCategory) {
    return {
      key: userCategory.key,
      displayName: userCategory.displayName,
    };
  }

  return null;
}