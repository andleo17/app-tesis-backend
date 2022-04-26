import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { QuestionModel } from '../models/question.model';
import { QuestionOptionModel } from '../models/questionOption.model';
import { QuestionService } from '../services/question.service';
import { QuestionOptionService } from '../services/questionOption.service';

@Resolver(() => QuestionOptionModel)
export class QuestionOptionResolver {
  constructor(
    private readonly questionOptionService: QuestionOptionService,
    private readonly questionService: QuestionService,
  ) {}

  @ResolveField(() => QuestionModel)
  async question(
    @Parent() questionOption: QuestionOptionModel,
  ): Promise<QuestionModel> {
    return this.questionService.getQuestion(questionOption.questionLabel);
  }

  @Query(() => [QuestionOptionModel])
  async getQuestionOptions(
    questionLabel: string,
  ): Promise<QuestionOptionModel[]> {
    return this.questionOptionService.getQuestionOptions(questionLabel);
  }

  @Query(() => QuestionOptionModel)
  async getQuestionOption(
    questionLabel: string,
    position: number,
  ): Promise<QuestionOptionModel> {
    return this.questionOptionService.getQuestionOption(
      questionLabel,
      position,
    );
  }
}
