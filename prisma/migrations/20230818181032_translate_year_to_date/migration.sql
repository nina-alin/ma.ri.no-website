/*
  Warnings:

  - The `year` column on the `Posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "year",
ADD COLUMN     "year" DATE NOT NULL DEFAULT '2020-05-12 23:50:21.817 +00:00';
