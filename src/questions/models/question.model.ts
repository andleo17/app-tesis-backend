import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Question } from '@prisma/client';
import { QuestionCategoryModel } from './questionCategory.model';
import { QuestionOptionModel } from './questionOption.model';

@ObjectType()
export class QuestionModel implements Question {
  @Field(() => ID)
  label: string;

  @Field()
  content: string;

  @Field()
  isMultipleChoice: boolean;

  @Field(() => Int)
  questionCategoryId: number;

  @Field(() => QuestionCategoryModel)
  questionCategory?: QuestionCategoryModel;

  @Field(() => [QuestionOptionModel])
  options?: QuestionOptionModel[];
}
