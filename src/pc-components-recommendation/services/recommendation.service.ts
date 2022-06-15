import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/databases/questions/prisma.service';
import { ComponentModel } from 'src/pc-components/models/component.model';
import { FormInput } from '../inputs/form.input';

@Injectable()
export class RecommendationService {
  constructor(private readonly prisma: PrismaService) {}

  async getRecommendation(userAnswers: FormInput[]): Promise<ComponentModel[]> {
    console.log({ userAnswers });
    const randomNumbers = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 470) + 187,
    );
    const recommendedComponents = await this.prisma.component.findMany({
      where: {
        id: {
          in: randomNumbers,
        },
      },
      include: { type: true },
    });
    return recommendedComponents;
  }
}
