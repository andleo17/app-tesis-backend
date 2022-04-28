import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Component } from '@prisma/client';

@ObjectType()
export class ComponentModel implements Component {
  @Field(() => ID)
  id: number;

  @Field()
  frabricId: string;

  @Field({ nullable: true })
  deltronId: string;

  @Field({ nullable: true })
  image: string;

  @Field()
  brand: string;

  @Field()
  model: string;

  @Field()
  type: string;

  @Field(() => Float, { nullable: true })
  suggestedPrice: number;

  @Field()
  rgb: boolean;
}
