-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "year" DROP DEFAULT;