import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ComponentModel } from '../models/component.model';
import { ComponentsService } from '../services/component.service';

@Resolver(() => ComponentModel)
export class ComponentResolver {
  constructor(private readonly componentService: ComponentsService) {}

  @Query(() => [ComponentModel])
  async getComponents(
    @Args('ids', { type: () => [Int] }) ids: number[],
  ): Promise<ComponentModel[]> {
    return this.componentService.getComponents({ id: { in: ids } });
  }

  @Query(() => ComponentModel)
  async getComponent(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ComponentModel> {
    return this.componentService.getComponent(id);
  }
}
