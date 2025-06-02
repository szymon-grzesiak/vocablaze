/*
  Warnings:

  - The primary key for the `Folder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Language` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProgressSet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `progressValue` on the `ProgressSet` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - The primary key for the `ProgressWord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProgressWordHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `QuizType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `QuizTypeWordSet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - The primary key for the `Word` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WordSet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `wordId` to the `ProgressWord` table without a default value. This is not possible if the table is not empty.
  - Made the column `numRows` on table `QuizType` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numColumns` on table `QuizType` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ProgressSet" DROP CONSTRAINT "ProgressSet_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressSet" DROP CONSTRAINT "ProgressSet_wordSetId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressWord" DROP CONSTRAINT "ProgressWord_progressSetId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressWordHistory" DROP CONSTRAINT "ProgressWordHistory_progressWordId_fkey";

-- DropForeignKey
ALTER TABLE "QuizTypeWordSet" DROP CONSTRAINT "QuizTypeWordSet_quizTypeId_fkey";

-- DropForeignKey
ALTER TABLE "QuizTypeWordSet" DROP CONSTRAINT "QuizTypeWordSet_wordSetId_fkey";

-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_wordSetId_fkey";

-- DropForeignKey
ALTER TABLE "WordSet" DROP CONSTRAINT "WordSet_firstLanguageId_fkey";

-- DropForeignKey
ALTER TABLE "WordSet" DROP CONSTRAINT "WordSet_folderId_fkey";

-- DropForeignKey
ALTER TABLE "WordSet" DROP CONSTRAINT "WordSet_secondLanguageId_fkey";

-- AlterTable
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "icon" SET DATA TYPE TEXT,
ADD CONSTRAINT "Folder_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Folder_id_seq";

-- AlterTable
ALTER TABLE "Language" DROP CONSTRAINT "Language_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "icon" SET DATA TYPE TEXT,
ADD CONSTRAINT "Language_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Language_id_seq";

-- AlterTable
ALTER TABLE "ProgressSet" DROP CONSTRAINT "ProgressSet_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "progressValue" SET DATA TYPE INTEGER,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "wordSetId" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "ProgressSet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProgressSet_id_seq";

-- AlterTable
ALTER TABLE "ProgressWord" DROP CONSTRAINT "ProgressWord_pkey",
ADD COLUMN     "wordId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "answerDate" DROP NOT NULL,
ALTER COLUMN "progressSetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProgressWord_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProgressWord_id_seq";

-- AlterTable
ALTER TABLE "ProgressWordHistory" DROP CONSTRAINT "ProgressWordHistory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "progressWordId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProgressWordHistory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProgressWordHistory_id_seq";

-- AlterTable
ALTER TABLE "QuizType" DROP CONSTRAINT "QuizType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "numRows" SET NOT NULL,
ALTER COLUMN "numColumns" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "QuizType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "QuizType_id_seq";

-- AlterTable
ALTER TABLE "QuizTypeWordSet" DROP CONSTRAINT "QuizTypeWordSet_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "quizTypeId" SET DATA TYPE TEXT,
ALTER COLUMN "wordSetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "QuizTypeWordSet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "QuizTypeWordSet_id_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "name" TEXT,
ALTER COLUMN "isPremium" DROP NOT NULL,
ALTER COLUMN "isPremium" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Word" DROP CONSTRAINT "Word_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "wordSetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Word_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Word_id_seq";

-- AlterTable
ALTER TABLE "WordSet" DROP CONSTRAINT "WordSet_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "firstLanguageId" SET DATA TYPE TEXT,
ALTER COLUMN "secondLanguageId" SET DATA TYPE TEXT,
ALTER COLUMN "isShared" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "folderId" SET DATA TYPE TEXT,
ADD CONSTRAINT "WordSet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "WordSet_id_seq";

-- AddForeignKey
ALTER TABLE "ProgressSet" ADD CONSTRAINT "ProgressSet_wordSetId_fkey" FOREIGN KEY ("wordSetId") REFERENCES "WordSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressSet" ADD CONSTRAINT "ProgressSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressWord" ADD CONSTRAINT "ProgressWord_progressSetId_fkey" FOREIGN KEY ("progressSetId") REFERENCES "ProgressSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressWord" ADD CONSTRAINT "ProgressWord_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressWordHistory" ADD CONSTRAINT "ProgressWordHistory_progressWordId_fkey" FOREIGN KEY ("progressWordId") REFERENCES "ProgressWord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizTypeWordSet" ADD CONSTRAINT "QuizTypeWordSet_quizTypeId_fkey" FOREIGN KEY ("quizTypeId") REFERENCES "QuizType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizTypeWordSet" ADD CONSTRAINT "QuizTypeWordSet_wordSetId_fkey" FOREIGN KEY ("wordSetId") REFERENCES "WordSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_wordSetId_fkey" FOREIGN KEY ("wordSetId") REFERENCES "WordSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordSet" ADD CONSTRAINT "WordSet_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordSet" ADD CONSTRAINT "WordSet_firstLanguageId_fkey" FOREIGN KEY ("firstLanguageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordSet" ADD CONSTRAINT "WordSet_secondLanguageId_fkey" FOREIGN KEY ("secondLanguageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
