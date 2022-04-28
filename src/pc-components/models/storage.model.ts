import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Storage } from '@prisma/client';
import { ComponentModel } from './component.model';

@ObjectType()
export class StorageModel implements Storage {
  @Field(() => ID)
  componentId: number;

  @Field()
  type: string;

  @Field(() => Int)
  capacity: number;

  @Field(() => Int, { nullable: true })
  revolutions: number;

  @Field(() => Int, { nullable: true })
  cache: number;

  @Field()
  format: string;

  @Field()
  interface: string;

  @Field()
  haveSink: boolean;

  @Field(() => Int)
  speedRead: number;

  @Field(() => Int)
  speedWrite: number;

  @Field(() => ComponentModel)
  component?: ComponentModel;
}
