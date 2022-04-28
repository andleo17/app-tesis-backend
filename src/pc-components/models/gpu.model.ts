import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Gpu } from '@prisma/client';
import { ComponentModel } from './component.model';

@ObjectType()
export class GpuModel implements Gpu {
  @Field(() => ID)
  componentId: number;

  @Field()
  family: string;

  @Field(() => Int)
  cores: number;

  @Field(() => Int)
  memory: number;

  @Field(() => Float)
  frecuency: number;

  @Field()
  maxResolution: string;

  @Field()
  interface: string;

  @Field(() => Int)
  power: number;

  @Field(() => Int)
  connectorHDMI: number;

  @Field(() => Int)
  connectorDisplayPort: number;

  @Field(() => Int)
  pines: number;

  @Field(() => ComponentModel)
  component?: ComponentModel;
}
