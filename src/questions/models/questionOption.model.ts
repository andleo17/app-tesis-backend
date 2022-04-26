import { Field, Int, ObjectType } from '@nestjs/graphql';
import { QuestionOption } from '@prisma/client';
import { QuestionModel } from './question.model';

@ObjectType()
export class QuestionOptionModel implements QuestionOption {
  @Field(() => Int)
  position: number;

  @Field()
  questionLabel: string;

  @Field()
  content: string;

  @Field(() => QuestionModel)
  question?: QuestionModel;
}
