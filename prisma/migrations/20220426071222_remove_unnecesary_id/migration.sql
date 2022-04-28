/*
  Warnings:

  - The primary key for the `Cpu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Cpu` table. All the data in the column will be lost.
  - The primary key for the `Gpu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Gpu` table. All the data in the column will be lost.
  - The primary key for the `Motherboard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Motherboard` table. All the data in the column will be lost.
  - The primary key for the `PowerSupply` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PowerSupply` table. All the data in the column will be lost.
  - The primary key for the `Ram` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Ram` table. All the data in the column will be lost.
  - The primary key for the `Storage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Storage` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Cpu_componentId_key";

-- DropIndex
DROP INDEX "Gpu_componentId_key";

-- DropIndex
DROP INDEX "Motherboard_componentId_key";

-- DropIndex
DROP INDEX "PowerSupply_componentId_key";

-- DropIndex
DROP INDEX "Ram_componentId_key";

-- DropIndex
DROP INDEX "Storage_componentId_key";

-- AlterTable
ALTER TABLE "Component" ALTER COLUMN "suggestedPrice" DROP NOT NULL,
ALTER COLUMN "suggestedPrice" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Cpu" DROP CONSTRAINT "Cpu_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Cpu_pkey" PRIMARY KEY ("componentId");

-- AlterTable
ALTER TABLE "Gpu" DROP CONSTRAINT "Gpu_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Gpu_pkey" PRIMARY KEY ("componentId");

-- AlterTable
ALTER TABLE "Motherboard" DROP CONSTRAINT "Motherboard_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Motherboard_pkey" PRIMARY KEY ("componentId");

-- AlterTable
ALTER TABLE "PowerSupply" DROP CONSTRAINT "PowerSupply_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PowerSupply_pkey" PRIMARY KEY ("componentId");

-- AlterTable
ALTER TABLE "Ram" DROP CONSTRAINT "Ram_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Ram_pkey" PRIMARY KEY ("componentId");

-- AlterTable
ALTER TABLE "Storage" DROP CONSTRAINT "Storage_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Storage_pkey" PRIMARY KEY ("componentId");
