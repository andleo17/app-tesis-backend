/*
  Warnings:

  - You are about to drop the column `latency` on the `Ram` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ram" DROP COLUMN "latency",
ADD COLUMN     "series" TEXT;
