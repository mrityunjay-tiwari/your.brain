/*
  Warnings:

  - You are about to drop the column `type` on the `content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WebsiteCategory" ADD COLUMN     "domains" TEXT[];

-- AlterTable
ALTER TABLE "content" DROP COLUMN "type";

-- DropEnum
DROP TYPE "ContentType";
