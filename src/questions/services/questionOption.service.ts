import { Injectable } from '@nestjs/common';
import { Prisma, QuestionOption } from '@prisma/client';
import { PrismaService } from 'src/databases/questions/prisma.service';

@Injectable()
export class QuestionOptionService {
  constructor(private readonly prisma: PrismaService) {}

  async getQuestionOptions(label: string): Promise<QuestionOption[]> {
    return this.prisma.questionOption.findMany({
      where: {
        questionLabel: label,
      },
    });
  }

  async getQuestionOption(
    label: string,
    position: number,
  ): Promise<QuestionOption> {
    return this.prisma.questionOption.findUnique({
      where: {
        questionLabel_position: {
          questionLabel: label,
          position,
        },
      },
    });
  }

  async createQuestionOption(
    data: Prisma.QuestionOptionCreateInput,
  ): Promise<QuestionOption> {
    return this.prisma.questionOption.create({ data });
  }

  async updateQuestionOption(
    where: Prisma.QuestionOptionWhereUniqueInput,
    data: Prisma.QuestionOptionUpdateInput,
  ): Promise<QuestionOption> {
    return this.prisma.questionOption.update({ where, data });
  }

  async deleteQuestionOption(
    where: Prisma.QuestionOptionWhereUniqueInput,
  ): Promise<QuestionOption> {
    return this.prisma.questionOption.delete({ where });
  }
}
