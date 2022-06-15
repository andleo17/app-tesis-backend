import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Component } from '@prisma/client';
import { ComponentTypeModel } from './componentType.model';

@ObjectType()
export class ComponentModel implements Component {
  @Field(() => ID)
  id: number;

  @Field()
  frabricId: string;

  @Field({ nullable: true })
  deltronId: string;

  @Field(() => Int)
  typeId: number;

  @Field({ nullable: true })
  image: string;

  @Field()
  brand: string;

  @Field()
  model: string;

  @Field(() => Float, { nullable: true })
  suggestedPrice: number;

  @Field()
  rgb: boolean;

  @Field(() => ComponentTypeModel)
  type?: ComponentTypeModel;
}
