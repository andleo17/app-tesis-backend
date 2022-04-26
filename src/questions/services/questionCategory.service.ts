import { Injectable } from '@nestjs/common';
import { Prisma, QuestionCategory } from '@prisma/client';
import { PrismaService } from 'src/databases/questions/prisma.service';

@Injectable()
export class QuestionCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getQuestionCategories(): Promise<QuestionCategory[]> {
    return this.prisma.questionCategory.findMany();
  }

  async getQuestionCategory(id: number): Promise<QuestionCategory> {
    return this.prisma.questionCategory.findUnique({
      where: {
        id,
      },
    });
  }

  async createQuestionCategory(
    data: Prisma.QuestionCategoryCreateInput,
  ): Promise<QuestionCategory> {
    return this.prisma.questionCategory.create({ data });
  }

  async updateQuestionCategory(
    where: Prisma.QuestionCategoryWhereUniqueInput,
    data: Prisma.QuestionCategoryUpdateInput,
  ): Promise<QuestionCategory> {
    return this.prisma.questionCategory.update({ where, data });
  }

  async deleteQuestionCategory(
    where: Prisma.QuestionCategoryWhereUniqueInput,
  ): Promise<QuestionCategory> {
    return this.prisma.questionCategory.delete({ where });
  }
}
