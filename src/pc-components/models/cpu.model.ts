import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Cpu } from '@prisma/client';
import { ComponentModel } from './component.model';

@ObjectType()
export class CpuModel implements Cpu {
  @Field(() => ID)
  componentId: number;

  @Field()
  family: string;

  @Field({ nullable: true })
  generation: number;

  @Field()
  platform: string;

  @Field()
  specifier: string;

  @Field({ nullable: true })
  launchDate: Date;

  @Field(() => Float)
  baseFrecuency: number;

  @Field(() => Float)
  turboFrecuency: number;

  @Field(() => Int)
  cores: number;

  @Field(() => Int)
  threads: number;

  @Field(() => Int, { nullable: true })
  cacheL2: number;

  @Field(() => Int)
  cacheL3: number;

  @Field(() => Int)
  tdp: number;

  @Field()
  lithography: string;

  @Field()
  socket: string;

  @Field(() => Int)
  maxTemperature: number;

  @Field(() => [String])
  admitedMemory: string[];

  @Field(() => Int)
  maxMemory: number;

  @Field(() => Int)
  maxMemorySpeed: number;

  @Field()
  haveIntegratedGraphics: boolean;

  @Field(() => Float, { nullable: true })
  graphicBaseFrecuency: number;

  @Field(() => Float, { nullable: true })
  graphicMaxFrecuency: number;

  @Field(() => String, { nullable: true })
  graphicMaxResolution: string;

  @Field(() => ComponentModel)
  component?: ComponentModel;
}
