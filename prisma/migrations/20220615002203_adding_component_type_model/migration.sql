/*
  Warnings:

  - You are about to drop the column `type` on the `Component` table. All the data in the column will be lost.
  - Added the required column `componentTypeId` to the `Component` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Component" DROP COLUMN "type",
ADD COLUMN     "componentTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ComponentType" (
    "id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ComponentType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_componentTypeId_fkey" FOREIGN KEY ("componentTypeId") REFERENCES "ComponentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
