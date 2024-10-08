/*
  Warnings:

  - The values [ADMIN] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `icon` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `ProgressWordHistory` table. All the data in the column will be lost.
  - You are about to drop the column `progressWordId` on the `ProgressWordHistory` table. All the data in the column will be lost.
  - You are about to drop the column `isPremium` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `folderId` on the `WordSet` table. All the data in the column will be lost.
  - You are about to drop the `ProgressSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProgressWord` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `progressValue` to the `ProgressWordHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ProgressWordHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wordId` to the `ProgressWordHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('PRO', 'USER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "ProgressSet" DROP CONSTRAINT "ProgressSet_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressSet" DROP CONSTRAINT "ProgressSet_wordSetId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressWord" DROP CONSTRAINT "ProgressWord_progressSetId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressWord" DROP CONSTRAINT "ProgressWord_wordId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressWordHistory" DROP CONSTRAINT "ProgressWordHistory_progressWordId_fkey";

-- DropForeignKey
ALTER TABLE "WordSet" DROP CONSTRAINT "WordSet_folderId_fkey";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "icon",
ADD COLUMN     "color" TEXT;

-- AlterTable
ALTER TABLE "ProgressWordHistory" DROP COLUMN "date",
DROP COLUMN "progressWordId",
ADD COLUMN     "answerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "progressValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "wordId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isPremium";

-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "order" INTEGER DEFAULT 0,
ADD COLUMN     "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WordSet" DROP COLUMN "folderId",
ADD COLUMN     "displayTranslatedFirst" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "ProgressSet";

-- DropTable
DROP TABLE "ProgressWord";

-- CreateTable
CREATE TABLE "_WordSetFolders" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_WordSetFolders_AB_unique" ON "_WordSetFolders"("A", "B");

-- CreateIndex
CREATE INDEX "_WordSetFolders_B_index" ON "_WordSetFolders"("B");

-- CreateIndex
CREATE INDEX "ProgressWordHistory_wordId_answerDate_idx" ON "ProgressWordHistory"("wordId", "answerDate");

-- AddForeignKey
ALTER TABLE "ProgressWordHistory" ADD CONSTRAINT "ProgressWordHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressWordHistory" ADD CONSTRAINT "ProgressWordHistory_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WordSetFolders" ADD CONSTRAINT "_WordSetFolders_A_fkey" FOREIGN KEY ("A") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WordSetFolders" ADD CONSTRAINT "_WordSetFolders_B_fkey" FOREIGN KEY ("B") REFERENCES "WordSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
