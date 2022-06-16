/*
  Warnings:

  - Added the required column `slotsPCIe` to the `Motherboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Motherboard" ADD COLUMN     "slotsPCIe" INTEGER NOT NULL;
