import { Field, Int, ObjectType } from '@nestjs/graphql';
import { QuestionCategory } from '@prisma/client';
import { QuestionModel } from './question.model';

@ObjectType()
export class QuestionCategoryModel implements QuestionCategory {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [QuestionModel])
  questions?: QuestionModel[];
}
