/*
  Warnings:

  - You are about to drop the `Ponto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Ponto";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "codigo" TEXT,
    "is_admin" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ponto" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "entry" TIMESTAMP(3) NOT NULL,
    "exit" TIMESTAMP(3),

    CONSTRAINT "ponto_pkey" PRIMARY KEY ("id")
);
