import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Ram } from '@prisma/client';
import { ComponentModel } from './component.model';

@ObjectType()
export class RamModel implements Ram {
  @Field(() => ID)
  componentId: number;

  @Field()
  type: string;

  @Field(() => Float)
  voltage: number;

  @Field(() => Int)
  frequency: number;

  @Field(() => Int)
  capacity: number;

  @Field()
  format: string;

  @Field(() => Int)
  casLatency: number;

  @Field(() => Int)
  latency: number;

  @Field(() => ComponentModel)
  component?: ComponentModel;
}
