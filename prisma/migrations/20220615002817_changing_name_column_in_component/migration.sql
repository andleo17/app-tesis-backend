/*
  Warnings:

  - You are about to drop the column `componentTypeId` on the `Component` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Component` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_componentTypeId_fkey";

-- AlterTable
ALTER TABLE "Component" DROP COLUMN "componentTypeId",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ComponentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
