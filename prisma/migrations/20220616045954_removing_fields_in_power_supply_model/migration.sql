/*
  Warnings:

  - You are about to drop the column `connectorsATX` on the `PowerSupply` table. All the data in the column will be lost.
  - You are about to drop the column `connectorsEPS` on the `PowerSupply` table. All the data in the column will be lost.
  - You are about to drop the column `connectorsPCIe` on the `PowerSupply` table. All the data in the column will be lost.
  - You are about to drop the column `connectorsSATA` on the `PowerSupply` table. All the data in the column will be lost.
  - You are about to drop the column `format` on the `PowerSupply` table. All the data in the column will be lost.
  - You are about to drop the column `inVoltage` on the `PowerSupply` table. All the data in the column will be lost.
  - You are about to drop the column `isModular` on the `PowerSupply` table. All the data in the column will be lost.
  - You are about to drop the column `outVoltage` on the `PowerSupply` table. All the data in the column will be lost.
  - You are about to drop the column `potency` on the `PowerSupply` table. All the data in the column will be lost.
  - Added the required column `formFactor` to the `PowerSupply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modularity` to the `PowerSupply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `power` to the `PowerSupply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PowerSupply" DROP COLUMN "connectorsATX",
DROP COLUMN "connectorsEPS",
DROP COLUMN "connectorsPCIe",
DROP COLUMN "connectorsSATA",
DROP COLUMN "format",
DROP COLUMN "inVoltage",
DROP COLUMN "isModular",
DROP COLUMN "outVoltage",
DROP COLUMN "potency",
ADD COLUMN     "formFactor" TEXT NOT NULL,
ADD COLUMN     "modularity" INTEGER NOT NULL,
ADD COLUMN     "power" INTEGER NOT NULL;
