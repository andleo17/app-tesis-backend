import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ComponentType } from '@prisma/client';

@ObjectType()
export class ComponentTypeModel implements ComponentType {
  @Field(() => ID)
  id: number;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
