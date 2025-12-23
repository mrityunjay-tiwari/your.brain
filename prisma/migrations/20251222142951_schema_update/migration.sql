/*
  Warnings:

  - You are about to drop the column `contentType` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `displayContentType` on the `content` table. All the data in the column will be lost.
  - Added the required column `websiteCategoryId` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "content" DROP COLUMN "contentType",
DROP COLUMN "displayContentType",
ADD COLUMN     "websiteCategoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "WebsiteCategory" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "icon" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebsiteCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteCategory_userId_key_key" ON "WebsiteCategory"("userId", "key");

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_websiteCategoryId_fkey" FOREIGN KEY ("websiteCategoryId") REFERENCES "WebsiteCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteCategory" ADD CONSTRAINT "WebsiteCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
