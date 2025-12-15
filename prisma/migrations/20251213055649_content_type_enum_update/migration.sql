/*
  Warnings:

  - Changed the type of `type` on the `content` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('link', 'tweet', 'blog', 'article', 'post', 'youtube');

-- AlterTable
ALTER TABLE "content" DROP COLUMN "type",
ADD COLUMN     "type" "ContentType" NOT NULL;
