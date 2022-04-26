import { Injectable } from '@nestjs/common';
import { Prisma, Question } from '@prisma/client';
import { PrismaService } from 'src/databases/questions/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async getQuestions(where?: Prisma.QuestionWhereInput): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({ where });
    return questions;
  }

  async getQuestion(label: string): Promise<Question> {
    return this.prisma.question.findUnique({ where: { label } });
  }

  async createQuestion(data: Prisma.QuestionCreateInput): Promise<Question> {
    return this.prisma.question.create({ data });
  }

  async updateQuestion(params: {
    where: Prisma.QuestionWhereUniqueInput;
    data: Prisma.QuestionUpdateInput;
  }): Promise<Question> {
    return this.prisma.question.update(params);
  }

  async deleteQuestion(
    where: Prisma.QuestionWhereUniqueInput,
  ): Promise<Question> {
    return this.prisma.question.delete({ where });
  }
}
