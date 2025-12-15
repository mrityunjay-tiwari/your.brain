-- CreateTable
CREATE TABLE "individualLinkHash" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "individualLinkHash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entireBrainLinkHash" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entireBrainLinkHash_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "individualLinkHash_contentId_key" ON "individualLinkHash"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "entireBrainLinkHash_userId_key" ON "entireBrainLinkHash"("userId");

-- AddForeignKey
ALTER TABLE "individualLinkHash" ADD CONSTRAINT "individualLinkHash_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entireBrainLinkHash" ADD CONSTRAINT "entireBrainLinkHash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
