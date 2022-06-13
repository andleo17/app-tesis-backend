import { Prisma, PrismaClient } from '@prisma/client';
import questions from '../src/questions/seed/questions.seed';
const prisma = new PrismaClient();

async function main() {
  const questionCategoryData: Prisma.Enumerable<Prisma.QuestionCategoryCreateManyInput> =
    questions.map(({ questions, ...rest }) => rest);

  const questionData: Prisma.Enumerable<Prisma.QuestionCreateManyInput> =
    questions.flatMap((q) => q.questions).map(({ options, ...rest }) => rest);

  const questionOptionData: Prisma.Enumerable<Prisma.QuestionOptionCreateManyInput> =
    questions.flatMap((q) => q.questions.flatMap((q) => q.options));

  await prisma.questionCategory.createMany({
    data: questionCategoryData,
    skipDuplicates: true,
  });

  await prisma.question.createMany({
    data: questionData,
    skipDuplicates: true,
  });

  await prisma.questionOption.createMany({
    data: questionOptionData,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
