/*
  Warnings:

  - You are about to drop the column `type` on the `Posts` table. All the data in the column will be lost.
  - Added the required column `status` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alert" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "type";

-- CreateTable
CREATE TABLE "Types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostsOnTypes" (
    "postsId" TEXT NOT NULL,
    "typesId" TEXT NOT NULL,

    CONSTRAINT "PostsOnTypes_pkey" PRIMARY KEY ("postsId","typesId")
);

-- AddForeignKey
ALTER TABLE "PostsOnTypes" ADD CONSTRAINT "PostsOnTypes_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsOnTypes" ADD CONSTRAINT "PostsOnTypes_typesId_fkey" FOREIGN KEY ("typesId") REFERENCES "Types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
