import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { QuestionModel } from '../models/question.model';
import { QuestionCategoryModel } from '../models/questionCategory.model';
import { QuestionService } from '../services/question.service';
import { QuestionCategoryService } from '../services/questionCategory.service';

@Resolver(() => QuestionCategoryModel)
export class QuestionCategoryResolver {
  constructor(
    private readonly questionCategoryService: QuestionCategoryService,
    private readonly questionService: QuestionService,
  ) {}

  @ResolveField(() => [QuestionModel])
  async questions(
    @Parent() questionCategory: QuestionCategoryModel,
  ): Promise<QuestionModel[]> {
    return this.questionService.getQuestions({
      questionCategoryId: questionCategory.id,
    });
  }

  @Query(() => [QuestionCategoryModel])
  async getQuestionCategories(
    @Args('ids', { type: () => [Int] }) ids: number[],
  ): Promise<QuestionCategoryModel[]> {
    return this.questionCategoryService.getQuestionCategories({
      where: { id: { in: ids } },
    });
  }

  @Query(() => QuestionCategoryModel)
  async getQuestionCategory(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<QuestionCategoryModel> {
    return this.questionCategoryService.getQuestionCategory(id);
  }
}
