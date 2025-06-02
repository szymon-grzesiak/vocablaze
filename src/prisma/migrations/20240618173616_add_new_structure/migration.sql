/*
  Warnings:

  - You are about to drop the column `icon` on the `Language` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `WordSet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Language" DROP COLUMN "icon";

-- AlterTable
ALTER TABLE "WordSet" ALTER COLUMN "folderId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WordSet_title_key" ON "WordSet"("title");
