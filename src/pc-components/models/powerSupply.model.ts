import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { PowerSupply } from '@prisma/client';
import { ComponentModel } from './component.model';

@ObjectType()
export class PowerSuplyModel implements PowerSupply {
  @Field(() => ID)
  componentId: number;

  @Field(() => Int)
  power: number;

  @Field()
  efficiency: string;

  @Field(() => Int)
  modularity: number;

  @Field(() => Int)
  frequency: number;

  @Field()
  formFactor: string;

  @Field(() => ComponentModel)
  component?: ComponentModel;
}
