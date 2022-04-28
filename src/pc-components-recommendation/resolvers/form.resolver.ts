import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ComponentModel } from 'src/pc-components/models/component.model';
import { FormInput } from '../inputs/form.input';
import { RecommendationService } from '../services/recommendation.service';

@Resolver()
export class FormResolver {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Mutation(() => [ComponentModel])
  async recommendPC(
    @Args('formAnswers', { type: () => [FormInput] }) formAnswers: FormInput[],
  ): Promise<ComponentModel[]> {
    return this.recommendationService.getRecommendation(formAnswers);
  }
}
