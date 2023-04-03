/*
  Warnings:

  - You are about to drop the column `codigo` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "codigo",
ADD COLUMN     "code" TEXT;
