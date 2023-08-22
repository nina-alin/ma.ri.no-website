/*
  Warnings:

  - You are about to drop the `PostsOnTypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostsOnTypes" DROP CONSTRAINT "PostsOnTypes_postsId_fkey";

-- DropForeignKey
ALTER TABLE "PostsOnTypes" DROP CONSTRAINT "PostsOnTypes_typesId_fkey";

-- DropTable
DROP TABLE "PostsOnTypes";

-- CreateTable
CREATE TABLE "_PostsToTypes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostsToTypes_AB_unique" ON "_PostsToTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_PostsToTypes_B_index" ON "_PostsToTypes"("B");

-- AddForeignKey
ALTER TABLE "_PostsToTypes" ADD CONSTRAINT "_PostsToTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostsToTypes" ADD CONSTRAINT "_PostsToTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "Types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
