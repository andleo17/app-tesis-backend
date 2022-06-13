/*
  Warnings:

  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `QuestionOption` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "QuestionOption" DROP CONSTRAINT "QuestionOption_questionLabel_fkey";

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
ALTER COLUMN "label" SET DATA TYPE VARCHAR(30),
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("label");

-- AlterTable
ALTER TABLE "QuestionOption" DROP CONSTRAINT "QuestionOption_pkey",
ALTER COLUMN "questionLabel" SET DATA TYPE VARCHAR(30),
ADD CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("questionLabel", "position");

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionLabel_fkey" FOREIGN KEY ("questionLabel") REFERENCES "Question"("label") ON DELETE RESTRICT ON UPDATE CASCADE;
