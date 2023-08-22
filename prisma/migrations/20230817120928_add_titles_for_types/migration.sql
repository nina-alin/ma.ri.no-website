/*
  Warnings:

  - You are about to drop the column `name` on the `Types` table. All the data in the column will be lost.
  - Added the required column `nameEn` to the `Types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameFr` to the `Types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameJp` to the `Types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Types" DROP COLUMN "name",
ADD COLUMN     "nameEn" TEXT NOT NULL,
ADD COLUMN     "nameFr" TEXT NOT NULL,
ADD COLUMN     "nameJp" TEXT NOT NULL;
