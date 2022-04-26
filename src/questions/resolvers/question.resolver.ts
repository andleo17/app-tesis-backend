import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { QuestionModel } from '../models/question.model';
import { QuestionCategoryModel } from '../models/questionCategory.model';
import { QuestionOptionModel } from '../models/questionOption.model';
import { QuestionService } from '../services/question.service';
import { QuestionCategoryService } from '../services/questionCategory.service';
import { QuestionOptionService } from '../services/questionOption.service';

@Resolver(() => QuestionModel)
export class QuestionResolver {
  constructor(
    private readonly questionService: QuestionService,
    private readonly questionOptionService: QuestionOptionService,
    private readonly questionCategoryService: QuestionCategoryService,
  ) {}

  @ResolveField(() => [QuestionOptionModel])
  async options(
    @Parent() question: QuestionModel,
  ): Promise<QuestionOptionModel[]> {
    return this.questionOptionService.getQuestionOptions(question.label);
  }

  @ResolveField(() => QuestionCategoryModel)
  async category(
    @Parent() question: QuestionModel,
  ): Promise<QuestionCategoryModel> {
    return this.questionCategoryService.getQuestionCategory(
      question.questionCategoryId,
    );
  }

  @Query(() => [QuestionModel])
  async getQuestions(): Promise<QuestionModel[]> {
    return this.questionService.getQuestions();
  }

  @Query(() => QuestionModel)
  async getQuestion(label: string): Promise<QuestionModel> {
    return this.questionService.getQuestion(label);
  }
}
