import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FormInput {
  @Field()
  questionLabel: string;

  @Field(() => Int)
  answerPosition: number;
}
