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
  formFactor: string;

  @Field(() => [String])
  memoryFrecuencies: string[];

  @Field()
  memoryType: string;

  @Field()
  memoryFormat: string;

  @Field(() => Int)
  memorySlots: number;

  @Field(() => Int)
  memoryMaxCapacity: number;

  @Field()
  memoryDualChannel: boolean;

  @Field()
  memoryXMP: boolean;

  @Field()
  networkInterfaceMaxSpeed: string;

  @Field()
  hasWireless: boolean;

  @Field()
  supportMultiGraphics: boolean;

  @Field()
  powerSupply: string;

  @Field(() => Int)
  slotsPCIe: number;

  @Field(() => Int)
  portsSATA: number;

  @Field(() => Int)
  portsM2SATA: number;

  @Field(() => Int)
  portsM2PCIe: number;

  @Field(() => Int)
  portsUSB: number;

  @Field(() => ComponentModel)
  component?: ComponentModel;
}
