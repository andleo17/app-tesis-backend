import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/databases/questions/prisma.service';
import { FormInput } from '../inputs/form.input';

@Injectable()
export class RecommendationService {
  constructor(private readonly prisma: PrismaService) {}

  async getRecommendation(userAnswers: FormInput[]) {
    console.log({ userAnswers });
    return [];
  }
}
