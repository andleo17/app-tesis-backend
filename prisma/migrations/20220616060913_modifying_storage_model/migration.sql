/*
  Warnings:

  - You are about to drop the column `cache` on the `Storage` table. All the data in the column will be lost.
  - Added the required column `capacityUnit` to the `Storage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Storage" DROP COLUMN "cache",
ADD COLUMN     "capacityUnit" TEXT NOT NULL;
