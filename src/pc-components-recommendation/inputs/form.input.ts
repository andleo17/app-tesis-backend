import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FormInput {
  @Field()
  questionLabel: string;

  @Field(() => Int, { nullable: true })
  answer: number;

  @Field(() => [Int], { nullable: true })
  multipleChoiceAnswers: number[];
}
