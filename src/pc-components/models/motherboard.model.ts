import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Motherboard } from '@prisma/client';
import { ComponentModel } from './component.model';

@ObjectType()
export class MotherboardModel implements Motherboard {
  @Field(() => ID)
  componentId: number;

  @Field()
  socket: string;

  @Field()
  chipset: string;

  @Field()
  size: string;

  @Field(() => [String])
  supportedMemory: string[];

  @Field()
  memoryType: string;

  @Field(() => Int)
  memorySlots: number;

  @Field(() => Int)
  memoryChannel: number;

  @Field()
  networkInterfaceSpeed: string;

  @Field()
  powerSupply: string;

  @Field(() => Int)
  portsATA: number;

  @Field(() => Int)
  portsPCIe: number;

  @Field(() => Int)
  portsUSB: number;

  @Field()
  format: string;

  @Field(() => ComponentModel)
  component?: ComponentModel;
}
