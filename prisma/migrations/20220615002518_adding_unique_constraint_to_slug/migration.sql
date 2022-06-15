/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `ComponentType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ComponentType_slug_key" ON "ComponentType"("slug");
