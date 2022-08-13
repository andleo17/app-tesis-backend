import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Component } from '@prisma/client';
import { ComponentTypeModel } from './componentType.model';
import { CpuModel } from './cpu.model';
import { GpuModel } from './gpu.model';
import { MotherboardModel } from './motherboard.model';
import { PowerSuplyModel } from './powerSupply.model';
import { RamModel } from './ram.model';
import { StorageModel } from './storage.model';

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

  @Field(() => CpuModel, { nullable: true })
  cpu?: CpuModel;

  @Field(() => RamModel, { nullable: true })
  ram?: RamModel;

  @Field(() => MotherboardModel, { nullable: true })
  motherboard?: MotherboardModel;

  @Field(() => GpuModel, { nullable: true })
  gpu?: GpuModel;

  @Field(() => PowerSuplyModel, { nullable: true })
  powerSupply?: PowerSuplyModel;

  @Field(() => StorageModel, { nullable: true })
  storage?: StorageModel;
}
