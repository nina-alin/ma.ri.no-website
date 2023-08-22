-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "titleJp" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "contentFr" TEXT NOT NULL,
    "contentJp" TEXT NOT NULL,
    "contentEn" TEXT NOT NULL,
    "mainImageUrl" TEXT NOT NULL,
    "displayColor" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "year" TEXT NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "postsId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "titleJp" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "contentFr" TEXT NOT NULL,
    "contentJp" TEXT NOT NULL,
    "contentEn" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Alert_id_key" ON "Alert"("id");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
