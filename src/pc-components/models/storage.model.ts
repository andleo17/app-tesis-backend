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

  @Field()
  capacityUnit: string;

  @Field()
  format: string;

  @Field()
  interface: string;

  @Field()
  haveSink: boolean;

  @Field(() => Int, { nullable: true })
  revolutions: number;

  @Field(() => Int, { nullable: true })
  speedRead: number;

  @Field(() => Int, { nullable: true })
  speedWrite: number;

  @Field(() => ComponentModel)
  component?: ComponentModel;
}
