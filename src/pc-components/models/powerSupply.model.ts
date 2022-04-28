import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { PowerSupply } from '@prisma/client';
import { ComponentModel } from './component.model';

@ObjectType()
export class PowerSuplyModel implements PowerSupply {
  @Field(() => ID)
  componentId: number;

  @Field(() => Int)
  potency: number;

  @Field()
  efficiency: string;

  @Field()
  isModular: boolean;

  @Field(() => Int)
  inVoltage: number;

  @Field(() => Int)
  frequency: number;

  @Field()
  format: string;

  @Field(() => Int)
  outVoltage: number;

  @Field(() => Int)
  connectorsATX: number;

  @Field(() => Int)
  connectorsSATA: number;

  @Field(() => Int)
  connectorsPCIe: number;

  @Field(() => Int)
  connectorsEPS: number;

  @Field(() => ComponentModel)
  component?: ComponentModel;
}
