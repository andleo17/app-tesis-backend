/*
  Warnings:

  - You are about to drop the column `format` on the `Motherboard` table. All the data in the column will be lost.
  - You are about to drop the column `memoryChannel` on the `Motherboard` table. All the data in the column will be lost.
  - You are about to drop the column `networkInterfaceSpeed` on the `Motherboard` table. All the data in the column will be lost.
  - You are about to drop the column `portsATA` on the `Motherboard` table. All the data in the column will be lost.
  - You are about to drop the column `portsPCIe` on the `Motherboard` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Motherboard` table. All the data in the column will be lost.
  - You are about to drop the column `supportedMemory` on the `Motherboard` table. All the data in the column will be lost.
  - Added the required column `formFactor` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasWireless` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memoryDualChannel` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memoryFormat` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memoryMaxCapacity` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memoryXMP` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `networkInterfaceMaxSpeed` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portsM2PCIe` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portsM2SATA` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portsSATA` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supportMultiGraphics` to the `Motherboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Motherboard" DROP COLUMN "format",
DROP COLUMN "memoryChannel",
DROP COLUMN "networkInterfaceSpeed",
DROP COLUMN "portsATA",
DROP COLUMN "portsPCIe",
DROP COLUMN "size",
DROP COLUMN "supportedMemory",
ADD COLUMN     "formFactor" TEXT NOT NULL,
ADD COLUMN     "hasWireless" BOOLEAN NOT NULL,
ADD COLUMN     "memoryDualChannel" BOOLEAN NOT NULL,
ADD COLUMN     "memoryFormat" TEXT NOT NULL,
ADD COLUMN     "memoryFrecuencies" TEXT[],
ADD COLUMN     "memoryMaxCapacity" INTEGER NOT NULL,
ADD COLUMN     "memoryXMP" BOOLEAN NOT NULL,
ADD COLUMN     "networkInterfaceMaxSpeed" TEXT NOT NULL,
ADD COLUMN     "portsM2PCIe" INTEGER NOT NULL,
ADD COLUMN     "portsM2SATA" INTEGER NOT NULL,
ADD COLUMN     "portsSATA" INTEGER NOT NULL,
ADD COLUMN     "supportMultiGraphics" BOOLEAN NOT NULL;
